// Model
let menuOpened = false;
toggleMenu = () => {
  menuB.classList.toggle("opened");
  primaryNav.classList.toggle("display-none-l670");
  if(!menuOpened){
    document.body.setAttribute("style", "overflow-y: hidden;");
    menuB.setAttribute("aria-label", "close menu");
  }
  else {
    document.body.setAttribute("style", "");
    menuB.setAttribute("aria-label", "open menu");
  }
  menuOpened = !menuOpened;
}
// View

// Controller

const menuB = document.getElementById("toggle-menu");
const primaryNav = document.getElementById("primary-nav");
menuB.addEventListener("click", toggleMenu);