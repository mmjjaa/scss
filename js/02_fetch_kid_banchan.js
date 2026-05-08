//어린이 반찬
// fetch는 비동기라 DOM이 완성된 뒤에 실행되므로 DOMContentLoaded가 필요 없음

//02_kidbanchan.json
const URL = "https://dino-21.github.io/zipbanchan/json/02_kidbanchan.json";

fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    // 어린이 반찬 박스 찾기
    const box = document.querySelector(".kid-banchan");

    // 혹시 남아 있을지 모를 기존 카드 제거
    const oldCards = box.querySelectorAll("a");
    oldCards.forEach((a) => a.remove());

    // JSON 데이터로 카드 생성
    data.forEach((item) => {
      const a = document.createElement("a");
      const urlParams = new URLSearchParams({
        name: item.name,
        img: item.main_img,
        desc: item.description,
        price: item.price
      });
      a.href = `sub.html?${urlParams}`;

      const card = document.createElement("div");
      card.className = "product-card";

      const img = document.createElement("img");
      img.src = item.main_img;
      img.alt = item.name;

      const h4 = document.createElement("h4");
      h4.textContent = item.name;

      const p = document.createElement("p");
      p.textContent = item.description;

      const h5 = document.createElement("h5");
      h5.textContent = item.price + "원";

      // 조립
      card.appendChild(img);
      card.appendChild(h4);
      card.appendChild(p);
      card.appendChild(h5);

      a.appendChild(card);
      box.appendChild(a);
    });
  })
  .catch((err) => console.error("JSON 로딩 오류:", err));
