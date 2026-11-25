# 접근 가능한 데이터 표 실행 결과

## 목적과 사용 방법

가상의 도서관별 운영 시간과 방문 안내를 비교하는 데이터 표다. ‘별마루’ 행과 ‘주말 운영’ 열의 교차점에서 ‘휴관’을 찾을 수 있다.

표가 화면보다 넓으면 표 안에서 좌우로 스크롤한다. 키보드에서는 `Tab`으로 표 영역에 이동한 뒤 `←`와 `→`를 누른다. `Tab`을 한 번 더 누르면 근거 링크로 이동한다. 화면낭독프로그램에서는 표 탐색 명령으로 ‘도서관별 운영 안내’ 표에 들어가 행과 열을 탐색한다.

## 적용 기준과 참고 자료

- [KWCAG 5.3.1 표의 구성](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.1.json). 표 정보를 제공하고 제목 셀과 데이터 셀을 구분한다. `caption`, `th scope="col"`, `th scope="row"` 사용은 [NIA 제작기법의 적용 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.3.1-s4.json)를 참고했다.
- [KWCAG 5.4.1 색에 무관한 콘텐츠 인식](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.1.json). 운영하지 않는 시간대에는 ‘휴관’을 글자로 표시했다.
- [KWCAG 5.4.3 텍스트 콘텐츠의 명도 대비](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.3.json). 본문, 표 머리글, 휴관 상태 및 링크의 텍스트 색은 각 배경색과 4.5:1 이상 대비를 확보했다.
- [KWCAG 6.1.1 키보드 사용 보장](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.1.json)과 [KWCAG 6.1.2 초점 이동과 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.2.json). 표 영역은 가로 스크롤이 필요할 때 탭 순서에 들어간다. 초점은 테두리로 표시하고 방향키 스크롤은 브라우저 기본 동작을 사용한다.
- [KWCAG 6.4.2 제목 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.2.json)과 [KWCAG 7.1.1 기본 언어 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.1.1.json). 문서 제목과 `h1`·`h2`를 지정하고 `lang="ko"`를 설정했다.

## 검증 결과

### 코드와 스타일

- HTML과 브라우저 DOM에서 표 제목, 열 머리글 5개, 행 머리글 4개와 각 `scope` 값을 확인했다. 데이터 셀은 `td`로 제공한다.
- CSS 전경색과 배경색으로 명도 대비를 계산했다. 검사한 텍스트 색상 조합 중 최저는 6.92:1이었다.

### 브라우저

2026년 11월 25일에 Aside Browser(Chromium 156.0.8078.100)에서 확인했다.

- 데모 목록에 새 항목이 나타났고 상세 화면에서 독립 데모를 열었다. 브라우저의 접근성 스냅샷에서 이름이 있는 표 영역과 표, 표 제목 텍스트를 확인했다.
- 1440px 너비에서 모든 열이 한 화면에 들어왔다. 스크롤 안내는 숨겨지고 표 영역은 탭 순서에서 빠졌다.
- 320px 너비에서 페이지 전체의 가로 스크롤 없이 표 영역 안에서만 가로 스크롤이 발생했다. `Tab`으로 표 영역에 이동하자 3px 초점 테두리가 표시됐다. 오른쪽 방향키로 마지막 열을 확인하고 왼쪽 방향키로 처음 위치에 돌아왔다. `Tab`으로 근거 링크에 이동한 뒤 `Shift+Tab`으로 표 영역에 돌아왔다.

## 미검증 항목

VoiceOver와 NVDA가 셀을 탐색할 때 읽어 주는 행·열 머리글, 실제 모바일 기기에서의 터치 스크롤, 다른 브라우저에서의 동작은 별도로 확인이 필요하다.
