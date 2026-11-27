(function () {
  var KEY = 'notice-hidden-date';
  var dlg = document.getElementById('notice');
  var openBtn = document.getElementById('open-notice');
  var closeBtn = document.getElementById('notice-x');
  var skip = document.getElementById('skip-today');

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function write(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function clear() { try { localStorage.removeItem(KEY); } catch (e) {} }

  function open() {
    skip.checked = false;
    dlg.showModal();
  }
  function close() {
    if (skip.checked) write(today());
    dlg.close();
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  // Esc 키: 체크 상태를 그대로 반영해 닫는다.
  dlg.addEventListener('cancel', function (e) {
    e.preventDefault();
    close();
  });
  // 창 바깥(백드롭) 클릭
  dlg.addEventListener('click', function (e) {
    if (e.target !== dlg) return;
    var r = dlg.getBoundingClientRect();
    var inside = e.clientX >= r.left && e.clientX <= r.right &&
                 e.clientY >= r.top && e.clientY <= r.bottom;
    if (!inside) close();
  });
  // 닫힌 뒤 초점은 항상 열기 버튼으로 돌린다.
  dlg.addEventListener('close', function () { openBtn.focus(); });

  if (read() !== today()) {
    if (read()) clear();
    open();
  }
})();
