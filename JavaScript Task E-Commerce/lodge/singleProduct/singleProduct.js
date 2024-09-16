let shoppingCartSlider = document.getElementById("cart-productMain") || null;
let subTotalDiv = document.getElementById("sub-total") || null;
let emptyCartDiv = document.getElementById("empty-cart") || null;

document.addEventListener("DOMContentLoaded", async () => {
  const productId = new URLSearchParams(window.location.search).get(
    "productId"
  );

  console.log("productId:", productId);

  if (productId) {
    try {
      await fetchProduct(productId);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }
});

async function fetchProduct(id) {
  const url = `https://dummyjson.com/products/${id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const product = await response.json();
  renderProduct(product);
}

function renderProduct(product) {
  document.getElementById("product-title").textContent = product?.title;
  document.getElementById("product-thumbnail").src = product?.thumbnail;
  document.getElementById("product-description").textContent =
    product?.description;
  document.getElementById("product-category").textContent = product?.category;

  const discountPrice = product?.discountPercentage
    ? (
        product?.price -
        (product?.price * product?.discountPercentage) / 100
      ).toFixed(2)
    : product?.price;

  const priceHTML = product?.discountPercentage
    ? `<span>${product?.price}</span>`
    : `$${product?.price}`;

  document.getElementById("product-price").innerHTML = priceHTML;
  document.getElementById("product-quantity").textContent =
    product?.minimumOrderQuantity || "N/A";
  document.getElementById(
    "addToCartSingleProduct"
  ).innerHTML = `<button class="addToCartBtn" onclick="handleCart('${product?.id}')">Add to Cart</button>`;

  renderRating(product?.rating);
}

function renderRating(rating) {
  const starRatingArr = Array.from({ length: 5 }, (_, i) => i + 1);
  const starRatingHTML = starRatingArr
    ?.map(
      (star) => `
      <svg xmlns="http://www.w3.org/2000/svg" fill="${
        star <= Math.ceil(rating) ? "yellow" : "none"
      }" viewBox="0 0 24 24" strokeWidth="0.5" stroke="currentColor">
        <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
      </svg>
    `
    )
    .join("");
  document.getElementById("product-rating").innerHTML = starRatingHTML;
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
  }

  if(cartItem){
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
        if(emptyCartDiv){
          emptyCartDiv.innerHTML = "";
        }
        shoppingCartSlider.innerHTML += cartHTML;
      }
    }
  }
}