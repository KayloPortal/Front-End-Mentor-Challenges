// Model
function verfiyEmail(s, signIndex, dotIndex, info, domain) {
  if (
    signIndex != -1 &&
    dotIndex != -1 &&
    s.substring(0, signIndex) &&
    info &&
    domain
  ) {
    return true;
  }
  return false;
}

const emailCheck = () => {
  console.log("L");
  let s = inputElement.value;
  let signIndex = s.indexOf("@");
  let dotIndex = s.indexOf(".");
  let info = s.substring(signIndex + 1, dotIndex);
  let domain = s.substring(s.indexOf(info) + info.length + 1, s.length);
  return verfiyEmail(s, signIndex, dotIndex, info, domain);
}

const sendData = () => {
  if (emailCheck()) {
    removeAlert();
    let email = inputElement.value;
    let req = new XMLHttpRequest();
    req.open("GET", "index.html", true);
    req.send(email);
  } else {
    renderAlert();
  }
}
// View
function renderAlert(){
  console.log("H");
  inputElement.setAttribute("data-border", "red");
  alertIcon.setAttribute("data-display","show");
  alertText.setAttribute("data-display", "show");
}
function removeAlert(){
  console.log("H");
  inputElement.setAttribute("data-border", "grey");
  alertIcon.setAttribute("data-display","none");
  alertText.setAttribute("data-display", "none");
}
// Controll

const formElement = document.querySelector("#form");
const inputElement = document.querySelector("#input");
const submitButton = document.querySelector("#submit");
const alertIcon = document.querySelector("#alert-icon-countainer");
const alertText = document.querySelector("#alert-text");

formElement.addEventListener("submit", sendData);
submitButton.addEventListener("click", sendData);
