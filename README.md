# KWCAG 플레이그라운드

같은 요청서로 만든 기본 개발 화면과 KWCAG 2.2 적용 화면을 쌍으로 비교하고, 적용 기준과 검증 결과를 열람하는 대시보드입니다.

## 로컬 개발

Node.js 22를 사용합니다.

```sh
npm ci
npm run dev
```

터미널에 표시된 로컬 주소를 엽니다. 대시보드 UI와 CSS를 저장하면 HMR로 변경이 적용됩니다. 데모 폴더나 실행 결과를 변경하면 열린 목록과 상세에 반영됩니다. 독립 데모는 해당 폴더의 변경을 감지해 자동으로 새로고침합니다.

## 데모 추가

새 데모는 같은 요청서로 만든 두 화면을 한 쌍으로 추가합니다. 기본 개발 화면은 `demo-sources/YYYY-MM-DD-<주제>-off/`, 접근성 자료 적용 화면은 `demo-sources/YYYY-MM-DD-<주제>-on/`에 두고, 폴더마다 `index.html`과 `result.md`를 둡니다. 목록은 접미사를 뺀 이름이 같은 두 폴더를 카드 한 장에 묶고, 상세 화면에 짝이 되는 데모로 가는 링크를 보여 줍니다. 접미사가 없는 폴더는 단독 데모로 표시합니다.

두 화면을 만드는 방법, 결과 문서 구성, 공개 기준은 [AGENTS.md](AGENTS.md)를 따릅니다. `npm test`는 카탈로그·목록·기존 주소 연결을 확인하고, 데모와 결과 문서에 비공개 이름이나 로컬 경로가 없는지 검사합니다.

배포할 데모 자산은 해당 데모 폴더 안에 둡니다. 빌드는 HTML, CSS, JavaScript, JSON과 지원하는 이미지·글꼴·미디어를 복사합니다. Markdown 결과는 대시보드에서 표시할 HTML로 변환합니다.

## 정적 빌드

```sh
npm run build
npm run preview
```

Netlify는 [netlify.toml](netlify.toml)의 설정에 따라 `dist/`를 게시합니다. 운영 브랜치는 `main`이며 목표 주소는 `kwcag-playground.fe4all.dev`입니다. 상세 주소는 `/?demo=<폴더명>` 형태이므로 정적 호스팅에서 직접 열 수 있습니다. 2026-11-27 이전에 배포한 데모 11개의 상세 주소와 데모 주소는 [dashboard/legacy-demos.js](dashboard/legacy-demos.js)와 `netlify.toml`의 이동 규칙으로 같은 주제의 on 데모에 연결합니다.
