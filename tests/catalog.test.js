import assert from 'node:assert/strict';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { demoVariant, readCatalog } from '../build/demos.js';

test('demoVariant reads the off suffix', () => {
  assert.deepEqual(demoVariant('2026-11-27-login-page-off'), { topic: '2026-11-27-login-page', variant: 'off' });
});

test('demoVariant reads the on suffix', () => {
  assert.deepEqual(demoVariant('2026-11-27-login-page-on'), { topic: '2026-11-27-login-page', variant: 'on' });
});

test('ignores -off inside the topic name', () => {
  assert.deepEqual(demoVariant('2026-11-27-take-off-guide'), { topic: '2026-11-27-take-off-guide', variant: null });
});

test('readCatalog adds topic and variant to each demo', async () => {
  const root = await mkdtemp(join(tmpdir(), 'catalog-'));
  try {
    const page = (title) => `<!doctype html><html lang="ko"><head><title>${title}</title></head><body></body></html>`;
    for (const [id, title] of [
      ['2026-11-27-a-off', '가 - 한국 웹 접근성 플레이그라운드'],
      ['2026-11-27-a-on', '가 - 한국 웹 접근성 플레이그라운드'],
      ['2026-11-26-b', '나'],
    ]) {
      await mkdir(join(root, id));
      await writeFile(join(root, id, 'index.html'), page(title));
    }

    const catalog = await readCatalog(root);
    assert.equal(catalog.length, 3);
    const on = catalog.find((demo) => demo.id === '2026-11-27-a-on');
    assert.equal(on.variant, 'on');
    assert.equal(on.topic, '2026-11-27-a');
    assert.equal(on.title, '가');
    assert.equal(catalog.find((demo) => demo.id === '2026-11-26-b').variant, null);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
