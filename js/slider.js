//배너 슬라이드
document.addEventListener("DOMContentLoaded", () => {
  // 배너 이미지 목록
  const banners = [
    "img/banner/banner_1.png",
    "img/banner/banner_2.png",
    "img/banner/banner_3.png",
    "img/banner/banner_4.png",
    "img/banner/banner_5.png",
  ];

  let index = 0; // 현재 배너번호

  // 3초마다 자동 변경
  setInterval(() => {
    // 다음 배너로 이동
    index++;

    // 5 → 0으로 초기화
    if (index >= banners.length) {
      index = 0;
    }

    // 이미지 변경
    document.getElementById("bannerImg").src = banners[index];
  }, 3000); // 3000ms = 3초
});
