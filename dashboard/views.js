const escapeCharacters = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function escape(value) {
  return String(value).replace(/[&<>"']/g, (character) => escapeCharacters[character]);
}

function formatDate(date) {
  return date.replaceAll('-', '.');
}

function renderCard(demo) {
  const name = escape(demo.title);
  const id = `demo-${escape(demo.id)}`;
  return `
    <li class="demo-card">
      <a id="${id}" class="demo-link" href="/?demo=${encodeURIComponent(demo.id)}" aria-labelledby="${id}-title" ${demo.description ? `aria-describedby="${id}-description"` : ''}>
        <h3 id="${id}-title" class="link-label">${name}</h3>
        <span class="link-arrow" aria-hidden="true">→</span>
        ${demo.description ? `<p id="${id}-description" class="demo-description">${escape(demo.description)}</p>` : ''}
        <p class="demo-meta">
          <time datetime="${demo.date}">${formatDate(demo.date)}</time>
          ${demo.result ? '' : '<span>실행 결과 없음</span>'}
        </p>
      </a>
    </li>`;
}

export function renderList(demos) {
  return `
    <div class="intro">
      <h1>웹 접근성 데모</h1>
      <p>웹 접근성 데모를 체험하고, 적용한 KWCAG 2.2 기준과 검증 결과를 확인하세요.</p>
    </div>
    <section class="demo-list" aria-labelledby="demo-list-title">
      <div class="section-heading">
        <h2 id="demo-list-title">데모 목록</h2>
        <span>${demos.length}개</span>
      </div>
      ${demos.length ? `<ul class="demo-grid">${demos.map(renderCard).join('')}</ul>` : '<p>등록된 데모가 없습니다.</p>'}
    </section>`;
}

function renderReport(result) {
  if (!result) return '<p>아직 등록된 실행 결과가 없습니다.</p>';
  const sections = result.sections ?? [];
  return `
    ${result.intro ?? ''}
    ${sections.length ? `
      <nav class="report-nav" aria-label="실행 결과 목차">
        <ul>${sections.map(({ id, title }) => `<li><a href="#${escape(id)}">${escape(title)}</a></li>`).join('')}</ul>
      </nav>` : ''}
    <p id="report-source-link-note" class="report-note">외부 근거 링크는 새 창에서 열립니다.</p>
    ${result.body ?? result}`;
}

export function renderDetail(demo) {
  return `
    <a class="back-link" href="/"><span class="link-arrow" aria-hidden="true">←</span><span class="link-label">데모 목록</span></a>
    <div class="detail-header">
      <div>
        <h1>${escape(demo.title)}</h1>
        <p class="detail-date"><time datetime="${demo.date}">${formatDate(demo.date)}</time></p>
      </div>
      <a class="primary-link" href="${escape(demo.url)}" target="_blank" rel="noopener" aria-label="데모 열기 (새 창) · ${escape(demo.title)}">
        <span class="link-label">데모 열기 (새 창)</span><span class="link-arrow" aria-hidden="true">↗</span>
      </a>
    </div>
    <article class="report" aria-labelledby="report-title">
      <h2 id="report-title">실행 결과</h2>
      ${renderReport(demo.result)}
    </article>`;
}

export function renderMissingDemo() {
  return '<h1>데모를 찾을 수 없습니다</h1><p>주소를 확인하거나 목록에서 데모를 골라 주세요.</p><a class="back-link" href="/"><span class="link-label">데모 목록</span></a>';
}

export function renderCatalogError() {
  return '<h1>데모 목록을 불러오지 못했습니다</h1><p>페이지를 새로고침해 다시 시도해 주세요.</p>';
}
