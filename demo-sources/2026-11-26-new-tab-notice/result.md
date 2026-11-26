# 새 탭에서 열리는 자료 링크 실행 결과

같은 도서관 자료를 새 탭에서 여는 링크를 두 페이지에서 비교합니다. 개선본은 보이는 링크 문구에 ‘새 탭에서 열림’을 포함합니다. 비교 페이지는 사전 안내를 의도적으로 생략합니다.

## 사용 방법

1. 개선본에서 Tab을 눌러 자료 링크로 이동합니다. 실행하기 전에 새 탭에서 열림을 알 수 있는지 확인합니다.
2. 링크에서 Enter를 눌러 도서관 이용 안내가 열리는지 확인합니다. 안내 페이지를 닫고 원래 화면으로 돌아옵니다.
3. 비교 페이지를 열고 같은 절차를 반복합니다. 두 페이지에서 KWCAG 검사를 실행해 새 창 안내 단서를 비교합니다.

## 적용 기준과 참고 자료

- **KWCAG 2.2 요구사항** · 자료 링크를 실행할 때만 도착 페이지가 열리도록 했습니다. 개선본의 링크 이름은 목적지와 새 탭 사용을 함께 알려 줍니다. [7.2.1 사용자 요구에 따른 실행](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.2.1.json), [6.4.3 적절한 링크 텍스트](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.3.json), [6.5.3 레이블과 네임](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.5.3.json)
- **KWCAG 2.2 요구사항** · 제목, 자료, 비교 링크를 읽는 순서대로 배치했습니다. 본문과 링크 글자색에 4.5:1 이상의 대비를 적용하고 링크는 밑줄로, 자료 카드와 비교 영역은 테두리로 구분했습니다. [5.3.2 콘텐츠의 선형구조](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.2.json), [5.4.1 색에 무관한 콘텐츠 인식](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.1.json), [5.4.3 텍스트 콘텐츠의 명도 대비](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.3.json), [5.4.4 콘텐츠 간의 구분](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.4.json)
- **KWCAG 2.2 요구사항** · 링크는 기본 HTML 요소로 구현하고, 3px 키보드 초점 표시와 최소 높이 2.75rem을 적용했습니다. [6.1.1 키보드 사용 보장](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.1.json), [6.1.2 초점 이동과 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.2.json), [6.1.3 조작 가능](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.3.json)
- **KWCAG 2.2 요구사항** · 페이지마다 제목을 구분하고 한국어를 선언했습니다. HTML 파서로 문서 구문과 ID를 확인했습니다. [6.4.2 제목 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.2.json), [7.1.1 기본 언어 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.1.1.json), [8.1.1 마크업 오류 방지](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-8.1.1.json)
- **NIA 제작기법 권장 사항** · 새 탭에서 열리는 동작을 링크의 보이는 텍스트로 사전에 안내했습니다. [NIA 사용자 요구에 따른 실행 적용 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.2.1-s4.json), [NIA 사용자 요구에 따른 실행 개선 필요 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-3.2.1-s5.json)
- **웹 표준** · 자료 링크에 `target="_blank"`와 `rel="noopener"`를 지정했습니다. 도착 페이지는 새 브라우징 컨텍스트에서 열리며 원래 페이지의 `window.opener`를 제공받지 않습니다. [HTML Living Standard의 링크 대상과 noopener](https://html.spec.whatwg.org/multipage/links.html#link-type-noopener)

자료 사이트의 목록을 직접 열 수 없어 공개용 목록과 레코드의 사본에서 본문 및 제작기법을 읽었습니다.

## 검증 결과

### 코드로 확인

Node.js v22.23.4로 두 페이지의 자료 링크가 동일한 도착 페이지를 참조하고, 두 링크에 모두 `target="_blank"`와 `rel="noopener"`가 있는 것을 확인했습니다. 개선본 링크에만 새 탭 안내 문구가 있습니다. HTML 파서가 보고한 구문 오류와 문서 내 중복 ID는 0건이었습니다.

### 확장 검사에서 예상되는 결과

- 개선본의 자료 링크는 ‘새 창 안내 미감지’ 항목에 표시되지 않습니다.
- 비교본의 자료 링크에는 ‘새 창 안내 미감지’라는 직접 확인 안내가 표시됩니다.

### 브라우저에서 확인

Chrome 158.0.8127.37에서 KWCAG 검사 0.1.15를 실행했습니다. 비교본에서 자료 링크가 직접 확인 1건으로 표시됐고 패널은 링크의 텍스트·레이블·설명에서 새 창 안내를 찾지 못했다고 설명했습니다. ‘페이지에 실행 확인 대상 표시’를 켜자 비교본의 링크에 ‘새 창 안내 미감지’ 표시가 나타났고, 끄자 사라졌습니다. 개선본을 검사하자 해당 링크가 직접 확인 목록에 표시되지 않았습니다.

두 페이지에서 자료 링크에 초점을 둔 뒤 Enter를 누르자 각각 새 탭에서 도서관 이용 안내가 열렸습니다. 원래 탭의 주소는 그대로였습니다.

### 미검증 항목

새 탭을 닫은 뒤 돌아오는 초점 위치와 스크린 리더가 읽는 링크 이름은 확인하지 않았습니다.
