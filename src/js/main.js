import season1 from "../data/season-1.json";
import season2 from "../data/season-2.json";
import season3 from "../data/season-3.json";
import season4 from "../data/season-4.json";
import season5 from "../data/season-5.json";
import season6 from "../data/season-6.json";
import season7 from "../data/season-7.json";
import season8 from "../data/season-8.json";
import season9 from "../data/season-9.json";
import season10 from "../data/season-10.json";

import home from "./views/home";

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

// Define a routing function
function route(path) {
  // Remove the leading "/" and split the path into segments
  const segments = path.slice(1).split("/");

  // Get the first segment to determine the route
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

// Function to render the home page
function renderHome() {
  container.innerHTML = home();
  // container.innerHTML = "<h1>Welcome to the Home Page</h1>";
}

// Function to render a season page
function renderSeason(seasonId) {
  // Fetch and render data for the selected season
  container.innerHTML = `<h2>Season ${seasonId}</h2>`;
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
    history.pushState(null, "", href);
    route(href); // Handle the navigation using your routing system
  }
}

// Attach click event listener to the container for event delegation
container.addEventListener("click", handleAnchorClick);
