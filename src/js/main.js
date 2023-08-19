/* eslint-disable no-restricted-globals */
import jsonData from "../data/allData.json";
import home from "./views/homeView";
import episodeView from "./views/episodeView";

const navMenu = document.querySelector(".nav");
const btnMenu = document.querySelector(".hamburger-menu");
const overlay = document.querySelector(".overlay");

// Navigation menu
[btnMenu, overlay].forEach((el) =>
  el.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    overlay.classList.toggle("open");
  }),
);

/// ///

function getPlaceData(place) {
  // check the place hash
  if (place === "home") return home(jsonData);
  const isEpisode = place.includes("episode");
  if (isEpisode) return "Episode is not yet available";

  const isSeason = place.includes("season");
  if (isSeason) {
    const seasonNum = place.match(/(\d+)/);
    if (seasonNum) {
      const targetSeason = jsonData.find((sea) => sea.season === +seasonNum[0]);

      return episodeView(targetSeason);
    }
  }

  return "";
}

function updateLayout(place) {
  const data = getPlaceData(place);

  const container = document.getElementById("App");

  container.style.opacity = "0";
  setTimeout(() => {
    container.innerHTML = data;
    container.style.opacity = "1";
  }, 100);
}

function checkState() {
  // do we want to drive our app by state or fragment-identifier(hash) or query?
  // called when page loads AND after a popstate event
  // console.log(location);
  // console.log(history);
  if (!location.hash) {
    // default first load
    history.replaceState(null, "", "");
    document.title = "Friends TvSeries - Alamin";
    updateLayout("home");
  } else {
    const hash = location.hash.replace("#", "");
    updateLayout(hash);
    document.title = hash[0].toUpperCase() + hash.slice(1); // first letter to uppercase needed
  }
}

// Function to find the closest ancestor anchor element
function findAnchor(element) {
  while (element && element.tagName !== "A") {
    // eslint-disable-next-line no-param-reassign
    element = element.parentElement;
  }
  return element;
}

function appClick(ev) {
  ev.preventDefault();
  const anchor = findAnchor(ev.target);
  if (!anchor) return;

  const dest = anchor.getAttribute("data-dest");
  const name = anchor.getAttribute("data-name");
  const state = { dest, name };
  const hash = `#${dest.toLowerCase()}`;
  history.pushState(state, "", hash);
  document.title = name;
  updateLayout(dest.toLowerCase());
}

function addListeners() {
  document.getElementById("App").addEventListener("click", appClick);

  window.addEventListener("popstate", checkState);
  // when the user clicks back or forward
}

function init() {
  // when the page loads
  // check the state or hash value or both
  checkState(); // when the page loads
  // add listeners for nav bar
  // add listeners for popstate OR hashchange
  addListeners();
}

document.addEventListener("DOMContentLoaded", init);
