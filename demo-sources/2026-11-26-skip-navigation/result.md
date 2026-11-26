# 본문 바로가기 실행 결과

같은 메뉴를 제공하는 두 페이지에서 첫 Tab으로 ‘본문 바로가기’를 찾아 반복 메뉴를 건너뛴다. 별도의 비교 페이지에서는 본문으로 연결되지 않는 사례를 살펴본다.

## 사용 방법

1. 이 데모를 새로 열고 첫 `Tab`을 눌러 ‘본문 바로가기’가 나타나는지 본다.
2. `Enter`를 눌러 본문 시작 영역으로 이동한 다음 `Tab`을 한 번 더 눌러 ‘층별 시설과 운영 시간 보기’에 도달하는지 확인한다.
3. 방문 안내에서도 새로 열린 문서의 첫 `Tab`으로 같은 동작을 반복한다. 그다음 연결 대상이 없는 비교 사례를 열어 첫 `Tab`, `Enter`, 다음 `Tab`을 차례로 누른다.
4. 각 화면을 새로 검사한다. 확장의 예상 Tab 순서와 연결 대상 안내를 실제 초점 이동과 비교한다.

## 적용 기준과 참고 자료

### KWCAG 2.2 요구사항

- 개선본과 방문 안내의 첫 링크를 본문 시작 영역에 연결했다. 메뉴를 탐색하지 않고도 본문으로 이동할 수 있다. 연결 대상이 없는 비교 페이지에서만 해당 링크의 조각 식별자를 의도적으로 잘못 지정했다. [6.4.1 반복 영역 건너뛰기](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.1.json)
- 본문 바로가기, 공통 메뉴, 본문 순서로 마크업했다. 기본 HTML 링크는 키보드로 활성화할 수 있다. 링크와 본문에 초점이 오면 외곽선을 표시한다. [5.3.2 콘텐츠의 선형구조](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.2.json) · [6.1.1 키보드 사용 보장](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.1.json) · [6.1.2 초점 이동과 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.2.json)
- 현재 페이지 링크는 글자 굵기와 밑줄 굵기로 구분한다. 메뉴와 본문은 테두리와 여백으로 나눈다. 배경과 대비가 큰 텍스트 색을 적용하고 링크에 안쪽 여백과 간격을 두었다. [5.4.1 색에 무관한 콘텐츠 인식](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.1.json) · [5.4.3 텍스트 콘텐츠의 명도 대비](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.3.json) · [5.4.4 콘텐츠 간의 구분](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.4.json) · [6.1.3 조작 가능](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.3.json)
- 페이지와 실습 구역마다 내용에 맞는 제목을 두고 문서에 `lang="ko"`를 지정했다. 이동할 곳을 설명하는 링크 문구를 그대로 이름으로 사용한다. [6.4.2 제목 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.2.json) · [6.4.3 적절한 링크 텍스트](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.3.json) · [6.5.3 레이블과 네임](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.5.3.json) · [7.1.1 기본 언어 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.1.1.json)
- 링크가 초점을 받으면 화면에 나타난다. 본문으로 이동하는 동작은 링크를 실행할 때 일어난다. 문서 안의 ID는 각각 유일하다. [7.2.1 사용자 요구에 따른 실행](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.2.1.json) · [8.1.1 마크업 오류 방지](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-8.1.1.json)

### NIA 제작기법 권장 사항

첫 링크는 초점을 받는 즉시 보이게 구현했다. 링크가 본문 시작 위치를 직접 가리키도록 연결했다. 연결 ID가 없는 사례는 제작기법의 개선 필요 사례를 재현한다. [NIA 적용 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-2.4.1-s4.json) · [NIA 개선 필요 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-2.4.1-s5.json)

### 구현에 사용한 웹 표준

문서 내 조각 링크 `href="#main-content"`와 본문 `id="main-content"`를 연결한다. 본문에 `tabindex="-1"`를 주어 링크의 이동 대상으로 초점을 받을 수 있게 하고 일반 Tab 순서에서는 제외한다. 공통 메뉴의 현재 페이지는 `aria-current="page"`로 표시한다. [HTML의 문서 내 이동](https://html.spec.whatwg.org/multipage/browsing-the-web.html#scroll-to-the-fragment) · [HTML의 tabindex](https://html.spec.whatwg.org/multipage/interaction.html#the-tabindex-attribute) · [WAI-ARIA의 aria-current](https://www.w3.org/TR/wai-aria-1.2/#aria-current)

## 검증 결과

### 코드에서 확인

- 세 화면 모두 본문 바로가기 링크가 공통 메뉴보다 앞에 있다. 개선본과 방문 안내의 `#main-content`는 본문 ID와 일치한다. 비교 페이지의 `#missing-content`와 일치하는 ID는 없다.
- 정상 페이지는 같은 순서로 같은 메뉴를 제공한다. 본문 첫 링크도 각각 지정했다. CSS에 본문 바로가기의 초점 시 노출 조건과 링크 및 본문의 초점 외곽선이 있다.
- 작성한 색상값으로 계산한 일반 텍스트와 링크의 명도 대비는 확인한 조합 중 최저 7.95:1이다.

### 확장 검사 예상

세 화면 모두 예상 Tab 순서의 첫 항목에 본문 바로가기가 표시된다. 건너뛰기 링크의 연결 대상은 개선본과 방문 안내에서 존재로, 비교 페이지에서 ID 없음으로 표시된다. 예상 순서와 연결 대상은 단서다. 링크를 실행한 뒤 실제 초점이 이동하는지를 확인한다.

### 브라우저와 확장 검사

2026년 11월 26일 Chrome 158.0.8127.37과 KWCAG 검사 0.1.15로 확인했다.

- 개선본과 방문 안내에서 확장은 17번 반복 영역 건너뛰기 항목을 판정 보류 1건으로 표시했다. 상세 안내에는 예상 Tab 순서의 첫 항목이며 연결 대상이 있다고 표시됐다. 키보드로는 첫 Tab에 ‘본문 바로가기’, Enter에 본문 시작 영역, 다음 Tab에 본문의 첫 링크로 초점이 이동했다.
- 비교 페이지에서도 확장은 같은 항목을 판정 보류 1건으로 표시했다. 상세 안내에는 연결 대상 ID나 이름을 찾지 못했다고 표시됐다. Enter를 눌렀을 때 본문으로 이동하지 않고 초점이 ‘본문 바로가기’에 남았다.

## 미검증 항목

화면낭독프로그램이 본문 이동 후 읽기를 시작하는 위치와 다른 브라우저에서의 동작을 확인해야 한다.
