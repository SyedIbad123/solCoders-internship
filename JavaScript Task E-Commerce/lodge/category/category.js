let categoryDiv = document.getElementById("selectedCategory-div");
let emptyCartDiv = document.getElementById("empty-cart") || null;
let shoppingCartSlider = document.getElementById("cart-productMain") || null;
let subTotalDiv = document.getElementById("sub-total") || null;


document.addEventListener("DOMContentLoaded", (event) => {
  getSelectedCategory();
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length > 0) {
    cart.forEach(async (item) => {
      if (item) {
        const url = `https://dummyjson.com/products/${item}`;
        const res = await fetch(url);
        const body = await res.json();
        updateCartUI(body);
        subTotal();
      }
    });
  } else {
    updateCartUI();
    subTotal();
  }
});

async function getSelectedCategory() {
  try {
    const category = new URL(window.location.href).searchParams.get("category");
    const url = `https://dummyjson.com/products/category/${category}`;
    const res = await fetch(url);
    const body = await res.json();

    if (body?.products.length > 0) {
      loader.style.display = "none";
      renderCategories(body?.products);
    } else {
      loader.style.display = "block";
    }
  } catch (e) {
    console.error(e.message);
  }
}

function renderCategories(categories) {
  categoryDiv.innerHTML = categories
    .map(
      (item) => `
        <div class="single-product">
          <div class="single-productImgDiv">
              <img class="single-productImg" src="${item?.images[0]}" alt="">
          </div>
          <h5>${item?.title}</h5>
          <a onclick="selectedCategory('${item?.category}')">${
        item?.category
      }</a>
          <p>$${Math.round(item?.price)}</p>
          <button onclick="handleCart(${item?.id})">Add to cart</button>

        </div>`
    )
    .join("");
}

async function handleCart(id) {
  try {
    if (id) {
      const url = `https://dummyjson.com/products/${id}`;
      const res = await fetch(url);
      const body = await res.json();
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      for (let i = 0; i < cart.length; i++) {
        if (cart[i] === body?.id) {
          alert("Product already in cart!");
          return;
        }
      }
      const cartItem = body?.id;
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Product added to cart successfully!");
      updateCartUI(body);
    }
  } catch (err) {
    console.error("Error adding to cart:", err.message);
  }
}

function updateCartUI(cartItem) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length == 0) {
    const emptyCartHTML = `
        <div class="empty-cart">
          <p>Cart is Empty</p>
        </div>`;
    if (emptyCartDiv) {
      emptyCartDiv.innerHTML = emptyCartHTML;
    }
    subTotal();
  }

  if (cartItem) {
    const cartHTML = `
      <div class="cart-product">
          <div class="cart-productImgDiv">
            <img class="cart-productImg" src="${cartItem?.images[0]}" alt="${
      cartItem?.title
    }">
            <div class="cart-productContent">
                <h5>${cartItem?.title}</h5>
                <p>$${Math.round(cartItem?.price)}</p>
            </div>
          </div>
          <p class="remove-btn" onclick="removeProduct(${cartItem?.id})">—</p>
      </div>`;

    if (cart.length > 0) {
      if (shoppingCartSlider) {
        if (emptyCartDiv) {
          emptyCartDiv.innerHTML = "";
        }
        shoppingCartSlider.innerHTML += cartHTML;
      }
    }
  }
  subTotal();
}

let total = 0;

async function subTotal() {
  total = 0;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let prices = JSON.parse(localStorage.getItem("cartPrices")) || {};

  for (let i = 0; i < cart.length; i++) {
    if (!prices[cart[i]]) {
      try {
        const res = await fetch(`https://dummyjson.com/products/${cart[i]}`);
        const product = await res.json();
        prices[cart[i]] = Math.round(product?.price);
        localStorage.setItem("cartPrices", JSON.stringify(prices));
      } catch (err) {
        console.error(`Error fetching product ${cart[i]}:`, err.message);
      }
    }
    total += prices[cart[i]];
  }

  if (subTotalDiv) {
    subTotalDiv.innerHTML = `<p>Subtotal: $${total}</p>`;
  }
}

function removeProduct(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (id) {
    let newCart = cart.filter((item) => item !== id);
    localStorage.removeItem(id);
    if (newCart) {
      localStorage.setItem("cart", JSON.stringify(newCart));
      alert("Product removed from cart successfully!");
      updateCartUI();
    }
    const productElement = document.querySelector(
      `.remove-btn[onclick="removeProduct(${id})"]`
    ).parentElement;
    if (productElement) {
      productElement.remove();
    }
    subTotal();
  }
}
