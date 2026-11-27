import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { extname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

// Paths and names that must not reach the public demos or reports (AGENTS.md).
// Private skill and repository names live in the git-ignored private-names.local.txt, one per line,
// so this public file does not publish them. Without that file only the path checks run.
const localNamesFile = new URL('./private-names.local.txt', import.meta.url);
const privateNames = ['/Users/', '/private/tmp', '/tmp/', ...await readFile(localNamesFile, 'utf8')
  .then((text) => text.split('\n').map((line) => line.trim()).filter(Boolean))
  .catch((error) => { if (error.code === 'ENOENT') return []; throw error; })];
const checkedExtensions = new Set(['.html', '.css', '.js', '.md', '.vtt']);

async function findPrivateNames(root) {
  const found = [];
  for (const entry of await readdir(root, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !checkedExtensions.has(extname(entry.name).toLowerCase())) continue;
    const file = join(entry.parentPath, entry.name);
    const text = await readFile(file, 'utf8');
    if (privateNames.some((name) => text.includes(name))) found.push(file);
  }
  return found.sort();
}

test('findPrivateNames reports a file with a private name', async () => {
  const root = await mkdtemp(join(tmpdir(), 'public-content-'));
  try {
    await mkdir(join(root, 'demo'));
    await writeFile(join(root, 'demo', 'result.md'), '로컬 경로 /Users/someone/demo');
    await writeFile(join(root, 'demo', 'index.html'), '<p>공개 문구</p>');
    assert.deepEqual(await findPrivateNames(root), [join(root, 'demo', 'result.md')]);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('public content has no private names', async () => {
  assert.deepEqual(await findPrivateNames(fileURLToPath(new URL('../demo-sources/', import.meta.url))), []);
});
