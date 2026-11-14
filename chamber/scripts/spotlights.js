import { getMembers, createMemberCard } from "./members.js";

const spotlightContainer = document.querySelector("#spotlights");
const SPOTLIGHT_COUNT = 3;

// Fisher–Yates shuffle so each page load shows a different random set
function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function displaySpotlights() {
  try {
    const members = await getMembers();
    const goldAndSilver = members.filter((member) => member.membershipLevel >= 2);
    const chosen = shuffle(goldAndSilver).slice(0, SPOTLIGHT_COUNT);
    spotlightContainer.replaceChildren(...chosen.map((member) => createMemberCard(member, "h3")));
  } catch (error) {
    spotlightContainer.innerHTML = "<p>Member spotlights are unavailable right now.</p>";
    console.error("Error loading spotlights:", error);
  }
}

displaySpotlights();
