
document.addEventListener("DOMContentLoaded", () => {
  updateDateTime();
  fetchWeather();
  fetchVelib();
  fetchNews();
  fetchRaces();

  setInterval(updateDateTime, 10000); // Mise à jour de l'heure toutes les 10s
});

// Heure et date
function updateDateTime() {
  const now = new Date();
  document.getElementById("datetime").textContent =
    `🕐 ${now.toLocaleTimeString()} – 📅 ${now.toLocaleDateString("fr-FR")}`;
}

// Météo via Open-Meteo
async function fetchWeather() {
  try {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=48.84&longitude=2.45&current=temperature_2m,weathercode&timezone=Europe%2FParis";
    const res = await fetch(url);
    const data = await res.json();
    const temp = data.current.temperature_2m;
    document.getElementById("weather").textContent = `🌤️ Température actuelle : ${temp} °C`;
  } catch (e) {
    document.getElementById("weather").textContent = "❌ Météo indisponible";
  }
}

// Vélib’ stations Vincennes
async function fetchVelib() {
  try {
    const res = await fetch("https://velib-metropole-opendata.smoove.pro/opendata/Velib_Metropole/station_status.json");
    const data = await res.json();
    const stations = data.data.stations.filter(s => s.stationCode.startsWith("121") || s.stationCode.startsWith("120"));
    const html = stations.slice(0, 3).map(s => 
      `🚲 Station ${s.stationCode} : ${s.num_bikes_available} vélos dispo`).join("<br>");
    document.getElementById("velib").innerHTML = html || "Pas de stations à proximité.";
  } catch (e) {
    document.getElementById("velib").textContent = "❌ Vélib’ indisponible";
  }
}

// France Info
async function fetchNews() {
  try {
    const res = await fetch("https://www.francetvinfo.fr/titres.rss");
    const xml = await res.text();
    const parser = new DOMParser();
    const rss = parser.parseFromString(xml, "application/xml");
    const items = [...rss.querySelectorAll("item")].slice(0, 3);
    const html = items.map(item => `📰 ${item.querySelector("title").textContent}`).join("<br>");
    document.getElementById("news").innerHTML = html;
  } catch {
    document.getElementById("news").textContent = "❌ Actus indisponibles";
  }
}

// Courses via fichier local races.json
async function fetchRaces() {
  try {
    const res = await fetch("/testest/races.json");
    const races = await res.json();
    const today = new Date().toISOString().split("T")[0];
    const todayRaces = races.filter(r => r.date === today);
    const html = todayRaces.map(r => `🐎 ${r.nom} à ${r.heure}`).join("<br>");
    document.getElementById("races").innerHTML = html || "Pas de courses aujourd’hui.";
  } catch {
    document.getElementById("races").textContent = "❌ Courses indisponibles";
  }
}
