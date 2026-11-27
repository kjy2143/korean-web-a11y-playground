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

  cards().forEach(function (c) {
    var g = c.querySelector('.grip');
    g.setAttribute('aria-label', name(c) + ' 순서 바꾸기');

    g.addEventListener('keydown', function (e) {
      var a = cards(), i = a.indexOf(c);
      if (e.key === 'ArrowUp' && i > 0) { e.preventDefault(); move(c, a[i - 1], false); }
      else if (e.key === 'ArrowDown' && i < a.length - 1) { e.preventDefault(); move(c, a[i + 1], true); }
      else return;
      g.focus();
      say(c);
    });

    g.addEventListener('pointerdown', function (e) {
      if (e.button > 0) return;
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
        c.classList.add('moved');
        setTimeout(function () { c.classList.remove('moved'); }, 800);
        say(c);
      }
      if (over) over.classList.remove('over');
      c.classList.remove('dragging');
      g.style.cursor = '';
      drag = over = null;
    }
    g.addEventListener('pointerup', end);
    g.addEventListener('pointercancel', end);
  });
})();
