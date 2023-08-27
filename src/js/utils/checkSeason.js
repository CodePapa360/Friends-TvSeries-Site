import jsonData from "../../data/allData.json";

export default function (place) {
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
