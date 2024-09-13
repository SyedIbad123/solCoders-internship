let singleCartDiv = document.getElementById("cart-div");
let cartSection = document.getElementById("cart-section");
let cart = JSON.parse(localStorage.getItem("cart")) || [];


document.addEventListener("DOMContentLoaded", (event) => {
  if (cart.length > 0) {
    cart.forEach(async (item) => {
      const url = `https://dummyjson.com/products/${item}`;
      const res = await fetch(url);
      const body = await res.json();
      updateCartUI(body);
    });
  }
});


function updateCartUI(cartItem) {
  const cartHTML = `
    <div class="single-product">
        <div class="single-productImgDiv">
            <img class="single-productImg" src="${cartItem?.images[0]}" alt="${
    cartItem?.title
  }">
        </div>
        <h5>${cartItem?.title}</h5>
        <p>$${Math.round(cartItem?.price)}</p>
    </div>`;

  singleCartDiv.innerHTML += cartHTML;
}
