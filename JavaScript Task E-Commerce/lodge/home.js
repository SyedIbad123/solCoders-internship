let categoryDropdown = document.getElementById("myDropdown") || [];
let categoryDiv1 = document.getElementById("category-div") || [];
let shoppingCartImg = document.getElementById("shopping-cartImg");

document.addEventListener("DOMContentLoaded", (event) => {
  getCategories();
  getCategoriesDropdown();
});

async function getCategories() {
  const res = await fetch(
    "https://dummyjson.com/products/category/womens-jewellery"
  );
  const body = await res?.json();

  const allCategories = body?.products?.map((item) => {
    const list = `<div class="category-list">
            <div class="intro">
              <p>${item?.title}</p>
              <p>$ ${Math.round(item?.price)}</p>
            </div>
            <div class="category-img">
                <img src="${item?.images[0]}" alt="category image" />
            </div>
            <div class="category-para">
                <span>best price</span>
                <p>${item?.category}</p>
            </div>
          </div>`;

    categoryDiv1.innerHTML += list;
  });
}

function showDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains("show")) {
      myDropdown.classList.remove("show");
    }
  }
};

async function getCategoriesDropdown() {
  const url = "https://dummyjson.com/products/categories";
  const res = await fetch(url);
  const body = await res.json();

  body?.map((item) => {
    let dropdownContent = `<a onclick="selectedCategory('${item?.slug}')">${item?.name}</a>`;
    categoryDropdown.innerHTML += dropdownContent;
  });
}

function selectedCategory(categoryItem) {
  if (categoryItem) {
    window.location.href = `/category/category.html?category=${categoryItem}`;
  }
}

function openSlider() {
  console.log("openslider called");
  const slider = document.getElementById("cart-slider");
  if(slider){
    slider.style.width = "270px";
  }
}

function closeSlider() {
  document.getElementById("cart-slider").style.width = "0";
}
