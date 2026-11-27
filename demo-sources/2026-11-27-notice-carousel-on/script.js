(function () {
  'use strict';

  var INTERVAL = 6000;
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.dot'));
  var live = document.getElementById('slides');
  var pauseBtn = document.getElementById('pause');
  var pauseLabel = document.getElementById('pause-label');
  var current = 0;
  var timer = null;
  var userPaused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 마우스를 올렸거나 초점이 들어 있는 영역. 정지 버튼은 포함하지 않아, 정지를 해제하면 바로 다시 전환된다.
  var hoverZones = [];
  var focusZones = [];

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.hidden = i !== current; s.classList.toggle('is-active', i === current); });
    dots.forEach(function (d, i) {
      if (i === current) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
  }

  function running() { return !userPaused && !hoverZones.length && !focusZones.length; }

  function schedule() {
    clearInterval(timer);
    timer = null;
    if (running()) {
      timer = setInterval(function () {
        live.setAttribute('aria-live', 'off'); // 자동 전환은 화면낭독프로그램이 읽지 않게 한다
        show(current + 1);
      }, INTERVAL);
    }
  }

  // 사용자가 직접 바꾼 공지는 화면낭독프로그램이 알려 주도록 polite로 둔다
  function go(index) {
    live.setAttribute('aria-live', 'polite');
    show(index);
    schedule();
  }

  document.getElementById('prev').addEventListener('click', function () { go(current - 1); });
  document.getElementById('next').addEventListener('click', function () { go(current + 1); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });

  // 상태는 버튼 이름(글자)으로만 알린다. aria-pressed를 함께 쓰면 "시작, 눌림"처럼 상태가 겹쳐 읽힌다.
  function syncPauseButton() {
    pauseLabel.textContent = userPaused ? '자동 전환 시작' : '자동 전환 정지';
    pauseBtn.classList.toggle('is-paused', userPaused);
  }
  pauseBtn.addEventListener('click', function () { userPaused = !userPaused; syncPauseButton(); schedule(); });

  function toggle(list, el, on) {
    var i = list.indexOf(el);
    if (on && i < 0) list.push(el);
    if (!on && i >= 0) list.splice(i, 1);
    schedule();
  }

  // 마우스 올림과 키보드 초점 모두 자동 전환을 멈춘다. 터치 입력은 올림 상태로 보지 않는다.
  [document.getElementById('stage'), document.getElementById('dots')].forEach(function (zone) {
    zone.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') toggle(hoverZones, zone, true); });
    zone.addEventListener('pointerleave', function () { toggle(hoverZones, zone, false); });
    zone.addEventListener('focusin', function () { toggle(focusZones, zone, true); });
    zone.addEventListener('focusout', function (e) {
      if (!zone.contains(e.relatedTarget)) toggle(focusZones, zone, false);
    });
  });

  syncPauseButton();
  show(0);
  schedule();
})();
