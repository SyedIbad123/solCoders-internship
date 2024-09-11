let singleProductDiv = document.getElementById("product-div");
let loader = document.getElementById("loader");
let paginationItemDiv = document.getElementById("list-items");
let searchInp = document.getElementById("search-inp");

document.addEventListener("DOMContentLoaded", (event) => {
  getProducts();
  pagination();
});

async function getProducts(products) {
  try {
    let res = await fetch("https://dummyjson.com/products?limit=12");
    let body = await res.json();

    if (body?.products.length > 0) {
      loader.style.display = "none";
      if (!products || products === false) {
        pagination(body);
        const allProducts = body?.products?.map((item) => {
          const list1 = `<div class="single-product">
                <div class="single-productImgDiv">
                    <img class="single-productImg" src="${
                      item?.images[0]
                    }" alt="">
                </div>
                <h5>${item?.title}</h5>
                <p>$${Math.round(item?.price)}</p>
                <button>Add to cart</button>
            </div>`;
          singleProductDiv.innerHTML += list1;
        });
      } else if (products?.length > 0) {
        singleProductDiv.innerHTML = "";
        const searchedProducts = products?.map((item) => {
          const list2 = `<div class="single-product">
                <div class="single-productImgDiv">
                    <img class="single-productImg" src="${
                      item?.images[0]
                    }" alt="">
                </div>
                <h5>${item?.title}</h5>
                <p>$${Math.round(item?.price)}</p>
                <button>Add to cart</button>
            </div>`;
          singleProductDiv.innerHTML += list2;
        });
      }
    } else {
      loader.style.display = "block";
    }
  } catch (err) {
    console.error(err.message);
  }
}

function debounce(func, delay) {
  let timeoutId;
  timeoutId = setTimeout(() => {
    func(this);
  }, delay);
  return function (...args) {
    clearTimeout(timeoutId);
  };
}

function searchProducts(e) {
  debounce(async function () {
    const query = e.target.value.toLowerCase();
    console.log(query);
    if (query === "") {
      searchProducts();
    }
    try {
      const limit = 12;
      const url = `https://dummyjson.com/products/search?q=${query}&limit=${limit}`;
      const res = await fetch(url);
      const body = await res.json();
      const result = body.products;
      getProducts(result, query);
    } catch (e) {
      console.error(e.message);
    }
  }, 500);
}

searchInp.addEventListener("change", searchProducts);


function pagination(item) {

  if (item) {
    const totalPages = Math.ceil(item?.total / item?.limit);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    pageNumbers?.map((item) => {
      
      const paginationItem = `
        <li id="list-pagination">
          <a>${item}</a>
        </li>`;
      paginationItemDiv.innerHTML += paginationItem;
    });

  }

  let paginationList = document.querySelectorAll("#list-pagination");
  console.log(paginationList);
}

pagination();

