# 모달 레이어 데모 개발 결과

‘안내 창 열기’ 버튼으로 모달을 열어 키보드 초점의 이동과 복귀를 체험한다. [모달 레이어 데모](index.html)

## 적용한 KWCAG 항목과 근거 자료

| 항목 | 구현 | 근거 |
| --- | --- | --- |
| 6.1.1 키보드 사용 보장 | 열기 버튼과 키보드 조작 방법은 기본 HTML 요소로 제공한다. Esc 또는 닫기 버튼으로 창을 닫는다. | [KWCAG 6.1.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.1.json) |
| 6.1.2 초점 이동과 표시 | 창이 열리면 조작 방법에 초점을 둔다. Tab과 Shift+Tab으로 창 내부를 순환한다. 창을 닫으면 열기 버튼으로 초점이 돌아간다. 키보드 초점에 테두리를 표시한다. | [KWCAG 6.1.2](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.2.json) |
| 6.5.3 레이블과 네임 | 열기와 닫기 버튼의 이름은 화면에 보이는 글자를 사용한다. | [KWCAG 6.5.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.5.3.json) |
| 7.2.1 사용자 요구에 따른 실행 | 사용자가 열기 버튼을 조작하면 `dialog.showModal()`을 호출한다. | [KWCAG 7.2.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.2.1.json) |

## 검증 결과

Aside Browser에서 Enter로 창을 열자 ‘키보드 조작 방법’에 초점이 갔다. Shift+Tab으로 ‘닫기’에, Tab으로 ‘키보드 조작 방법’에 돌아왔다. Esc와 닫기 버튼으로 각각 창을 닫았을 때 초점이 ‘안내 창 열기’로 돌아왔다. 320px 폭에서 기본 화면에 가로 스크롤이 없었다.

화면 낭독 프로그램과 다른 브라우저 조합은 확인하지 않았다.
