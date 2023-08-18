export default function (data) {
  const innerMarkup = data.episodes
    .map(
      (curE) => `
    <a href="#episode/${curE.episode}" class="episode-cards__card">
      <div class="card-contents">
        <div class="thumbnail">
          <img src="../../thumbnails/S${data.season}/S${data.season}E${curE.episode}.jpg" alt="Episode ${curE.episode}" />
        </div>
        
        <h2 class="title">${curE.title}</h2>
        <h3 class="title-secondary">Episode: ${curE.episode}</h3>
        <span class="release-date">${curE.date}</span>
      </div>
    </a>
    `,
    )
    .join("");

  return `
      <div class="container">
        <h2 class="primary-heading-episodde">Friends: Season ${data.season}</h2>

        <section class="episode-cards">
            ${innerMarkup}
        </section>
      </div>
    `;
}
