export default function updateLayout(data) {
  const container = document.getElementById("App");

  container.style.transform = "translateX(1rem)";
  container.style.opacity = "0";
  setTimeout(() => {
    container.innerHTML = data;
    window.scrollTo(0, 0);
    container.style.opacity = "1";
    container.style.transform = "translateX(0)";
  }, 100);
}
