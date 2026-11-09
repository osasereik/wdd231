// Shared helpers for loading and displaying chamber members.

const membersUrl = "data/members.json";

export const levels = { 1: "Member", 2: "Silver Member", 3: "Gold Member" };

export async function getMembers() {
  const response = await fetch(membersUrl);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  return data.members;
}

export function createMemberCard(member, headingLevel = "h2") {
  const card = document.createElement("section");
  card.className = "member";

  const head = document.createElement("div");
  head.className = "member-head";

  const name = document.createElement(headingLevel);
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
  return card;
}
