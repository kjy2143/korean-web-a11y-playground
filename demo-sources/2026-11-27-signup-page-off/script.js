(function () {
  var $ = function (id) { return document.getElementById(id); };
  var form = $('signup-form'), summary = $('error-summary');
  var all = $('agree-all'), news = $('agree-news');
  var boxes = [$('agree-terms'), $('agree-privacy'), news];
  var errId = { 'agree-terms': 'terms-err', 'agree-privacy': 'privacy-err' };

  function setErr(input, msg) {
    var p = $(errId[input.id] || input.id + '-err');
    p.textContent = msg || '';
    if (msg) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  }

  function validate() {
    var errs = [];
    function add(input, msg) { setErr(input, msg); if (msg) errs.push({ input: input, msg: msg }); }
    var id = $('userid').value, pw = $('pw').value, pw2 = $('pw2').value, em = $('email').value.trim();
    add($('userid'), !id ? '아이디를 입력해 주세요.' : !/^[a-z0-9]{4,12}$/.test(id) ? '아이디는 영문 소문자와 숫자 4~12자로 입력해 주세요.' : '');
    add($('pw'), !pw ? '비밀번호를 입력해 주세요.' : pw.length < 8 ? '비밀번호는 8자 이상 입력해 주세요.' : '');
    add($('pw2'), !pw2 ? '비밀번호 확인을 입력해 주세요.' : pw2 !== pw ? '비밀번호가 일치하지 않습니다.' : '');
    add($('email'), !em ? '이메일을 입력해 주세요.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em) ? '이메일 형식이 올바르지 않습니다. 예: name@example.com' : '');
    add($('agree-terms'), $('agree-terms').checked ? '' : '이용약관에 동의해 주세요.');
    add($('agree-privacy'), $('agree-privacy').checked ? '' : '개인정보 수집·이용에 동의해 주세요.');
    return errs;
  }

  function showSummary(errs) {
    summary.textContent = '';
    if (!errs.length) { summary.hidden = true; return; }
    var p = document.createElement('p');
    p.textContent = '입력 내용을 확인해 주세요. (' + errs.length + '건)';
    var ul = document.createElement('ul');
    errs.forEach(function (e) {
      var li = document.createElement('li'), a = document.createElement('a');
      a.href = '#' + e.input.id;
      a.textContent = e.msg;
      a.addEventListener('click', function (ev) { ev.preventDefault(); e.input.focus(); });
      li.appendChild(a);
      ul.appendChild(li);
    });
    summary.appendChild(p);
    summary.appendChild(ul);
    summary.hidden = false;
  }

  all.addEventListener('change', function () {
    boxes.forEach(function (b) { b.checked = all.checked; if (b.checked) setErr(b, ''); });
  });
  boxes.forEach(function (b) {
    b.addEventListener('change', function () {
      all.checked = boxes.every(function (x) { return x.checked; });
      if (b.checked) setErr(b, '');
    });
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    var errs = validate();
    showSummary(errs);
    if (errs.length) { summary.focus(); return; }
    $('done-id').textContent = $('userid').value;
    $('done-news').textContent = news.checked ? '소식 메일을 받도록 설정되었습니다.' : '';
    $('signup-view').hidden = true;
    $('done-view').hidden = false;
    document.title = '가입 완료 - 한국 웹 접근성 플레이그라운드';
    $('done-title').focus();
  });
})();
