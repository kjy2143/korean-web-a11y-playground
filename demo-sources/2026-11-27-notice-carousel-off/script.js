(function () {
  var INTERVAL = 6000;
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.dot'));
  var live = document.getElementById('slides');
  var toggle = document.getElementById('toggle');
  var banner = document.querySelector('.banner');
  var controls = document.querySelector('.controls');
  var current = 0, timer = null;
  var userPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hovering = false, focusing = false;

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.hidden = n !== current; });
    dots.forEach(function (d, n) {
      if (n === current) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
  }
  function running() { return !userPaused && !hovering && !focusing; }
  function sync() {
    clearInterval(timer);
    timer = null;
    if (running()) timer = setInterval(function () { show(current + 1); }, INTERVAL);
    live.setAttribute('aria-live', running() ? 'off' : 'polite');
    toggle.dataset.paused = userPaused ? 'true' : 'false';
    toggle.setAttribute('aria-label', userPaused ? '자동 전환 시작' : '자동 전환 정지');
  }
  function go(i) { show(i); sync(); }

  banner.querySelector('.prev').addEventListener('click', function () { go(current - 1); });
  banner.querySelector('.next').addEventListener('click', function () { go(current + 1); });
  dots.forEach(function (d, n) { d.addEventListener('click', function () { go(n); }); });
  toggle.addEventListener('click', function () { userPaused = !userPaused; sync(); });

  [banner, controls].forEach(function (el) {
    el.addEventListener('mouseenter', function () { hovering = true; sync(); });
    el.addEventListener('mouseleave', function () { hovering = false; sync(); });
    el.addEventListener('focusin', function () { focusing = true; sync(); });
    el.addEventListener('focusout', function () { focusing = false; sync(); });
  });

  show(0);
  sync();
})();
