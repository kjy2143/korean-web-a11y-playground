/* 로그인 완료 화면
   - 화면을 열 때 초점을 옮기지 않는다. 초점은 문서 처음부터 시작한다(KRDS 로그인 완료 접근성 가이드).
   - 화면을 열 때 다른 페이지로 이동하지 않는다. 로그인 기록이 없으면 안내와 링크를 보인다(KWCAG 7.2.1). */
(function () {
  'use strict';

  var STORAGE_KEY = 'kwcagLoginDemo';
  var SITE_NAME = '한국 웹 접근성 플레이그라운드';

  var signedOut = document.getElementById('signed-out');
  var signedIn = document.getElementById('signed-in');
  var signedInEmail = document.getElementById('signed-in-email');
  var keepMessage = document.getElementById('keep-message');
  var logoutButton = document.getElementById('logout-button');

  function readSignIn() {
    try {
      var raw = window.sessionStorage.getItem(STORAGE_KEY) || window.localStorage.getItem(STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : null;
      return data && typeof data.email === 'string' && data.email !== '' ? data : null;
    } catch (error) {
      return null;
    }
  }

  function clearSignIn() {
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      // 저장소를 쓸 수 없으면 지울 것도 없다.
    }
  }

  var data = readSignIn();
  if (data) {
    signedInEmail.textContent = data.email;
    keepMessage.textContent = data.keep
      ? '로그인 상태 유지를 선택해, 브라우저를 닫았다가 다시 열어도 로그인된 상태로 남습니다.'
      : '로그인 상태 유지를 선택하지 않아, 이 브라우저 탭을 닫으면 로그아웃됩니다.';
    signedOut.hidden = true;
    signedIn.hidden = false;
    document.title = '로그인 완료 - ' + SITE_NAME;
  }

  logoutButton.addEventListener('click', function () {
    clearSignIn();
    window.location.assign('index.html');
  });
})();
