let categoryDropdown = document.getElementById("category-dropdown");
let categoryDiv = document.getElementById("category-div");

document.addEventListener("DOMContentLoaded", (event) => {
  getCategories();
});

// async function getCategories(){
//     const res = await fetch('https://dummyjson.com/products/categories');
//     const body = await res.json();
//     const allCategories = body.map((item)=>{
//         const options = `<option value=${item?.slug}>${item?.name}</option>`;
//         categoryDropdown.innerHTML += options;
//     });
// };

async function getCategories() {
  const res = await fetch(
    "https://dummyjson.com/products/category/womens-jewellery"
  );
  const body = await res.json();
  console.log("body : ", body);
  const allCategories = body?.products?.map((item,index) => {
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

    categoryDiv.innerHTML += list;
  });
}
