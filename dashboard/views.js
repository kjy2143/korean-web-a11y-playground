const escapeCharacters = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

function escape(value) {
  return String(value).replace(/[&<>"']/g, (character) => escapeCharacters[character]);
}

function formatDate(date) {
  return date.replaceAll('-', '.');
}

export const variantLabels = { off: '기본 개발 (off)', on: '접근성 자료 적용 (on)' };

function detailHref(demo) {
  return `/?demo=${encodeURIComponent(demo.id)}`;
}

export function groupDemos(demos) {
  const groups = new Map();
  for (const demo of demos) {
    const topic = demo.topic ?? demo.id;
    const group = groups.get(topic) ?? { topic };
    group[demo.variant ?? 'single'] = demo;
    groups.set(topic, group);
  }
  return [...groups.values()].map((group) => {
    const lead = group.on ?? group.off ?? group.single;
    const date = [group.off, group.on, group.single].filter(Boolean)
      .map((demo) => demo.date).sort().at(-1);
    return { ...group, title: lead.title, description: lead.description, date };
  }).sort((left, right) => right.date.localeCompare(left.date) || left.title.localeCompare(right.title, 'ko'));
}

function renderVariantLink(group, demo, label) {
  return `
    <li>
      <a class="variant-link" href="${detailHref(demo)}"><span class="link-label">${label}</span><span class="visually-hidden"> · ${escape(group.title)}</span><span class="link-arrow" aria-hidden="true">→</span></a>
      ${demo.result ? '' : '<span class="variant-note">실행 결과 없음</span>'}
    </li>`;
}

function renderTopicCard(group) {
  const variants = [
    group.off && renderVariantLink(group, group.off, variantLabels.off),
    group.on && renderVariantLink(group, group.on, variantLabels.on),
    group.single && renderVariantLink(group, group.single, '상세 보기'),
  ].filter(Boolean);
  return `
    <li class="topic-card">
      <h3>${escape(group.title)}</h3>
      ${group.description ? `<p class="demo-description">${escape(group.description)}</p>` : ''}
      <p class="demo-meta"><time datetime="${group.date}">${formatDate(group.date)}</time></p>
      <ul class="variant-links">${variants.join('')}</ul>
    </li>`;
}

export function renderList(demos) {
  const groups = groupDemos(demos);
  return `
    <div class="intro">
      <h1>웹 접근성 데모</h1>
      <p>같은 요청서로 만든 두 화면을 비교합니다. 기본 개발(off)은 국내 접근성 자료를 조회하지 않고 요청서대로 만든 화면이고, 접근성 자료 적용(on)은 그 화면을 KWCAG 2.2와 NIA 제작기법에 맞춰 개선한 화면입니다.</p>
    </div>
    <section class="demo-list" aria-labelledby="demo-list-title">
      <div class="section-heading">
        <h2 id="demo-list-title">데모 목록</h2>
        <span>주제 ${groups.length}개 · 데모 ${demos.length}개</span>
      </div>
      ${groups.length ? `<ul class="demo-grid">${groups.map(renderTopicCard).join('')}</ul>` : '<p>등록된 데모가 없습니다.</p>'}
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

export function renderDetail(demo, demos = []) {
  const counterpart = demo.variant && demos.find((entry) =>
    entry.topic === demo.topic && entry.variant && entry.variant !== demo.variant);
  return `
    <a class="back-link" href="/"><span class="link-arrow" aria-hidden="true">←</span><span class="link-label">데모 목록</span></a>
    <div class="detail-header">
      <div>
        <h1>${escape(demo.title)}</h1>
        ${demo.variant ? `<p class="variant-badge">${variantLabels[demo.variant]}</p>` : ''}
        <p class="detail-date"><time datetime="${demo.date}">${formatDate(demo.date)}</time></p>
        ${counterpart ? `<a class="pair-link" href="${detailHref(counterpart)}"><span class="link-label">${variantLabels[counterpart.variant]} 상세 보기</span><span class="link-arrow" aria-hidden="true">→</span></a>` : ''}
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
