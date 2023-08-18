export default function (data) {
  let arrMarkups = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    const markup = `
                <a href="#season/${i + 1}" class="season-cards__card">
                <div class="card-contents">
                    <div class="thumbnail">
                    <img src="./public/thumbnails/seasons/season-${
                      i + 1
                    }.jpg" alt="Season ${i + 1}" />
                    </div>
                    <h2 class="title">Season ${i + 1}</h2>
                    <span class="release-date">Sept. 12, 1994</span>
                </div>
                </a>
        `;

    arrMarkups.push(markup);
  }

  const ready = `
    <div class="container">
    <section class="season-cards">
        ${arrMarkups.join("")}
    </section>
    </div>
  `;

  return ready;
}
