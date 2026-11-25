# 회원가입 데모 개발 결과

예시 값과 필수 약관으로 입력 오류, 정정, 가입 완료 안내를 체험한다. 가입 완료는 같은 화면에서 안내하며 실제 계정은 생성하지 않는다.

- 구현한 파일: `index.html`, `styles.css`, `signup.js`
- HTML 기본 요소를 쓰고 입력 양식과 약관 동의에는 KRDS 가이드를 참고했다.
- [근거 자료 목록 v1](https://kwcag-docs.fe4all.dev/v1/llms.txt)
- 자료 상태: dataVersion v1, generatorCommit 2feade1fe16ee41a7c18cd2af3862c4fa2d74a8c

## 적용한 KWCAG 항목과 근거 자료

KWCAG는 검사항목 본문, NIA와 KRDS는 구현 참고 자료다. KRDS 링크는 공식 가이드의 해당 페이지로 연결한다.

| 항목 | 항목명 | 적용한 곳 | 근거 자료 |
|---|---|---|---|
| 5.3.2 | 콘텐츠의 선형구조 | `index.html`의 요소 순서(머리글 → `h1` → 안내문 → 회원 정보 → 약관 동의 → 가입하기 → 바닥글). 입력마다 레이블 → 형식 안내 → 입력 → 오류 문구 순서다. `styles.css`는 순서를 바꾸지 않는다. | [KWCAG 5.3.2](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.2.json), [KRDS 로그인 정보 입력 · 접근성 가이드라인](https://www.krds.go.kr/html/site/service/service_03_05.html) |
| 5.3.3 | 명확한 지시사항 제공 | `index.html`의 안내문(".lead"), 비밀번호 확인 안내와 오류 문구. 버튼은 "가입하기", 입력은 "비밀번호 칸"처럼 이름으로 가리키고 위치·색을 쓰지 않는다. 필수 여부는 별표 대신 "(필수)", "(선택)" 글자로 적었다. | [KWCAG 5.3.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.3.json) |
| 5.4.1 | 색에 무관한 콘텐츠 인식 | `styles.css`의 `.field-error`(오류를 글자와 느낌표 아이콘으로 알리고 빨간 테두리는 보조), `.terms-detail summary`(밑줄과 펼침 표시), 기본 체크 상자(체크 표시로 상태 구분) | [KWCAG 5.4.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.1.json), [KWCAG 7.3.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.3.1.json), [KRDS 체크박스 (Checkbox) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_06_02.html) |
| 5.4.3 | 텍스트 콘텐츠의 명도 대비 | `styles.css`의 `:root` 색 변수(본문, 보조 글자, 오류, 버튼, 머리글, 완료 안내, 입력 테두리, 초점 표시) | [KWCAG 5.4.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.3.json), [KRDS 텍스트 입력 필드 (Text input) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_09_03.html), [KRDS 체크박스 (Checkbox) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_06_02.html), [KRDS 버튼 (Button) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_05_02.html) |
| 5.4.4 | 콘텐츠 간의 구분 | `styles.css`의 `.form-section` 테두리와 흰 배경(바탕은 연회색), `.check-row--all` 배경, `.agree-item + .agree-item` 구분선, `.terms-body` 왼쪽 선과 배경 | [KWCAG 5.4.4](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.4.json) |
| 6.1.1 | 키보드 사용 보장 | `index.html`의 조작 요소를 모두 `input`, `button`, `summary` 기본 요소로 구현. 약관 내용은 스크롤 상자 대신 `details`로 펼쳐 키보드로 끝까지 읽을 수 있다. | [KWCAG 6.1.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.1.json), [KRDS 버튼 (Button) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_05_02.html), [KRDS 체크박스 (Checkbox) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_06_02.html), [KRDS 동의 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_03.html) |
| 6.1.2 | 초점 이동과 표시 | `styles.css`의 `input:focus-visible`, `summary:focus-visible`, `.button-primary:focus-visible`(3px 실선), `.complete h2:focus`(3px 점선). 양수 `tabindex` 없음. 초점 순서는 화면 순서와 같다. | [KWCAG 6.1.2](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.2.json), [KRDS 텍스트 입력 필드 (Text input) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_09_03.html), [KRDS 텍스트 입력 필드 (Text input) · 상호작용 가이드라인](https://www.krds.go.kr/html/site/component/component_09_03.html), [KRDS 버튼 (Button) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_05_02.html), [KRDS 로그인 정보 입력 · 접근성 가이드라인](https://www.krds.go.kr/html/site/service/service_03_05.html), [KRDS 입력폼 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_08.html) |
| 6.1.3 | 조작 가능 | `styles.css`의 입력 높이 `3rem`, 체크 상자 `1.5rem`(24px), `summary` 최소 높이 `1.5rem`, 가입하기 버튼 최소 높이 `3.25rem` | [KWCAG 6.1.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.3.json), [KRDS 버튼 (Button) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_05_02.html) |
| 6.4.2 | 제목 제공 | `index.html`의 `title`("회원가입 - 한국 웹 접근성 플레이그라운드", 완료 뒤 "회원가입 완료 - …"), `h1` 회원가입, 입력폼 절마다 `h2`(회원 정보, 약관 동의), 이용약관 조항마다 `h3`, 완료 안내 `h2` | [KWCAG 6.4.2](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.2.json), [KRDS 입력폼 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_08.html), [KRDS 동의 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_03.html) |
| 6.5.3 | 레이블과 네임 | `index.html`의 입력·체크 상자 레이블, `summary` 3개, 가입하기 버튼. 조작 요소에 `aria-label`과 `aria-labelledby`를 쓰지 않아 보이는 글자가 그대로 이름이다. | [KWCAG 6.5.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.5.3.json) |
| 7.1.1 | 기본 언어 표시 | `index.html`의 `<html lang="ko">` | [KWCAG 7.1.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.1.1.json) |
| 7.2.1 | 사용자 요구에 따른 실행 | `signup.js`의 `input`·`change` 처리기(오류 문구와 체크 상태만 바꾼다), `submit` 처리기(초점 이동은 여기서만 한다). 화면을 열 때 여는 창이나 대화상자가 없다. 전체 동의를 눌러도 초점은 그 체크 상자에 남는다. | [KWCAG 7.2.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.2.1.json), [NIA 3.2.1-s4](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.2.1-s4.json), [NIA 3.2.1-s5](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.2.1-s5.json), [KRDS 맥락적 도움말 (Contextual help) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_08_03.html), [KRDS 동의 · 상호작용 가이드라인](https://www.krds.go.kr/html/site/global/global_03.html) |
| 7.3.1 | 오류 정정 | `index.html`의 입력·필수 동의마다 둔 `.field-error`(`id="…-error"`), `form`의 `novalidate`, `signup.js`의 `rules`, `showError`, `clearError`, `submit` 처리기 | [KWCAG 7.3.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.3.1.json), [NIA 3.3.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.1.json), [NIA 3.3.1-s4](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.1-s4.json), [NIA 3.3.1-s5](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.1-s5.json), [KRDS 오류 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_07.html), [KRDS 입력폼 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_08.html), [KRDS 입력폼 · 상호작용 가이드라인](https://www.krds.go.kr/html/site/global/global_08.html) |
| 7.3.2 | 레이블 제공 | `index.html`의 입력 5개와 체크 상자 5개. 모두 보이는 `label for`로 연결했고 placeholder를 쓰지 않았다. 약관 체크 상자 묶음은 `fieldset`과 `legend`(약관 동의)로 묶었다. | [KWCAG 7.3.2](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.3.2.json), [NIA 3.3.2](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.2.json), [NIA 3.3.2-s4](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.2-s4.json), [NIA 3.3.2-s5](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.2-s5.json), [KRDS 텍스트 입력 필드 (Text input) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_09_03.html), [KRDS 텍스트 입력 필드 (Text input) · 개발 시 접근성 관련 주의 사항](https://www.krds.go.kr/html/site/component/component_09_03.html), [KRDS 체크박스 (Checkbox) · 접근성 가이드라인](https://www.krds.go.kr/html/site/component/component_06_02.html), [KRDS 체크박스 (Checkbox) · 개발 시 접근성 관련 주의 사항](https://www.krds.go.kr/html/site/component/component_06_02.html), [KRDS 입력폼 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_08.html) |
| 7.3.3 | 접근 가능한 인증 | `index.html`의 이메일 `autocomplete="email"`, 비밀번호와 비밀번호 확인 `autocomplete="new-password"`, 이름 `autocomplete="name"`, 휴대전화 `autocomplete="tel"`. 붙여넣기를 막지 않고 CAPTCHA를 쓰지 않는다. "입력한 비밀번호 표시" 체크 상자로 입력한 값을 눈으로 확인할 수 있다. | [KWCAG 7.3.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.3.3.json), [NIA 3.3.3-s4](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.3-s4.json), [NIA 3.3.3-s5](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.3-s5.json), [KRDS 로그인 정보 입력 · 접근성 가이드라인](https://www.krds.go.kr/html/site/service/service_03_05.html), [KRDS 개인 식별 정보 입력 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_01.html) |
| 7.3.4 | 반복 입력 정보 | `index.html` 양식 전체. 한 화면에서 같은 정보를 두 번 묻지 않는다. 비밀번호 확인은 KWCAG 7.3.4 본문이 보안 목적 재입력으로 예외를 둔 경우다. 오류가 나도 입력한 값을 지우지 않는다. | [KWCAG 7.3.4](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.3.4.json), [KRDS 입력폼 · 접근성 가이드라인](https://www.krds.go.kr/html/site/global/global_08.html) |
| 8.1.1 | 마크업 오류 방지 | `index.html` 전체 | [KWCAG 8.1.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-8.1.1.json) |

## 확인한 동작

### 코드 검토로 확인

- 5.3.2: 마크업 순서가 화면 순서와 같다. `styles.css`에 `order`, `position`, `grid-area`, `flex-direction: *-reverse`가 없다. 오류 문구는 처음부터 입력 바로 뒤에 둔 빈 `p`라서 오류가 나도 순서가 바뀌지 않는다. 확인한 코드: `index.html` 전체, `styles.css` 전체
- 5.3.3: 지시 문장은 "가입하기 버튼", "비밀번호 칸"처럼 요소 이름으로 가리키고 "위", "오른쪽", 색을 쓰지 않는다. 필수 표시는 "(필수)" 글자다. 확인한 코드: `index.html`의 `.lead`, `#password-confirm-hint`, `.field-tag`, `signup.js`의 비밀번호 확인 오류 문구
- 5.4.1: 오류는 문구(글자)와 `.field-error::before`의 느낌표 아이콘으로 알리고, `input[aria-invalid="true"]`의 빨간 2px 테두리는 덧붙인 표시다. 약관 내용 보기는 색과 밑줄, 펼침 삼각형으로 구분한다. 체크 상자는 기본 요소라 체크 표시가 상태를 나타낸다. 확인한 코드: `styles.css`의 `.field-error`, `.field-error::before`, `input[aria-invalid="true"]`, `.terms-detail summary`, `.check-row input[type="checkbox"]`
- 5.4.3: 쓰인 색 쌍을 WCAG 상대 휘도 공식으로 계산했다. 글자: 본문 `#1e2124`/흰색 16.18:1, `#1e2124`/`#f4f5f6` 14.82:1, `#1e2124`/`#f0f9f2` 15.05:1, 보조 글자 `#4d5257`/흰색 7.89:1, `#4d5257`/`#f4f5f6` 7.23:1, 오류 `#c0221b`/흰색 6.02:1, 약관 내용 보기 `#0b50d0`/흰색 6.83:1, 가입하기 흰 글자/`#0b50d0` 6.83:1, 마우스 올림 흰 글자/`#0b3a8c` 10.51:1, 머리글 흰 글자/`#063a74` 11.26:1. 모두 4.5:1 이상이다. 글자가 아닌 요소: 입력 테두리 `#6d7882`/흰색 4.51:1, 초점 표시 `#0b50d0`/흰색 6.83:1·`#f4f5f6` 6.26:1·`#f0f9f2` 6.36:1, 완료 안내 테두리 `#1a7f37`/`#f0f9f2` 4.73:1, 오류 아이콘 `#c0221b`/흰색 6.02:1. 모두 3:1 이상이다. 확인한 코드: `styles.css`의 `:root`
- 5.4.4: 입력폼 절은 연회색 바탕 위의 흰 상자와 테두리로, 약관 항목은 구분선으로, 약관 내용은 왼쪽 선과 배경색으로 나뉜다. 확인한 코드: `styles.css`의 `body`, `.form-section`, `.check-row--all`, `.agree-item + .agree-item`, `.terms-body`
- 6.1.1: 조작 요소가 `input` 10개, `summary` 3개, `button` 1개로 모두 기본 요소다. 마우스로만 동작하는 처리기(`click`, `mousedown`, `mouseover`)가 없다. 약관 내용 영역에 고정 높이와 스크롤이 없다. 확인한 코드: `index.html`(`grep`으로 `on*=` 속성 0건), `signup.js`의 `addEventListener` 6곳, `styles.css`의 `.terms-body`
- 6.1.2: `tabindex`는 완료 안내 `h2#complete-heading`의 `-1` 하나다. 입력, `summary`, 버튼마다 `:focus-visible` 테두리가 있고, 완료 제목은 `:focus` 점선이다. 확인한 코드: `index.html`의 `tabindex`, `styles.css`의 `input:focus-visible`, `summary:focus-visible`, `.button-primary:focus-visible`, `.complete h2:focus`
- 6.1.3: 체크 상자 `width`·`height` `1.5rem`(24px), 입력 `min-height: 3rem`, `summary` `min-height: 1.5rem`, 버튼 `min-height: 3.25rem`이다. 체크 상자는 레이블을 눌러도 선택된다. 확인한 코드: `styles.css`의 `.check-row input[type="checkbox"]`, 입력 선택자, `.terms-detail summary`, `.button-primary`
- 6.4.2: `title`이 화면 내용을 알리고 완료 뒤에는 `showComplete()`가 "회원가입 완료 - …"로 바꾼다. 제목 수준은 `h1` → `h2` → `h3` 순서이고 건너뛰는 수준이 없다. "약관 동의" `h2`는 `legend` 안에 있어 묶음 이름과 절 제목을 함께 한다. 확인한 코드: `index.html`의 `title`, `h1`~`h3`, `legend`, `signup.js`의 `showComplete`
- 6.5.3: `aria-label`과 `title` 속성이 없다. `aria-labelledby`는 조작 요소가 아닌 완료 안내 `section` 한 곳에만 있다. 입력과 체크 상자의 이름은 `label` 글자, `summary`와 버튼의 이름은 자기 글자다. 확인한 코드: `index.html`(`grep`으로 `aria-label=`·`title=` 0건, `aria-labelledby=` 1건)
- 7.1.1: `html` 요소의 `lang="ko"`. 확인한 코드: `index.html` 2번째 줄
- 7.2.1: `focus`, `focusin`, `keyup`, `load`, `DOMContentLoaded` 처리기가 없다. `input`·`change` 처리기는 `validate`, `revalidateIfInvalid`, `type` 바꾸기, `checked` 바꾸기만 부른다. `window.open`, `location`, `submit()`, `requestSubmit()`, `showModal()`이 없다. `focus()`는 `submit` 처리기와 그 안에서 부르는 `showComplete()`에만 있다. 확인한 코드: `signup.js`(`grep`으로 처리기와 호출 위치 확인, 188·196·206·218·226·242·245·254번째 줄)
- 7.3.1 확인점 1·2: 입력마다 `rules`에 검사와 문구가 있고, 문구에 항목명과 고치는 방법이 있다(예: "비밀번호는 8자 이상으로, 영문·숫자·특수문자를 모두 넣어야 합니다. 부족한 조건: 숫자, 특수문자."). 공통 문구만 보이는 곳이 없다. 확인한 코드: `signup.js`의 `rules`
- 7.3.1 확인점 3: `showError`가 문구를 넣고 `aria-invalid="true"`를 붙이고 문구 `id`를 `aria-describedby`에 덧붙인다. `clearError`가 문구를 비우고 `aria-invalid`와 그 `id`를 뗀다. 문구 `id`는 입력 `id` + `-error`로 모두 있는 요소를 가리킨다. 필수 동의는 묶음이 아니라 체크 상자 하나씩 검사하므로 문구를 각 체크 상자에 연결했다. 확인한 코드: `signup.js`의 `showError`, `clearError`, `addDescribedBy`, `removeDescribedBy`, `index.html`의 `.field-error`
- 7.3.1 확인점 4·5: 제출 버튼은 양식 안의 `<button type="submit">`이고, `form`에 `novalidate`가 있다. `submit` 처리기가 `preventDefault()`로 전송을 막고 오류가 있으면 첫 오류 입력에 `focus()`를 부른다. 확인한 코드: `index.html`의 `#signup-form`, `.button-primary`, `signup.js`의 `submit` 처리기
- 7.3.1 확인점 6: 오류 문구 요소는 처음에 비어 있고 `.field-error:empty`로 보이지 않는다. 빈 입력은 제출할 때만 알리고, `change` 처리기는 값이 있거나 이미 오류인 입력만 검사한다. 확인한 코드: `index.html`의 `.field-error`, `styles.css`의 `.field-error:empty`, `signup.js`의 `change` 처리기
- 7.3.1 권장 사항: 오류가 나도 입력값을 지우지 않는다(`form.reset()`은 가입 완료 때만 부른다). 이메일, 비밀번호, 휴대전화 번호는 입력 전에 형식과 예시를 글자로 안내하고 `aria-describedby`로 연결했다. 확인한 코드: `signup.js`의 `showComplete`, `index.html`의 `#email-hint`, `#password-hint`, `#phone-hint`
- 7.3.2: 입력 10개의 `id`가 모두 `label for`와 같다(Python `html.parser`로 만든 검사기에서 레이블 없는 입력 0개). 레이블을 숨기지 않았고 placeholder가 없다. 선택 상자가 없다. 확인한 코드: `index.html` 전체
- 7.3.3: 비밀번호 입력에 `paste` 처리기와 `onpaste`가 없다. 이메일과 비밀번호에 브라우저가 계정을 저장할 수 있는 `autocomplete` 값이 있다. CAPTCHA와 퍼즐이 없다. 확인한 코드: `index.html`의 `#email`, `#password`, `#password-confirm`, `signup.js`(`grep`으로 `paste` 0건)
- 7.3.4: 같은 정보를 두 번 묻는 입력은 비밀번호 확인뿐이다. 확인한 코드: `index.html`의 입력 5개
- 8.1.1: Python `html.parser`로 만든 검사기로 열고 닫음, 중첩, 같은 요소의 중복 속성, 중복 `id`를 확인했다. 오류 0건, `id` 27개가 모두 유일하다. `label for` 값과 `aria-describedby` 값이 모두 있는 `id`를 가리킨다. 확인한 코드: `index.html` 전체

### 최초 구현 시 브라우저에서 확인

최초 구현의 브라우저 검증은 Playwright 1.65.1의 헤드리스 Chromium에서 진행했다. 접근 가능한 이름과 설명은 Chrome DevTools Protocol의 `Accessibility.getPartialAXTree`·`getFullAXTree`로 읽었다. 화면 낭독 프로그램(센스리더, NVDA, VoiceOver)과 Chromium 밖의 브라우저로는 확인하지 않았다.

- 6.4.2, 7.1.1: 화면을 열자 제목이 "회원가입 - 한국 웹 접근성 플레이그라운드", `document.documentElement.lang`이 `ko`였다. 제목 요소는 H1 회원가입 / H2 회원 정보 / H2 약관 동의 / H3 제1조 목적·제2조 회원 가입·제3조 회원 탈퇴였다.
- 7.3.1: 처음 연 화면에서 내용이 있는 오류 문구가 0개, `aria-invalid`가 붙은 요소가 0개였다.
- 7.3.2, 6.5.3: 접근성 트리에서 입력의 이름이 레이블 글자와 같았다. 예: `#name` textbox "이름 (필수)", `#password` textbox "비밀번호 (필수)", `#phone` textbox "휴대전화 번호 (선택)", `#agree-terms` checkbox "(필수) 이용약관 동의". 형식 안내는 설명으로 나왔다(`#email` 설명 "로그인할 때 아이디로 씁니다. 예: name@example.com"). `summary` 3개는 role `DisclosureTriangle`, 이름 "이용약관 내용 보기" 등 보이는 글자 그대로였고, 가입하기 버튼은 `getByRole('button', { name: '가입하기', exact: true })`로 1개 찾았다. 약관 체크 상자 묶음은 group "약관 동의"로 나왔다.
- 6.1.1, 6.1.2, 7.2.1: 1280×900 화면에서 Tab을 16번 눌렀다. 초점이 이름 → 이메일 → 비밀번호 → 비밀번호 확인 → 입력한 비밀번호 표시 → 휴대전화 번호 → 전체 동의 → 이용약관 동의 → 이용약관 내용 보기 → 개인정보 동의 → 개인정보 내용 보기 → 이벤트·혜택 동의 → 이벤트·혜택 내용 보기 → 가입하기 → `body`(브라우저 영역) → 이름 순서로 돌았다. 초점을 받은 요소마다 `outline`이 `solid 3px rgb(11, 80, 208)`이었다. 그동안 주소가 바뀌지 않았고 새 창이 0개 열렸다.
- 7.3.1: 빈 양식에서 이름 입력에 초점을 두고 Enter를 눌렀다. 이름, 이메일, 비밀번호, 비밀번호 확인, 이용약관 동의, 개인정보 동의 6곳에 문구가 나타났고 선택 항목인 휴대전화 번호에는 나타나지 않았다. 초점은 `#name`에 있었고 주소가 바뀌지 않았다(전송 막힘). `#email`은 invalid=true, `aria-describedby="email-hint email-error"`, 설명 "로그인할 때 아이디로 씁니다. 예: name@example.com 이메일을 입력해 주세요."였다. `#agree-terms`는 invalid=true, 설명 "이용약관 동의는 필수입니다. 동의해야 가입할 수 있습니다."였다. 375px 전체 화면 캡처에서 문구가 각 입력과 체크 상자 바로 아래에 느낌표 아이콘과 함께 보였다.
- 7.3.1: 이름만 바르게 넣고 이메일 "abc", 비밀번호 "abcdefgh", 비밀번호 확인 "abcdefg", 휴대전화 "123"을 넣은 뒤 가입하기 버튼에서 Enter를 눌렀다. 초점이 첫 오류 입력인 `#email`로 갔다. 비밀번호 문구는 "부족한 조건: 숫자, 특수문자."였고, 비밀번호 확인은 "비밀번호 확인이 비밀번호와 다릅니다…", 휴대전화는 "01로 시작하는 숫자 10~11자리로…"였다. 입력값 `["홍길동","abc","abcdefgh","123"]`이 그대로 남았다.
- 7.3.1: 이메일 끝에 "@example.com"을 입력하자 오류 문구가 비고 `aria-invalid`가 사라졌으며 `aria-describedby`가 `email-hint`로 돌아왔다. 초점은 `#email`에 그대로 있었다.
- 7.3.1, 7.2.1: 휴대전화에 "0101234"를 입력하고 Tab을 누르자 초점이 다음 요소(전체 동의)로 정상 이동했고 휴대전화 아래에 형식 오류 문구가 나타났다. "010-1234-5678"로 고치자 문구가 사라졌다.
- 7.3.3: 비밀번호 입력에 취소 가능한 `paste` 이벤트를 보내자 `dispatchEvent`가 `true`를 돌려줘 막히지 않았다. `autocomplete`는 두 비밀번호 입력 모두 `new-password`였다. "입력한 비밀번호 표시"에서 Space를 누르자 두 입력의 `type`이 `text`가 됐고 초점은 체크 상자에 남았다. 다시 Space를 누르자 `password`로 돌아왔다.
- 7.3.1: 비밀번호를 "abcd123!"로 고치자 비밀번호 오류가 사라지고 비밀번호 확인에는 불일치 문구가 남았다. 비밀번호 확인도 "abcd123!"로 고치자 문구가 사라졌다.
- 7.2.1: 전체 동의에서 Space를 누르자 약관 체크 상자 3개가 모두 선택되고 필수 동의 오류 2개가 사라졌으며 초점은 전체 동의에 남았다. 이벤트·혜택 동의를 Space로 해제하자 전체 동의도 해제됐다.
- 6.1.1: 첫 `summary`(이용약관 내용 보기)에서 Enter를 누르자 `details`가 열려 "제1조 목적" 제목이 보였고, 접근성 트리의 expanded가 false에서 true로 바뀌었다. 초점은 `summary`에 남았다.
- 6.4.2, 6.1.2: 모든 값을 바르게 넣고 가입하기 버튼에서 Enter를 누르자 양식이 숨겨지고 완료 안내가 보였다. 초점은 `h2#complete-heading`("회원가입이 완료되었습니다")에 있었고 `outline`이 `dashed 3px rgb(11, 80, 208)`이었다. 제목은 "회원가입 완료 - 한국 웹 접근성 플레이그라운드"로 바뀌었고, 주소는 바뀌지 않았고 새 창은 0개였다.
- 6.1.3, 5.4.4: 약관 내용을 모두 펼친 상태로 320px, 375px, 1280px 폭에서 `input`, `summary`, `button`, `label`의 크기를 쟀다. 가로나 세로가 24px 미만인 요소가 0개였다. 세 폭 모두 `scrollWidth`와 `clientWidth`가 같아 가로 스크롤이 없었다. 375px 전체 화면 캡처에서 회원 정보와 약관 동의가 흰 상자와 테두리로, 약관 항목이 구분선으로 나뉘어 보였다.
- 8.1.1, 7.2.1: 위 조작 전체에서 콘솔 오류가 0건이었다.

### 공개용 문구 수정 후 확인

Aside Browser에서 확인했다. 빈 양식에서 이름 오류와 초점 이동을 확인했다. 예시 값을 입력하고 필수 약관에 동의하자 완료 안내가 나타났고 초점은 완료 제목으로 옮겨 갔다.

코드에서 스크립트가 제출 처리기를 등록한 뒤에만 제출 버튼이 활성화되는 것을 확인했다.
