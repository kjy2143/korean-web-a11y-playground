(function () {
  'use strict';

  var INTERVAL = 6000;
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.dot'));
  var live = document.getElementById('slides');
  var banner = document.getElementById('banner');
  var pauseBtn = document.getElementById('pause');
  var pauseLabel = document.getElementById('pause-label');
  var current = 0;
  var timer = null;
  var userPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hovering = false;
  var focusing = false;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.hidden = i !== current; s.classList.toggle('is-active', i === current); });
    dots.forEach(function (d, i) {
      if (i === current) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
  }

  function running() { return !userPaused && !hovering && !focusing; }

  function schedule() {
    clearInterval(timer);
    timer = null;
    live.setAttribute('aria-live', running() ? 'off' : 'polite');
    if (running()) timer = setInterval(function () { show(current + 1); }, INTERVAL);
  }

  function go(index) { show(index); schedule(); }

  document.getElementById('prev').addEventListener('click', function () { go(current - 1); });
  document.getElementById('next').addEventListener('click', function () { go(current + 1); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });

  function syncPauseButton() {
    pauseBtn.setAttribute('aria-pressed', userPaused ? 'true' : 'false');
    pauseLabel.textContent = userPaused ? '자동 전환 시작' : '자동 전환 정지';
  }
  pauseBtn.addEventListener('click', function () { userPaused = !userPaused; syncPauseButton(); schedule(); });

  banner.addEventListener('mouseenter', function () { hovering = true; schedule(); });
  banner.addEventListener('mouseleave', function () { hovering = false; schedule(); });
  banner.addEventListener('focusin', function () { focusing = true; schedule(); });
  banner.addEventListener('focusout', function (e) {
    if (!banner.contains(e.relatedTarget)) { focusing = false; schedule(); }
  });

  syncPauseButton();
  show(0);
  schedule();
})();
