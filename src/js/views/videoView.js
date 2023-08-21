export default function (data) {
  return `
 <!-- <video id="video"  playsinline
    style="width:auto; height: 100%;"  controls autoplay
    src="${data.vidUrl}">
  </video>

  -->

  <video id="player" playsinline controls data-poster="../../thumbnails/S${data.season.season}/S${data.season.season}E${data.episode.episode}.jpg">
  <source
    src="${data.vidUrl}"
    type="video/mp4"
  />

</video>
<p>Season ${data.season.season} Episode ${data.episode.episode}</p>
    `;
}
