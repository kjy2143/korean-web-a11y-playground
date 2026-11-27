(function () {
  var list = document.getElementById('list'), live = document.getElementById('live');
  var drag = null, over = null;
  function cards() { return Array.prototype.slice.call(list.children); }
  function name(c) { return c.querySelector('h2').textContent; }
  function say(c) {
    var a = cards();
    live.textContent = '';
    setTimeout(function () {
      live.textContent = name(c) + ', ' + a.length + '개 중 ' + (a.indexOf(c) + 1) + '번째로 이동했습니다.';
    }, 30);
  }
  function move(c, t, after) { list.insertBefore(c, after ? t.nextSibling : t); }
  // 맨 위 카드의 위 버튼, 맨 아래 카드의 아래 버튼은 aria-disabled로 표시한다.
  // disabled 속성은 초점을 잃게 하므로 쓰지 않는다.
  function refresh() {
    var a = cards();
    a.forEach(function (c, i) {
      c.querySelector('[data-dir="up"]').setAttribute('aria-disabled', i === 0 ? 'true' : 'false');
      c.querySelector('[data-dir="down"]').setAttribute('aria-disabled', i === a.length - 1 ? 'true' : 'false');
    });
  }
  function clearDrag() {
    if (over) over.classList.remove('over');
    if (drag) { drag.classList.remove('dragging'); drag.querySelector('.grip').style.cursor = ''; }
    drag = over = null;
  }

  cards().forEach(function (c) {
    var g = c.querySelector('.grip');

    // 단일 포인터·키보드 대체 수단: 위·아래 버튼
    c.querySelectorAll('.mv').forEach(function (b) {
      b.addEventListener('click', function () {
        if (b.getAttribute('aria-disabled') === 'true') return;
        var a = cards(), i = a.indexOf(c);
        if (b.getAttribute('data-dir') === 'up') move(c, a[i - 1], false);
        else move(c, a[i + 1], true);
        refresh();
        b.focus(); // DOM 이동으로 잃은 초점을 되돌린다.
        say(c);
      });
    });

    // 끌어서 놓기
    g.addEventListener('pointerdown', function (e) {
      if (e.button > 0 || drag) return;
      drag = c;
      c.classList.add('dragging');
      g.setPointerCapture(e.pointerId);
      g.style.cursor = 'grabbing';
    });

    g.addEventListener('pointermove', function (e) {
      if (drag !== c) return;
      var el = document.elementFromPoint(e.clientX, e.clientY);
      var t = el && el.closest ? el.closest('.card') : null;
      if (over && over !== t) over.classList.remove('over');
      over = (t && t !== c && t.parentNode === list) ? t : null;
      if (over) over.classList.add('over');
    });

    function end(e) {
      if (drag !== c) return;
      if (over && e.type === 'pointerup') {
        var a = cards();
        move(c, over, a.indexOf(over) > a.indexOf(c));
        refresh();
        c.classList.add('moved');
        setTimeout(function () { c.classList.remove('moved'); }, 800);
        say(c);
      }
      clearDrag();
    }
    g.addEventListener('pointerup', end);
    g.addEventListener('pointercancel', end);
  });

  // 끌기 취소(6.5.2): Esc 또는 카드 밖에서 놓기
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drag) clearDrag();
  });

  refresh();
})();
