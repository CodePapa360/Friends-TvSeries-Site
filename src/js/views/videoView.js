export default function (data) {
  return `
 <!-- <video id="video"  playsinline
    style="width:auto; height: 100%;"  controls autoplay
    src="${data.vidUrl}">
  </video>
  <p>Season ${data.season.season} Episode ${data.episode.episode}</p>
  -->

  <video id="player" playsinline controls data-poster="">
  <source
    src="${data.vidUrl}"
    type="video/mp4"
  />

</video>
    `;
}
