(function () {
  var form = document.getElementById('form');
  var uid = document.getElementById('uid');
  var pw = document.getElementById('pw');
  var eye = document.getElementById('eye');
  var uidErr = document.getElementById('uid-err');
  var pwErr = document.getElementById('pw-err');

  function setErr(input, msg) {
    var p = document.getElementById(input.id + '-err');
    if (msg) {
      input.classList.add('invalid');
      input.setAttribute('aria-invalid', 'true');
      p.textContent = msg;
      p.hidden = false;
    } else {
      input.classList.remove('invalid');
      input.removeAttribute('aria-invalid');
      p.textContent = '';
      p.hidden = true;
    }
  }

  function clearAll() {
    setErr(uid, '');
    setErr(pw, '');
    uid.setAttribute('aria-describedby', 'uid-err');
  }

  eye.addEventListener('click', function () {
    var show = pw.type === 'password';
    pw.type = show ? 'text' : 'password';
    // 이름은 고정하고 상태는 aria-pressed로만 알린다.
    eye.setAttribute('aria-pressed', String(show));
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var u = uid.value.trim();
    var p = pw.value;
    clearAll();

    if (!u || !p) {
      if (!u) setErr(uid, '아이디를 입력해 주세요.');
      if (!p) setErr(pw, '비밀번호를 입력해 주세요.');
      (u ? pw : uid).focus();
      return;
    }

    if (u !== 'reader01' || p !== 'green1234') {
      // 어느 쪽이 틀렸는지 알려 주지 않으므로 두 칸을 모두 표시하고 문구는 비밀번호 아래에 둔다.
      uid.classList.add('invalid');
      uid.setAttribute('aria-invalid', 'true');
      uid.setAttribute('aria-describedby', 'pw-err');
      setErr(pw, '아이디 또는 비밀번호가 올바르지 않습니다. 예시 계정을 확인해 다시 입력해 주세요.');
      uid.focus();
      return;
    }

    try { sessionStorage.setItem('loggedIn', '1'); } catch (x) { /* 무시 */ }
    location.href = 'welcome.html';
  });

  // 입력을 고치기 시작하면 해당 입력란의 오류를 지운다.
  // 아이디·비밀번호 불일치 오류는 두 칸이 한 쌍이므로 함께 지운다.
  [uid, pw].forEach(function (el) {
    el.addEventListener('input', function () {
      var pair = uid.classList.contains('invalid') && pw.classList.contains('invalid') &&
        uidErr.hidden && !pwErr.hidden && pwErr.textContent.indexOf('올바르지') !== -1;
      if (pair) { clearAll(); } else { setErr(el, ''); }
    });
  });
})();
