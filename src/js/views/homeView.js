export default function (data) {
  const innerMarkup = data
    .map(
      (curS) => `
  <a href="#season${curS.season}" 
  data-name="Season ${curS.season}" 
  data-dest="season${curS.season}" 
  class="season-cards__card">
  <div class="card-contents">
      <div class="thumbnail">
      <img src="./thumbnails/seasons/season-${curS.season}.jpg" alt="Season ${curS.season}" />
      </div>
      <h2 class="title">Season ${curS.season}</h2>
      <span class="release-date">${curS.release}</span>
  </div>
  </a>
  `,
    )
    .join("");

  return `
    <div class="container">
      <section class="season-cards">
          ${innerMarkup}
      </section>
    </div>
  `;
}
