(function () {
  var KEY = 'notice-hidden-date';
  var dlg = document.getElementById('notice');
  var openBtn = document.getElementById('open-notice');
  var closeBtn = document.getElementById('notice-x');
  var skip = document.getElementById('skip-today');
  var pressedOutside = false;

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function clear() { try { localStorage.removeItem(KEY); } catch (e) {} }

  function isOutside(e) {
    var r = dlg.getBoundingClientRect();
    return e.clientX < r.left || e.clientX > r.right ||
           e.clientY < r.top || e.clientY > r.bottom;
  }

  function open() {
    if (dlg.open) return;
    skip.checked = false;
    dlg.showModal();
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', function () { dlg.close(); });

  // 창 바깥(백드롭) 누름: 누른 곳과 뗀 곳이 모두 바깥일 때만 닫는다.
  // (창 안에서 글자를 드래그하다 바깥에서 놓을 때 닫히지 않게 한다.)
  dlg.addEventListener('pointerdown', function (e) {
    pressedOutside = e.target === dlg && isOutside(e);
  });
  dlg.addEventListener('click', function (e) {
    if (e.target === dlg && pressedOutside && isOutside(e)) dlg.close();
    pressedOutside = false;
  });

  // 닫는 모든 경로(X 버튼, Esc, 바깥 클릭)를 close 이벤트 한 곳에서 처리한다.
  dlg.addEventListener('close', function () {
    if (skip.checked) write(today());
    openBtn.focus();
  });

  if (read() !== today()) {
    if (read()) clear();
    open();
  }
})();
