let categoryDropdown = document.getElementById("category-dropdown");


document.addEventListener("DOMContentLoaded", (event) => {
    getCategories();
});


async function getCategories(){
    const res = await fetch('https://dummyjson.com/products/categories');
    const body = await res.json();
    const allCategories = body.map((item)=>{
        const options = `<option value=${item?.slug}>${item?.name}</option>`;
        categoryDropdown.innerHTML += options;
    });
};





