(function () {
  var user = null;
  try { user = sessionStorage.getItem('loginUser'); } catch (e) {}
  if (!user) { location.replace('index.html'); return; }
  // 로그아웃 후 뒤로 가기로 캐시된 환영 화면이 다시 보이는 문제 방지
  window.addEventListener('pageshow', function (ev) {
    var u = null;
    try { u = sessionStorage.getItem('loginUser'); } catch (e) {}
    if (ev.persisted && !u) location.replace('index.html');
  });
  document.getElementById('who').textContent = user;
  document.getElementById('logout').addEventListener('click', function () {
    try { sessionStorage.removeItem('loginUser'); } catch (e) {}
    location.href = 'index.html';
  });
})();
