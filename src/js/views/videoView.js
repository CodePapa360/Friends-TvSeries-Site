export default function (url) {
  return `
  <video style="height: auto; width: 100%;" controls>
  <source src="${url}" type="video/mp4">
  Your browser does not support the video tag.
</video> 
    `;
}
