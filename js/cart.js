document.addEventListener("DOMContentLoaded", renderCart);

function renderCart() {
  const cart     = JSON.parse(localStorage.getItem("cart") || "[]");
  const listBox  = document.getElementById("cart-list");
  const emptyMsg = document.getElementById("empty-msg");
  const summary  = document.getElementById("cart-summary");

  listBox.innerHTML = "";

  if (cart.length === 0) {
    emptyMsg.style.display = "flex";
    summary.style.display  = "none";
    return;
  }

  emptyMsg.style.display = "none";
  summary.style.display  = "block";

  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div class="col-product">
        <img src="${item.img}" alt="${item.name}">
        <div class="item-text">
          <h4>${item.name}</h4>
          <p>${item.desc || ""}</p>
        </div>
      </div>
      <div class="col-qty">
        <div class="qty-box">
          <button onclick="changeCartQty(${index}, -1)">－</button>
          <span>${item.qty}</span>
          <button onclick="changeCartQty(${index}, 1)">＋</button>
        </div>
      </div>
      <div class="col-price">${item.price.toLocaleString()}원</div>
      <div class="col-subtotal">${subtotal.toLocaleString()}원</div>
      <div class="col-remove">
        <button class="btn-remove" onclick="removeItem(${index})">✕</button>
      </div>
    `;
    listBox.appendChild(row);
  });

  const deliveryFee  = total >= 30000 ? 0 : 3000;
  const finalPrice   = total + deliveryFee;

  document.getElementById("total-price").textContent    = total.toLocaleString() + "원";
  document.getElementById("delivery-fee").textContent   = deliveryFee === 0 ? "무료" : deliveryFee.toLocaleString() + "원";
  document.getElementById("final-price").textContent    = finalPrice.toLocaleString() + "원";
}

function changeCartQty(index, delta) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart[index].qty = Math.max(1, Math.min(99, cart[index].qty + delta));
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const name = cart[index].name;
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function order() {
  alert("주문 기능은 준비 중입니다.");
}
