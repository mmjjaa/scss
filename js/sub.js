document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const name  = params.get("name")  || "상품명";
  const img   = params.get("img")   || "";
  const desc  = params.get("desc")  || "";
  const price = parseInt(params.get("price")) || 0;

  document.getElementById("product-name").textContent      = name;
  document.getElementById("breadcrumb-name").textContent   = name;
  document.getElementById("product-desc").textContent      = desc;
  document.getElementById("product-price").textContent     = price.toLocaleString();
  document.getElementById("total-price").textContent       = price.toLocaleString() + "원";

  if (img) {
    const mainImg = document.getElementById("product-img");
    mainImg.src   = img;
    mainImg.alt   = name;
    mainImg.style.display = "block";

    const detailImg = document.getElementById("product-img-detail");
    detailImg.src   = img;
    detailImg.alt   = name;
    detailImg.style.display = "block";
  }

  // ── 장바구니 담기 ──────────────────────────────
  document.getElementById("btn-cart").addEventListener("click", () => {
    const qty  = parseInt(document.getElementById("qty").value);
    addToCart({ name, img, desc, price, qty });
    showToast(`"${name}"이(가) 장바구니에 담겼습니다.`);
  });

  // ── 바로 구매 ──────────────────────────────────
  document.getElementById("btn-buy").addEventListener("click", () => {
    const qty = parseInt(document.getElementById("qty").value);
    addToCart({ name, img, desc, price, qty });
    window.location.href = "cart.html";
  });
});

function addToCart(item) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existing = cart.find((c) => c.name === item.name);
  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQty(delta) {
  const qtyInput = document.getElementById("qty");
  const price    = parseInt(new URLSearchParams(window.location.search).get("price")) || 0;
  let qty = parseInt(qtyInput.value) + delta;
  if (qty < 1) qty = 1;
  if (qty > 99) qty = 99;
  qtyInput.value = qty;
  document.getElementById("total-price").textContent = (price * qty).toLocaleString() + "원";
}

function showTab(tabName, el) {
  document.querySelectorAll(".tab-content").forEach((c) => (c.style.display = "none"));
  document.querySelectorAll(".tab-menu li").forEach((li) => li.classList.remove("active"));
  document.getElementById("tab-" + tabName).style.display = "block";
  el.classList.add("active");
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "cart-toast";
  toast.innerHTML = `
    <span>${msg}</span>
    <a href="cart.html" class="toast-link">장바구니 보기 →</a>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
