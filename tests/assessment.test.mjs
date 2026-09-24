import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { test } from 'node:test';
import { build } from 'esbuild';

const out = join(mkdtempSync(join(tmpdir(), 'mgbc-assessment-')), 'assessment.mjs');
await build({ entryPoints: ['src/lib/assessment.ts'], bundle: true, format: 'esm', platform: 'node', outfile: out, logLevel: 'silent' });
const { scoreAssessment } = await import(pathToFileURL(out).href);
const questions = Array.from({ length: 12 }, (_, i) => `q${i + 1}`);

const all = (v) => Object.fromEntries(questions.map((q) => [q, v]));
const profile = { stage: 'established', team: '6-20', vat: 'yes' };

test('fully mature answers produce top level and no priorities', () => {
  const r = scoreAssessment(all(3), profile);
  assert.ok(r.dimensions.every((d) => d.level === 3));
  assert.equal(r.priorities.length, 0);
});

test('levels are floored so a level is only reached when answers support it', () => {
  const r = scoreAssessment({ ...all(3), q1: 2, q2: 2, q3: 3 }, profile);
  assert.equal(r.dimensions.find((d) => d.key === 'reports').level, 2);
});

test('priorities are capped at three, ranked by gap and profile weight', () => {
  const r = scoreAssessment({ ...all(3), q4: 0, q7: 0, q10: 0, q1: 1 }, { ...profile, vat: 'unsure' });
  assert.equal(r.priorities.length, 3);
  assert.equal(r.priorities[0].questionId, 'q7');
  assert.ok(!r.priorities.some((p) => p.questionId === 'q1'));
});

test('weakest dimension maps only to verified services', () => {
  const allowed = ['/services/financial-advisory/', '/services/tax-zakat-advisory/', '/services/feasibility-studies/'];
  for (const stage of ['founding', 'young', 'established', 'expanding']) {
    const r = scoreAssessment({ ...all(3), q10: 0, q11: 0, q12: 0 }, { ...profile, stage });
    assert.ok(allowed.includes(r.service.href));
    assert.equal(r.service.href, stage === 'founding' || stage === 'expanding' ? '/services/feasibility-studies/' : '/services/financial-advisory/');
  }
});

test('result never exposes a numeric score', () => {
  const r = scoreAssessment(all(1), profile);
  assert.ok(!('score' in r));
});
