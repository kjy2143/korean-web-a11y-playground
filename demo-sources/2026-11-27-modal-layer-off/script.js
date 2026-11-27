(function () {
  var dialog = document.getElementById('notice');
  var openBtn = document.getElementById('open-notice');
  var closeX = document.getElementById('close-x');
  var skip = document.getElementById('skip-today');
  var KEY = 'noticeHiddenDate';

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function hiddenToday() {
    try { return localStorage.getItem(KEY) === today(); } catch (e) { return false; }
  }
  function open() {
    skip.checked = false;
    if (!dialog.open) dialog.showModal();
  }
  function close() {
    if (skip.checked) {
      try { localStorage.setItem(KEY, today()); } catch (e) {}
    }
    dialog.close();
  }

  openBtn.addEventListener('click', open);
  closeX.addEventListener('click', close);
  // Esc도 같은 닫기 경로를 쓴다
  dialog.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
  // 창 바깥(backdrop) 클릭: 클릭 대상이 dialog 자체일 때만 닫는다
  dialog.addEventListener('click', function (e) { if (e.target === dialog) close(); });

  if (!hiddenToday()) open();
})();
