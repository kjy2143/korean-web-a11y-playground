// Detail addresses that were shared before the demos were rebuilt as off/on pairs.
export const legacyDemoTargets = {
  '2026-11-24-login-page': '2026-11-27-login-page-on',
  '2026-11-24-signup-page': '2026-11-27-signup-page-on',
  '2026-11-25-accessible-table': '2026-11-27-library-hours-table-on',
  '2026-11-25-faq-accordion': '2026-11-27-faq-accordion-on',
  '2026-11-25-modal-layer': '2026-11-27-modal-layer-on',
  '2026-11-26-image-alternatives': '2026-11-27-closure-notice-on',
  '2026-11-26-new-tab-notice': '2026-11-27-resource-links-on',
  '2026-11-26-pausable-carousel': '2026-11-27-notice-carousel-on',
  '2026-11-26-skip-navigation': '2026-11-27-library-guide-on',
  '2026-11-26-text-contrast': '2026-11-27-notice-board-on',
  '2026-11-26-video-captions': '2026-11-27-facility-video-on',
};

export function resolveDemoId(id) {
  return Object.hasOwn(legacyDemoTargets, id ?? '') ? legacyDemoTargets[id] : id;
}
