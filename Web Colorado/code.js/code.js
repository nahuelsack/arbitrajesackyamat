const navBars = document.querySelector(".nav-bars");
const navUl = document.querySelector(".nav-info");
const circulo = document.querySelector(".circulo");
const dark = document.querySelector(".dark");
const body = document.body;
const navBarsIzquierdo = document.querySelector(".nav-bars_nav_izquierdo");
const navUlBarsIzquierdo = document.querySelector(".nav-izquierdo");
const enlacesNav = document.querySelectorAll('.nav-izquierdo_li a, .nav1-ul a');

navBars.addEventListener("click", toggleNav);
enlacesNav.forEach((enlace) => enlace.addEventListener("click", hideNav));
dark.addEventListener("click", toggleDarkMode);
document.addEventListener("DOMContentLoaded", handleInitialDarkMode);
window.addEventListener('scroll', handleScroll);

function toggleNav() {
    navUl.classList.toggle("visible");
    navUlBarsIzquierdo.classList.remove("visible-nav_izquierdo");
}

function hideNav() {
    navUl.classList.remove("visible");
    navUlBarsIzquierdo.classList.remove("visible-nav_izquierdo");
}

function toggleDarkMode() {
    const isDarkMode = circulo.classList.toggle("darkMoon");
    body.classList.toggle("darkReal", isDarkMode);
    setCookie("darkMode", isDarkMode ? "true" : "false", 365);
}

function handleInitialDarkMode() {
    const darkModeCookie = getCookie("darkMode");
    if (darkModeCookie === "true") {
        circulo.classList.add("darkMoon");
        body.classList.add("darkReal");
    }
}

function handleScroll() {
    const scrollPos = window.scrollY;

    for (const enlace of enlacesNav) {
        const objetivoId = enlace.getAttribute('href').substring(1);
        const objetivo = document.getElementById(objetivoId);

        if (objetivo && objetivo.offsetTop - window.innerHeight * 0.5 <= scrollPos && objetivo.offsetTop + objetivo.offsetHeight - window.innerHeight * 0.5 > scrollPos) {
            enlacesNav.forEach((link) => link.classList.remove('active'));
            enlace.classList.add('active');
        }
    }
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length);
        }
    }
    return "";
}