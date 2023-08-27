import jsonData from "../../data/allData.json";
import jsonVideoUrls from "../../data/videoUrls.json";

export default function (place) {
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
