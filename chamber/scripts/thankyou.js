const params = new URLSearchParams(window.location.search);

document.querySelector("#first").textContent = params.get("first");
document.querySelector("#last").textContent = params.get("last");
document.querySelector("#email").textContent = params.get("email");
document.querySelector("#phone").textContent = params.get("phone");
document.querySelector("#business").textContent = params.get("business");
document.querySelector("#timestamp").textContent = params.get("timestamp");
