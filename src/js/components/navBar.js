/* eslint-disable no-restricted-globals */
import verifyPlace from "../utils/verifyPlace";

export default class {
  constructor() {
    this.navMenu = document.querySelector(".nav");
    this.btnMenu = document.querySelector(".hamburger-menu");
    this.overlay = document.querySelector(".overlay");
    this.navLink = document.querySelectorAll(".nav-link");
    this.seasonNav = document.getElementById("season-nav");

    this.toggleNav = this.toggleNav.bind(this);
    this.navLinkClick = this.navLinkClick.bind(this);
    this.navSeasonSelection = this.navSeasonSelection.bind(this);

    [this.btnMenu, this.overlay].forEach((el) =>
      el.addEventListener("click", this.toggleNav.bind(this)),
    );

    this.navLink.forEach((link) =>
      link.addEventListener("click", this.navLinkClick.bind(this)),
    );

    // Use an arrow function to capture the correct `this` context
    this.seasonNav.addEventListener("change", (event) =>
      this.navSeasonSelection(event),
    );
  }

  toggleNav() {
    this.navMenu.classList.toggle("open");
    this.overlay.classList.toggle("open");
  }

  navSeasonSelection(event) {
    const index = event.target.selectedIndex;
    if (!index) return;

    const dest = `season${index}`;
    const name = `Season ${index}`;
    const state = { dest, name };
    const hash = `#${dest}`;
    history.pushState(state, "", hash);
    document.title = name;

    // console.log(dest, name, hash);
    verifyPlace(dest.toLowerCase());

    this.toggleNav();
  }

  navLinkClick(e) {
    e.preventDefault();

    const { hash } = e.target;
    const dest = hash.replace("#", "");
    const name = dest[0].toUpperCase() + dest.slice(1);
    const state = { dest, name };

    history.pushState(state, "", hash);
    document.title = name;
    verifyPlace(dest);

    this.toggleNav();
  }
}
