import { getMembers, createMemberCard } from "./members.js";

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-btn");
const listButton = document.querySelector("#list-btn");

async function displayMembers() {
  try {
    const members = await getMembers();
    membersContainer.replaceChildren(...members.map((member) => createMemberCard(member)));
  } catch (error) {
    membersContainer.innerHTML = "<p>Sorry, the member directory could not be loaded right now.</p>";
    console.error("Error loading members:", error);
  }
}

function setView(view) {
  const isGrid = view === "grid";
  membersContainer.classList.toggle("grid", isGrid);
  membersContainer.classList.toggle("list", !isGrid);
  gridButton.classList.toggle("active", isGrid);
  listButton.classList.toggle("active", !isGrid);
  gridButton.setAttribute("aria-pressed", String(isGrid));
  listButton.setAttribute("aria-pressed", String(!isGrid));
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));

displayMembers();
