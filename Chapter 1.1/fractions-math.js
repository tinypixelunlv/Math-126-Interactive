(() => {
  const libraries = {
    math: window.math,
    nerdamer: window.nerdamer,
    MathLive: window.MathLive
  };

  const missingLibraries = Object.entries(libraries)
    .filter(([, library]) => !library)
    .map(([name]) => name);

  if (missingLibraries.length > 0) {
    throw new Error(`Fractions math runtime failed to load: ${missingLibraries.join(", ")}`);
  }

  window.fractionsMath = Object.freeze(libraries);
  window.mathVirtualKeyboard.container = document.getElementById('keyboard-container');
  const problemCards = [...document.querySelectorAll(".problem-card")];
  const workspaceProblem = document.querySelector("#workspace-problem");
  const workspaceStatus = document.querySelector("#workspace-status");
  const mathField = document.querySelector(".workspace-mathfield");
  const workByProblem = new Map();
  let selectedProblemId = null;

  problemCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (selectedProblemId && mathField) {
        workByProblem.set(selectedProblemId, mathField.value);
      }

      selectedProblemId = card.dataset.problemId;
      problemCards.forEach((problemCard) => {
        problemCard.setAttribute("aria-pressed", String(problemCard === card));
      });

      if (workspaceProblem) {
        workspaceProblem.textContent = `Problem ${card.dataset.problemNumber} · ${card.dataset.problemTitle}`;
      }
      if (workspaceStatus) {
        workspaceStatus.textContent = "Problem loaded. Enter your work below.";
      }
      if (mathField) {
        mathField.value = workByProblem.get(selectedProblemId) || "";
      }
    });
  });
})();
