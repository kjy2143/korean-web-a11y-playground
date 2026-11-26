# 시설 이용 안내 영상의 자막 실행 결과

시설 안내 데스크의 벨이 한 번, 이어서 두 번 울리는 8초 영상입니다. 같은 영상으로 자막이 있는 경우와 자막 트랙이 없거나 자막 내용이 틀린 경우를 비교합니다. 영상에서 재생되는 소리는 이 데모를 위해 합성한 호출 벨소리입니다.

## 사용 방법

1. 개선본을 열고 재생 버튼을 누릅니다. 한국어 자막이 보이지 않으면 플레이어의 자막 메뉴에서 켭니다.
2. 벨이 울리는 횟수와 자막을 비교합니다. 음소거하고 다시 재생해도 자막으로 같은 정보를 파악할 수 있는지 확인합니다.
3. ‘자막 없음’과 ‘자막 내용 불일치’ 비교 화면에서도 같은 영상을 재생합니다. 첫 번째 화면에서는 자막이 나타나지 않습니다. 두 번째 화면에서는 자막에 표시된 횟수가 실제 소리와 다릅니다.
4. 세 화면을 각각 새로 열고 재생 버튼을 누르기 전에는 소리가 나지 않는지 확인합니다.

## 적용 기준과 참고 자료

### KWCAG 2.2 요구사항

- 개선본의 자막은 벨이 울린 횟수를 소리 시작 시점에 맞춰 제공합니다. 자막 누락과 실제 소리와 다른 자막은 별도 비교 화면에만 제공합니다. [5.2.1 자막 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.2.1.json)
- 영상은 자동 재생 속성과 스크립트 없이 정지 상태로 제공하며 기본 제어판에서 재생·정지·음량을 조절할 수 있습니다. 조작을 안내하는 문장을 플레이어 앞에 배치합니다. [5.4.2 자동 재생 금지](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.2.json), [5.3.2 콘텐츠의 선형구조](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.3.2.json), [6.1.1 키보드 사용 보장](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.1.json), [7.2.1 사용자 요구에 따른 실행](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.2.1.json)
- 문서 제목과 영상 제목을 구분하고 한국어를 지정했습니다. 비교 링크의 화면과 내용을 문구에 적었으며, 링크의 초점에 3px 외곽선을 표시합니다. 플레이어 카드는 테두리와 여백으로 구분했습니다. 화면 문구는 색에 기대지 않습니다. [6.4.2 제목 제공](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.2.json), [6.4.3 적절한 링크 텍스트](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.4.3.json), [7.1.1 기본 언어 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-7.1.1.json), [6.1.2 초점 이동과 표시](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-6.1.2.json), [5.4.1 색에 무관한 콘텐츠 인식](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.1.json), [5.4.3 텍스트 콘텐츠의 명도 대비](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.3.json), [5.4.4 콘텐츠 간의 구분](https://kwcag-docs.fe4all.dev/browse#v1/criteria/kwcag-5.4.4.json)

### NIA 제작기법 권장 사항

- 사용자가 켜고 끌 수 있는 닫힌 자막으로 의미 있는 효과음을 표현했습니다. 재생·정지·음량 설정은 기본 플레이어 조작부에서 제공합니다. [NIA 1.2.1 기본 규칙](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.2.1-s3.json), [자막 적용 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.2.1-s4.json), [자막 개선 필요 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.2.1-s5.json), [NIA 1.4.2 기본 규칙](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.4.2-s3.json), [자동 재생 금지 적용 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.4.2-s4.json), [자동 재생 금지 개선 필요 사례](https://kwcag-docs.fe4all.dev/browse#v1/criteria/nia-1.4.2-s5.json)

### 구현에 사용한 웹 표준

- HTML `video controls`로 브라우저 기본 플레이어를 제공하고 `track kind="captions"`를 WebVTT에 연결했습니다. [HTML 미디어 요소](https://html.spec.whatwg.org/multipage/media.html#the-video-element), [WebVTT](https://www.w3.org/TR/webvtt1/)

## 검증 결과

### 코드와 자산

- FFprobe 8.1로 세 화면이 공유하는 MP4 자산을 확인했습니다. 영상과 오디오 트랙의 길이는 각각 8초이며 영상은 800×450 H.264, 오디오는 AAC입니다.
- FFmpeg 8.1의 무음 감지로 벨이 약 1.00초, 4.60초, 5.40초에 시작하는 것을 확인했습니다. 첫 자막 구간은 첫 벨을, 두 번째 자막 구간은 나머지 두 벨을 포함합니다.
- 세 페이지에 자동 재생 속성과 스크립트가 없습니다. 개선본과 내용 불일치 사례는 서로 다른 한국어 자막 파일을 참조합니다. 자막 없음 사례에는 `track`이 없습니다.
- parse5 8.1.1로 HTML 세 문서를 파싱했습니다. 파싱 오류와 중복 ID는 없었으며 상대 경로 및 레이블 참조가 모두 연결됐습니다.

### 확장에서 예상하는 결과

- 개선본과 내용 불일치 사례 모두에서 한국어 자막 트랙을 찾을 수 있습니다. 자막 없음 사례에서는 트랙을 찾지 못했다는 안내가 표시될 수 있습니다.
- 세 화면 모두 영상이 일시 정지된 초기 상태이며 자동 재생 속성이 없습니다. 자막의 정확성과 사용자가 조작하기 전에 실제로 소리가 나는지는 재생과 페이지 진입으로 직접 확인합니다.

### 확장과 브라우저에서 확인한 결과

- Chrome 158.0.8127.37의 KWCAG 검사 0.1.15에서 5.2.1 자막 제공을 확인했습니다. 개선본과 내용 불일치 사례에는 자막 트랙을 찾았다는 ‘직접 확인’이 1건씩 나타났습니다. 자막 없음 사례에는 ‘판정 보류’ 1건과 자막 트랙을 찾지 못했다는 ‘직접 확인’ 1건이 나타났습니다.
- 5.4.2 자동 재생 금지는 세 화면에 ‘직접 확인’ 1건씩 표시됐습니다. 브라우저에서 세 영상은 모두 초기에 일시 정지 상태였고 자동 재생 속성이 없었습니다.
- 세 화면에서 영상을 재생하자 재생 위치가 진행됐고 길이는 각각 8초였습니다. 브라우저는 개선본에서 ‘한 번 → 두 번’, 내용 불일치 사례에서 ‘두 번 → 한 번’ 순으로 WebVTT 자막 두 구간을 불러왔습니다. 자막 없음 사례에는 불러온 자막이 없었습니다.

## 미검증 항목

- 자막이 실제 화면에서 보이는지, 기기에서 재생되는 소리, 브라우저 기본 플레이어의 키보드 조작과 스크린 리더 동작은 확인하지 않았습니다.
