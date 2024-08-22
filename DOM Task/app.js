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

for(let i = 0 ; i < allNextBtns.length; i++){
  allNextBtns[i].setAttribute("class", `next-btn btn-${i+1}`);
}

for(let i = 0 ; i < allPrevBtns.length; i++){
  allPrevBtns[i].setAttribute("class", `prev-btn btn-${i+1}`);
}

let currentIndex = [];
for(let i = 0 ; i < section.children.length; i++){
  currentIndex[i] = 1;
}
window.location.onreload = updateVisibility(currentIndex);


function updateVisibility(currentIndex){
  for(let i = 0 ; i< currentIndex.length; i++){
    if(currentIndex[i] === 1){
      allPrevBtns[i].style.visibility = "hidden";
      allNextBtns[i].style.visibility = "visible";
    } else if(currentIndex[i] < currentIndex.length){
        allNextBtns[i].style.visibility = "visible";
        allPrevBtns[i].style.visibility = "visible";
    } else if(currentIndex[i] === currentIndex.length){
      allNextBtns[i].style.visibility = "hidden";
      allPrevBtns[i].style.visibility = "visible";
    }
  }
}

allNextBtns.forEach((btn)=>btn.addEventListener("click", function (e) {
  selectedButton = e.target;
  let pop1 = e.target.className.split("-").pop();
  currentIndex.forEach((item,index)=> {
    if(selectedButton.id === 'next'){
      if(Number(pop1) === index+1){
        currentIndex[index]++;
      }
    }
  });
  updateVisibility(currentIndex);
  const parent = selectedButton.closest(".test");
  const nextsib = parent.nextElementSibling;
  if (selectedButton.id === "next") {
    if (nextsib !== null) {
      nextsib.appendChild(parent.firstElementChild);
    } else if(nextsib === null){
      alert("You have reached the limit");
    }
  }
}));
allPrevBtns.forEach((btn)=>btn.addEventListener("click", function (e) {
  selectedButton = e.target;
  let pop1 = e.target.className.split("-").pop();
  console.log("pop1 : ",pop1);
  currentIndex.forEach((item,index)=> {
    if(selectedButton.id === 'prev'){
      if(Number(pop1) === index+1){
        currentIndex[index]--;
      }
    }
  })
  updateVisibility(currentIndex);
  const parent = selectedButton.closest(".test");
  const prevsib = parent.previousElementSibling;
  if (selectedButton.id === "prev") {
    if (prevsib !== null) {
      prevsib.appendChild(parent.firstElementChild);
    }else if(prevsib === null){
      alert("You have reached the limit");
    }
  } 
}));


