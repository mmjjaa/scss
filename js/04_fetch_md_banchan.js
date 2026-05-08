//MD 추천 + 탭
// 1 DOMContentLoaded 반드시 필요
document.addEventListener("DOMContentLoaded", () => {
  //04_mdbanchan.json + multi tap
  function createMdCard(item) {
    const a = document.createElement("a");
    const urlParams = new URLSearchParams({
      name: item.name,
      img: item.main_img,
      desc: item.description,
      price: item.price
    });
    a.href = `sub.html?${urlParams}`;

    const card = document.createElement("div");
    card.className = "md-card";

    card.innerHTML = `
      <img src="${item.main_img}" alt="${item.name}">
      <h4>${item.name}</h4>
      <p>${item.description}</p>
      <h5>${item.price}원</h5>
    `;

    a.appendChild(card);
    return a;
  }

  function renderCategory(data, category, section) {
    section
      .querySelectorAll(".md-card")
      .forEach((el) => el.parentElement.remove());

    data
      .filter((item) => item.category === category)
      .forEach((item) => section.appendChild(createMdCard(item)));
  }

  function setActive(liList, activeLi) {
    liList.forEach((li) => li.classList.remove("active"));
    activeLi.classList.add("active");
  }

  // ============================
  //      JSON 로딩
  // ============================
  fetch("https://dino-21.github.io/zipbanchan/json/04_mdbanchan.json")
    .then((res) => res.json())
    .then((data) => {
      const mdSection = document.querySelector(".md-banchan"); //1 DOM 선택 코드는 fetch보다 먼저 실행됨
      const liList = mdSection.querySelectorAll("ul li"); //1 DOM 선택 코드는 fetch보다 먼저 실행됨

      const categories = [
        "bibim",
        "soup",
        "kid",
        "bokkeum",
        "muchim",
        "main",
        "jorim",
      ];

      // ★ 초기 화면: 비빔밥
      setActive(liList, liList[0]);
      renderCategory(data, "bibim", mdSection);

      liList.forEach((li, index) => {
        const aTag = li.querySelector("a");

        aTag.addEventListener("mouseover", (e) => {
          e.preventDefault(); // a 태그 이동 막기

          // 활성화 스타일
          setActive(liList, li);

          // 카드 다시 렌더링
          renderCategory(data, categories[index], mdSection);
        });
      });
    });
});
