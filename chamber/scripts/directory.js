const url = "data/members.json";
const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-btn");
const listButton = document.querySelector("#list-btn");

const levels = { 1: "Member", 2: "Silver Member", 3: "Gold Member" };

async function getMembers() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const data = await response.json();
    displayMembers(data.members);
  } catch (error) {
    membersContainer.innerHTML = "<p>Sorry, the member directory could not be loaded right now.</p>";
    console.error("Error loading members:", error);
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.className = "member";

    const head = document.createElement("div");
    head.className = "member-head";

    const name = document.createElement("h2");
    name.textContent = member.name;

    const tagline = document.createElement("p");
    tagline.className = "tagline";
    tagline.textContent = member.tagline;

    head.append(name, tagline);

    const body = document.createElement("div");
    body.className = "member-body";

    const logo = document.createElement("img");
    logo.src = `images/members/${member.image}`;
    logo.alt = `${member.name} logo`;
    logo.width = 90;
    logo.height = 90;
    logo.loading = "lazy";

    const details = document.createElement("div");
    details.className = "details";

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    const phoneLink = document.createElement("a");
    phoneLink.href = `tel:${member.phone.replace(/[^\d+]/g, "")}`;
    phoneLink.textContent = member.phone;
    phone.appendChild(phoneLink);

    const website = document.createElement("p");
    const websiteLink = document.createElement("a");
    websiteLink.href = member.website;
    websiteLink.target = "_blank";
    websiteLink.rel = "noopener";
    websiteLink.textContent = member.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    website.appendChild(websiteLink);

    const level = document.createElement("span");
    level.className = `level level-${member.membershipLevel}`;
    level.textContent = levels[member.membershipLevel];

    details.append(address, phone, website, level);
    body.append(logo, details);
    card.append(head, body);
    membersContainer.appendChild(card);
  });
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

getMembers();
