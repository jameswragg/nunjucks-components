document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".component-button");
  buttons.forEach((container) => {
    const button = container.querySelector("button");
    const type = container.dataset.type;

    button.addEventListener("click", (e) => {
      if (button.disabled) return;
      console.log(`${type} button clicked`);
    });
  });
});
