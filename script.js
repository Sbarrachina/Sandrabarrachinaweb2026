const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("MenuItems");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("open");
});

document.querySelectorAll("#MenuItems a").forEach(link => {
  link.addEventListener("click", () => menu.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();


