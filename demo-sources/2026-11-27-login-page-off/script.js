(function () {
  var form = document.getElementById('form');
  var uid = document.getElementById('uid');
  var pw = document.getElementById('pw');
  var eye = document.getElementById('eye');

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

  eye.addEventListener('click', function () {
    var show = pw.type === 'password';
    pw.type = show ? 'text' : 'password';
    eye.setAttribute('aria-pressed', String(show));
    eye.setAttribute('aria-label', show ? '비밀번호 숨기기' : '비밀번호 표시');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var u = uid.value.trim();
    var p = pw.value;
    setErr(uid, '');
    setErr(pw, '');

    if (!u || !p) {
      if (!u) setErr(uid, '아이디를 입력해 주세요.');
      if (!p) setErr(pw, '비밀번호를 입력해 주세요.');
      (u ? pw : uid).focus();
      return;
    }

    if (u !== 'reader01' || p !== 'green1234') {
      // 어느 쪽이 틀렸는지 알려 주지 않고 두 칸을 모두 표시한다.
      uid.classList.add('invalid');
      uid.setAttribute('aria-invalid', 'true');
      setErr(pw, '아이디 또는 비밀번호가 올바르지 않습니다.');
      uid.focus();
      return;
    }

    try { sessionStorage.setItem('loggedIn', '1'); } catch (x) { /* 무시 */ }
    location.href = 'welcome.html';
  });

  [uid, pw].forEach(function (el) {
    el.addEventListener('input', function () {
      setErr(el, '');
      if (el === pw) return;
      if (!pw.value || document.getElementById('pw-err').textContent.indexOf('올바르지') === -1) return;
      setErr(pw, '');
    });
  });
})();
