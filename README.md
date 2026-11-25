# KWCAG 플레이그라운드

KWCAG 2.2를 적용한 웹 접근성 데모와 적용 기준, 검증 결과를 열람하는 대시보드입니다.

## 로컬 개발

Node.js 22를 사용합니다.

```sh
npm ci
npm run dev
```

터미널에 표시된 로컬 주소를 엽니다. 대시보드 UI와 CSS를 저장하면 HMR로 변경이 적용됩니다. 데모 폴더나 실행 결과를 변경하면 열린 목록과 상세에 반영됩니다. 독립 데모는 해당 폴더의 변경을 감지해 자동으로 새로고침합니다.

## 데모 추가

`demo-sources/YYYY-MM-DD-<이름>/index.html`을 만들면 대시보드가 제목과 날짜를 읽어 목록에 추가합니다. 같은 폴더에 `result.md`를 두면 상세 화면에 렌더링합니다. 공개 결과의 작성 기준은 [AGENTS.md](AGENTS.md)를 따릅니다.

배포할 데모 자산은 해당 데모 폴더 안에 둡니다. 빌드는 HTML, CSS, JavaScript, JSON과 지원하는 이미지·글꼴·미디어를 복사합니다. Markdown 결과는 대시보드에서 표시할 HTML로 변환합니다.

## 정적 빌드

```sh
npm run build
npm run preview
```

Netlify는 [netlify.toml](netlify.toml)의 설정에 따라 `dist/`를 게시합니다. 운영 브랜치는 `main`이며 목표 주소는 `kwcag-playground.fe4all.dev`입니다. 상세 주소는 `/?demo=<폴더명>` 형태이므로 정적 호스팅에서 직접 열 수 있습니다.
