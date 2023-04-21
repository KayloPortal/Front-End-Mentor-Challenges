// Model
submit = () => {
  let formStatus = true;
  normalCheck();
  emailCheck(); 
  if(formStatus){console.log("No issues. Form can be sended");}
}

const emailRegex = 
 new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");


emailCheck = () => {
  if (!emailRegex.test(emailInput.value)){
    formStatus = false;
    renderError(inputCountainers[index]);
  }
}

normalCheck = () => {
  for (let i = 0; i < inputElements.length; i++) {
    formStatus = false;
    if(inputElements[i].value.length == 0){renderError(inputCountainers[i])}
    else { resetError(inputCountainers[i]); }   
  } 
}

// View

resetError = (element)  => {
  element.querySelector("label").setAttribute("data-display", "none");
  element.querySelector(".error-icon").setAttribute("data-display", "none");
}

renderError = (element)  => {
  element.querySelector("label").setAttribute("data-display", "shown");
  element.querySelector(".error-icon").setAttribute("data-display", "shown");
}

findIndex = (collection, element) => {
  for (let index = 0; index < collection.length; index++) {
    if (collection[index] == element){return index;};
    
  }
}

// Controller

const form = document.querySelector("#form");
const submitButton = document.querySelector("#submit");
const inputElements = document.getElementsByTagName("input");
const inputCountainers = document.getElementsByClassName("input-countainer");
const emailInput = document.getElementById("#email");
let index = findIndex(inputCountainers, emailInput);
// form.addEventListener("submit", submit);
submitButton.addEventListener("click", submit);


