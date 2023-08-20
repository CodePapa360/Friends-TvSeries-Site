export default function (data) {
  return `
  <video id="video" 
    width='480px' height='360px' controls autoplay
    src="${data.vidUrl}">
  </video>
  <p>Season ${data.season.season} Episode ${data.episode.episode}</p>
    `;
}
