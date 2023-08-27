import videojs from "video.js";
import videoView from "../views/videoView";

let player;

export default function (data) {
  const layoutdata = videoView(data);
  const container = document.getElementById("App");

  container.style.opacity = "0";
  window.scrollTo(0, 0);
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
