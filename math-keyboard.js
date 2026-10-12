(() => {
  const keys = [
    { label: "+", value: "+", name: "plus" },
    { label: "−", value: "−", name: "minus" },
    { label: "×", value: "×", name: "multiply" },
    { label: "÷", value: "÷", name: "divide" },
    { label: "(", value: "(", name: "open parenthesis" },
    { label: ")", value: ")", name: "close parenthesis" },
    { label: "[", value: "[", name: "open square bracket" },
    { label: "]", value: "]", name: "close square bracket" },
    { label: "/", value: "/", name: "fraction bar" },
    { label: "^", value: "^", name: "exponent" },
    { label: "√", value: "√", name: "square root" },
    { label: "π", value: "π", name: "pi" },
    { label: "∪", value: "∪", name: "Union" },
    { label: "∩", value: "∩", name: "Intersection" },
    { label: ".", value: ".", name: "decimal point" },
    { label: "=", value: "=", name: "equals" }
  ];

  function updateInput(input, value, mode = "insert") {
    if (input.disabled || input.readOnly) return;

    input.focus();
    const start = input.selectionStart;
    const end = input.selectionEnd;

    if (mode === "clear") {
      input.value = "";
      input.setSelectionRange(0, 0);
    } else if (mode === "delete") {
      const deleteStart = start === end ? Math.max(0, start - 1) : start;
      input.setRangeText("", deleteStart, end, "end");
    } else {
      input.setRangeText(value, start, end, "end");
    }

    input.dispatchEvent(new Event("input", { bubbles: true }));
  }

  function createKeyboard(input) {
    const keyboard = document.createElement("div");
    keyboard.className = "math-keyboard";
    keyboard.setAttribute("role", "group");
    keyboard.setAttribute("aria-label", "Math symbols");

    keys.forEach(({ label, value, name }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "math-key";
      button.textContent = label;
      button.setAttribute("aria-label", name);
      button.addEventListener("mousedown", (event) => event.preventDefault());
      button.addEventListener("click", () => updateInput(input, value));
      keyboard.append(button);
    });

    [
      { label: "⌫", name: "Delete previous character", mode: "delete" },
      { label: "Clear", name: "Clear answer", mode: "clear" }
    ].forEach(({ label, name, mode }) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "math-key math-key-action";
      button.textContent = label;
      button.setAttribute("aria-label", name);
      button.addEventListener("mousedown", (event) => event.preventDefault());
      button.addEventListener("click", () => updateInput(input, "", mode));
      keyboard.append(button);
    });

    return keyboard;
  }

  window.mathKeyboard = {
    initialize(container) {
      container.querySelectorAll('input[name="answer"]').forEach((input) => {
        const form = input.closest("form");
        if (form && !form.nextElementSibling?.classList.contains("math-keyboard")) {
          form.insertAdjacentElement("afterend", createKeyboard(input));
        }
      });
    }
  };
})();
