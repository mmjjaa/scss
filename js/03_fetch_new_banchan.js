//신상 반찬
// fetch는 비동기라 DOM이 완성된 뒤에 실행되므로 DOMContentLoaded가 필요 없음

//03_newbanchan.json
async function loadNewBanchan() {
  const res = await fetch(
    "https://dino-21.github.io/zipbanchan/json/03_newbanchan.json"
  );
  const data = await res.json();

  const box = document.querySelector(".new-banchan");

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

    card.innerHTML = `
        <img src="${item.main_img}" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <h5>${item.price}원</h5>
      `;

    a.appendChild(card);
    box.appendChild(a);
  });
}

loadNewBanchan();
