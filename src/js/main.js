/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
import videojs from "video.js";
import "video.js/dist/video-js.min.css";
import jsonData from "../data/allData.json";
import jsonVideoUrls from "../data/videoUrls.json";
import home from "./views/homeView";
import episodeView from "./views/episodeView";
import videoView from "./views/videoView";

const navMenu = document.querySelector(".nav");
const btnMenu = document.querySelector(".hamburger-menu");
const overlay = document.querySelector(".overlay");
let player;

// Navigation menu
[btnMenu, overlay].forEach((el) =>
  el.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    overlay.classList.toggle("open");
  }),
);

/// ///

function checkSeason(place) {
  const info = { status: false };

  const isSeason = place.includes("season");
  if (!isSeason) return info;

  const seasonNum = place.match(/season(\d+)$/);
  if (!seasonNum || +seasonNum[1] > jsonData.length) return info;

  const targetSeason = jsonData.find((sea) => sea.season === +seasonNum[1]);

  return {
    status: true,
    data: {
      season: targetSeason,
    },
  };
}

function checkEpisode(place) {
  const info = { status: false };

  const isEpisode = place.includes("episode");

  if (!isEpisode) return info;

  const [season, episode] = place.split("-");
  const seasonNum = season.match(/season(\d+)$/);
  const episodeNum = episode.match(/episode(\d+)$/);
  if (!seasonNum || +seasonNum[1] > jsonData.length) return info;

  const targetSeason = jsonData.find((sea) => sea.season === +seasonNum[1]);

  if (!episodeNum || +episodeNum[1] > targetSeason.episodes.length) return info;

  const targetEpisode = targetSeason.episodes.find(
    (sea) => sea.episode === +episodeNum[1],
  );

  const targetVidUrlSeason = jsonVideoUrls.find(
    (sea) => sea.season === +seasonNum[1],
  ).episodes;

  const videoUrl = targetVidUrlSeason.find(
    (ep) => ep.episode === +episodeNum[1],
  ).link;

  return {
    status: true,
    data: {
      season: targetSeason,
      episode: targetEpisode,
      vidUrl: videoUrl,
    },
  };
}

function renderVideoView(data) {
  const layoutdata = videoView(data);
  const container = document.getElementById("App");

  container.style.opacity = "0";
  setTimeout(() => {
    container.innerHTML = layoutdata;

    if (player) {
      // Dispose of the existing player instance
      player.dispose();
    }

    // Initialize the player with the new content
    player = videojs("my-player", {
      techOrder: ["html5"],
    });

    container.style.opacity = "1";
  }, 100);
}

function updateLayout(data) {
  // const data = getPlaceData(place);

  const container = document.getElementById("App");

  container.style.opacity = "0";
  setTimeout(() => {
    container.innerHTML = data;
    container.style.opacity = "1";
  }, 100);
}

// eslint-disable-next-line consistent-return
function verifyPlace(place) {
  if (place === "home") {
    const data = home(jsonData);
    return updateLayout(data);
  }

  const isEpisode = checkEpisode(place);

  if (isEpisode.status) {
    // temporary code
    const { data } = isEpisode;
    renderVideoView(data);
    // eslint-disable-next-line consistent-return
    return;
  }

  const isSeason = checkSeason(place);

  if (isSeason.status) {
    const { data } = isSeason;

    const layoutdata = episodeView(data);
    return updateLayout(layoutdata);
  }
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
    // updateLayout("home");
    verifyPlace("home");
  } else {
    const hash = location.hash.replace("#", "");
    // updateLayout(hash);
    verifyPlace(hash);
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
  verifyPlace(dest.toLowerCase());
  // updateLayout(dest.toLowerCase());
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
