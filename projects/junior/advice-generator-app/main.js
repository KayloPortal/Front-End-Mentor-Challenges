// Manage

let requestedIds = {}
let currentAdviceJson;

const getAdvice = async () => {
  try{
  json = await fetch("https://api.adviceslip.com/advice", 
  {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  })
}
  catch{
    renderError();
  }
  if (!json.ok) {
    renderError();
  }
  json = await json.json()
  json = json.slip
  return json
}

const idsCheck = (id) => {
  if (`${id}` in requestedIds){
    return true;
  } else {
    requestedIds[ id ] = 1;
    return false;
  }
}

// View

const renderAdvice = (json) => {
  adviceE.innerText = json.advice;
  adviceId.innerText =  json.id;
}

const renderError = () => {
  errorE.classList.add("animate");
  setTimeout(function (){errorE.classList.remove("animate");}, 4000) 
}

// Controller

async function draw() {
  do {
    currentAdviceJson = await getAdvice();
  }
  while (idsCheck(currentAdviceJson.id))
  renderAdvice(currentAdviceJson);
}

const drawB = document.querySelector("#draw");
drawB.addEventListener("click", draw)
const adviceId = document.querySelector("#advice-number");
const adviceE = document.querySelector("#advice-content");
const errorE = document.querySelector(".error-box");

// Start
draw();