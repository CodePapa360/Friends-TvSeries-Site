import jsonData from "../data/allData.json";

import home from "./views/homeView";

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

// Get the content container element where views will be rendered
const container = document.getElementById("App");

function renderContent(data) {
  container.style.opacity = "0";

  setTimeout(() => {
    container.innerHTML = data;
    container.style.opacity = "1";
  }, 100);
}

// Function to render the home page
function renderHome() {
  const data = home(jsonData);

  renderContent(data);
}

// Function to render a season page
function renderSeason(seasonId) {
  // Fetch and render data for the selected season
  const data = `<h2>Season ${seasonId}</h2>`;

  renderContent(data);

  // ... Fetch and render season data ...
}

// Function to render an episode page
function renderEpisode(seasonId, episodeId) {
  // Fetch and render data for the selected episode
  container.innerHTML = `<h3>Season ${seasonId}, Episode ${episodeId}</h3>`;
  // ... Fetch and render episode data ...
}

// Function to render a not found page
function renderNotFound() {
  container.innerHTML = "<p>Page not found.</p>";
}

// Define a routing function
function route(path) {
  // Remove the leading "/" and split the path into segments
  const segments = path.slice(1).split("/");

  // Get the first segment to determine the route
  // eslint-disable-next-line no-shadow
  const route = segments[0];

  // Clear the content container
  container.innerHTML = "";

  // Handle different routes
  if (route === "") {
    renderHome();
  } else if (route === "season") {
    const seasonId = segments[1];
    renderSeason(seasonId);
  } else if (route === "episode") {
    const seasonId = segments[1];
    const episodeId = segments[3]; // Assuming the route is "/season/:seasonId/episode/:episodeId"
    renderEpisode(seasonId, episodeId);
  } else {
    renderNotFound();
  }
}

// Initial setup: Call the route function when the page loads
window.addEventListener("load", () => {
  route(window.location.pathname);
});

// Listen for changes in the URL (back/forward button or manual changes)
window.addEventListener("popstate", () => {
  route(window.location.pathname);
});

// Function to find the closest ancestor anchor element
function findAnchor(element) {
  while (element && element.tagName !== "A") {
    // eslint-disable-next-line no-param-reassign
    element = element.parentElement;
  }
  return element;
}

// Function to handle anchor link clicks
function handleAnchorClick(event) {
  const anchor = findAnchor(event.target);

  if (anchor) {
    event.preventDefault(); // Prevent the default link behavior
    const href = anchor.getAttribute("href"); // Get the href attribute
    // Use either pushState or replaceState to update the history
    // eslint-disable-next-line no-restricted-globals
    history.pushState(null, "", href);
    route(href); // Handle the navigation using your routing system
  }
}

// Attach click event listener to the container for event delegation
container.addEventListener("click", handleAnchorClick);
