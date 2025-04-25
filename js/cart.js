
  const cart = [];
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartCountEl = document.getElementById("cartCount");

  function updateCart() {
    cartItemsEl.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <div>
          <h6 class="mb-1">${item.name}</h6>
          <small>${item.quantity} x Ksh ${item.price.toFixed(2)}</small>
        </div>
        <div>
          <strong>Ksh ${(item.price * item.quantity).toFixed(2)}</strong>
          <button class="btn btn-sm btn-danger ms-2" onclick="removeItem(${index})">×</button>
        </div>`;
      cartItemsEl.appendChild(li);
      total += item.price * item.quantity;
    });
    cartTotalEl.textContent = `Ksh ${total.toFixed(2)}`;
    cartCountEl.textContent = cart.length;
  }

  function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
  }

  function setupCartButtons() {
    document.querySelectorAll(".btn-cart").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const parent = btn.closest(".product-item");
        const name = parent.querySelector("h3").textContent.trim();
        const priceText = parent.querySelector(".text-dark.fw-semibold").textContent.trim();
        const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
        const quantity = parseInt(parent.querySelector(".quantity").value);

        const existing = cart.find(p => p.name === name);
        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.push({ name, price, quantity });
        }

        updateCart();
      });
    });
  }

  // Run once initially
  setupCartButtons();

  // Re-run if products are loaded dynamically
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(setupCartButtons, 1000); // in case swiper loads after
  });

