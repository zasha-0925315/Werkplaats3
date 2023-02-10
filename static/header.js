const mobile = window.matchMedia("(pointer:coarse)");
const burgerMenu = document.querySelector("#burger_menu");
const burgerMenuButton = document.querySelector("#burger_menu_button button")
const burgerIcon = document.querySelector("#burger_icon");
const hrRed = "#d30f4c";
const white = "#fff";
const transparant = "rgba(0, 0, 0, 0.2)";

let burger_toggle = false;
function burgerMenuFoldOut() {
  if (mobile.matches) {
     burger_toggle =! burger_toggle;
     burgerMenu.style.display = burger_toggle ? "flex" : "none";
     burgerMenuButton.style.backgroundColor = burger_toggle ? white : transparant;
     burgerIcon.style.fill = burger_toggle ? hrRed : white;
  }
}
