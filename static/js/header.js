const burgerMenuButton = document.querySelector("#burger_menu_button button")
const burgerIcon = document.querySelector("#burger_icon");
const burgerIconLine1 = document.querySelector("#burger_line1");
const burgerIconLine2 = document.querySelector("#burger_line2");
const burgerIconLine3 = document.querySelector("#burger_line3");

const slideMenu = document.querySelector("#slide_menu");
const slideButtons = document.querySelector("#slide_buttons");
const logoOutside = document.querySelector("#logo_outside");

const logoInside = document.querySelector("#logo_inside");
const logoText = document.querySelector("#logo_text path");
const headerButtons = document.querySelectorAll("#header_menu_buttons button");

const hrRed = "#d30f4c";
const hrRed2 = "#C03";
const white = "#fff";
const semiTransperant = "rgba(0, 0, 0, 0.2)";

const crossLine1 = {x: -5, y: 0, transform: "rotate(45)"}
const crossLine2 = {height: 0}
const crossLine3 = {x: -57.5, y: 37.5, transform: "rotate(-45)"}
const burgerLine1 = {x: 0, y: 0, transform: "rotate(0)"}
const burgerLine2 = {height: 15}
const burgerLine3 = {x: 0, y: 60, transform: "rotate(0)"}
let burger_toggle = false;

function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr]);
    });
}

function hoverOn(element, color1, color2) {
  element.addEventListener("mouseover", function () {
    element.style.backgroundColor = color1;
    element.style.color = color2;
  })
}

function hoverOff(element, color1, color2) {
  element.addEventListener("mouseout", function () {
    element.style.backgroundColor = color1;
    element.style.color = color2;
  })
}

function hoverOnIcon(element1, element2, color1, color2) {
  element1.addEventListener("mouseover", function () {
    element1.style.backgroundColor = color1;
    element2.style.fill = color2;
  })
}

function hoverOffIcon(element1, element2, color1, color2) {
  element1.addEventListener("mouseout", function () {
    element1.style.backgroundColor = color1;
    element2.style.fill = color2;
  })
}

Array.from(headerButtons).forEach((button) => {
  hoverOn(button, white, hrRed)
  hoverOff(button, semiTransperant, white)
});

hoverOnIcon(burgerMenuButton, burgerIcon, white, hrRed);
hoverOffIcon(burgerMenuButton, burgerIcon, semiTransperant, white);

function burgerMenuFoldOut() {
    burger_toggle =! burger_toggle;
    burgerMenuButton.style.backgroundColor = burger_toggle ? white : semiTransperant;
    burgerIcon.style.fill = burger_toggle ? hrRed : white;

    burger_toggle ? setAttributes(burgerIconLine1, crossLine1) : setAttributes(burgerIconLine1, burgerLine1);
    burger_toggle ? setAttributes(burgerIconLine2, crossLine2) : setAttributes(burgerIconLine2, burgerLine2);
    burger_toggle ? setAttributes(burgerIconLine3, crossLine3) : setAttributes(burgerIconLine3, burgerLine3);

    slideMenu.style.width = burger_toggle ? "100vw" : "0";
    slideButtons.style.display = burger_toggle ? "flex" : "none";
    logoOutside.style.fill = burger_toggle ? hrRed : white;
    logoInside.style.fill = burger_toggle ? white : hrRed2;
    logoText.style.fill = burger_toggle ? hrRed : white;

    Array.from(headerButtons).forEach((button) => {
        button.style.backgroundColor = burger_toggle ? white : semiTransperant;
        button.style.color = burger_toggle ? hrRed : white;
        burger_toggle ? hoverOn(button, semiTransperant, hrRed) : hoverOn(button, white, hrRed)
        burger_toggle ? hoverOff(button, white, hrRed) : hoverOff(button, semiTransperant, white)
    });

    burger_toggle ? hoverOnIcon(burgerMenuButton, burgerIcon, semiTransperant, hrRed) : hoverOnIcon(burgerMenuButton, burgerIcon, white, hrRed);
    burger_toggle ? hoverOffIcon(burgerMenuButton, burgerIcon, white, hrRed) : hoverOffIcon(burgerMenuButton, burgerIcon, semiTransperant, white);
}
