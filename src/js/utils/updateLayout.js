export default function updateLayout(data) {
  // const data = getPlaceData(place);

  const container = document.getElementById("App");

  container.style.opacity = "0";
  setTimeout(() => {
    container.innerHTML = data;
    window.scrollTo(0, 0);
    container.style.opacity = "1";
  }, 100);
}
