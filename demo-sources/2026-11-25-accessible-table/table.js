const scrollRegion = document.getElementById('table-scroll');
const scrollHint = document.getElementById('scroll-hint');
const table = scrollRegion.querySelector('table');

function updateScrollAccess() {
  const hasOverflow = scrollRegion.scrollWidth > scrollRegion.clientWidth;
  scrollRegion.tabIndex = hasOverflow ? 0 : -1;
  scrollHint.hidden = !hasOverflow;

  if (hasOverflow) {
    scrollRegion.setAttribute('aria-describedby', scrollHint.id);
  } else {
    scrollRegion.removeAttribute('aria-describedby');
  }
}

updateScrollAccess();

const resizeObserver = new ResizeObserver(updateScrollAccess);
resizeObserver.observe(scrollRegion);
resizeObserver.observe(table);
