import { lstat, readFile, readdir, realpath } from 'node:fs/promises';
import { basename, extname, join, relative, resolve, sep } from 'node:path';
import { watch } from 'chokidar';
import MarkdownIt from 'markdown-it';
import mime from 'mime-types';
import { parse } from 'parse5';

const demoPrefix = '/demos/';
const catalogPath = '/demo-catalog.json';
const resultFile = 'result.md';
const demoId = /^\d{4}-\d{2}-\d{2}-[\p{L}\p{N}][\p{L}\p{N}_-]*$/u;
const assetExtensions = new Set([
  '.html', '.css', '.js', '.mjs', '.json',
  '.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico',
  '.woff', '.woff2', '.mp4', '.webm', '.mp3', '.ogg', '.vtt',
]);
const markdown = new MarkdownIt({ html: false });

// The dashboard already has a page heading. The report is a section within it.
for (const rule of ['heading_open', 'heading_close']) {
  markdown.renderer.rules[rule] = (tokens, index, options, env, renderer) => {
    if (rule === 'heading_open' && tokens[index].tag === 'h2' && tokens[index].level === 0) {
      env.sectionTitle = tokens[index + 1].content;
    }
    tokens[index].tag = `h${Math.min(6, Number(tokens[index].tag[1]) + 1)}`;
    return renderer.renderToken(tokens, index, options);
  };
}
markdown.renderer.rules.table_open = (_tokens, _index, _options, env) => {
  const id = `report-table-${++env.table}`;
  const caption = markdown.utils.escapeHtml(env.sectionTitle ?? '실행 결과');
  return `<p class="report-table-hint" id="${id}-hint" hidden>표를 좌우로 스크롤하면 나머지 열을 볼 수 있습니다. 키보드에서는 표 영역에 초점을 두고 왼쪽·오른쪽 방향키를 누르세요.</p>
    <div class="report-table" id="${id}" role="region" aria-labelledby="${id}-caption" tabindex="0">
      <table><caption id="${id}-caption">${caption} 표${env.table > 1 ? ` ${env.table}` : ''}</caption>\n`;
};
markdown.renderer.rules.table_close = () => '</table></div>\n';
markdown.renderer.rules.th_open = (tokens, index, options, env, renderer) => {
  tokens[index].attrSet('scope', 'col');
  return renderer.renderToken(tokens, index, options);
};

for (const [rule, attribute] of [['link_open', 'href'], ['image', 'src']]) {
  const render = markdown.renderer.rules[rule];
  markdown.renderer.rules[rule] = (tokens, index, options, env, renderer) => {
    const token = tokens[index];
    const value = token.attrGet(attribute);
    if (rule === 'link_open' && /^https?:\/\//i.test(value ?? '')) {
      token.attrSet('target', '_blank');
      token.attrSet('rel', 'noopener noreferrer');
      token.attrSet('aria-describedby', 'report-source-link-note');
    } else if (value && !/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(value)) {
      const url = new URL(value, `https://demo.local${env.demoUrl}`);
      token.attrSet(attribute, url.pathname + url.search + url.hash);
    }
    return render
      ? render(tokens, index, options, env, renderer)
      : renderer.renderToken(tokens, index, options);
  };
}

async function readOptional(file) {
  try {
    if (!(await lstat(file)).isFile()) return null;
    return await readFile(file, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return null;
    throw error;
  }
}

export function demoVariant(id) {
  const match = /^(.+)-(off|on)$/.exec(id);
  return match ? { topic: match[1], variant: match[2] } : { topic: id, variant: null };
}

function readDemoMetadata(html, id) {
  const head = parse(html).childNodes.find((node) => node.tagName === 'html')
    ?.childNodes.find((node) => node.tagName === 'head');
  const title = head?.childNodes.find((node) => node.tagName === 'title')
    ?.childNodes.map((node) => node.value ?? '').join('').trim();
  const description = head?.childNodes.find((node) => node.tagName === 'meta' &&
    node.attrs.some(({ name, value }) => name === 'name' && value === 'description'))
    ?.attrs.find(({ name }) => name === 'content')?.value.trim();
  return {
    title: title?.replace(/\s*-\s*한국 웹 접근성 플레이그라운드$/, '').trim() || id,
    description,
  };
}

function renderReport(source, demoUrl) {
  const env = { demoUrl, table: 0 };
  const tokens = markdown.parse(source, env);
  if (tokens[0]?.tag === 'h1' && /^(?:.* )?(?:데모 개발|실행) 결과$/.test(tokens[1]?.content)) {
    tokens.splice(0, 3);
  }

  const sections = [];
  let bodyStart = 0;
  for (const [index, token] of tokens.entries()) {
    if (token.type !== 'heading_open' || token.tag !== 'h2' || token.level !== 0) continue;
    if (!sections.length) bodyStart = index;
    const title = tokens[index + 1].content;
    const id = `report-section-${sections.length + 1}`;
    token.attrSet('id', id);
    token.attrSet('tabindex', '-1');
    sections.push({ id, title });
  }

  return {
    intro: markdown.renderer.render(tokens.slice(0, bodyStart), markdown.options, env),
    body: markdown.renderer.render(tokens.slice(bodyStart), markdown.options, env),
    sections,
  };
}

export async function readCatalog(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const ids = entries
    .filter((entry) => entry.isDirectory() && demoId.test(entry.name))
    .map((entry) => entry.name)
    .sort((left, right) => right.slice(0, 10).localeCompare(left.slice(0, 10)) || left.localeCompare(right, 'ko'));

  const demos = await Promise.all(ids.map(async (id) => {
    const directory = join(root, id);
    const url = `${demoPrefix}${encodeURIComponent(id)}/`;
    const html = await readOptional(join(directory, 'index.html'));
    if (html === null) return null;

    const result = await readOptional(join(directory, resultFile));
    return {
      id,
      ...readDemoMetadata(html, id),
      ...demoVariant(id),
      date: id.slice(0, 10),
      url,
      result: result?.trim() ? renderReport(result, url) : null,
    };
  }));
  return demos.filter(Boolean);
}

function isPublicAsset(path) {
  return assetExtensions.has(extname(path).toLowerCase());
}

async function* walkAssets(directory, assetPath = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const file = join(directory, entry.name);
    const path = `${assetPath}${entry.name}`;
    if (entry.isDirectory()) {
      yield* walkAssets(file, `${path}/`);
    } else if (entry.isFile() && isPublicAsset(path)) {
      yield { path, file };
    }
  }
}

async function serveDemo(root, pathname, response) {
  const path = decodeURIComponent(pathname.slice(demoPrefix.length));
  const parts = (path.endsWith('/') ? `${path}index.html` : path).split('/');
  if (parts.length < 2 || !demoId.test(parts[0]) ||
      parts.some((part) => !part || part.startsWith('.') || part.includes('\\')) ||
      !isPublicAsset(parts.at(-1))) {
    response.writeHead(404).end();
    return;
  }

  const file = resolve(root, ...parts);
  let source;
  try {
    if (await realpath(file) === file) source = await readFile(file);
  } catch (error) {
    if (!['ENOENT', 'EISDIR', 'ENOTDIR'].includes(error.code)) throw error;
  }
  if (source === undefined) {
    response.writeHead(404).end();
    return;
  }

  const type = mime.contentType(extname(file)) || 'application/octet-stream';
  if (type.startsWith('text/html')) {
    const client = '<script type="module" src="/demo-reload.js"></script>';
    const html = source.toString('utf8');
    source = /<\/body\s*>/i.test(html)
      ? html.replace(/<\/body\s*>/i, `${client}$&`)
      : html + client;
  }
  response.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-store' }).end(source);
}

export function playgroundDemos(directory) {
  const privateLabel = basename(directory).toLowerCase();

  return {
    name: 'playground-demos',

    configureServer(server) {
      const root = realpath(directory);
      const changed = new Set();
      let timer;
      const watcher = watch(directory, {
        ignoreInitial: true,
        followSymlinks: false,
        ignored: (file) => relative(directory, file).split(sep).some((part) => part.startsWith('.')),
      });

      watcher.on('all', (_event, file) => {
        const [id] = relative(directory, file).split(sep);
        if (!demoId.test(id)) return;
        changed.add(id);
        clearTimeout(timer);
        timer = setTimeout(() => {
          server.ws.send('playground:demos-changed', [...changed]);
          changed.clear();
        }, 75);
      });
      watcher.on('error', (error) => server.config.logger.error(error.message));
      server.httpServer?.once('close', () => {
        clearTimeout(timer);
        void watcher.close();
      });

      server.middlewares.use(async (request, response, next) => {
        const { pathname } = new URL(request.url, 'http://localhost');
        try {
          if (pathname === catalogPath) {
            const catalog = await readCatalog(await root);
            response.writeHead(200, {
              'Content-Type': 'application/json; charset=utf-8',
              'Cache-Control': 'no-store',
            }).end(JSON.stringify(catalog));
          } else if (pathname.startsWith(demoPrefix)) {
            await serveDemo(await root, pathname, response);
          } else {
            next();
          }
        } catch (error) {
          next(error);
        }
      });
    },

    async generateBundle() {
      const catalog = await readCatalog(directory);
      this.emitFile({ type: 'asset', fileName: catalogPath.slice(1), source: JSON.stringify(catalog) });
      for (const { id } of catalog) {
        for await (const { path, file } of walkAssets(join(directory, id))) {
          this.emitFile({
            type: 'asset',
            fileName: `${demoPrefix.slice(1)}${id}/${path}`,
            source: await readFile(file),
          });
        }
      }
    },

    writeBundle(_options, bundle) {
      for (const [file, output] of Object.entries(bundle)) {
        const content = output.type === 'chunk' ? output.code :
          /\.(?:html|css|[cm]?js|json|svg|vtt)$/i.test(file) ? Buffer.from(output.source).toString('utf8') : '';
        if (file.toLowerCase().includes(privateLabel) || content.toLowerCase().includes(privateLabel)) {
          this.error(`공개 산출물에서 내부 명칭을 제거해 주세요. 배포 파일 ${file}`);
        }
      }
    },
  };
}
