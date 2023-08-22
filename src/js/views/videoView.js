export default function (data) {
  return `
  <div style="height:auto; width: 100%;">
    <video
      playsinline
      id="my-player"
      class="video-js vjs-default-skin"
      controls
      poster="../../thumbnails/S${data.season.season}/S${data.season.season}E${data.episode.episode}.jpg"
      preload="auto"
      data-setup='{"techOrder": ["html5", "hls"]}'>
      <source src="${data.vidUrl}" type="application/x-mpegURL">
      
      <p class="vjs-no-js">To view this video, please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video</p>
    </video>
  </div>
  `;
}
