import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { legacyDemoTargets, resolveDemoId } from '../dashboard/legacy-demos.js';

const expected = {
  '2026-11-24-login-page': 'login-page',
  '2026-11-24-signup-page': 'signup-page',
  '2026-11-25-accessible-table': 'library-hours-table',
  '2026-11-25-faq-accordion': 'faq-accordion',
  '2026-11-25-modal-layer': 'modal-layer',
  '2026-11-26-image-alternatives': 'closure-notice',
  '2026-11-26-new-tab-notice': 'resource-links',
  '2026-11-26-pausable-carousel': 'notice-carousel',
  '2026-11-26-skip-navigation': 'library-guide',
  '2026-11-26-text-contrast': 'notice-board',
  '2026-11-26-video-captions': 'facility-video',
};

test('maps the eleven deployed demo ids to new on demos', () => {
  assert.deepEqual(
    legacyDemoTargets,
    Object.fromEntries(Object.entries(expected).map(([id, topic]) => [id, `2026-11-27-${topic}-on`])),
  );
});

test('resolveDemoId maps a legacy id', () => {
  assert.equal(resolveDemoId('2026-11-24-login-page'), '2026-11-27-login-page-on');
});

test('resolveDemoId keeps unknown ids', () => {
  assert.equal(resolveDemoId('x'), 'x');
  assert.equal(resolveDemoId(null), null);
});

test('netlify redirects each legacy demo folder', async () => {
  const toml = await readFile(new URL('../netlify.toml', import.meta.url), 'utf8');
  const blocks = toml.split('[[redirects]]').slice(1);
  for (const [id, target] of Object.entries(legacyDemoTargets)) {
    const block = blocks.find((text) => text.includes(`from = "/demos/${id}/*"`));
    assert.ok(block, `missing redirect for ${id}`);
    assert.match(block, new RegExp(`to = "/demos/${target}/"`));
    assert.match(block, /status = 301/);
  }
});

test('every redirect target exists in demo-sources', async () => {
  for (const target of Object.values(legacyDemoTargets)) {
    await access(new URL(`../demo-sources/${target}/index.html`, import.meta.url));
  }
});
