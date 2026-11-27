(function () {
  var list = document.getElementById('cards');
  var status = document.getElementById('status');
  var drag = null;

  function cards() { return Array.prototype.slice.call(list.children); }
  function title(card) { return card.querySelector('h2').textContent; }

  function announce(card) {
    var all = cards();
    status.textContent = '';
    setTimeout(function () {
      status.textContent = title(card) + ', ' + all.length + '개 중 ' + (all.indexOf(card) + 1) + '번째로 이동했습니다.';
    }, 50);
  }

  function moveOnto(card, target) {
    if (card === target) return;
    var all = cards();
    if (all.indexOf(card) < all.indexOf(target)) list.insertBefore(card, target.nextSibling);
    else list.insertBefore(card, target);
    announce(card);
  }

  function clearOver() {
    cards().forEach(function (c) { c.classList.remove('over'); });
  }

  function cardAt(x, y) {
    var el = document.elementFromPoint(x, y);
    var c = el && el.closest ? el.closest('.card') : null;
    return c && c.parentNode === list ? c : null;
  }

  list.addEventListener('pointerdown', function (e) {
    var handle = e.target.closest('.handle');
    if (!handle || (e.pointerType === 'mouse' && e.button !== 0)) return;
    var card = handle.closest('.card');
    drag = { card: card, id: e.pointerId };
    handle.setPointerCapture(e.pointerId);
    card.classList.add('dragging');
    document.body.classList.add('is-dragging');
  });

  list.addEventListener('pointermove', function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    var t = cardAt(e.clientX, e.clientY);
    clearOver();
    if (t && t !== drag.card) t.classList.add('over');
  });

  function end(e, cancel) {
    if (!drag || e.pointerId !== drag.id) return;
    var d = drag;
    drag = null;
    var t = cancel ? null : cardAt(e.clientX, e.clientY);
    clearOver();
    d.card.classList.remove('dragging');
    document.body.classList.remove('is-dragging');
    if (t) moveOnto(d.card, t);
  }
  list.addEventListener('pointerup', function (e) { end(e, false); });
  list.addEventListener('pointercancel', function (e) { end(e, true); });

  list.addEventListener('keydown', function (e) {
    var handle = e.target.closest('.handle');
    if (!handle || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
    e.preventDefault();
    var card = handle.closest('.card');
    var all = cards();
    var i = all.indexOf(card) + (e.key === 'ArrowUp' ? -1 : 1);
    if (i < 0 || i >= all.length) return;
    moveOnto(card, all[i]);
    handle.focus();
  });
})();
