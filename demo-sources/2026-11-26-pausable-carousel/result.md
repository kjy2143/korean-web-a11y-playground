# 자동 전환 공지 배너 실행 결과

도서관 공지 세 건을 6초 간격으로 바꾸는 배너입니다. 개선본은 자동 전환을 멈추고 이전·다음 공지를 선택할 수 있습니다. 비교 사례는 동일한 공지와 전환 간격을 사용하며 자동 전환 정지 기능을 의도적으로 뺐습니다.

## 사용 방법

1. 포인터가 배너 밖에 있는 상태에서 개선본을 열고 6초 이상 기다립니다. 동작 줄이기 설정을 사용하는 환경에서는 ‘자동 전환 시작’을 먼저 누릅니다.
2. ‘자동 전환 일시 정지’를 누른 뒤 배너 밖에서도 6초 이상 기다립니다. ‘이전 공지’와 ‘다음 공지’로 이동한 뒤에도 정지 상태가 유지되는지 확인합니다.
3. 키보드로 배너에 진입하면 자동 전환이 정지합니다. Tab과 Shift+Tab으로 조작 버튼을 이동해 초점 표시를 확인합니다. ‘자동 전환 시작’을 Enter 또는 Space로 눌러 재개합니다.
4. 비교 화면에서 ‘다음 공지’를 누르고 6초 이상 기다립니다. 선택한 공지가 다시 자동으로 바뀌는지 확인합니다.

## 적용 기준과 참고 자료

### KWCAG 2.2 요구사항

- 배너 앞에 자동 전환을 일시 정지하고 다시 시작하는 버튼을 배치했습니다. 사용자가 정지한 상태에서도 이전·다음 공지를 선택할 수 있습니다. [6.2.2 정지 기능 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.2.2.json)
- 이전·다음·자동 전환은 HTML 버튼으로 구현했습니다. 화면 순서와 Tab 순서를 맞췄고, 버튼을 누르거나 공지가 바뀔 때 키보드 초점을 옮기지 않습니다. 초점은 3px 외곽선으로 표시합니다. 버튼의 최소 높이는 기본 글꼴 크기에서 44px이며, 표시 문구가 접근 가능한 이름이 됩니다. [5.3.2 콘텐츠의 선형구조](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.2.json), [6.1.1 키보드 사용 보장](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.1.json), [6.1.2 초점 이동과 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.2.json), [6.1.3 조작 가능](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.3.json), [6.5.3 레이블과 네임](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.5.3.json)
- 자동 전환 상태와 공지 순서를 텍스트로 표시합니다. 테두리와 여백으로 배너, 공지, 조작 영역을 구분합니다. [5.4.1 색에 무관한 콘텐츠 인식](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.1.json), [5.4.3 텍스트 콘텐츠의 명도 대비](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.3.json), [5.4.4 콘텐츠 간의 구분](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.4.json)
- 페이지·배너·공지를 제목으로 구분했습니다. 링크에 이동할 화면의 내용을 적었으며 같은 탭에서 엽니다. 문서 언어는 한국어로 지정했습니다. [6.4.2 제목 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.2.json), [6.4.3 적절한 링크 텍스트](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.3.json), [7.1.1 기본 언어 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.1.1.json), [7.2.1 사용자 요구에 따른 실행](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.2.1.json), [8.1.1 마크업 오류 방지](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-8.1.1.json)

### NIA 제작기법 권장 사항

- 정지·재생·이전·다음 조작을 식별할 수 있게 표시했습니다. 정지 중 이전이나 다음으로 이동해도 자동 전환을 다시 시작하지 않습니다. 포인터를 배너에 올리거나 키보드로 배너에 진입하면 전환을 멈춥니다. [NIA 2.2.2 기본 규칙](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-2.2.2-s3.json), [적용 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-2.2.2-s4.json), [개선 필요 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-2.2.2-s5.json)

### 구현에 사용한 웹 표준과 패턴

- 캐러셀 영역에 이름과 역할 설명을 제공했습니다. 현재 공지만 표시하고 나머지는 `hidden`으로 숨겼습니다. 자동으로 넘어가는 동안에는 공지 제목을 반복 알리지 않고, 이전·다음을 눌렀을 때만 `role="status"`로 순서와 제목을 알립니다. 키보드 진입으로 정지한 뒤에는 사용자가 시작을 눌러야 자동 전환이 돌아옵니다. [WAI-ARIA APG 캐러셀 패턴](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
- 동작 줄이기 설정을 사용하면 자동 전환을 멈춘 상태로 시작합니다. [Media Queries Level 5의 prefers-reduced-motion](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion)

## 검증 결과

### 코드와 자산

- 두 페이지는 같은 스크립트와 공지 세 건을 사용합니다. 비교 페이지에는 자동 전환을 제어하는 버튼이 없습니다.
- 전환 함수는 현재 공지의 `hidden`만 변경하고 초점을 변경하지 않습니다. 자동 전환 예약은 정지 상태에서 취소됩니다.
- Node.js 22.23.4에서 타이머와 입력 이벤트를 모의 실행했습니다. 자동 전환과 포인터 일시 정지, 키보드 초점 진입 시 정지, 정지 중 이전·다음, 다시 시작, 동작 줄이기 초기 상태를 확인했습니다. 비교 화면의 타이머는 이전·다음 조작 뒤에도 유지됐습니다.
- parse5 8.1.1로 HTML 두 문서를 파싱했습니다. 파싱 오류와 중복 ID는 없었으며 상대 경로 및 레이블 참조가 모두 연결됐습니다.

### 확장에서 예상하는 결과

- 두 화면의 공지 배너가 정지 기능 제공 항목의 ‘직접 확인’ 대상으로 표시될 수 있습니다. 개선본의 정지 버튼 유무와 실제 동작은 직접 확인합니다.
- 비교 사례에서 정지 기능 부재를 판단하려면 자동 전환을 관찰하고 이전·다음 버튼을 조작해 봅니다. 검사 결과의 ‘직접 확인’ 표시는 동작에 대한 판정이 아닙니다.

### 확장과 브라우저에서 확인한 결과

- Chrome 158.0.8127.37의 KWCAG 검사 0.1.15에서 두 화면 모두 심사 15번 ‘정지 기능 제공’의 ‘직접 확인’에 2건이 나타났습니다. 캐러셀 영역과 공지 제목을 알리는 라이브 영역이 대상이었습니다.
- 두 화면 모두 첫 공지에서 두 번째 공지로 자동 전환했습니다. 개선본의 첫 Tab은 자동 전환 버튼에 초점을 두었고, 버튼의 이름이 ‘자동 전환 시작’으로 바뀌었습니다. 이후 6.2초를 기다리는 동안 두 번째 공지가 유지됐습니다. 키보드로 ‘이전 공지’와 ‘다음 공지’를 눌러 첫 번째와 두 번째 공지를 다시 표시했습니다. 비교 화면에는 정지 버튼이 없었습니다.

## 미검증 항목

- 브라우저에서 포인터를 올렸을 때의 전환 제어와 스크린 리더의 알림은 확인하지 않았습니다.
