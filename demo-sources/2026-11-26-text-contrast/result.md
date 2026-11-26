# 텍스트 명도 대비 실행 결과

같은 도서관 공지를 단색 배경에서 세 가지 글자색으로 표시합니다. 글자 크기와 굵기, 공지 본문, 배경색은 세 페이지에서 같습니다. 처음 열린 페이지는 4.5:1 이상으로 개선한 사례입니다.

## 사용 방법

1. 개선본에서 ‘도서관 운영 공지’를 읽고 KWCAG 검사를 실행합니다.
2. ‘낮은 대비 비교’를 열어 다시 검사합니다. 명도 대비 결과에서 공지 본문이 강조되는지 확인합니다.
3. ‘중간 대비 비교’도 검사합니다. 확대 예외를 확인하라는 안내가 표시되는지 봅니다.
4. ‘개선본’으로 돌아와 재검사합니다.

## 적용 기준과 참고 자료

- **KWCAG 2.2 요구사항** · 보통 크기의 공지 본문은 기본 기준인 4.5:1 이상을 적용했습니다. 3:1 이상 4.5:1 미만인 비교 사례는 확대 예외 적용 여부를 직접 판단하는 데 사용합니다. [5.4.3 텍스트 콘텐츠의 명도 대비](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.3.json)
- **KWCAG 2.2 요구사항** · 읽는 순서대로 제목과 공지, 비교 링크를 배치했습니다. 공지 영역은 테두리로 구분하고 링크에는 밑줄과 명시적인 문구를 사용했습니다. [5.3.2 콘텐츠의 선형구조](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.2.json), [5.4.1 색에 무관한 콘텐츠 인식](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.1.json), [5.4.4 콘텐츠 간의 구분](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.4.json)
- **KWCAG 2.2 요구사항** · 비교 링크에는 기본 HTML 링크, 3px 키보드 초점 표시, 최소 높이 2.75rem을 적용했습니다. 보이는 링크 문구가 접근 가능한 이름을 제공합니다. [6.1.1 키보드 사용 보장](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.1.json), [6.1.2 초점 이동과 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.2.json), [6.1.3 조작 가능](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.3.json), [6.4.3 적절한 링크 텍스트](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.3.json), [6.5.3 레이블과 네임](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.5.3.json)
- **KWCAG 2.2 요구사항** · 페이지마다 제목을 구분하고 한국어를 선언했습니다. 비교 페이지는 링크를 실행할 때 같은 탭에 열립니다. HTML 파서로 문서 구문과 ID를 확인했습니다. [6.4.2 제목 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.2.json), [7.1.1 기본 언어 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.1.1.json), [7.2.1 사용자 요구에 따른 실행](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.2.1.json), [8.1.1 마크업 오류 방지](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-8.1.1.json)
- **NIA 제작기법 권장 사항** · 글자 크기에 맞는 기준을 적용하고 본문 뒤에 불투명한 단색 배경을 사용했습니다. [NIA 명도 대비 적용 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.4.3-s4.json), [NIA 명도 대비 개선 필요 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.4.3-s5.json)
- **웹 표준** · CSS 색상값은 WCAG의 상대 휘도와 명도 대비 공식으로 비교했습니다. 판단에는 반올림하기 전 값을 사용했습니다. [WCAG 2.2 상대 휘도](https://www.w3.org/TR/WCAG22/#dfn-relative-luminance), [WCAG 2.2 명도 대비](https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio)

자료 사이트의 목록을 직접 열 수 없어 공개용 목록과 레코드의 사본에서 본문 및 제작기법을 읽었습니다.

## 검증 결과

### 코드와 계산으로 확인

Node.js v22.23.4로 CSS의 글자색과 흰색 배경의 명도 대비를 계산했습니다. 세 페이지의 공지 본문이 같고, 페이지마다 비교 링크와 스타일시트가 존재하는 것을 확인했습니다. HTML 파서가 보고한 구문 오류와 문서 내 중복 ID는 0건이었습니다.

| 사례 | 공지 본문 색 | 계산한 명도 대비 | 확장 검사에서 예상되는 결과 |
| --- | --- | --- | --- |
| 개선본 | `#595959` | 약 7.00:1 | 이 공지 본문에 명도 대비 문제 없음 |
| 낮은 대비 | `#aaa` | 약 2.32:1 | 이 공지 본문을 명도 대비 위반으로 표시 |
| 중간 대비 | `#888` | 약 3.54:1 | 이 공지 본문을 판정 보류로 표시하고 화면 확대 예외 확인을 안내 |

### 브라우저에서 확인

Chrome 158.0.8127.37에서 KWCAG 검사 0.1.15로 낮은 대비, 중간 대비, 개선본을 차례로 검사했습니다. 낮은 대비는 위반 1건으로 표시됐고, 상세에는 공지 본문과 측정 대비 2.32:1이 나왔습니다. 중간 대비는 판정 보류 1건으로 표시됐고, 상세에는 측정 대비 3.54:1과 화면 확대 예외 확인 안내가 나왔습니다. 개선본의 명도 대비 항목에는 ‘자동 검사에서 문제 미검출’이 표시됐습니다.

### 미검증 항목

판정 대상의 페이지 내 강조 동작, 확대 시 읽기, 스크린 리더 탐색은 확인하지 않았습니다.
