(function () {
  var $ = function (id) { return document.getElementById(id); };
  var form = $('signup-form'), summary = $('error-summary'), status = $('status');
  var all = $('agree-all'), news = $('agree-news');
  var boxes = [$('agree-terms'), $('agree-privacy'), news];
  var errId = { 'agree-terms': 'terms-err', 'agree-privacy': 'privacy-err' };

  // 항목별 검사 규칙. 오류 문구를 돌려주고, 올바르면 빈 문자열을 돌려준다.
  var rules = {
    'userid': function () {
      var v = $('userid').value;
      return !v ? '아이디를 입력해 주세요.' : !/^[a-z0-9]{4,12}$/.test(v) ? '아이디는 영문 소문자와 숫자 4~12자로 입력해 주세요.' : '';
    },
    'pw': function () {
      var v = $('pw').value;
      return !v ? '비밀번호를 입력해 주세요.' : v.length < 8 ? '비밀번호는 8자 이상 입력해 주세요.' : '';
    },
    'pw2': function () {
      var v = $('pw2').value;
      return !v ? '비밀번호 확인을 입력해 주세요.' : v !== $('pw').value ? '비밀번호가 일치하지 않습니다.' : '';
    },
    'email': function () {
      var v = $('email').value.trim();
      return !v ? '이메일을 입력해 주세요.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '이메일 형식이 올바르지 않습니다. 예: name@example.com' : '';
    },
    'agree-terms': function () { return $('agree-terms').checked ? '' : '이용약관에 동의해 주세요.'; },
    'agree-privacy': function () { return $('agree-privacy').checked ? '' : '개인정보 수집·이용에 동의해 주세요.'; }
  };
  var order = ['userid', 'pw', 'pw2', 'email', 'agree-terms', 'agree-privacy'];

  function errEl(input) { return $(errId[input.id] || input.id + '-err'); }

  function setErr(input, msg) {
    errEl(input).textContent = msg || '';
    if (msg) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }

  function check(id) { var input = $(id); setErr(input, rules[id]()); }

  // 현재 오류가 표시된 항목으로 요약 목록을 다시 만든다. 초점은 옮기지 않는다.
  function refreshSummary() {
    var errs = order.map($).filter(function (i) { return i.getAttribute('aria-invalid') === 'true'; });
    summary.textContent = '';
    if (!errs.length) { summary.hidden = true; return errs; }
    var p = document.createElement('p');
    p.textContent = '입력 내용을 확인해 주세요. (' + errs.length + '건)';
    var ul = document.createElement('ul');
    errs.forEach(function (input) {
      var li = document.createElement('li'), a = document.createElement('a');
      a.href = '#' + input.id;
      a.textContent = errEl(input).textContent;
      a.addEventListener('click', function (ev) { ev.preventDefault(); input.focus(); });
      li.appendChild(a);
      ul.appendChild(li);
    });
    summary.appendChild(p);
    summary.appendChild(ul);
    summary.hidden = false;
    return errs;
  }

  // 이미 오류가 표시된 항목은 고치는 즉시 다시 검사해 오래된 오류 문구를 없앤다.
  function recheckIfInvalid(id) {
    if ($(id).getAttribute('aria-invalid') === 'true') { check(id); refreshSummary(); }
  }
  ['userid', 'pw', 'pw2', 'email'].forEach(function (id) {
    $(id).addEventListener('input', function () {
      recheckIfInvalid(id);
      if (id === 'pw') recheckIfInvalid('pw2');
    });
  });

  all.addEventListener('change', function () {
    boxes.forEach(function (b) { b.checked = all.checked; });
    ['agree-terms', 'agree-privacy'].forEach(recheckIfInvalid);
  });
  boxes.forEach(function (b) {
    b.addEventListener('change', function () {
      all.checked = boxes.every(function (x) { return x.checked; });
      if (rules[b.id]) recheckIfInvalid(b.id);
    });
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    order.forEach(check);
    var errs = refreshSummary();
    if (errs.length) {
      status.textContent = '';
      status.textContent = '입력 내용을 확인해 주세요. ' + errs.length + '건의 오류가 있습니다.';
      errs[0].focus();
      return;
    }
    status.textContent = '';
    $('done-id').textContent = $('userid').value;
    $('done-news').textContent = news.checked ? '소식 메일을 받도록 설정되었습니다.' : '';
    $('signup-view').hidden = true;
    $('done-view').hidden = false;
    document.title = '가입 완료 - 한국 웹 접근성 플레이그라운드';
    $('done-title').focus();
  });
})();
