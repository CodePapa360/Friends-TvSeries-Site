/* eslint-disable no-restricted-globals */
import jsonData from "../data/allData.json";
import jsonVideoUrls from "../data/videoUrls.json";
import home from "./views/homeView";
import episodeView from "./views/episodeView";
import videoView from "./views/videoView";

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

function hslVideoPlayer() {
  // Function to check if the video element is available and set up HLS player
  function checkVideoAvailability() {
    const video = document.getElementById("video");

    if (video) {
      clearInterval(videoCheckInterval); // Stop the interval once the video element is found

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(video.src);
        hls.attachMedia(video);
      } else {
        alert("Cannot stream HLS, use another video source");
      }
    }
  }

  // Start checking for the video element every second
  const videoCheckInterval = setInterval(checkVideoAvailability, 1000);
}

function getPlaceData(place) {
  // check the place hash
  if (place === "home") return home(jsonData);

  // Episode view logics
  const isEpisode = place.includes("episode");
  if (isEpisode) {
    const [season, episode] = place.split("-");
    const seasonNum = season.match(/(\d+)/);
    const episodeNum = episode.match(/(\d+)/);

    if (seasonNum && +seasonNum[0] <= jsonData.length) {
      const targetSeason = jsonData.find((sea) => sea.season === +seasonNum[0]);

      if (episodeNum && +episodeNum[0] <= targetSeason.episodes.length) {
        const targetSeasonUrl = jsonVideoUrls.find(
          (sea) => sea.season === +seasonNum[0],
        );

        const targetEpisodeUrl = targetSeasonUrl.episodes.find(
          (ep) => ep.episode === +episodeNum[0],
        );

        return videoView(targetEpisodeUrl.link);
      }
    }

    // return episodeView();
    return "Wrong url";
  }

  // Season view logics
  const isSeason = place.includes("season");
  if (isSeason) {
    const seasonNum = place.match(/(\d+)/);
    if (seasonNum && +seasonNum[0] <= jsonData.length) {
      const targetSeason = jsonData.find((sea) => sea.season === +seasonNum[0]);

      return episodeView(targetSeason);
    }
  }

  return "Not found";
}

function checkSeason(place) {}

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

function updateLayout(data) {
  // const data = getPlaceData(place);

  const container = document.getElementById("App");

  container.style.opacity = "0";
  setTimeout(() => {
    container.innerHTML = data;
    container.style.opacity = "1";
  }, 100);
}

function verifyPlace(place) {
  const isSeason = checkSeason(place);
  const isEpisode = checkEpisode(place);

  if (isEpisode.status) {
    // temporary code
    const { data } = isEpisode;
    const layoutdata = videoView(data);

    updateLayout(layoutdata);
    // hslVideoPlayer();
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
    updateLayout("home");
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
