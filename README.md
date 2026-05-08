# 집반찬연구소.

---

## 기술 스택

| 분류      | 기술                                    |
| --------- | --------------------------------------- |
| 마크업    | HTML5                                   |
| 스타일    | SCSS → CSS (Dart Sass, `@use` 문법)     |
| 스크립트  | Vanilla JavaScript (ES6+)               |
| 데이터    | Fetch API + 외부 JSON (GitHub Pages)    |
| 상태 관리 | `localStorage` (장바구니 데이터 영속화) |
| 빌드      | SCSS 컴파일 (별도 번들러 없음)          |

---

## 페이지 구성

```
index.html          ← 메인 (상품 목록, 배너 슬라이더)
sub.html            ← 상품 상세 (수량 선택, 장바구니 담기)
cart.html           ← 장바구니 (수량 조정, 삭제, 결제 금액)

index_0.html ~ index_4.html  ← 단계별 학습 버전 (정적 마크업)
01_banchan.html     ← 알뜰반찬 목록 (정적)
02_kidbanchan.html  ← 어린이반찬 목록 (정적)
03_newbanchan.html  ← 신상반찬 목록 (정적)
04_mdbanchan.html   ← MD추천반찬 목록 (정적)
```

---

## 디렉터리 구조

```
scss_origin/
├── index.html
├── sub.html
├── cart.html
│
├── scss/                   ← SCSS 소스 (편집 대상)
│   ├── _variables.scss     ← 전역 변수 (색상, 크기 등)
│   ├── _reset.scss         ← 브라우저 기본 스타일 초기화
│   ├── _layout.scss        ← 공통 헤더/푸터 레이아웃
│   ├── main.scss           ← 메인 페이지 (위 partials @use)
│   └── sub.scss            ← 상세/장바구니 페이지
│
├── css/                    ← SCSS 컴파일 결과물 (직접 수정 X)
│   ├── main.css
│   ├── sub.css
│   └── cart.css
│
├── js/
│   ├── slider.js               ← 배너 자동 슬라이더
│   ├── 01_fetch_banchan.js     ← 알뜰반찬 API 로딩
│   ├── 02_fetch_kid_banchan.js ← 어린이반찬 API 로딩
│   ├── 03_fetch_new_banchan.js ← 신상반찬 API 로딩
│   ├── 04_fetch_md_banchan.js  ← MD추천반찬 API 로딩 + 탭 필터
│   ├── sub.js                  ← 상품 상세 / 장바구니 담기
│   └── cart.js                 ← 장바구니 렌더링 / 수량 / 삭제
│
└── img/                    ← 로컬 이미지 에셋
```

---

## SCSS 설계 특이사항

### `@use` 현대 문법 적용

```scss
/* main.scss */
@use "variables" as *; // 변수 전역 노출 ($color-black 등 직접 사용)
@use "reset";
@use "layout";
```

기존 `@import` 대신 Dart Sass 권장 `@use` 문법을 사용합니다.  
`as *` 옵션으로 네임스페이스 없이 변수를 바로 참조합니다.

### 변수 분리 (`_variables.scss`)

```scss
$container-max: 1200px;
$color-black: #000;
$md-active-bg: #0d5611; // 브랜드 그린
$radius-pill: 30px;
$slider-height: 450px;
```

### 중첩 선택자 활용

```scss
.md-banchan {
  > ul > li {
    &.active {
      background-color: $md-active-bg;
    }
  }
}
```

---

## JavaScript 주요 패턴

### 1. Fetch API — Promise 체이닝 vs async/await 비교 실습

```js
// 01_fetch_banchan.js — .then() 체이닝
fetch(URL).then(res => res.json()).then(data => { ... });

// 03_fetch_new_banchan.js — async/await
async function loadNewBanchan() {
  const data = await (await fetch(URL)).json();
}
```

### 2. URL 파라미터로 페이지 간 데이터 전달

```js
// 상품 카드 → sub.html 이동 시 데이터 인코딩
const params = new URLSearchParams({ name, img, desc, price });
a.href = `sub.html?${params}`;

// sub.html 진입 후 디코딩
const params = new URLSearchParams(window.location.search);
const name = params.get("name");
```

### 3. localStorage — 장바구니 영속화

```js
// 담기 (동일 상품은 수량만 누적)
const cart = JSON.parse(localStorage.getItem("cart") || "[]");
const existing = cart.find((c) => c.name === item.name);
existing ? (existing.qty += item.qty) : cart.push(item);
localStorage.setItem("cart", JSON.stringify(cart));
```

### 4. 카테고리 탭 필터 (MD 추천, `04_fetch_md_banchan.js`)

- JSON 데이터를 `category` 필드로 필터링해 카드 재렌더링
- `mouseover` 이벤트로 탭 전환 + `.active` 클래스 토글

### 5. 자동 슬라이더 (`slider.js`)

```js
setInterval(() => {
  index = (index + 1) % banners.length;
  document.getElementById("bannerImg").src = banners[index];
}, 3000);
```

---

## 외부 API (데이터 소스)

| 섹션       | 엔드포인트                                                     |
| ---------- | -------------------------------------------------------------- |
| 알뜰반찬   | `https://dino-21.github.io/zipbanchan/json/01_banchan.json`    |
| 어린이반찬 | `https://dino-21.github.io/zipbanchan/json/02_kidbanchan.json` |
| 신상반찬   | `https://dino-21.github.io/zipbanchan/json/03_newbanchan.json` |
| MD추천반찬 | `https://dino-21.github.io/zipbanchan/json/04_mdbanchan.json`  |

JSON 필드: `name` / `main_img` / `description` / `price` / `category`

---

## 장바구니 기능 흐름

```
상품 클릭
  └→ sub.html?name=...&img=...&price=...
       ├─ 수량 선택 (+ / -)
       ├─ [장바구니 담기] → localStorage 저장 → 토스트 알림
       └─ [바로 구매]    → localStorage 저장 → cart.html 이동

cart.html
  ├─ localStorage 읽어 목록 렌더링
  ├─ 수량 변경 → 소계/합계 즉시 재계산
  ├─ 상품 삭제
  └─ 배송비: 30,000원 미만 3,000원 / 이상 무료
```

---

## 학습 포인트 요약

- SCSS `@use` / Partial / 변수 분리 구조
- `fetch` 비동기 처리 — `.then()` 과 `async/await` 두 방식 비교
- DOM 동적 생성 (`createElement` vs `innerHTML` 템플릿 리터럴)
- `URLSearchParams` 를 이용한 SPA 없이 페이지 간 상태 전달
- `localStorage` 기반 클라이언트 상태 관리
- 이벤트 위임 패턴 및 인터벌 타이머
