/* 회원가입 양식 검사
   - 검사는 submit 처리기에서 하고, 오류가 있으면 전송을 막고 첫 오류 입력으로 초점을 옮긴다(KWCAG 7.3.1).
   - change·input 처리기는 오류 문구와 체크 상태만 바꾸고 초점 이동·제출·창 열기를 하지 않는다(KWCAG 7.2.1).
   - 붙여넣기와 자동 입력을 막지 않는다(KWCAG 7.3.3). */
(function () {
  'use strict';

  var form = document.getElementById('signup-form');
  var signupStep = document.getElementById('signup-step');
  var complete = document.getElementById('signup-complete');
  var completeHeading = document.getElementById('complete-heading');
  var completeMessage = document.getElementById('complete-message');

  var nameInput = document.getElementById('name');
  var emailInput = document.getElementById('email');
  var passwordInput = document.getElementById('password');
  var passwordConfirmInput = document.getElementById('password-confirm');
  var phoneInput = document.getElementById('phone');
  var showPassword = document.getElementById('show-password');
  var agreeAll = document.getElementById('agree-all');
  var agreeTerms = document.getElementById('agree-terms');
  var agreePrivacy = document.getElementById('agree-privacy');
  var agreeOptions = Array.prototype.slice.call(document.querySelectorAll('.agree-option'));

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_PATTERN = /^01[016789]\d{7,8}$/;
  var SPECIAL_PATTERN = /[!-\/:-@\[-`{-~]/;

  // 화면 순서와 같은 순서로 둔다. 첫 오류 입력을 이 순서로 찾는다.
  var rules = [
    {
      input: nameInput,
      check: function (input) {
        return input.value.trim() === '' ? '이름을 입력해 주세요.' : '';
      }
    },
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
        var value = input.value;
        if (value === '') {
          return '비밀번호를 입력해 주세요.';
        }
        var missing = [];
        if (value.length < 8) {
          missing.push('8자 이상');
        }
        if (!/[A-Za-z]/.test(value)) {
          missing.push('영문');
        }
        if (!/[0-9]/.test(value)) {
          missing.push('숫자');
        }
        if (!SPECIAL_PATTERN.test(value)) {
          missing.push('특수문자');
        }
        if (missing.length > 0) {
          return '비밀번호는 8자 이상으로, 영문·숫자·특수문자를 모두 넣어야 합니다. 부족한 조건: ' + missing.join(', ') + '.';
        }
        return '';
      }
    },
    {
      input: passwordConfirmInput,
      check: function (input) {
        if (input.value === '') {
          return '비밀번호 확인을 입력해 주세요. 비밀번호 칸에 입력한 값과 똑같이 입력합니다.';
        }
        if (input.value !== passwordInput.value) {
          return '비밀번호 확인이 비밀번호와 다릅니다. 비밀번호 칸에 입력한 값과 똑같이 입력해 주세요.';
        }
        return '';
      }
    },
    {
      input: phoneInput,
      check: function (input) {
        var value = input.value.trim();
        if (value === '') {
          return '';
        }
        var digits = value.replace(/[\s-]/g, '');
        if (!PHONE_PATTERN.test(digits)) {
          return '휴대전화 번호는 01로 시작하는 숫자 10~11자리로 입력해 주세요. 예: 01012345678';
        }
        return '';
      }
    },
    {
      input: agreeTerms,
      check: function (input) {
        return input.checked ? '' : '이용약관 동의는 필수입니다. 동의해야 가입할 수 있습니다.';
      }
    },
    {
      input: agreePrivacy,
      check: function (input) {
        return input.checked ? '' : '개인정보 수집·이용 동의는 필수입니다. 동의해야 가입할 수 있습니다.';
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

  function showError(input, message) {
    var error = getErrorElement(input);
    error.textContent = message;
    input.setAttribute('aria-invalid', 'true');
    addDescribedBy(input, error.id);
  }

  function clearError(input) {
    var error = getErrorElement(input);
    error.textContent = '';
    input.removeAttribute('aria-invalid');
    removeDescribedBy(input, error.id);
  }

  function validate(input) {
    var rule = findRule(input);
    if (!rule) {
      return true;
    }
    var message = rule.check(input);
    if (message) {
      showError(input, message);
      return false;
    }
    clearError(input);
    return true;
  }

  function isInvalid(input) {
    return input.getAttribute('aria-invalid') === 'true';
  }

  // 이미 오류가 난 입력만 다시 검사해, 고치면 문구를 바로 지운다.
  function revalidateIfInvalid(input) {
    if (isInvalid(input)) {
      validate(input);
    }
  }

  [nameInput, emailInput, passwordInput, passwordConfirmInput, phoneInput].forEach(function (input) {
    input.addEventListener('input', function () {
      revalidateIfInvalid(input);
      if (input === passwordInput) {
        revalidateIfInvalid(passwordConfirmInput);
      }
    });

    // 값을 넣고 다른 곳으로 옮겨 갈 때 형식을 검사한다. 빈 입력은 제출할 때만 알린다.
    input.addEventListener('change', function () {
      if (input.value.trim() !== '' || isInvalid(input)) {
        validate(input);
      }
      if (input === passwordInput && passwordConfirmInput.value !== '') {
        validate(passwordConfirmInput);
      }
    });
  });

  showPassword.addEventListener('change', function () {
    var type = showPassword.checked ? 'text' : 'password';
    passwordInput.type = type;
    passwordConfirmInput.type = type;
  });

  function syncAgreeAll() {
    agreeAll.checked = agreeOptions.every(function (option) {
      return option.checked;
    });
  }

  agreeAll.addEventListener('change', function () {
    agreeOptions.forEach(function (option) {
      option.checked = agreeAll.checked;
      revalidateIfInvalid(option);
    });
  });

  agreeOptions.forEach(function (option) {
    option.addEventListener('change', function () {
      syncAgreeAll();
      revalidateIfInvalid(option);
    });
  });

  function showComplete() {
    var name = nameInput.value.trim();
    completeMessage.textContent = name + '님, 회원가입 데모를 마쳤습니다.';
    form.reset();
    passwordInput.type = 'password';
    passwordConfirmInput.type = 'password';
    signupStep.hidden = true;
    complete.hidden = false;
    document.title = '회원가입 완료 - 한국 웹 접근성 플레이그라운드';
    completeHeading.focus();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var firstInvalid = null;
    rules.forEach(function (rule) {
      if (!validate(rule.input) && !firstInvalid) {
        firstInvalid = rule.input;
      }
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }
    // 예시 화면이라 서버로 보내지 않고 완료 안내를 보인다.
    showComplete();
  });

  form.querySelector('button[type="submit"]').disabled = false;
})();
