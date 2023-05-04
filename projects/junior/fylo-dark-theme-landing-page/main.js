
const emailRegex = 
 new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
validate = () => {
  let email = emailInput.value;
  if (emailRegex.test(email)) {
    errorElement.setAttribute("data-display", "none")
  }
  else {
    console.log(errorElement);
    errorElement.setAttribute("data-display", "shown")
  }
}
const emailInput = document.querySelector("#email");
const errorElement = document.querySelector(".error")
const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", validate)