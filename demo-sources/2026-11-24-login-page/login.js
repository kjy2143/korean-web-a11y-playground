/* 로그인 양식
   - 검사는 submit 처리기에서 하고, 오류가 있으면 전송을 막고 오류 입력으로 초점을 옮긴다(KWCAG 7.3.1).
   - input·change 처리기는 오류 문구와 비밀번호 표시만 바꾸고 초점 이동·제출·페이지 이동을 하지 않는다(KWCAG 7.2.1).
   - 붙여넣기와 자동 입력을 막지 않는다(KWCAG 7.3.3). */
(function () {
  'use strict';

  // 예시 화면이라 서버 대신 이 계정과 비교한다.
  var DEMO_ACCOUNT = { email: 'demo@example.com', password: 'a11y-demo-2026' };
  var STORAGE_KEY = 'kwcagLoginDemo';
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var form = document.getElementById('login-form');
  var loginError = document.getElementById('login-error');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var showPassword = document.getElementById('show-password');
  var keepSignedIn = document.getElementById('keep-signed-in');

  // 화면 순서와 같은 순서로 둔다. 첫 오류 입력을 이 순서로 찾는다.
  var rules = [
    {
      input: emailInput,
      check: function (input) {
        var value = input.value.trim();
        if (value === '') {
          return '이메일을 입력해 주세요.';
        }
        if (!EMAIL_PATTERN.test(value)) {
          return '이메일 형식이 올바르지 않습니다. name@example.com처럼 @와 도메인을 넣어 입력해 주세요.';
        }
        return '';
      }
    },
    {
      input: passwordInput,
      check: function (input) {
        return input.value === '' ? '비밀번호를 입력해 주세요.' : '';
      }
    }
  ];

  function findRule(input) {
    for (var i = 0; i < rules.length; i += 1) {
      if (rules[i].input === input) {
        return rules[i];
      }
    }
    return null;
  }

  function getErrorElement(input) {
    return document.getElementById(input.id + '-error');
  }

  function addDescribedBy(input, id) {
    var ids = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (ids.indexOf(id) === -1) {
      ids.push(id);
    }
    input.setAttribute('aria-describedby', ids.join(' '));
  }

  function removeDescribedBy(input, id) {
    var ids = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(function (item) {
      return item && item !== id;
    });
    if (ids.length > 0) {
      input.setAttribute('aria-describedby', ids.join(' '));
    } else {
      input.removeAttribute('aria-describedby');
    }
  }

  function showFieldError(input, message) {
    var error = getErrorElement(input);
    error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    addDescribedBy(input, error.id);
  }

  function clearFieldError(input) {
    var error = getErrorElement(input);
    error.textContent = '';
    input.removeAttribute('aria-invalid');
    removeDescribedBy(input, error.id);
  }

  function hasFieldError(input) {
    return getErrorElement(input).textContent !== '';
  }

  function validate(input) {
    var message = findRule(input).check(input);
    if (message) {
      showFieldError(input, message);
      return false;
    }
    clearFieldError(input);
    return true;
  }

  // 계정이 맞지 않을 때의 안내. 어느 쪽이 틀렸는지 알리면 가입 여부가 드러나므로 두 입력에 함께 연결한다.
  function showLoginError() {
    loginError.hidden = false;
    [emailInput, passwordInput].forEach(function (input) {
      input.setAttribute('aria-invalid', 'true');
      addDescribedBy(input, loginError.id);
    });
  }

  function clearLoginError() {
    loginError.hidden = true;
    [emailInput, passwordInput].forEach(function (input) {
      removeDescribedBy(input, loginError.id);
      if (!hasFieldError(input)) {
        input.removeAttribute('aria-invalid');
      }
    });
  }

  // 이미 초점이 있는 입력에 focus()를 다시 부르면 화면 낭독 프로그램이 바뀐 오류 안내를 읽지 않으므로,
  // 초점을 뺐다가 다시 준다. submit 처리기에서만 부른다.
  function moveFocusTo(input) {
    if (document.activeElement === input) {
      input.blur();
    }
    input.focus();
  }

  function matchesDemoAccount() {
    return emailInput.value.trim().toLowerCase() === DEMO_ACCOUNT.email &&
      passwordInput.value === DEMO_ACCOUNT.password;
  }

  function saveSignIn() {
    var data = JSON.stringify({ email: emailInput.value.trim(), keep: keepSignedIn.checked });
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(STORAGE_KEY);
      (keepSignedIn.checked ? window.localStorage : window.sessionStorage).setItem(STORAGE_KEY, data);
    } catch (error) {
      // 저장소를 쓸 수 없는 브라우저에서는 완료 화면이 "로그인되어 있지 않습니다"를 보인다.
    }
  }

  [emailInput, passwordInput].forEach(function (input) {
    // 이미 오류 문구가 있는 입력만 다시 검사해, 고치면 문구를 바로 지운다.
    input.addEventListener('input', function () {
      if (hasFieldError(input)) {
        validate(input);
      }
    });
  });

  // 값을 넣고 다른 곳으로 옮겨 갈 때 이메일 형식을 검사한다. 빈 입력은 제출할 때만 알린다.
  emailInput.addEventListener('change', function () {
    if (emailInput.value.trim() !== '' || hasFieldError(emailInput)) {
      validate(emailInput);
    }
  });

  showPassword.addEventListener('change', function () {
    passwordInput.type = showPassword.checked ? 'text' : 'password';
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearLoginError();

    var firstInvalid = null;
    rules.forEach(function (rule) {
      if (!validate(rule.input) && !firstInvalid) {
        firstInvalid = rule.input;
      }
    });
    if (firstInvalid) {
      moveFocusTo(firstInvalid);
      return;
    }

    if (!matchesDemoAccount()) {
      // KRDS 로그인 정보 입력 가이드: 비밀번호를 지우고 이메일(아이디) 입력으로 돌려보낸다. 이메일 값은 남긴다.
      passwordInput.value = '';
      showLoginError();
      moveFocusTo(emailInput);
      return;
    }

    saveSignIn();
    window.location.assign('welcome.html');
  });

  form.querySelector('button[type="submit"]').disabled = false;
})();
