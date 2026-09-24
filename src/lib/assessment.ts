import { dimensions, maturityLevels, questions, serviceByDimension, type DimensionKey } from '../data/assessment';

export type Answers = Record<string, number>;
export interface Profile { stage: string; team: string; vat: string; }

export interface DimensionResult { key: DimensionKey; title: string; level: number; label: string; }
export interface Priority { questionId: string; dimension: DimensionKey; title: string; why: string; firstStep: string; }
export interface AssessmentResult {
  dimensions: DimensionResult[];
  strongest: DimensionResult;
  weakest: DimensionResult;
  priorities: Priority[];
  service: { label: string; href: string };
}

/** Profile-driven emphasis: what matters more for this organisation's situation. */
function weights(profile: Profile): Record<DimensionKey, number> {
  const w: Record<DimensionKey, number> = { reports: 1, cash: 1.1, tax: 1, decision: 1 };
  if (profile.stage === 'expanding') { w.decision += 0.5; w.cash += 0.2; }
  if (profile.stage === 'founding') { w.decision += 0.4; w.reports -= 0.2; }
  if (profile.stage === 'young') w.cash += 0.2;
  if (profile.vat === 'yes') w.tax += 0.3;
  if (profile.vat === 'unsure') w.tax += 0.5;
  return w;
}

export function scoreAssessment(answers: Answers, profile: Profile): AssessmentResult {
  const dims = dimensions.map((d) => {
    const values = questions.filter((q) => q.dimension === d.key).map((q) => answers[q.id] ?? 0);
    // Floor, not round: a level is only reached when the answers actually support it.
    const level = Math.floor(values.reduce((a, b) => a + b, 0) / values.length);
    return { key: d.key, title: d.title, level, label: maturityLevels[level] };
  });

  const w = weights(profile);
  const ranked = [...dims].sort((a, b) => a.level - b.level || w[b.key] - w[a.key]);
  const priorities = questions
    .filter((q) => (answers[q.id] ?? 0) <= 1)
    .map((q) => ({ q, weight: (3 - (answers[q.id] ?? 0)) * w[q.dimension] }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map(({ q }) => ({ questionId: q.id, dimension: q.dimension, title: q.topic, why: q.why, firstStep: q.firstStep }));

  const weakest = ranked[0];
  const serviceKey: DimensionKey =
    weakest.key === 'decision' && profile.stage !== 'founding' && profile.stage !== 'expanding' ? 'reports' : weakest.key;

  return {
    dimensions: dims,
    strongest: ranked[ranked.length - 1],
    weakest,
    priorities,
    service: serviceByDimension[serviceKey],
  };
}
