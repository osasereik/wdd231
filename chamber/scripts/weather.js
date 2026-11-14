const API_KEY = "ed3886c7a4a73beb29c48b0649978e2d";
const LAT = 6.335;
const LON = 5.6037;
const BASE = "https://api.openweathermap.org/data/2.5";
const query = `lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDesc = document.querySelector("#weather-desc");
const weatherHigh = document.querySelector("#weather-high");
const weatherLow = document.querySelector("#weather-low");
const weatherHumidity = document.querySelector("#weather-humidity");
const forecastList = document.querySelector("#forecast");

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

const capitalize = (text) => text.replace(/\b\w/g, (c) => c.toUpperCase());

function localDate(unixSeconds, offsetSeconds) {
  return new Date((unixSeconds + offsetSeconds) * 1000);
}

function displayCurrent(data) {
  const { temp, temp_max, temp_min, humidity } = data.main;
  const { description, icon } = data.weather[0];

  currentTemp.textContent = `${Math.round(temp)}°C`;
  weatherDesc.textContent = capitalize(description);
  const img = document.createElement("img");
  img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  img.alt = description;
  img.width = 80;
  img.height = 80;
  weatherIcon.replaceChildren(img);
  weatherHigh.textContent = `${Math.round(temp_max)}°C`;
  weatherLow.textContent = `${Math.round(temp_min)}°C`;
  weatherHumidity.textContent = `${humidity}%`;
}

function displayForecast(data) {
  const offset = data.city.timezone;
  const today = localDate(Date.now() / 1000, offset).toISOString().slice(0, 10);

  const days = new Map();
  data.list.forEach((reading) => {
    const date = localDate(reading.dt, offset);
    const key = date.toISOString().slice(0, 10);
    if (key === today) return;
    const high = days.get(key)?.high ?? -Infinity;
    days.set(key, { date, high: Math.max(high, reading.main.temp_max) });
  });

  const nextThree = [...days.values()].slice(0, 3);
  forecastList.replaceChildren(
    ...nextThree.map(({ date, high }) => {
      const item = document.createElement("li");
      const label = date.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });
      item.innerHTML = `<span>${label}</span> <strong>${Math.round(high)}°C</strong>`;
      return item;
    })
  );
}

async function loadWeather() {
  try {
    const [current, forecast] = await Promise.all([
      getJson(`${BASE}/weather?${query}`),
      getJson(`${BASE}/forecast?${query}`),
    ]);
    displayCurrent(current);
    displayForecast(forecast);
  } catch (error) {
    weatherDesc.textContent = "Weather data is unavailable right now.";
    forecastList.innerHTML = "<li>Forecast unavailable</li>";
    console.error("Error loading weather:", error);
  }
}

loadWeather();
