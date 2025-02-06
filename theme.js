const $ = (el) => document.querySelector(el)

// cambio a modo dark y light
const $btnTheme = $("#btnTheme");
const $sun = $("#sun");
const $moon = $("#moon");

$btnTheme.addEventListener("click", () => {
  const theme = getTheme();
  if (!document.startViewTransition) {
    if (theme === "dark") updateTheme("light");
    if (theme === "light") updateTheme("dark");
    return;
  }

  if (theme === "dark")
    document.startViewTransition(() => updateTheme("light"));
  if (theme === "light")
    document.startViewTransition(() => updateTheme("dark"));
});

const getTheme = () => {
  const themeStorage = localStorage.getItem("theme");
  if (themeStorage !== "undefined" && themeStorage !== null) {
    return localStorage.getItem("theme");
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const updateTheme = (theme) => {
  localStorage.setItem("theme", theme);
  if (theme === "dark") {
    document.documentElement.classList.add("darkMode");
    $sun.style.display = "block";
    $moon.style.display = "none";
  }
  if (theme === "light") {
    document.documentElement.classList.remove("darkMode");
    $sun.style.display = "none";
    $moon.style.display = "block";
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const theme = getTheme();
  updateTheme(theme);
});
