let singleProductDiv = document.getElementById("product-div") || null;
let loader = document.getElementById("loader") || null;
let paginationItemDiv = document.getElementById("list-items") || null;
let searchInp = document.getElementById("search-inp") || null;
let shoppingCartSlider = document.getElementById("cart-productMain") || null;
let subTotalDiv = document.getElementById("sub-total") || null;
let emptyCartDiv = document.getElementById("empty-cart") || null;

let currentQuery = "";

document.addEventListener("DOMContentLoaded", (event) => {
  getProducts();
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

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

async function getProducts(products) {
  try {
    let res = await fetch("https://dummyjson.com/products?limit=12");
    let body = await res.json();

    if (body?.products.length > 0) {
      if (loader) {
        loader.style.display = "none";
      }
      if (!products) {
        renderProducts(body?.products);
        pagination(body);
      } else if (products?.length > 0) {
        if (singleProductDiv) {
          singleProductDiv.innerHTML = "";
          renderProducts(products);
        }
      }
    } else {
      if (loader) {
        loader.style.display = "block";
      }
    }
  } catch (err) {
    console.error(err.message);
  }
}

function renderProducts(products) {
  if (singleProductDiv) {
    singleProductDiv.innerHTML = products
      .map(
        (item) => `
      <div class="single-product">
        <div class="single-productImgDiv">
            <img class="single-productImg" src="${item?.images[0]}" onclick="singleProduct(${item?.id})" alt="">
        </div>
        <h5>${item?.title}</h5>
        <a onclick="selectedCategory('${item?.category}')">${item?.category}</a>
        <p>$${Math.round(item?.price)}</p>
        <button onclick="handleCart(${item?.id})">Add to cart</button>
      </div>`
      )
      .join("");
  }
}

async function searchProducts(e) {
  const query = e.target.value.toLowerCase();
  currentQuery = query;
  if (query === "") {
    getProducts();
    return;
  }
  try {
    const limit = 12;
    const url = `https://dummyjson.com/products/search?q=${query}&limit=${limit}`;
    const res = await fetch(url);
    const body = await res.json();
    const result = body?.products;
    if (result?.length > 0) {
      if (singleProductDiv) {
        singleProductDiv.innerHTML = "";
        renderProducts(result);
        pagination(body);
      }
    } else {
      alert("No products found");
    }
  } catch (e) {
    console.error(e.message);
  }
}

if (searchInp) {
  searchInp.addEventListener("input", debounce(searchProducts, 500));
}

function pagination(item, currentPage = 1) {
  const totalPages = Math.ceil(item?.total / item?.limit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const truncatePageNumbers = [];

  if (totalPages <= 10) {
    truncatePageNumbers.push(...pageNumbers);
  } else {
    if (currentPage >= 4) {
      truncatePageNumbers.push(1);
      if (currentPage >= 5) {
        truncatePageNumbers.push("...");
      }
    }

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 3);

    for (let i = startPage; i <= endPage; i++) {
      truncatePageNumbers.push(i);
    }

    if (currentPage < totalPages - 3) {
      if (currentPage < totalPages - 4) {
        truncatePageNumbers.push("...");
      }
      truncatePageNumbers.push(totalPages);
    }
  }

  if (paginationItemDiv) {
    paginationItemDiv.innerHTML = "";
  }

  truncatePageNumbers.forEach((pageNum) => {
    let paginationItem;
    if (pageNum === "...") {
      paginationItem = `<li class="dots">...</li>`;
    } else {
      paginationItem = `
        <li id="list-pagination" class="${
          pageNum == currentPage ? "active" : ""
        }">
          <a data-page="${pageNum}">${pageNum}</a>
        </li>`;
    }
    if (paginationItemDiv) {
      paginationItemDiv.innerHTML += paginationItem;
    }
  });

  let paginationList = document.querySelectorAll("#list-pagination a");
  let nextBtn = document.querySelector("#next-btn a");
  let prevBtn = document.querySelector("#prev-btn a");

  if (paginationList) {
    paginationList.forEach((link) => {
      link.addEventListener("click", function (e) {
        const page = parseInt(e.target.getAttribute("data-page"));
        if (currentQuery === "") {
          getProductsByPage(page);
        } else {
          searchProductsByPage(currentQuery, page);
        }
        pagination(item, page);
      });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function (e) {
      if (currentPage < totalPages) {
        currentPage++;
        if (currentQuery === "") {
          getProductsByPage(currentPage);
        } else {
          searchProductsByPage(currentQuery, currentPage);
        }
        pagination(item, currentPage);
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function (e) {
      if (currentPage > 1) {
        currentPage--;
        if (currentQuery === "") {
          getProductsByPage(currentPage);
        } else {
          searchProductsByPage(currentQuery, currentPage);
        }
        pagination(item, currentPage);
      }
    });
  }
}

async function getProductsByPage(page) {
  try {
    let skip = (page - 1) * 12;
    let res = await fetch(
      `https://dummyjson.com/products?limit=12&skip=${skip}`
    );
    let body = await res.json();
    if (body?.products.length > 0) {
      renderProducts(body.products);
    }
  } catch (err) {
    console.error(err.message);
  }
}

async function searchProductsByPage(query, page) {
  try {
    let skip = (page - 1) * 12;
    let res = await fetch(
      `https://dummyjson.com/products/search?q=${query}&limit=12&skip=${skip}`
    );
    let body = await res.json();
    if (body?.products.length > 0) {
      renderProducts(body.products);
    }
  } catch (err) {
    console.error(err.message);
  }
}

function selectedCategory(categoryItem) {
  if (categoryItem) {
    window.location.href = `/category/category.html?category=${categoryItem}`;
  }
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


function singleProduct(id){
  window.location.href = `/singleProduct/singleProduct.html?productId=${id}`;
}