export default function () {
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const root = document.documentElement;
  const darkMode = function () {
    root.classList.toggle("dark-mode", darkModeToggle.checked);
    localStorage.setItem("darkMode", darkModeToggle.checked ? "on" : "off");
  };

  darkModeToggle.addEventListener("change", darkMode);
  window.addEventListener("load", () => {
    darkModeToggle.checked = localStorage.getItem("darkMode") === "on";
    darkMode();
  });
}
