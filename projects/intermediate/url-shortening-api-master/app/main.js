// Model

const validateStart = (domain, ss) => {
  if (ss.startsWith("http://www.")) {
    domain = "http://www.";
  } else if (ss.startsWith("https://www.")) {
    domain = "https://www.";
  } else if (ss.startsWith("www.")) {
    domain = "https://www.";
    ss = "https://" + ss;
  } else {
    domain = "https://www.";
    ss = domain + ss; 
  }
  return [domain, ss];
};

const validateMain = (passed, ss, domain) => {
  let ls = ss.substring(domain.length, ss.length);
  console.log(ls);
  let dotLastIndex = ls.lastIndexOf(".");
  if (ls.substring(dotLastIndex, ls.length).length > 1 && dotLastIndex != -1) {
    passed++;
    let remain = ls.substring(0, dotLastIndex);
    if (
      remain.length > 0 &&
      remain[0] != "." &&
      remain[remain.length - 1] != "."
    ) {
      passed++;
      removeError();
      requestLink([ss.substring(domain.length + 4, ss.length), ss]);
    }
  }
  if (passed < 2) {
    renderError();
  }
};

const renderError = () => {
  formF.setAttribute("data-validation", "error");
};

const removeError = () => {
  formF.setAttribute("data-validation", "fix");
}

const requestLink = async (arr) => {
  const url = arr[0];
  const fullyUrl = arr[1];
  formF.setAttribute("data-validation", "fix");
  let res = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  res = await res.json();
  if (res.ok) {
    renderLink([fullyUrl, res.result.full_short_link]);
    linksObject[fullyUrl] = res.result.full_short_link;
    linksArray.push(`${fullyUrl}`);
    updateLinks();
  }
};

const resetLinks = () => {
  localStorage.removeItem("links");
  localStorage.removeItem("linksArray");
}

const updateLinks = () => {
  resetLinks();
  localStorage.setItem("links", JSON.stringify(linksObject));
  localStorage.setItem("linksKeys", JSON.stringify(linksArray));
};

// View

let bin = true;
let delay = 1000;
const menuToggle = async () => {
  toggleB.classList.toggle("open");
  if (bin) {
    goLeft();
    menu.setAttribute("aria-hidden", "false");
  } else {
    menu.setAttribute("aria-hidden", "true");
    await setTimeout(goLeft, delay);
  }
  bin = !bin;
};

const toggleDisplay = () => {
  menu.classList.toggle("display-none-750l");
  menu.classList.toggle("display-shown-750l");
};

const goLeft = () => {
  menu.classList.toggle("display-none-750l");
  menu.classList.toggle("display-shown-750l");
  menu.classList.toggle("go-left");
}

const renderLink = (arr) => {
  const linkD = document.createElement("div");
  linksD.appendChild(linkD);
  linkD.innerHTML = `<div class="shorted-link bg-neutral-100">
  <div class="link-countainer">
    <a class="link clr-neutral-900">${arr[0]}</a>
  </div>
  <div class="shorted-link-coutainer">
    <a class="shorted-link-p clr-primary-300">${arr[1]}</a>
    <button class="copy ref-button rec-button" data-ref-link="${arr[1]}">Copy</button>
  </div>`;
  linkD.querySelector(".copy").addEventListener("click", copyLink);
};

const copyLink = (e) => {
  const element = e.target;
  navigator.clipboard.writeText(`${element.getAttribute("data-ref-link")}`);
  element.classList.add("ref-copied");
  element.innerHTML = "Copied";
  resetCopyButton(element);
};

const resetCopyButton = (element) => {
  function reset() {
    element.style = "transition: all .45s;"
    element.classList.remove("ref-copied");
    setTimeout(() => {element.innerHTML = "Copy";}, 50);
    setTimeout(resetStyle, 1000);
  }
  function resetStyle(){
    element.style = "";
  }
  setTimeout(reset, 1500);
};

const renderBase = () => {
  const arr = Object.keys(linksObject);
  arr.forEach(key => {
    renderLink([key, linksObject[key]])
  });

}

// Controller

let linksObject, linksArray;
let recivedLinks = JSON.parse(localStorage.getItem("links"));
let recivedArr = JSON.parse(localStorage.getItem("linksArray"));
if (recivedLinks == null || recivedLinks == undefined){
  linksObject = {
    "set": (key, url) => {this[`${key}`] = url}
  }
  localStorage.removeItem("links");
  localStorage.setItem("links", JSON.stringify(linksObject));
} else {
  linksObject = recivedLinks;
}

if (recivedArr == null || recivedArr == undefined){
  linksArray = [];
  localStorage.removeItem("linksArray");
  localStorage.setItem("linksArray", JSON.stringify(linksArray));
} else {
  linksArray = recivedArr;
}

const shortLink = (e) => {
  let ss = inputE.value;
  let domain = "";
  let passed = 0;
  [domain, ss] = validateStart(domain, ss);
  console.log(domain);
  if (!linksObject[ss]) {
    validateMain(passed, ss, domain);
    console.log(linksObject);
  }
};

const desing = document.querySelector("#design");
const designB = document.querySelector("#designB");
const toggleB = document.querySelector("#toggleB");
const menu = document.querySelector(".header-links");
const formF = document.querySelector(".form");
const inputE = formF.querySelector("#link-input");
const submitB = formF.querySelector("#submit-button");
const linksD = document.querySelector(".shorted-links");
submitB.addEventListener("click", shortLink);
menu.setAttribute("aria-hidden", "true");
menu.classList.toggle("display-none-750l");
toggleB.addEventListener("click", menuToggle);
renderBase();
