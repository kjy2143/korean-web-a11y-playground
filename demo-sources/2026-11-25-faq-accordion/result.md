# FAQ 아코디언 데모 개발 결과

질문 버튼 6개로 답변을 각각 펼치고 접는다. 여러 답변을 함께 펼칠 수 있다. [FAQ 아코디언 데모](index.html)

## 적용한 KWCAG 항목과 근거 자료

| 항목 | 구현 | 근거 |
| --- | --- | --- |
| 6.1.1 키보드 사용 보장 | 기본 `button`의 Enter와 Space로 답변을 조작한다. `hidden` 상태의 답변 링크는 초점 순서에서 빠진다. | [KWCAG 6.1.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.1.json) |
| 6.1.2 초점 이동과 표시 | 버튼에서 답변을 펼치거나 접어도 초점이 버튼에 남는다. 버튼과 링크의 초점에는 테두리가 표시된다. | [KWCAG 6.1.2](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.2.json) |
| 6.4.3 적절한 링크 텍스트 | 근거 자료와 데모 링크에 각각 목적지를 나타내는 이름을 붙였다. | [KWCAG 6.4.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.3.json) |
| 6.5.3 레이블과 네임 | 화면에 보이는 질문 문장이 버튼의 접근 가능한 이름이 된다. | [KWCAG 6.5.3](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.5.3.json) |
| 7.2.1 사용자 요구에 따른 실행 | 버튼을 조작할 때만 `aria-expanded`와 답변의 `hidden`을 함께 바꾼다. | [KWCAG 7.2.1](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.2.1.json) |

## 검증 결과

Aside Browser에서 Enter로 근거 자료 답변을 펼쳤다. Tab을 누르자 해당 답변의 자료 링크에 초점이 갔다. Space로 첫 번째 답변을 펼쳐 두 답변이 함께 열린 상태를 확인했다. Space로 첫 번째 답변을 접은 뒤 초점은 해당 질문 버튼에 남았다. 320px 폭에서 가로 스크롤이 없었다.

화면 낭독 프로그램과 다른 브라우저 조합은 확인하지 않았다.
