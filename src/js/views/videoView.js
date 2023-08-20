export default function (url) {
  return `
  <video 
  id="my-video"
  class="video-js"
  controls
  preload="auto"
  width="640"
  height="264"
  data-setup="{}"
  >

  <source src="${url}" type="video/mp4" />

</video>
    `;
}
