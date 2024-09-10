let singleProductDiv = document.getElementById("product-div");
let loader = document.getElementById("loader");

document.addEventListener("DOMContentLoaded", (event) => {
  getProducts();
});

async function getProducts() {
  let res = await fetch("https://dummyjson.com/products?limit=12");
  let body = await res.json();

  if(body?.products.length > 0){
    loader.style.display = 'none';
    const allProducts = body?.products?.map((item, index) => {
    const list = `<div class="single-product">
            <div class="single-productImgDiv">
                <img class="single-productImg" src="${item?.images[0]}" alt="">
            </div>
            <h5>${item?.title}</h5>
            <p>$${Math.round(item?.price)}</p>
            <button>Add to cart</button>
        </div>`;

    singleProductDiv.innerHTML += list;
    });
  }else{
    loader.style.display = "block";
  }

}
