(function () {
  var USER = 'reader01', PASS = 'green1234';
  var form = document.getElementById('login-form');
  var idEl = document.getElementById('user-id');
  var pwEl = document.getElementById('password');
  var idErr = document.getElementById('user-id-error');
  var pwErr = document.getElementById('password-error');
  var toggle = document.getElementById('toggle-pw');

  function setError(input, box, invalid, msg) {
    box.textContent = msg || '';
    if (invalid) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }

  toggle.addEventListener('click', function () {
    var show = pwEl.type === 'password';
    pwEl.type = show ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', show ? 'true' : 'false');
    toggle.querySelector('.icon-show').hidden = show;
    toggle.querySelector('.icon-hide').hidden = !show;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var id = idEl.value.trim(), pw = pwEl.value;
    var idMsg = '', pwMsg = '';
    if (!id) idMsg = '아이디를 입력해 주세요.';
    if (!pw) pwMsg = '비밀번호를 입력해 주세요.';
    if (!idMsg && !pwMsg && (id !== USER || pw !== PASS)) {
      pwMsg = '아이디 또는 비밀번호가 올바르지 않습니다. 다시 입력해 주세요.';
    }
    setError(idEl, idErr, !!idMsg, idMsg);
    setError(pwEl, pwErr, !!pwMsg, pwMsg);
    if (idMsg || pwMsg) { (idMsg ? idEl : pwEl).focus(); return; }
    try { sessionStorage.setItem('loginUser', id); } catch (err) {}
    location.href = 'welcome.html';
  });
})();
