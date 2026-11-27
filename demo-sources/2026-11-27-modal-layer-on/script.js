(function () {
  var dialog = document.getElementById('notice');
  var openBtn = document.getElementById('open-notice');
  var closeX = document.getElementById('close-x');
  var skip = document.getElementById('skip-today');
  var title = document.getElementById('page-title');
  var KEY = 'noticeHiddenDate';
  var opener = null;          // 사용자가 버튼으로 연 경우에만 값이 있다
  var downOnBackdrop = false; // 누름이 창 바깥에서 시작했는지

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function hiddenToday() {
    try { return localStorage.getItem(KEY) === today(); } catch (e) { return false; }
  }
  function open(from) {
    if (dialog.open) return;
    opener = from || null;
    skip.checked = false;
    // showModal()은 창 안 첫 조작 요소(닫기)로 초점을 옮기고 뒤 화면을 비활성화한다
    dialog.showModal();
  }
  function close() {
    if (skip.checked) {
      try { localStorage.setItem(KEY, today()); } catch (e) {}
    }
    dialog.close();
    // 버튼으로 열었다면 그 버튼으로 초점을 돌려준다.
    // 자동으로 열렸다면 열기 전 초점이 없었으므로 페이지 제목(h1, tabindex="-1")으로 옮겨
    // body에 초점이 남는 상태를 피한다. 다음 Tab은 제목 뒤의 첫 조작 요소로 이어진다.
    if (opener) { opener.focus(); opener = null; }
    else if (title) { title.focus(); }
  }

  openBtn.addEventListener('click', function () { open(openBtn); });
  closeX.addEventListener('click', close);
  // Esc도 같은 닫기 경로를 쓴다
  dialog.addEventListener('cancel', function (e) { e.preventDefault(); close(); });

  // 창 바깥(backdrop) 누름: 누름과 뗌이 모두 바깥일 때만 닫는다.
  // 창 안에서 누른 채 바깥으로 끌어 떼면 닫지 않고, 바깥에서 누른 채 안으로 끌어도 닫지 않는다(취소 가능).
  dialog.addEventListener('pointerdown', function (e) { downOnBackdrop = (e.target === dialog); });
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog && downOnBackdrop) close();
    downOnBackdrop = false;
  });

  if (!hiddenToday()) open(null);
})();
