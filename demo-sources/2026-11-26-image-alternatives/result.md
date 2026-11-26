# 이미지 대체 텍스트 실행 결과

같은 도서관 휴관 안내 이미지에 적절한 대체 텍스트를 제공한 화면과 의도적으로 오류를 넣은 화면을 비교한다.

## 사용 방법

개선본의 공지 이미지를 보고 어떤 도서관이 언제, 왜 쉬는지 확인한다. 검사 도구의 이미지 위 대체 텍스트 표시를 켜고 공지 이미지와 장식 이미지의 표시를 비교한다. 대체 텍스트 누락 사례와 파일명 대체 텍스트 사례를 각각 연 뒤 해당 화면을 새로 검사한다.

화면낭독프로그램에서 공지로 이동했을 때 이미지 없이도 도서관 이름, 휴관 날짜, 이유를 얻을 수 있는지 확인한다. 제목 옆 장식 도형을 별도 그림으로 읽는지도 확인한다.

## 적용 기준과 참고 자료

### KWCAG 2.2 요구사항

- 개선본의 공지 이미지에 도서관 이름, 휴관 날짜와 요일, 사유를 모두 전달하는 `alt`를 넣었다. 제목 옆 도형은 꾸밈에만 쓰여 `alt=""`로 제공했다. [5.1.1 적절한 대체 텍스트 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.1.1.json)
- 제목, 설명, 공지, 비교 링크 순으로 배치했다. 비교 사례는 제목과 설명으로 구분하며 링크에는 밑줄을 표시한다. [5.3.2 콘텐츠의 선형구조](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.2.json) · [5.4.1 색에 무관한 콘텐츠 인식](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.1.json) · [5.4.4 콘텐츠 간의 구분](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.4.json)
- 본문과 공지 이미지 글자는 단색 배경에 대비가 큰 색을 적용했다. [5.4.3 텍스트 콘텐츠의 명도 대비](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.3.json)
- 링크는 기본 HTML 요소로 구성했다. 제목과 내용에 맞는 링크 문구를 그대로 이름으로 사용한다. 키보드 초점은 외곽선으로 표시한다. 링크 안쪽에 세로 여백을 두어 누를 면적을 확보했다. [6.1.1 키보드 사용 보장](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.1.json) · [6.1.2 초점 이동과 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.2.json) · [6.1.3 조작 가능](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.3.json) · [6.4.3 적절한 링크 텍스트](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.3.json) · [6.5.3 레이블과 네임](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.5.3.json)
- 사례마다 문서 제목과 본문 제목을 구분했다. 문서에 `lang="ko"`를 설정했다. 링크에 초점이 닿는 것만으로 이동하는 동작은 없으며, 요소와 ID를 문서 안에서 일관되게 썼다. [6.4.2 제목 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.2.json) · [7.1.1 기본 언어 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.1.1.json) · [7.2.1 사용자 요구에 따른 실행](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.2.1.json) · [8.1.1 마크업 오류 방지](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-8.1.1.json)

### NIA 제작기법 권장 사항

이미지에 적힌 의미를 간결한 한 문장으로 전달한다. 주변에 있는 ‘도서관 운영 공지’ 같은 일반 제목을 반복하는 대신 휴관의 구체적인 정보를 제공한다. 파일명은 안내 의미를 전달하지 않는 비교 사례로만 사용한다. [NIA 적용 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.1.1-s4.json) · [NIA 개선 필요 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.1.1-s5.json)

### 구현에 사용한 웹 표준

같은 PNG 파일을 세 화면의 HTML `img` 요소에서 참조하고 `alt`만 바꿔 비교한다. 장식 이미지도 HTML `img` 요소로 제공하여 빈 `alt`의 의미를 확인할 수 있게 했다. [HTML의 이미지 대체 텍스트](https://html.spec.whatwg.org/multipage/images.html#alt)

## 검증 결과

### 코드와 이미지에서 확인

- 세 화면의 공지 이미지 경로가 같다. 개선본에는 안내 내용과 일치하는 `alt`가 있다. 누락 사례에는 `alt` 속성이 없고, 파일명 사례에는 `alt="closure-notice.png"`가 있다. 장식 이미지의 `alt`는 세 화면에서 비어 있다.
- 공지 이미지의 원본 크기는 720×492px이고 화면 너비에 따라 비율을 유지하며 줄어든다. `sips`로 원본 크기를 확인했다.
- 작성한 색상값으로 계산한 텍스트 대비는 확인한 조합 중 최저 8.20:1이다. 공지 이미지에 사용한 단색 글자와 배경의 대비는 9.44:1 이상이다.

### 브라우저와 확장 검사

2026년 11월 26일 Chrome 158.0.8127.37과 KWCAG 검사 0.1.15로 비교했다. 브라우저에서 세 화면의 이미지가 모두 로드됐다.

| 화면 | 예상 결과 | 실제 검사 결과 |
| --- | --- | --- |
| 개선본 | 공지 문구와 장식의 빈 `alt`가 검토 대상으로 표시된다. | 직접 확인 2건이 표시됐다. 공지 문구와 장식 이미지의 빈 `alt`를 확인했다. |
| 대체 텍스트 누락 | 공지 이미지의 대체 텍스트 누락이 위반으로 표시된다. | 위반 1건과 직접 확인 1건이 표시됐다. 직접 확인 대상은 장식 이미지였다. |
| 파일명 대체 텍스트 | 공지 이미지의 파일명 형태를 직접 확인하라는 안내가 표시된다. | 직접 확인 2건이 표시됐다. 공지 이미지에 파일명 형태라는 단서가 나왔다. |

‘페이지에 대체 텍스트 표시’를 켰다. 세 화면의 이미지 위에 공지 문구, `alt` 없음, 파일명이 각각 표시됐다. 장식 이미지는 세 화면에서 모두 빈 `alt`로 표시됐다. 기능을 끄자 표시가 사라졌다.

## 미검증 항목

브라우저 확대 시 가독성과 화면낭독프로그램이 공지와 장식 이미지를 실제로 어떻게 읽는지는 확인하지 않았다.
