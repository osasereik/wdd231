document.querySelector("#timestamp").value = new Date().toLocaleString();

const buttons = document.querySelectorAll("[data-modal]");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.modal).showModal();
  });
});

const closeButtons = document.querySelectorAll(".close");
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog").close();
  });
});
