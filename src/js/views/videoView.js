export default function (data) {
  return `
  <div class="video-container">
  <video
    playsinline
    id="my-player"
    class="video-js vjs-default-skin"
    controls
    preload="auto">
    <source src="${data.vidUrl}" type="application/x-mpegURL">
  
    <p class="vjs-no-js">To view this video, please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video</p>
  </video>
</div>

  `;
}
