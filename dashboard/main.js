import * as initialViews from './views.js';
import './styles.css';

const content = document.querySelector('#content');
const siteTitle = document.title;
const demoId = new URLSearchParams(location.search).get('demo');

let views = initialViews;
let catalog;
let loadError = false;
let currentMarkup;
let request;

function updateContent(markup) {
  if (currentMarkup === markup) return;
  currentMarkup = markup;

  const focused = document.activeElement;
  const focusedLink = content.contains(focused) && focused.closest('a[href]');
  content.innerHTML = markup;
  if (focusedLink) {
    const sameLink = [...content.querySelectorAll('a[href]')]
      .find((link) => link.href === focusedLink.href && link.textContent === focusedLink.textContent);
    (sameLink ?? content).focus({ preventScroll: true });
  }
}

function render() {
  if (loadError) {
    document.title = `데모 목록을 불러오지 못했습니다 — ${siteTitle}`;
    updateContent(views.renderCatalogError());
  } else if (catalog && demoId !== null) {
    const demo = catalog.find((entry) => entry.id === demoId);
    document.title = `${demo?.title ?? '데모를 찾을 수 없습니다'} — ${siteTitle}`;
    updateContent(demo ? views.renderDetail(demo) : views.renderMissingDemo());
  } else if (catalog) {
    document.title = siteTitle;
    updateContent(views.renderList(catalog));
  }
}

async function refreshCatalog() {
  request?.abort();
  const controller = new AbortController();
  request = controller;
  try {
    const response = await fetch('/demo-catalog.json', { cache: 'no-cache', signal: controller.signal });
    if (!response.ok) throw new Error('Catalog request failed');
    const data = await response.json();
    if (controller.signal.aborted) return;
    catalog = data;
    loadError = false;
    render();
  } catch (error) {
    if (controller.signal.aborted) return;
    loadError = true;
    render();
    console.error(error);
  }
}

void refreshCatalog();

if (import.meta.hot) {
  import.meta.hot.accept('./views.js', (updatedViews) => {
    if (!updatedViews) return;
    views = updatedViews;
    render();
  });
  import.meta.hot.on('playground:demos-changed', refreshCatalog);
}
