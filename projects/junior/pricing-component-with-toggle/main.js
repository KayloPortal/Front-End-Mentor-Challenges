// Model
let recentToggle;
let modeBin = true;

let toggle = (e) => {
  e = e.target;
  while (!e.classList.contains("pricing-box")) {
    e = e.parentElement;
  }
  removeToggle(recentToggle);
  addToggle(e);
};

let changeMode = (e) => {
  changeModeB.classList.toggle("toggle");
  if(modeBin){renderAnnually();}
  else{renderMonthly();}
  modeBin = !modeBin;
};

// View

let addToggle = (e) => {
  e.classList.add("toggle-query");
  recentToggle = e;
};

let removeToggle = (e) => {
  e.classList.remove("toggle-query");
};

let renderAnnually = () => {
  for (const key of prices) {
    const value = key.innerHTML;
    key.innerHTML = parseInt(Number(value)) + "9.99";
  }
}

let renderMonthly = () => {
  for (const key of prices) {
    const value = key.innerHTML;
    key.innerHTML = parseInt(Number(value) / 10) + ".99";
  }
}

// Controller
const pricingElements = document.querySelectorAll(".pricing-box");
let pricingElementsNumber = pricingElements.length;
const pricings = {};
for (let i = 0; i < pricingElementsNumber; i++) {
  pricingElements[i].addEventListener("click", toggle);
  pricings[pricingElements[i]] = true;
}

const prices = document.querySelectorAll(".price-number");

let middleBox = pricingElements[Math.floor(pricingElementsNumber / 2)];
addToggle(middleBox);
recentToggle = middleBox;

const changeModeB = document.querySelector(".toggle-button");
changeModeB.addEventListener("click", changeMode);

let circle = document.querySelector("#indactor");
