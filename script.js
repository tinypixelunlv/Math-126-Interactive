const nav = document.querySelector("#course-nav");
const title = document.querySelector("#workspace-title");
const description = document.querySelector("#workspace-description");
const welcomeCard = document.querySelector("#welcome-card");
const problemFrame = document.querySelector("#problem-frame");

function openProblem(item) {
  nav.querySelectorAll(".problem-item").forEach((entry) => entry.classList.remove("active"));
  item.classList.add("active");
  problemFrame.src = item.dataset.file;
  problemFrame.hidden = false;
  welcomeCard.hidden = true;
}

nav.addEventListener("click", (event) => {
  const item = event.target.closest(".nav-item");
  if (!item) return;

  const targetId = item.dataset.target;
  if (targetId) {
    const target = document.getElementById(targetId);
    const isOpening = target.hidden;
    target.hidden = !isOpening;
    item.setAttribute("aria-expanded", String(isOpening));
    item.classList.toggle("active", isOpening);
    return;
  }

  const problem = item.dataset.label;
  if (item.dataset.file) {
    openProblem(item);
    return;
  }

  problemFrame.hidden = true;
  problemFrame.removeAttribute("src");
  welcomeCard.hidden = false;
  title.textContent = problem;
  description.textContent = "This problem type is a placeholder for now. Interactive practice will appear here later.";
});
