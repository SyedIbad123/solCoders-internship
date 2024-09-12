let singleProductDiv = document.getElementById("product-div");
let loader = document.getElementById("loader");
let paginationItemDiv = document.getElementById("list-items");
let searchInp = document.getElementById("search-inp");
let shoppingCartSlider = document.getElementById("cart-slider");


const idStore = [];


let currentQuery = "";

document.addEventListener("DOMContentLoaded", (event) => {
  getProducts();
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
      loader.style.display = "none";
      if (!products) {
        renderProducts(body?.products);
        pagination(body);
      } else if (products?.length > 0) {
        singleProductDiv.innerHTML = "";
        renderProducts(products);
      }
    } else {
      loader.style.display = "block";
    }
  } catch (err) {
    console.error(err.message);
  }
}

function renderProducts(products) {

  singleProductDiv.innerHTML = products
    .map(
      (item) => `
      <div class="single-product">
        <div class="single-productImgDiv">
            <img class="single-productImg" src="${item?.images[0]}" alt="">
        </div>
        <h5>${item?.title}</h5>
        <a onclick="selectedCategory('${item?.category}')">${item?.category}</a>
        <p>$${Math.round(item?.price)}</p>
        <button onclick="handleCart(${item?.id})">Add to cart</button>
      </div>`
    )
    .join("");
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
      singleProductDiv.innerHTML = ""; 
      renderProducts(result);
      pagination(body);
    } else {
      alert("No products found");
    }
  } catch (e) {
    console.error(e.message);
  }
}

searchInp.addEventListener("input", debounce(searchProducts, 500));

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

  paginationItemDiv.innerHTML = "";

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
    paginationItemDiv.innerHTML += paginationItem;
  });

  let paginationList = document.querySelectorAll("#list-pagination a");
  let nextBtn = document.querySelector("#next-btn a");
  let prevBtn = document.querySelector("#prev-btn a");

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

function selectedCategory(categoryItem){
  if(categoryItem){
    window.location.href = `/category/category.html?category=${categoryItem}`;
  }
};


async function handleCart(id){
  idStore.push(id);

  localStorage.setItem("id", idStore);
  const localStorageIds = localStorage.getItem("id");

  const url = `https://dummyjson.com/products/${id}`
  const res = await fetch(url);
  const body = await res.json();


  const cart = `
    <div class="single-product">
        <div class="single-productImgDiv">
            <img class="single-productImg" src="${body?.images[0]}" alt="">
        </div>
        <h5>${body?.title}</h5>
        <p>$${Math.round(body?.price)}</p>
    </div>
  `;

  shoppingCartSlider.innerHTML += cart;
}
