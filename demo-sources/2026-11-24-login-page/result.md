# 로그인 데모 개발 결과

Chromium에서 입력 오류와 계정 불일치 안내, 로그인과 로그아웃 흐름을 확인했다. 화면낭독기와 Chromium 외 브라우저에서의 동작은 미검증 상태다.

## 사용 방법

예시 계정으로 입력 오류, 계정 불일치, 로그인 성공과 로그아웃을 체험한다. 로그인 상태 유지를 선택하면 이 브라우저에 상태를 저장한다. 회원가입 데모는 별도의 예시다.

- 구현한 파일: `index.html`, `welcome.html`, `styles.css`, `login.js`, `welcome.js`
- HTML 기본 요소와 회원가입 데모의 양식 스타일을 재사용하고 KRDS 로그인 가이드를 참고했다.
- [근거 자료 목록 v1](https://kwcag-docs.fe4all.dev/v1/llms.txt)
- 자료 상태: dataVersion v1, generatorCommit 2feade1fe16ee41a7c18cd2af3862c4fa2d74a8c

## 적용 기준과 참고 자료

KWCAG는 검사항목 본문, NIA와 KRDS는 구현 참고 자료다. KRDS 링크는 공식 가이드의 해당 페이지로 연결한다.

| 항목 | 항목명 | 적용한 곳 | 근거 자료 |
|---|---|---|---|
| 5.3.2 | 콘텐츠의 선형구조 | `index.html`의 요소 순서(머리글 → `h1` → 안내문 → 예시 계정 → 이메일로 로그인 → 회원가입 안내 → 바닥글). 양식 안은 계정 불일치 안내 → 이메일 → 비밀번호 → 비밀번호 표시 → 로그인 상태 유지 → 로그인 버튼 순서다. `styles.css`는 순서를 바꾸지 않는다. | [KWCAG 5.3.2](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.2.json), [KRDS 로그인 정보 입력 · 접근성 가이드라인](https://www.krds.go.kr/html/site/service/service_03_05.html) |
| 5.3.3 | 명확한 지시사항 제공 | `index.html`의 안내문(`.lead`), 예시 계정 안내, 계정 불일치 안내(`#login-error`). "로그인 버튼", "비밀번호 표시"처럼 요소 이름으로 가리키고 위치·색을 쓰지 않는다. | [KWCAG 5.3.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.3.json) |
| 5.4.1 | 색에 무관한 콘텐츠 인식 | `styles.css`의 `.field-error`, `.form-error`(오류를 글자와 느낌표 아이콘으로 알리고 빨간 테두리는 보조), `a`(밑줄), 기본 체크 상자(체크 표시로 상태 구분) | [KWCAG 5.4.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.1.json), [KWCAG 7.3.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.3.1.json), [KRDS 체크박스 (Checkbox) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_06_02.html) |
| 5.4.3 | 텍스트 콘텐츠의 명도 대비 | `styles.css`의 `:root` 색 변수(본문, 보조 글자, 링크, 오류, 버튼, 예시 계정 안내, 완료 패널, 입력 테두리, 초점 표시) | [KWCAG 5.4.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.3.json), [KRDS 텍스트 입력 필드 (Text input) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_09_03.html), [KRDS 체크박스 (Checkbox) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_06_02.html), [KRDS 버튼 (Button) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_05_02.html) |
| 5.4.4 | 콘텐츠 간의 구분 | `styles.css`의 `.demo-note`(연한 파란 배경과 파란 테두리), `.form-section`(흰 배경과 테두리, 바탕은 연회색), `.form-error`(테두리), `.status-panel`(테두리) | [KWCAG 5.4.4](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.4.json) |
| 6.1.1 | 키보드 사용 보장 | `index.html`, `welcome.html`의 조작 요소를 모두 `input`, `button`, `a href` 기본 요소로 구현 | [KWCAG 6.1.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.1.json), [KRDS 링크 (Link) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_05_01.html), [KRDS 버튼 (Button) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_05_02.html), [KRDS 체크박스 (Checkbox) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_06_02.html), [KRDS 텍스트 입력 필드 (Text input) · 상호작용 가이드라인](https://www.krds.go.kr/html/site/component/component_09_03.html) |
| 6.1.2 | 초점 이동과 표시 | 초점 순서 이메일 → 비밀번호 → 비밀번호 표시 → 로그인 상태 유지 → 로그인 → 회원가입. `styles.css`의 `input:focus-visible`, `a:focus-visible`, `.button-primary:focus-visible`, `.button-secondary:focus-visible`(3px 실선). `welcome.js`는 화면을 열 때 초점을 옮기지 않는다. | [KWCAG 6.1.2](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.2.json), [KRDS 로그인 정보 입력 · 접근성 가이드라인](https://www.krds.go.kr/html/site/service/service_03_05.html), [KRDS 로그인 완료 · 접근성 가이드라인](https://www.krds.go.kr/html/site/service/service_03_06.html), [KRDS 텍스트 입력 필드 (Text input) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_09_03.html), [KRDS 버튼 (Button) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_05_02.html) |
| 6.1.3 | 조작 가능 | `styles.css`의 입력 `min-height: 3rem`, 체크 상자 `1.5rem`(24px), 로그인·로그아웃 버튼 `min-height: 3.25rem` | [KWCAG 6.1.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.3.json), [KRDS 링크 (Link) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_05_01.html) |
| 6.4.2 | 제목 제공 | 페이지 `title` 3가지("로그인 - …", "로그인 완료 - …", "로그인되어 있지 않음 - …"), `index.html`의 `h1` 로그인과 `h2` 2개(예시 계정, 이메일로 로그인), `welcome.html`의 상태별 `h1` | [KWCAG 6.4.2](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.2.json), [KRDS 입력폼 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_08.html) |
| 6.4.3 | 적절한 링크 텍스트 | `index.html`의 "회원가입 데모" 링크(회원가입 예시 화면으로 이동), `welcome.html`의 "로그인 화면으로 이동" 링크 | [KWCAG 6.4.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.3.json), [KRDS 링크 (Link) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_05_01.html) |
| 6.5.3 | 레이블과 네임 | 입력·체크 상자의 `label`, 로그인·로그아웃 버튼, 링크 2개. `aria-label`과 `title` 속성을 쓰지 않아 보이는 글자가 그대로 이름이다. | [KWCAG 6.5.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.5.3.json) |
| 7.1.1 | 기본 언어 표시 | `index.html`, `welcome.html`의 `<html lang="ko">` | [KWCAG 7.1.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.1.1.json) |
| 7.2.1 | 사용자 요구에 따른 실행 | `login.js`의 `input`·`change` 처리기(오류 문구와 비밀번호 표시만 바꾼다), `submit` 처리기(초점 이동과 페이지 이동은 여기서만 한다), `welcome.js`의 `click` 처리기(로그아웃). 화면을 열 때 여는 창이나 다른 페이지로의 이동이 없다. | [KWCAG 7.2.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.2.1.json), [NIA 3.2.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.2.1.json), [NIA 3.2.1-s4](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.2.1-s4.json), [NIA 3.2.1-s5](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.2.1-s5.json) |
| 7.3.1 | 오류 정정 | `index.html`의 `.field-error`(`#email-error`, `#password-error`)와 `#login-error`, `form`의 `novalidate`, `login.js`의 `rules`, `showFieldError`, `clearFieldError`, `showLoginError`, `clearLoginError`, `moveFocusTo`, `submit` 처리기 | [KWCAG 7.3.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.3.1.json), [NIA 3.3.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.1.json), [NIA 3.3.1-s4](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.1-s4.json), [NIA 3.3.1-s5](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.1-s5.json), [KRDS 오류 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_07.html), [KRDS 입력폼 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_08.html), [KRDS 입력폼 · 상호작용 가이드라인](https://www.krds.go.kr/html/site/global/global_08.html), [KRDS 로그인 정보 입력 · 상호작용 가이드라인](https://www.krds.go.kr/html/site/service/service_03_05.html) |
| 7.3.2 | 레이블 제공 | `index.html`의 입력 2개와 체크 상자 2개. 모두 보이는 `label for`로 연결했고 placeholder를 쓰지 않았다. | [KWCAG 7.3.2](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.3.2.json), [NIA 3.3.2](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.2.json), [NIA 3.3.2-s4](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.2-s4.json), [NIA 3.3.2-s5](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.2-s5.json), [KRDS 텍스트 입력 필드 (Text input) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_09_03.html), [KRDS 텍스트 입력 필드 (Text input) · 개발 시 접근성 관련 주의 사항](https://www.krds.go.kr/html/site/component/component_09_03.html), [KRDS 체크박스 (Checkbox) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_06_02.html), [KRDS 체크박스 (Checkbox) · 개발 시 접근성 관련 주의 사항](https://www.krds.go.kr/html/site/component/component_06_02.html), [KRDS 입력폼 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_08.html) |
| 7.3.3 | 접근 가능한 인증 | `index.html`의 이메일 `autocomplete="username"`, 비밀번호 `autocomplete="current-password"`, 비밀번호 안내 문구(`#password-hint`), 비밀번호 표시 체크 상자. 붙여넣기를 막지 않고 CAPTCHA를 쓰지 않는다. | [KWCAG 7.3.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.3.3.json), [NIA 3.3.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.3.json), [NIA 3.3.3-s4](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.3-s4.json), [NIA 3.3.3-s5](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.3-s5.json), [KRDS 로그인 방식 확인/선택 · 접근성 가이드라인](https://www.krds.go.kr/html/site/service/service_03_04.html), [KRDS 로그인 정보 입력 · 접근성 가이드라인](https://www.krds.go.kr/html/site/service/service_03_05.html) |
| 8.1.1 | 마크업 오류 방지 | `index.html`, `welcome.html` 전체 | [KWCAG 8.1.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-8.1.1.json) |

## 검증 결과

### 코드 검토로 확인

- 5.3.2: 마크업 순서가 화면 순서와 같다. `styles.css`에 `order`, `position`, `grid-area`, `flex-direction: *-reverse`가 없다. 오류 문구와 계정 불일치 안내는 처음부터 제자리에 둔 빈 요소나 `hidden` 요소라서 오류가 나도 순서가 바뀌지 않는다. 확인한 코드: `index.html`, `welcome.html`, `styles.css` 전체
- 5.3.3: 지시 문장은 "로그인 버튼", "비밀번호 표시"처럼 요소 이름으로 가리킨다. 처음 쓴 "아래 계정으로"는 위치에 기대는 말이라 "이 예시 계정으로"로 고쳤다. 확인한 코드: `index.html`의 `.lead`, `.demo-note p`, `#login-error`
- 5.4.1: 오류는 문구와 `::before` 느낌표 아이콘으로 알리고, `input[aria-invalid="true"]`의 빨간 2px 테두리는 덧붙인 표시다. 링크는 밑줄로 구분한다. 확인한 코드: `styles.css`의 `.field-error`, `.form-error p::before`, `input[aria-invalid="true"]`, `a`
- 5.4.3: 쓰인 색 쌍을 WCAG 상대 휘도 공식으로 계산했다. 글자: 본문 `#1e2124`/흰색 16.18:1, `#1e2124`/예시 계정 배경 `#eef3fb` 14.52:1, `#1e2124`/완료 배경 `#f0f9f2` 15.05:1, 보조 글자 `#4d5257`/흰색 7.89:1, `#4d5257`/바탕 `#f4f5f6` 7.23:1, 오류 `#c0221b`/흰색 6.02:1, 링크 `#0b50d0`/흰색 6.83:1, `#0b50d0`/바탕 6.26:1, 링크 마우스 올림 `#0b3a8c`/바탕 9.63:1, 로그인 버튼 흰 글자/`#0b50d0` 6.83:1, 마우스 올림 흰 글자/`#0b3a8c` 10.51:1, 로그아웃 버튼 `#0b50d0`/마우스 올림 배경 `#eef3fb` 6.13:1, 머리글 흰 글자/`#063a74` 11.26:1. 모두 4.5:1 이상이다. 글자가 아닌 요소: 입력 테두리 `#6d7882`/흰색 4.51:1, 초점 표시 `#0b50d0`/흰색 6.83:1·바탕 6.26:1·완료 배경 6.36:1, 오류 테두리 `#c0221b`/흰색 6.02:1, 완료 패널 테두리 `#1a7f37`/`#f0f9f2` 4.73:1. 모두 3:1 이상이다. 확인한 코드: `styles.css`의 `:root`
- 5.4.4: 예시 계정 안내는 연한 파란 배경과 1px 파란 테두리(`#0b50d0`, 바탕 대비 6.26:1)로, 로그인 양식은 연회색 바탕 위의 흰 상자와 테두리로, 계정 불일치 안내는 2px 테두리로 나뉜다. 확인한 코드: `styles.css`의 `body`, `.demo-note`, `.form-section`, `.form-error`, `.status-panel`
- 6.1.1: 조작 요소가 `input` 4개, `button` 2개(화면당 1개), `a href` 2개(화면당 1개)로 모두 기본 요소다. 마우스로만 동작하는 처리기(`mousedown`, `mouseover`)와 HTML의 `on*` 속성이 없다. 확인한 코드: `index.html`, `welcome.html`(`grep`으로 `on*=` 0건), `login.js`·`welcome.js`의 `addEventListener` 호출 5곳
- 6.1.2: `tabindex`가 없어 초점 순서는 마크업 순서와 같다. KWCAG 6.1.2 본문의 예(아이디, 비밀번호, 로그인 버튼 순서)와 KRDS 로그인 정보 입력 가이드의 "로그인 버튼 이후에 저장 옵션으로 초점이 가지 않게"를 따라 두 체크 상자를 로그인 버튼보다 앞에 두었다. 조작 요소마다 `:focus-visible` 테두리가 있다. `welcome.js`에 `focus()` 호출이 없다. 확인한 코드: `index.html`의 양식, `styles.css`의 초점 표시 선택자, `welcome.js`
- 6.1.3: 체크 상자 `width`·`height` `1.5rem`(24px), 입력 `min-height: 3rem`, 버튼 `min-height: 3.25rem`이다. 체크 상자는 레이블을 눌러도 선택된다. 확인한 코드: `styles.css`의 `.check-row input[type="checkbox"]`, 입력 선택자, `.button-primary`, `.button-secondary`
- 6.4.2: `title`이 화면과 상태를 알린다. `welcome.js`는 로그인 기록이 있을 때만 "로그인 완료 - …"로 바꾸고, 기본값은 화면 기본 내용과 같은 "로그인되어 있지 않음 - …"이다. 제목 수준은 `h1` → `h2`이고 건너뛰는 수준이 없다. 확인한 코드: `index.html`·`welcome.html`의 `title`, `h1`, `h2`, `welcome.js`
- 6.4.3: 링크 글자 "회원가입 데모", "로그인 화면으로 이동"만으로 목적지를 알 수 있다. 확인한 코드: `index.html`의 `.signup-guide a`, `welcome.html`의 `#signed-out a`
- 6.5.3: `aria-label`과 `title` 속성이 없다. `aria-labelledby`는 조작 요소가 아닌 `section` 4곳에만 있다. 확인한 코드: `index.html`, `welcome.html`(`grep`으로 `aria-label=`·`title=` 0건)
- 7.1.1: 두 파일의 `html` 요소에 `lang="ko"`가 있다. 확인한 코드: `index.html`·`welcome.html` 2번째 줄
- 7.2.1: `focus`, `focusin`, `keyup`, `load`, `DOMContentLoaded` 처리기가 없다. `input`·`change` 처리기는 `validate`와 `type` 바꾸기만 부른다. `window.open`, `submit()`, `requestSubmit()`, `showModal()`이 없다. `location.assign`은 `login.js`의 `submit` 처리기(191번째 줄)와 `welcome.js`의 `click` 처리기(48번째 줄)에만 있다. `focus()`·`blur()`는 `moveFocusTo`에만 있고, `moveFocusTo`는 `submit` 처리기에서만 부른다. `welcome.js`가 화면을 열 때 하는 일은 저장소를 읽어 글자와 `hidden`, `title`을 바꾸는 것뿐이고, 로그인 기록이 없어도 다른 페이지로 보내지 않는다. 확인한 코드: `login.js`, `welcome.js`(`grep`으로 처리기와 호출 위치 확인)
- 7.3.1 확인점 1·2: 이메일은 빈 값과 형식, 비밀번호는 빈 값을 검사하고, 문구에 항목명과 고치는 방법이 있다(예: "이메일 형식이 올바르지 않습니다. name@example.com처럼 @와 도메인을 넣어 입력해 주세요."). 예시 계정과 일치하지 않으면 확인할 항목과 다시 입력하는 방법을 함께 알린다. 이 안내는 두 입력 바로 앞에 두고 두 입력 모두에 연결했다. 확인한 코드: `login.js`의 `rules`, `index.html`의 `#login-error`
- 7.3.1 확인점 3: `showFieldError`가 문구를 넣고 `aria-invalid="true"`를 붙이고 문구 `id`를 `aria-describedby`에 덧붙인다. `clearFieldError`가 문구를 비우고 `aria-invalid`와 그 `id`를 뗀다. `showLoginError`는 `#login-error`를 보이고 두 입력에 `aria-invalid`와 `aria-describedby`를 붙이며, `clearLoginError`는 다음 제출 때 이를 걷어 낸다. 입력의 형식 안내 `id`는 그대로 남는다. 확인한 코드: `login.js`의 해당 함수, `addDescribedBy`, `removeDescribedBy`
- 7.3.1 확인점 4·5: 로그인 버튼은 양식 안의 `<button type="submit">`이고 `form`에 `novalidate`가 있다. `submit` 처리기가 `preventDefault()`로 전송을 막고, 오류가 있으면 첫 오류 입력에, 계정이 맞지 않으면 이메일 입력에 초점을 옮긴다. 이미 초점이 있는 입력은 `moveFocusTo`가 `blur()` 뒤 `focus()`를 불러 화면 낭독 프로그램이 바뀐 안내를 다시 읽을 기회를 만든다. 확인한 코드: `index.html`의 `#login-form`, `login.js`의 `submit` 처리기와 `moveFocusTo`
- 7.3.1 확인점 6: 오류 문구 요소는 처음에 비어 있고 `.field-error:empty`로 보이지 않는다. `#login-error`는 `hidden`이다. 빈 입력은 제출할 때만 알리고, 이메일 `change` 처리기는 값이 있거나 이미 오류인 경우만 검사한다. 확인한 코드: `index.html`, `styles.css`의 `.field-error:empty`, `.form-error[hidden]`, `login.js`의 `change` 처리기
- 7.3.1 권장 사항: 항목별 오류(빈 값, 형식)에서는 입력한 값을 지우지 않는다. 계정 불일치에서는 KRDS 로그인 정보 입력 상호작용 가이드에 따라 비밀번호만 지우고 이메일은 남긴 뒤 이메일 입력으로 돌려보낸다. 이는 NIA 개선 필요 사례 4의 "오류가 있는 입력란만 강조하고 다른 입력란의 값은 유지"와도 맞는다. 비밀번호를 지웠다는 사실은 안내 문구에 적었다. 이메일은 입력 전에 형식 예시를 글자로 안내하고 `aria-describedby`로 연결했다. 확인한 코드: `login.js`의 `submit` 처리기, `index.html`의 `#email-hint`
- 7.3.2: 입력 4개(`#email`, `#password`, `#show-password`, `#keep-signed-in`)의 `id`가 모두 `label for`와 같다(Python `html.parser`로 만든 검사기에서 레이블 없는 입력 0개). 레이블을 숨기지 않았고 placeholder와 선택 상자가 없다. 확인한 코드: `index.html` 전체
- 7.3.3: KWCAG 7.3.3 본문은 비밀번호 입력을 인지 기능 테스트로 보고, "브라우저가 아이디/비밀번호를 저장할 수 있도록 마크업된 서식"을 인지 기능 테스트에 의존하지 않는 방법의 하나로 든다. 이메일에 `autocomplete="username"`, 비밀번호에 `autocomplete="current-password"`를 두었고, 두 입력이 `name`과 함께 한 `form` 안에 있다. `paste` 처리기와 `onpaste`가 없다. CAPTCHA와 퍼즐이 없다. 확인한 코드: `index.html`의 `#email`, `#password`, `login.js`(`grep`으로 `paste` 0건)
- 8.1.1: Python `html.parser`로 만든 검사기로 열고 닫음, 중첩, 같은 요소의 중복 속성, 중복 `id`, 참조 `id`를 확인했다. `index.html` 오류 0건(`id` 14개, `for`·`aria-*` 참조 9개), `welcome.html` 오류 0건(`id` 8개, 참조 2개). 확인한 코드: `index.html`, `welcome.html` 전체

### 최초 구현 시 브라우저에서 확인

최초 구현의 브라우저 검증은 Playwright 1.65.1의 헤드리스 Chromium에서 진행했다. 접근 가능한 이름과 설명은 Chrome DevTools Protocol의 `Accessibility.getPartialAXTree`로 읽었다. Firefox와 WebKit은 이 Playwright 버전용 실행 파일이 설치돼 있지 않아 실행하지 않았다(설치하지 않음). 화면 낭독 프로그램(센스리더, NVDA, VoiceOver)으로는 확인하지 않았다.

- 5.3.2·6.1.2: 화면을 연 뒤 Tab만 9번 눌렀다. 관찰한 결과: 초점이 이메일 → 비밀번호 → 비밀번호 표시 → 로그인 상태 유지 → 로그인 → 회원가입 순서로 옮겨 갔고, 각 요소의 계산된 `outline`이 `solid 3px rgb(11, 80, 208)`이었다. 화면을 연 직후 초점은 `body`였다.
- 6.1.2: 로그인에 성공해 `welcome.html`이 열린 직후 `document.activeElement`를 읽었다. 관찰한 결과: `body`. 이어서 Tab을 한 번 누르면 로그아웃 버튼에 초점이 갔다.
- 6.4.2: 각 상태의 `document.title`을 읽었다. 관찰한 결과: 로그인 화면 "로그인 - 한국 웹 접근성 플레이그라운드", 로그인 뒤 "로그인 완료 - 한국 웹 접근성 플레이그라운드", 로그인 기록 없이 연 완료 화면 "로그인되어 있지 않음 - 한국 웹 접근성 플레이그라운드".
- 6.4.3: "회원가입" 링크의 `href`로 이동했다. 관찰한 결과: 제목이 "회원가입 - 한국 웹 접근성 플레이그라운드"인 회원가입 예시 화면이 열렸다.
- 6.5.3·7.3.2: 접근성 트리에서 이름을 읽었다. 관찰한 결과: 이메일 `textbox` "이메일", 비밀번호 `textbox` "비밀번호", `checkbox` "비밀번호 표시", `checkbox` "로그인 상태 유지", `button` "로그인", `link` "회원가입". 이메일의 설명은 "예: name@example.com", 로그인 상태 유지의 설명은 그 안내 문구였다.
- 7.2.1: Tab 이동 전체, 체크 상자 Space 토글, 이메일 입력 뒤 Tab(change)에서 주소를 비교하고 `popup`·`dialog` 이벤트를 셌다. 관찰한 결과: 제출 전까지 주소가 바뀌지 않았고, 실행 전체에서 새 창과 대화상자가 0건, 콘솔 오류가 0건이었다.
- 7.3.1: 빈 양식에서 로그인 버튼에 초점을 두고 Enter를 눌렀다. 관찰한 결과: 주소가 그대로였고 초점이 이메일 입력에 있었다. "이메일을 입력해 주세요.", "비밀번호를 입력해 주세요."가 각 입력 아래에 보였고, 접근성 트리에서 이메일은 `invalid: true`, 설명 "예: name@example.com 이메일을 입력해 주세요."였다.
- 7.3.1: 이메일에 `demo@`를 입력하고 Tab을 눌렀다가, 다시 돌아와 `example.com`을 이어 입력했다. 관찰한 결과: Tab 뒤 "이메일 형식이 올바르지 않습니다. name@example.com처럼 @와 도메인을 넣어 입력해 주세요."가 보였고 초점은 비밀번호로 옮겨 갔다. 고친 뒤 문구가 비었고 `invalid: false`, 설명은 형식 안내만 남았다.
- 7.3.1: 이메일 `demo@example.com`, 비밀번호 `wrong-password`로 비밀번호 칸에서 Enter를 눌렀다. 관찰한 결과: 주소가 그대로였고 `#login-error`가 보였다. 이메일 값은 남고 비밀번호 값은 비었으며 초점은 이메일 입력에 있었다. 접근성 트리에서 두 입력 모두 `invalid: true`였고, 설명 끝에 계정 불일치 안내 문장이 붙었다.
- 7.3.1: 이메일 입력에 초점이 있는 상태에서 틀린 비밀번호로 Enter를 눌렀다. 관찰한 결과: 이메일 입력의 `focus` 이벤트가 1번 다시 발생했다.
- 7.3.3: 클립보드에 `wrong-password`를 넣고 비밀번호 입력에서 Meta+V를 눌렀다. 관찰한 결과: 값이 `wrong-password`로 들어갔다. 비밀번호 표시 체크 상자에서 Space를 누르자 비밀번호 입력의 `type`이 `text`로 바뀌고, 다시 누르자 `password`로 돌아왔다. 초점은 체크 상자에 남았다.
- 로그인 흐름: 예시 계정(이메일은 대소문자를 섞고 끝에 공백을 넣어 `Demo@Example.com `)으로 Enter를 눌렀다. 관찰한 결과: `welcome.html`로 이동해 "로그인되었습니다"와 이메일, "로그인 상태 유지를 선택하지 않아, 이 브라우저 탭을 닫으면 로그아웃됩니다."를 보였다. 같은 브라우저의 새 탭에서 `welcome.html`을 열면 "로그인되어 있지 않습니다"가 보였다. 로그인 상태 유지를 Space로 고르고 로그인하면 새 탭에서도 "로그인되었습니다"가 보였다.
- 로그아웃: 완료 화면에서 Tab 한 번으로 로그아웃 버튼에 초점을 두고 Enter를 눌렀다. 관찰한 결과: `index.html`로 돌아왔고 `sessionStorage`와 `localStorage`의 로그인 기록이 모두 비었다.
- 화면 폭: 폭 320px과 375px에서 열었다. 관찰한 결과: 가로 스크롤이 생기지 않았다. 첫 실행의 스크린샷에서 계정 불일치 안내의 굵은 문장이 좁은 세로 칸으로 갈라지는 것과, 320px에서 예시 이메일이 `demo@example.co`/`m`으로 끊기는 것을 찾았다. 안내 문장을 `span`으로 묶고 예시 계정 값의 글자 크기를 `0.9375rem`으로 줄인 뒤 다시 찍어 두 문제가 사라진 것을 확인했다.

### 공개용 문구 수정 후 확인

Aside Browser에서 확인했다. 빈 양식에서 이메일 오류와 초점 이동을 확인했다. 예시 계정과 다른 비밀번호를 입력하면 계정 불일치 안내가 나타나고 비밀번호가 지워졌다. 예시 계정으로 로그인한 뒤 로그아웃하고 회원가입 데모 링크로 이동했다.

코드에서 스크립트가 제출 처리기를 등록한 뒤에만 제출 버튼이 활성화되는 것을 확인했다.
