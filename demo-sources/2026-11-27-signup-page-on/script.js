(function () {
  'use strict';

  var form = document.getElementById('signup-form');
  var summary = document.getElementById('error-summary');
  var summaryTitle = document.getElementById('summary-title');
  var summaryList = document.getElementById('summary-list');
  var agreeAll = document.getElementById('agree-all');
  var terms = document.getElementById('agree-terms');
  var privacy = document.getElementById('agree-privacy');
  var news = document.getElementById('agree-news');
  var termsError = document.getElementById('terms-error');
  var submitted = false;

  var fields = {
    userid: { el: document.getElementById('userid') },
    password: { el: document.getElementById('password') },
    password2: { el: document.getElementById('password2') },
    email: { el: document.getElementById('email') }
  };

  function check(name) {
    var v = fields[name].el.value;
    if (name === 'userid') {
      if (!v) return '아이디를 입력해 주세요.';
      if (!/^[a-z0-9]{4,12}$/.test(v)) return '아이디는 영문 소문자와 숫자만 써서 4~12자로 입력해 주세요.';
    } else if (name === 'password') {
      if (!v) return '비밀번호를 입력해 주세요.';
      if (v.length < 8) return '비밀번호는 8자 이상 입력해 주세요.';
    } else if (name === 'password2') {
      if (!v) return '비밀번호 확인을 입력해 주세요.';
      if (v !== fields.password.el.value) return '비밀번호가 서로 다릅니다. 같은 비밀번호를 입력해 주세요.';
    } else if (name === 'email') {
      if (!v) return '이메일을 입력해 주세요.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return '이메일 형식이 올바르지 않습니다. 예: name@example.com';
    }
    return '';
  }

  function show(name) {
    var msg = check(name);
    var el = fields[name].el;
    document.getElementById(name + '-error').textContent = msg;
    if (msg) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
    return msg;
  }

  function checkTerms() {
    var missing = [];
    if (!terms.checked) missing.push('이용약관');
    if (!privacy.checked) missing.push('개인정보 수집·이용');
    var msg = missing.length ? '필수 약관에 동의해 주세요: ' + missing.join(', ') : '';
    termsError.textContent = msg;
    [terms, privacy].forEach(function (c) {
      if (!c.checked) { c.setAttribute('aria-invalid', 'true'); c.parentNode.classList.add('invalid'); }
      else { c.removeAttribute('aria-invalid'); c.parentNode.classList.remove('invalid'); }
    });
    return msg;
  }

  agreeAll.addEventListener('change', function () {
    [terms, privacy, news].forEach(function (c) { c.checked = agreeAll.checked; });
    if (submitted) checkTerms();
  });
  [terms, privacy, news].forEach(function (c) {
    c.addEventListener('change', function () {
      agreeAll.checked = terms.checked && privacy.checked && news.checked;
      if (submitted) checkTerms();
    });
  });

  Object.keys(fields).forEach(function (name) {
    fields[name].el.addEventListener('input', function () {
      if (!submitted) return;
      show(name);
      if (name === 'password' && fields.password2.el.value) show('password2');
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    submitted = true;
    var errors = [];
    Object.keys(fields).forEach(function (name) {
      var msg = show(name);
      if (msg) errors.push({ id: fields[name].el.id, text: msg });
    });
    var tmsg = checkTerms();
    if (tmsg) errors.push({ id: 'agree-terms', text: tmsg });

    if (errors.length) {
      summaryTitle.textContent = '입력 내용을 확인해 주세요. 고칠 항목이 ' + errors.length + '개 있습니다.';
      summaryList.textContent = '';
      errors.forEach(function (er) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#' + er.id;
        a.textContent = er.text;
        a.addEventListener('click', function (ev) {
          ev.preventDefault();
          document.getElementById(er.id).focus();
        });
        li.appendChild(a);
        summaryList.appendChild(li);
      });
      summary.hidden = false;
      summary.focus();
      return;
    }

    summary.hidden = true;
    document.getElementById('done-message').textContent =
      fields.userid.el.value + ' 님, 회원가입을 환영합니다. 안내 메일은 ' + fields.email.el.value + ' 로 보냅니다.';
    document.getElementById('signup-view').hidden = true;
    document.getElementById('done-view').hidden = false;
    document.getElementById('done-title').focus();
    window.scrollTo(0, 0);
  });
})();
