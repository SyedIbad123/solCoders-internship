// Best Code 




const cart = `
<div id="content" class="clientCards">
    <div class="clientInfo">
        <div class="clientDivImage">
            <!-- <img src="./images/client-1.jpg" alt="" /> -->
        </div>
        <div>
            <h5>John K. Meraz</h5>
            <p>CTO, Xyz Group</p>
        </div>
    </div>
    <div class="clientPara">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque sunt
            earum, quidem labore dignissimos alias cum quisquam vitae temporibus
            optio.
        </p>
    </div>
    <div class="btn-div">
        <button class="prev-btn" id="prev">Previous</button>
        <button class="next-btn" id="next">Next</button>
    </div>
</div>`;


const section = document.querySelector(".section");

Array.from(section.children).forEach((item) =>  item.children[0].innerHTML = cart);

const allNextBtns = document.querySelectorAll(".next-btn");
const allPrevBtns = document.querySelectorAll(".prev-btn");


let currentIndex = 0;

console.log("currentIndex : ", currentIndex);

// function updateVisibility() {
//   if (currentIndex === 0) {
//     allPrevBtns.forEach((item) => (item.style.visibility = "hidden"));
//   }
//   if (currentIndex !== 0 && currentIndex < section.children[0].children.length) {
//     console.log("currentIndex inside : ", currentIndex);
//     allPrevBtns[0].style.visibility = "visible";
//     allNextBtns[0].style.visibility = "visible";
//   } 
//   if(currentIndex === section.children[0].children.length-1){
//     allNextBtns[0].style.visibility = "hidden";
//   }
// }

// window.location.onreload = updateVisibility();


allNextBtns.forEach((btn)=>btn.addEventListener("click", function (e) {
  selectedButton = e.target;  
  const parent = selectedButton.closest(".test");
  const nextsib = parent.nextElementSibling;
  if (selectedButton.id === "next") {
    if (nextsib !== null) {
      nextsib.appendChild(parent.firstElementChild);
      // currentIndex++;
      // updateVisibility();
    } else if(nextsib === null){
      alert("You have reached the limit");
    }
  }
}));


allPrevBtns.forEach((btn)=>btn.addEventListener("click", function (e) {

  selectedButton = e.target;
  const parent = selectedButton.closest(".test");
  const prevsib = parent.previousElementSibling;

  if (selectedButton.id === "prev") {
    if (prevsib !== null) {
      prevsib.appendChild(parent.firstElementChild);
      // currentIndex--;
      // updateVisibility();
      console.log("currentIndex in prev : ", currentIndex);
    }else if(prevsib === null){
      alert("You have reached the limit");
    }
  } 
}));