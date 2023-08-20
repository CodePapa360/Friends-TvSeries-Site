export default function (data) {
  return `
  <video 
  styel="height: auto; width: 100%;" controls autoplay>
  <source src="${data.vidUrl}"></source>
  </video>
    `;
}
