import checkEpisode from "./checkEpisode";
import checkSeason from "./checkSeason";
import renderVideoView from "./renderVideoView";
import aboutView from "../views/aboutView";
import episodeView from "../views/episodeView";
import homeView from "../views/homeView";
import jsonData from "../../data/allData.json";

class VerifyPlace {
  updateLayout(data) {
    // const data = getPlaceData(place);

    const container = document.getElementById("App");

    container.style.opacity = "0";
    setTimeout(() => {
      container.innerHTML = data;
      window.scrollTo(0, 0);
      container.style.opacity = "1";
    }, 100);
  }

  verify(place) {
    if (place === "home") {
      const data = homeView(jsonData);
      this.updateLayout(data);
      return;
    }

    if (place === "about") {
      const data = aboutView();
      this.updateLayout(data);
      return;
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
      this.updateLayout(layoutdata);
    }
  }
}

export default new VerifyPlace();
