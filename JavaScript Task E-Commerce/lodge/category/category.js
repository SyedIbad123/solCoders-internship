let categoryDiv = document.getElementById("selectedCategory-div");

document.addEventListener("DOMContentLoaded", (event) => {
  getSelectedCategory();
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
    }else{ 
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
          <button>Add to cart</button>
        </div>`
    )
    .join("");
}
