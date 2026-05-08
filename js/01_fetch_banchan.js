//알뜰반찬
//01_banchan.json

// document.addEventListener("DOMContentLoaded", () => {}); 작성안해도 됨
// fetch는 비동기라 DOM이 완성된 뒤에 실행되므로 DOMContentLoaded가 필요 없음

fetch("https://dino-21.github.io/zipbanchan/json/01_banchan.json")
  .then((res) => res.json())
  .then((data) => {
    const box = document.querySelector(".banchan");

    data.forEach((item) => {
      const params = new URLSearchParams({
        name: item.name,
        img: item.main_img,
        desc: item.description,
        price: item.price
      });
      box.innerHTML += `
            <a href="sub.html?${params}" target="_self">
              <div class="product-card">
                <img src="${item.main_img}" alt="${item.name}">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <h5>${item.price}원</h5>
              </div>
            </a>
          `;
    });
  });
