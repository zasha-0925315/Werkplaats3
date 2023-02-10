const burgerMenuButton = document.querySelector("#burger_menu_button button")
const burgerIcon = document.querySelector("#burger_icon");
const slideMenu = document.querySelector("#slide_menu");
const slideButtons = document.querySelector("#slide_buttons");
const logoOutside = document.querySelector("#logo_outside");
const logoInside = document.querySelector("#logo_inside");
const logoText = document.querySelector("#logo_text path");
const headerButtons = document.querySelectorAll("#header_menu_buttons button");
const hrRed = "#d30f4c";
const hrRed2 = "#C03";
const white = "#fff";
const transperant = "rgba(0, 0, 0, 0.2)";

let burger_toggle = false;
function burgerMenuFoldOut() {
    burger_toggle =! burger_toggle;
    burgerMenuButton.style.backgroundColor = burger_toggle ? white : transperant;
    burgerIcon.style.fill = burger_toggle ? hrRed : white;
    slideMenu.style.width = burger_toggle ? "100vw" : "0";
    slideButtons.style.display = burger_toggle ? "flex" : "none";
    logoOutside.style.fill = burger_toggle ? hrRed : white;
    logoInside.style.fill = burger_toggle ? white : hrRed2;
    logoText.style.fill = burger_toggle ? hrRed : white;
    Array.from(headerButtons).forEach((button) => {
        button.style.backgroundColor = burger_toggle ? white : transperant;
        button.style.color = burger_toggle ? hrRed : white
    });
}
