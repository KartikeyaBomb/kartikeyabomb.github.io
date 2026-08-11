const projects = [
  {
    name: "SafeZone",
    description: "A real-time disaster response platform that brings live hazards, relief resources, and personalized safety guidance into one map.",
    stack: "React · Mapbox GL · Supabase · Node.js · OpenAI API",
    monogram: "SZ",
    theme: "coral",
  },
  {
    name: "ReefWatch",
    description: "An edge monitoring network that uses compact audio-vision models to track coral reef health—even when connectivity is unreliable.",
    stack: "Python · PyTorch · ONNX · Go · MQTT · Docker",
    monogram: "RW",
    theme: "aqua",
  },
  {
    name: "LynxLifts",
    description: "An AI-powered campus rideshare that matches students by route and timing while supporting live tracking, messaging, and payments.",
    stack: "React Native · PyTorch · PostGIS · Redis · Kafka · AWS",
    monogram: "LL",
    theme: "violet",
  },
  {
    name: "SportsGuessr",
    description: "A GeoGuessr-inspired Android game where players place sports events on the map and score points based on distance.",
    stack: "Kotlin · Android SDK · Retrofit · Google Maps API · Room",
    monogram: "SG",
    theme: "lime",
  },
  {
    name: "Public Transportation Index",
    description: "A hackathon-winning route request platform that visualizes resident demand and helps uncover underserved transit areas.",
    stack: "ArcGIS · Google Maps API · Vercel · Airtable",
    monogram: "PT",
    theme: "blue",
  },
].map((project, index) => ({
  ...project,
  label: `Project ${String(index + 1).padStart(2, "0")}`,
}));

let currentIndex = 0;
let touchStartX = 0;

const project = document.querySelector(".project");
const visual = document.querySelector("#project-visual");
const label = document.querySelector("#project-label");
const name = document.querySelector("#project-name");
const description = document.querySelector("#project-description");
const stack = document.querySelector("#project-stack");
const visualIndex = document.querySelector("#visual-index");
const visualMonogram = document.querySelector("#visual-monogram");
const currentNumber = document.querySelector("#current-number");
const totalNumber = document.querySelector("#total-number");
const dots = document.querySelector("#dots");
const carousel = document.querySelector("#carousel");

function renderDots() {
  dots.replaceChildren();

  projects.forEach((item, index) => {
    const dot = document.createElement("button");
    dot.className = `dot${index === currentIndex ? " active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", `Show ${item.label}`);
    dot.setAttribute("aria-current", index === currentIndex ? "true" : "false");
    dot.addEventListener("click", () => showProject(index));
    dots.append(dot);
  });
}

function showProject(index, animate = true) {
  currentIndex = (index + projects.length) % projects.length;
  const item = projects[currentIndex];

  label.textContent = item.label;
  name.textContent = item.name;
  description.textContent = item.description;
  stack.textContent = item.stack;
  currentNumber.textContent = String(currentIndex + 1).padStart(2, "0");
  visualIndex.textContent = String(currentIndex + 1).padStart(2, "0");
  visualMonogram.textContent = item.monogram;
  visual.dataset.theme = item.theme;
  renderDots();

  project.classList.remove("is-changing");
  if (animate) requestAnimationFrame(() => project.classList.add("is-changing"));
}

document.querySelector("#previous").addEventListener("click", () => showProject(currentIndex - 1));
document.querySelector("#next").addEventListener("click", () => showProject(currentIndex + 1));

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showProject(currentIndex - 1);
  if (event.key === "ArrowRight") showProject(currentIndex + 1);
});

carousel.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

carousel.addEventListener("touchend", (event) => {
  const distance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(distance) < 50) return;
  showProject(currentIndex + (distance < 0 ? 1 : -1));
}, { passive: true });

totalNumber.textContent = String(projects.length).padStart(2, "0");
document.querySelector("#year").textContent = new Date().getFullYear();
showProject(0, false);
