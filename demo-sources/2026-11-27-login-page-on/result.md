# 로그인 · 접근성 자료 적용 (on) 실행 결과

푸른숲도서관 회원 로그인 화면을 국내 접근성 자료(KWCAG 2.2, NIA 제작기법)에 맞춰 개선한 결과입니다. [기본 개발 (off)](/?demo=2026-11-27-login-page-off) 화면을 복사한 뒤, 자료를 조회해 적용하는 개발 절차를 켜고 같은 요청서 기준으로 고쳤습니다.

확장 검사에서 off의 명도 대비 위반(보조 링크 2.32:1)이 사라졌습니다. 입력란에는 보이는 레이블 ‘아이디’, ‘비밀번호’가 생겼습니다. 키보드 조작, 320px 화면, 마크업 검사 결과는 off와 같았습니다.

## 사용 방법

- 아이디 `reader01`, 비밀번호 `green1234`를 입력하고 ‘로그인’을 누르면 환영 화면(`welcome.html`)으로 이동합니다.
- 환영 화면에서 ‘로그아웃’을 누르면 로그인 화면으로 돌아갑니다.
- 빈 칸으로 제출하거나 틀린 비밀번호를 넣으면 입력란 아래에 오류 문구가 나타납니다.
- 입력란 안의 레이블은 입력란에 초점이 가거나 값이 있으면 작아져 입력란 위쪽에 남습니다.
- off 화면과 나란히 열어 보조 링크 색, 입력란 레이블, 계정 불일치 때의 오류 표시를 비교합니다.

## 요청서와 조정한 부분

개발 에이전트에게 준 ‘화면 요청서: 로그인’의 전문입니다.

> ### 공통 사항
>
> 가상의 기관 ‘푸른숲도서관’(전시 일정은 ‘푸른숲미술관’)의 화면입니다. HTML, CSS, JavaScript만 쓰고 외부 라이브러리와 CDN은 쓰지 않습니다. 모든 파일은 지정한 데모 폴더 안에 두고, 진입 페이지는 `index.html`입니다. 페이지 제목은 `<화면 이름> - 한국 웹 접근성 플레이그라운드`, 설명(meta description)은 요청서에 적은 문장을 씁니다. 데스크톱과 폭 320px 화면에서 모두 쓸 수 있어야 합니다. 결과 문서는 다른 담당자가 쓰므로 만들지 않습니다.
>
> ### 요청 내용
>
> 설명: 예시 계정으로 로그인하고 로그아웃합니다.
>
> 푸른숲도서관 회원 로그인 화면을 만들어 주세요. 예시 계정은 아이디 `reader01`, 비밀번호 `green1234`이고 화면 아래에 예시 계정을 안내합니다. 아이디나 비밀번호가 비었거나 틀리면 오류를 보여 주고, 맞으면 환영 화면(`welcome.html`)으로 이동합니다. 환영 화면의 ‘로그아웃’을 누르면 로그인 화면으로 돌아갑니다.
>
> 디자인 시안: 입력란 위에 별도 제목을 두지 않고 입력란 안의 안내 문구(‘아이디’, ‘비밀번호’)로 표시합니다. 비밀번호 칸 오른쪽 안쪽에 눈 모양 아이콘 버튼을 두어 비밀번호를 보이거나 숨깁니다. 로그인 버튼 아래 ‘아이디 찾기 · 비밀번호 찾기 · 회원가입’ 링크는 13px, `#aaaaaa`로 작게 둡니다. 이동할 페이지는 아직 없으니 주소는 `#`으로 둡니다. 오류가 나면 해당 입력란의 테두리를 빨간색으로 바꾸고 아래에 짧은 빨간 문구를 표시합니다.

요청서 시안과 다르게 구현한 부분은 아래와 같습니다. 근거 구분은 on 개발 에이전트의 보고를 따랐습니다.

| 요청서 시안 | 조정한 내용 | 이유 |
| --- | --- | --- |
| 보조 링크 13px, `#aaaaaa` | 색을 `#666666`으로 바꾸고 밑줄을 넣었습니다. 13px은 유지했습니다. 구분점 `·`도 `#666`으로 맞췄고, 링크 위아래 안쪽 여백을 8px로 늘렸습니다. | off의 보조 링크는 흰 배경 대비가 2.32:1(확장 측정)이라 5.4.3(KWCAG 요구사항)에 못 미칩니다. 여백은 6.1.3의 조작 크기 권장(NIA 권장 사항)을 따랐습니다. |
| 입력란 안의 안내 문구만 표시 | 안내 문구를 `label`로 바꿔 입력란 안에 보이게 두었습니다. 입력란 위에 별도 제목을 두지 않는 모양은 유지했습니다. | placeholder만 쓰면 입력을 시작할 때 안내가 사라집니다(7.3.2, NIA 권장 사항). off는 숨김 레이블과 placeholder가 같은 글을 중복했습니다. |
| 오류 시 빨간 테두리와 짧은 빨간 문구 | 계정이 틀리면 문구가 붙은 비밀번호 칸만 오류로 표시하고 그 칸으로 초점을 옮깁니다. 문구는 ‘아이디 또는 비밀번호가 올바르지 않습니다. 다시 입력해 주세요.’입니다. | off는 문구가 없는 아이디 칸에도 빨간 테두리만 생겼습니다. 색만으로 오류를 알리지 않으려는 조정입니다(5.4.1 KWCAG 요구사항, 7.3.1 NIA 권장 사항). |
| 요청서에 없음 | 예시 계정 상자에 테두리를 더했습니다. | 이웃한 콘텐츠를 구분합니다(5.4.4, KWCAG 요구사항). |

비밀번호 칸의 눈 모양 아이콘 버튼은 시안대로 두었습니다. 버튼 이름은 ‘비밀번호 표시’이고 `aria-pressed`로 상태를 알립니다.

접근성과 무관한 기능 수정도 하나 있습니다. 개발 에이전트는 로그아웃 뒤 브라우저의 ‘뒤로 가기’로 캐시된 환영 화면이 로그인 상태처럼 다시 보일 수 있다고 판단했습니다. 그래서 `welcome.js`에 `pageshow` 처리를 더해, 로그인 정보가 없으면 `index.html`로 보냅니다.

## 개발 조건

- 모델과 실행 도구: off와 같은 Claude Sonnet 5.5, Claude Code 2.1.332(헤드리스 실행)
- 실행 위치: 이 저장소 밖의 빈 폴더입니다. 그래서 이 저장소의 프로젝트 지침은 읽지 않았습니다.
- 개발 절차: off 화면을 복사한 폴더에서 국내 접근성 자료를 조회해 적용하는 절차를 켰습니다.
- 지시: 같은 요청서 기준으로 화면을 개선하게 했습니다. 요청서 시안이 KWCAG 요구사항과 충돌하면 요구사항을 우선하도록 요청자가 미리 승인했습니다. 질문하지 말고 개선까지 마치고, 접근성과 무관한 기능 결함을 고쳤으면 따로 구분해 적게 했습니다.
- 도구: 브라우저 도구와 MCP 서버가 없었고, 디자인 검사 플러그인을 껐습니다. 그래서 개발 에이전트는 코드와 명령으로만 확인했습니다. 허용한 셸 명령 범위가 좁아 일부 복합 명령이 거부됐습니다.
- 보존: on 개발 뒤에도 off 화면의 파일이 바뀌지 않았음을 해시로 확인했습니다.
- 재실행: 처음에는 다른 모델(Claude Opus 5.5)로 이 저장소 안에서 off 화면 13개를 만들었습니다. 13개 모두 확장 검사 위반이 0건이었고, 개발 에이전트들은 이 저장소의 프로젝트 지침(AGENTS.md)과 일반 지식에 따라 요청서의 시안을 접근성 기준에 맞춰 바꿨다고 보고했습니다. 프로젝트 지침과 모델의 영향을 줄이려고 모델과 실행 위치를 바꿔 처음부터 다시 만들었고, 이 문서는 다시 만든 결과입니다. 첫 실행에서는 on 화면을 만들지 않았습니다.

## 적용 기준과 참고 자료

on 개발 에이전트가 보고한 적용 항목을 근거 구분별로 정리했습니다.

### KWCAG 2.2 요구사항

| 항목 | 이 화면에서의 적용 |
| --- | --- |
| [5.4.3 텍스트 콘텐츠의 명도 대비](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.3.json) | 보조 링크와 구분점 색을 `#666666`으로 바꾸고, 링크에 밑줄을 넣었습니다. |
| [5.4.1 색에 무관한 콘텐츠 인식](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.1.json) | 계정 불일치 때 문구 없이 빨간 테두리만 생기던 아이디 칸 표시를 없앴습니다. |
| [5.4.4 콘텐츠 간의 구분](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.4.json) | 예시 계정 상자에 테두리를 더했습니다. |
| [7.3.1 오류 정정](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.3.1.json) | 오류 문구를 입력란과 `aria-describedby`로 연결하고 첫 오류 입력란으로 초점을 옮기는 off의 처리를 유지했습니다. |
| [7.3.2 레이블 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.3.2.json) | 아이디와 비밀번호 입력란에 `label for`를 하나씩 연결했고, 레이블을 화면에 보이게 바꿨습니다. |
| [6.5.3 레이블과 네임](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.5.3.json) | 눈 모양 버튼의 이름 `aria-label="비밀번호 표시"`를 유지했습니다. |

아래 11개 항목은 본문(`text`) 앞부분을 읽고 현재 코드가 충족한다고 판단해 코드를 바꾸지 않았습니다. [5.1.1 적절한 대체 텍스트 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.1.1.json) · [5.3.2 콘텐츠의 선형구조](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.2.json) · [5.3.3 명확한 지시사항 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.3.json) · [6.1.1 키보드 사용 보장](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.1.json) · [6.1.2 초점 이동과 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.2.json) · [6.4.2 제목 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.2.json) · [6.4.3 적절한 링크 텍스트](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.3.json) · [7.1.1 기본 언어 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.1.1.json) · [7.2.1 사용자 요구에 따른 실행](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.2.1.json) · [7.3.3 접근 가능한 인증](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.3.3.json) · [8.1.1 마크업 오류 방지](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-8.1.1.json)

[6.1.3 조작 가능](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.3.json)도 읽은 항목에 들어 있습니다. 이 화면에서는 아래 NIA 권장 사항으로 적용했습니다.

### NIA 제작기법 권장 사항

- 링크 조작 크기: 보조 링크의 위아래 안쪽 여백을 8px로 늘렸습니다. [NIA 2.1.3 기본 규칙](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-2.1.3-s3.json)
- 보이는 레이블: placeholder로 레이블을 대신하지 않고, 레이블과 placeholder가 같은 글을 중복하지 않게 했습니다. [NIA 3.3.2 기본 규칙](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.2-s3.json) · [적용 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.2-s4.json) · [개선 필요 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.2-s5.json)
- 오류 표시: 오류를 빨간 테두리만으로 알리지 않고 문구가 있는 칸에만 표시했습니다. [NIA 3.3.1 기본 규칙](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.1-s3.json) · [개선 필요 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.3.1-s5.json)

개발 에이전트는 이 밖에 [NIA 1.4.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.4.3-s3.json), [NIA 1.4.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.4.1-s3.json), [NIA 1.4.4](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.4.4-s3.json), [NIA 2.5.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-2.5.3-s3.json)의 기본 규칙과 [NIA 1.4.4 개선 필요 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.4.4-s5.json)를 읽었습니다.

### 자료 밖 근거

- 입력란 안에 보이는 레이블: `placeholder=" "`와 `:placeholder-shown`, 형제 선택자를 쓴 HTML·CSS 기법입니다. 개발 에이전트는 이 구현 방식을 자료에서 읽은 것이 아니라고 밝혔습니다. [:placeholder-shown](https://www.w3.org/TR/selectors-4/#placeholder-shown-pseudo)
- 뒤로 가기 처리: HTML 표준의 `pageshow` 이벤트와 `event.persisted`를 썼습니다. [pageshow 이벤트](https://html.spec.whatwg.org/multipage/indices.html#event-pageshow)

## 검증 결과

Playwright MCP 0.0.86이 실행한 Chrome 159.0.8154.6(창 크기 1280×900)에 KWCAG 검사 0.1.16 확장의 검사 스크립트(axe-core 4.14.1 포함)를 확장과 같은 순서로 주입해 검사했습니다. 확장의 사이드 패널 화면은 쓰지 않았습니다. 마크업은 확장의 마크업 검사와 같은 html-validate 10.17.1 규칙으로 검사했습니다. 규칙 수는 ‘위반 / 판정 보류 / 통과’ 순서이고, 위반 상세의 숫자는 그 규칙에 걸린 요소 수입니다.

| 확인 항목 | 기본 개발 (off) | 접근성 자료 적용 (on) |
| --- | --- | --- |
| 확장 검사: 초기 상태 | 1 / 0 / 24 | 0 / 0 / 25 |
| 확장 검사: 빈 값 제출 | 1 / 0 / 24 | 0 / 0 / 25 |
| 주요 위반 규칙과 측정 대비 | color-contrast 3개 요소(보조 링크, 2.32:1) | 없음 |
| 키보드 조작 | Tab 이동과 초점 표시 있음. 빈 값 제출 시 초점이 아이디 칸으로 가고 두 칸에 `aria-invalid` | off와 같음 |
| 320px 가로 스크롤 | 없음 | 없음 |
| 마크업 오류 | `index.html`, `welcome.html` 0건 | `index.html`, `welcome.html` 0건 |
| 보이는 입력란 레이블 | 없음(placeholder만) | ‘아이디’, ‘비밀번호’ |

### 브라우저에서 관찰한 결과

- on에서는 color-contrast 위반이 없어 두 상태 모두 통과 규칙이 24개에서 25개로 늘었습니다.
- 1280px에서 Tab으로 초점이 차례로 이동했고, 초점을 받은 요소마다 윤곽선 또는 그림자 초점 표시가 있었습니다.
- 빈 값으로 제출하면 두 화면 모두 초점이 아이디 칸으로 갔고 두 칸에 `aria-invalid`가 붙었습니다.
- on의 입력란에는 보이는 레이블 ‘아이디’, ‘비밀번호’가 있었습니다.
- `reader01`, `green1234`를 입력하고 Enter를 누르면 `welcome.html`로 이동했고, ‘로그아웃’을 누르면 `index.html`로 돌아왔습니다. 로그인하지 않고 `welcome.html`을 직접 열면 `index.html`로 이동했습니다.

### 코드에서 확인한 사실

- 계정이 틀리면 on은 아이디 칸에 `aria-invalid`를 붙이지 않고, 비밀번호 칸에 문구와 `aria-invalid`를 붙인 뒤 그 칸으로 초점을 옮깁니다(`login.js`).
- 레이블은 입력란에 초점이 있거나 값이 있으면 12px로 줄어 위쪽으로 움직입니다. `prefers-reduced-motion: reduce`에서는 움직임 효과를 끕니다(`style.css`).
- placeholder 글자는 투명하게 바꿔 화면에 보이지 않습니다(`style.css`).
- `welcome.js`는 `pageshow` 이벤트에서 페이지가 캐시에서 복원됐고 로그인 정보가 없으면 `index.html`로 보냅니다.

## 미검증 항목

- 스크린 리더 발화: 레이블과 오류 문구를 함께 읽는지 확인하지 않았습니다. 두 칸이 모두 비면 초점이 아이디 칸으로만 가므로, 비밀번호 오류 문구는 Tab으로 이동해야 들을 수 있다고 개발 에이전트가 보고했습니다.
- 실제 터치 기기와 Chrome 이외의 브라우저에서는 확인하지 않았습니다.
- 레이블이 위아래로 움직일 때 입력 글자와 겹치는지, 브라우저 자동 완성이 값을 채웠을 때 레이블이 올라가는지 확인하지 않았습니다.
- 계정 불일치 상태와 로그아웃 뒤 ‘뒤로 가기’ 동작은 브라우저에서 확인하지 않았습니다.
- 화면 확대와 고대비 모드는 확인하지 않았습니다.

### 개발 중 읽지 못한 자료

- 개발 에이전트는 자료 레코드 전체가 아니라 본문(`text`)과 기본 규칙(`basicRules`)의 일부만 읽었습니다.
- 6.1.2, 6.4.3, 6.1.1, 7.3.3 등은 본문이 잘려 뒷부분(기대효과 등)을 보지 못했습니다.
- 6.1.2, 6.1.3, 6.4.3의 NIA 적용 사례와 개선 필요 사례는 읽지 않았습니다.
- 자료를 한꺼번에 내려받는 스크립트는 셸 명령 제한으로 실행하지 못해, 자료를 하나씩 요청해 읽었습니다. 조회에 실패한 주소는 없었습니다.
