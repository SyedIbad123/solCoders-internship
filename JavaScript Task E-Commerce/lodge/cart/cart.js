let singleCartDiv = document.getElementById("cart-div");
let cartSection = document.getElementById("cart-section");
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let loader = document.getElementById("loader") || null;

document.addEventListener("DOMContentLoaded", async (event) => {
  if (loader) {
    loader.style.display = "block";
  }

  if (cart.length > 0) {
    for (const item of cart) {
      try {
        const url = `https://dummyjson.com/products/${item}`;
        const res = await fetch(url);
        const body = await res.json();

        if (body) {
          if (loader) {
            loader.style.display = "none";
          }
          updateCartUI(body);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        if (loader) {
          loader.style.display = "none";
        }
      }
    }
  } else {
    if (loader) {
      loader.style.display = "none";
    }
    singleCartDiv.innerHTML = `<p class="cart-empty">Cart is Empty</p>`;
  }
});

function updateCartUI(cartItem) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length == 0) {
    if (singleCartDiv) {
      singleCartDiv.innerHTML = `<p class="cart-empty">Cart is Empty</p>`;
    }
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
    if (singleCartDiv) {
      singleCartDiv.innerHTML += cartHTML;
    }
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
    if(singleCartDiv){
      const productElement = document.querySelector(
        `.remove-btn[onclick="removeProduct(${id})"]`
      )?.parentElement;
      if (productElement) {
        productElement.remove();
      }
    }
  }
}
