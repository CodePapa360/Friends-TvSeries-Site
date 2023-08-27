import checkEpisode from "./checkEpisode";
import checkSeason from "./checkSeason";
import renderVideoView from "./renderVideoView";
import aboutView from "../views/aboutView";
import episodeView from "../views/episodeView";
import homeView from "../views/homeView";
import jsonData from "../../data/allData.json";
import updateLayout from "./updateLayout";

export default function (place) {
  if (place === "home") {
    const data = homeView(jsonData);
    updateLayout(data);
    return;
  }

  if (place === "about") {
    const data = aboutView();
    updateLayout(data);
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
    updateLayout(layoutdata);
  }
}
