(function () {
  const navMenu = document.querySelector(".nav");
  const btnClose = document.querySelector(".close-menu");
  const btnMenu = document.querySelector(".hamburger-menu");
  const overlay = document.querySelector(".overlay");

  [btnClose, btnMenu, overlay].forEach((el) =>
    el.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      overlay.classList.toggle("open");
    }),
  );
})();
