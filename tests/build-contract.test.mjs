import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, normalize } from 'node:path';
import { test } from 'node:test';

const root = process.cwd();
const dist = join(root, 'dist');
const contentRoutes = [
  '/',
  '/about/',
  '/services/',
  '/services/financial-advisory/',
  '/services/tax-zakat-advisory/',
  '/services/feasibility-studies/',
  '/insights/',
  '/insights/cash-flow-visibility/',
  '/insights/tax-readiness/',
  '/insights/feasibility-assumptions/',
  '/consultation/',
  '/contact/',
];

function readPage(route) {
  const file = route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html');
  assert.ok(existsSync(file), `Missing built page for ${route}`);
  return readFileSync(file, 'utf8');
}

function countMatches(sourceText, pattern) {
  return [...sourceText.matchAll(pattern)].length;
}

function readStructuredData(html, route) {
  const script = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, `Missing JSON-LD on ${route}`);
  return JSON.parse(script);
}

test('build output has one semantic H1 per rendered content page', () => {
  for (const route of contentRoutes) {
    assert.equal(countMatches(readPage(route), /<h1\b/g), 1, `${route} should have exactly one H1`);
  }
});

test('page head exposes social metadata and type-specific structured data', () => {
  const home = readPage('/');
  const service = readPage('/services/financial-advisory/');
  const insight = readPage('/insights/cash-flow-visibility/');
  const notFound = readFileSync(join(dist, '404.html'), 'utf8');
  const homeGraph = readStructuredData(home, '/');
  const serviceGraph = readStructuredData(service, '/services/financial-advisory/');
  const insightGraph = readStructuredData(insight, '/insights/cash-flow-visibility/');

  assert.match(home, /property="og:image"/);
  assert.match(home, /name="twitter:image"/);
  assert.match(home, /aria-controls="mobile-nav-panel"/);
  assert.match(home, /aria-expanded="false"/);
  assert.doesNotMatch(home, /\sstyle="/i);
  assert.doesNotMatch(notFound, /\sstyle="/i);
  assert.ok(homeGraph['@graph'].some((entity) => entity['@type'] === 'WebSite'));
  assert.ok(serviceGraph['@graph'].some((entity) => entity['@type'] === 'Service'));
  assert.ok(insightGraph['@graph'].some((entity) => entity['@type'] === 'Article'));
  assert.ok(serviceGraph['@graph'].some((entity) => entity['@type'] === 'BreadcrumbList'));
});

test('form pages retain authored supporting content and safe POST fallbacks', () => {
  const consultation = readPage('/consultation/');
  const contact = readPage('/contact/');

  assert.match(consultation, /النتيجة الأولية/);
  assert.match(consultation, /الخصوصية/);
  assert.match(contact, /البريد الإلكتروني/);
  assert.match(contact, /غير متأكد من الخدمة/);

  for (const [route, html] of [['/consultation/', consultation], ['/contact/', contact]]) {
    const form = html.match(/<form\b[^>]*>/)?.[0] ?? '';
    assert.match(form, /method="post"/i, `${route} must not default to GET`);
    assert.match(form, new RegExp(`action="${route.replaceAll('/', '\\/')}"`, 'i'));
    assert.doesNotMatch(form, /method="get"/i);
  }
});

test('internal links resolve to generated files', () => {
  const htmlFiles = contentRoutes.map((route) =>
    route === '/' ? join(dist, 'index.html') : join(dist, route.slice(1), 'index.html'),
  );

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    for (const match of html.matchAll(/href="([^"]+)"/g)) {
      const href = match[1];
      if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/_')) continue;
      const pathname = href.split(/[?#]/, 1)[0];
      if (!pathname || pathname.startsWith('/assets/')) continue;
      const target = pathname.endsWith('/')
        ? join(dist, pathname.slice(1), 'index.html')
        : join(dist, pathname.slice(1));
      assert.ok(existsSync(normalize(target)), `Broken internal link ${href} in ${file}`);
    }
  }
});

test('robots and sitemap output preserve indexability boundaries', () => {
  const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
  const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');

  assert.match(robots, /Sitemap: https:\/\/mgbc\.sa\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/mgbc\.sa\/contact\//);
  assert.doesNotMatch(sitemap, /https:\/\/mgbc\.sa\/(privacy|terms)\//);
});
