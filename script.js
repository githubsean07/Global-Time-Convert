"use strict";
// Uses Luxon from the CDN (DateTime is global: luxon.DateTime)
const { DateTime } = luxon;
/**
 * COUNTRY → CITY → IANA TIMEZONE
 * You can extend this as much as you want; the logic will pick it up everywhere.
 */
const CITY_TIMEZONES = {
    "United States": {
        "New York": "America/New_York",
        "Boston": "America/New_York",
        "Miami": "America/New_York",
        "Atlanta": "America/New_York",
        "Washington, D.C.": "America/New_York",
        "Philadelphia": "America/New_York",
        "Chicago": "America/Chicago",
        "Houston": "America/Chicago",
        "Dallas": "America/Chicago",
        "Austin": "America/Chicago",
        "Minneapolis": "America/Chicago",
        "New Orleans": "America/Chicago",
        "Denver": "America/Denver",
        "Salt Lake City": "America/Denver",
        "Phoenix": "America/Phoenix",
        "Los Angeles": "America/Los_Angeles",
        "San Diego": "America/Los_Angeles",
        "San Francisco": "America/Los_Angeles",
        "San Jose": "America/Los_Angeles",
        "Sacramento": "America/Los_Angeles",
        "Fresno": "America/Los_Angeles",
        "Portland": "America/Los_Angeles",
        "Seattle": "America/Los_Angeles",
        "Honolulu": "Pacific/Honolulu",
        "Anchorage": "America/Anchorage"
    },
    Canada: {
        Toronto: "America/Toronto",
        Ottawa: "America/Toronto",
        Montreal: "America/Toronto",
        "Quebec City": "America/Toronto",
        Vancouver: "America/Vancouver",
        Calgary: "America/Edmonton",
        Edmonton: "America/Edmonton",
        Winnipeg: "America/Winnipeg"
    },
    Mexico: {
        "Mexico City": "America/Mexico_City",
        Guadalajara: "America/Mexico_City",
        Monterrey: "America/Monterrey",
        Cancún: "America/Cancun",
        Tijuana: "America/Tijuana"
    },
    Brazil: {
        "São Paulo": "America/Sao_Paulo",
        "Rio de Janeiro": "America/Sao_Paulo",
        Brasília: "America/Sao_Paulo",
        Salvador: "America/Bahia",
        Fortaleza: "America/Fortaleza",
        Recife: "America/Recife",
        Manaus: "America/Manaus"
    },
    Argentina: {
        "Buenos Aires": "America/Argentina/Buenos_Aires",
        Córdoba: "America/Argentina/Cordoba",
        Rosario: "America/Argentina/Cordoba",
        Mendoza: "America/Argentina/Mendoza"
    },
    Chile: {
        Santiago: "America/Santiago",
        "Punta Arenas": "America/Punta_Arenas",
        "Easter Island": "Pacific/Easter"
    },
    Peru: {
        Lima: "America/Lima",
        Cusco: "America/Lima"
    },
    Colombia: {
        Bogotá: "America/Bogota",
        Medellín: "America/Bogota",
        Cali: "America/Bogota"
    },
    Ecuador: {
        Quito: "America/Guayaquil",
        Guayaquil: "America/Guayaquil",
        Galápagos: "Pacific/Galapagos"
    },
    Uruguay: {
        Montevideo: "America/Montevideo"
    },
    Paraguay: {
        Asunción: "America/Asuncion"
    },
    Bolivia: {
        "La Paz": "America/La_Paz"
    },
    Venezuela: {
        Caracas: "America/Caracas"
    },
    Panama: {
        "Panama City": "America/Panama"
    },
    "Costa Rica": {
        "San José": "America/Costa_Rica"
    },
    Guatemala: {
        "Guatemala City": "America/Guatemala"
    },
    "Dominican Republic": {
        "Santo Domingo": "America/Santo_Domingo"
    },
    Cuba: {
        Havana: "America/Havana"
    },
    "Puerto Rico": {
        "San Juan": "America/Puerto_Rico"
    },
    "United Kingdom": {
        London: "Europe/London",
        Manchester: "Europe/London",
        Birmingham: "Europe/London",
        Edinburgh: "Europe/London",
        Glasgow: "Europe/London"
    },
    Ireland: {
        Dublin: "Europe/Dublin",
        Cork: "Europe/Dublin"
    },
    France: {
        Paris: "Europe/Paris",
        Lyon: "Europe/Paris",
        Marseille: "Europe/Paris",
        Nice: "Europe/Paris",
        Toulouse: "Europe/Paris"
    },
    Germany: {
        Berlin: "Europe/Berlin",
        Munich: "Europe/Berlin",
        Hamburg: "Europe/Berlin",
        Frankfurt: "Europe/Berlin",
        Cologne: "Europe/Berlin"
    },
    Spain: {
        Madrid: "Europe/Madrid",
        Barcelona: "Europe/Madrid",
        Valencia: "Europe/Madrid",
        Seville: "Europe/Madrid"
    },
    Portugal: {
        Lisbon: "Europe/Lisbon",
        Porto: "Europe/Lisbon"
    },
    Italy: {
        Rome: "Europe/Rome",
        Milan: "Europe/Rome",
        Naples: "Europe/Rome",
        Turin: "Europe/Rome",
        Florence: "Europe/Rome"
    },
    Netherlands: {
        Amsterdam: "Europe/Amsterdam",
        Rotterdam: "Europe/Amsterdam",
        "The Hague": "Europe/Amsterdam"
    },
    Belgium: {
        Brussels: "Europe/Brussels",
        Antwerp: "Europe/Brussels"
    },
    Switzerland: {
        Zurich: "Europe/Zurich",
        Geneva: "Europe/Zurich",
        Basel: "Europe/Zurich"
    },
    Austria: {
        Vienna: "Europe/Vienna",
        Salzburg: "Europe/Vienna"
    },
    Sweden: {
        Stockholm: "Europe/Stockholm",
        Gothenburg: "Europe/Stockholm"
    },
    Norway: {
        Oslo: "Europe/Oslo",
        Bergen: "Europe/Oslo"
    },
    Denmark: {
        Copenhagen: "Europe/Copenhagen"
    },
    Finland: {
        Helsinki: "Europe/Helsinki"
    },
    "Czech Republic": {
        Prague: "Europe/Prague"
    },
    Poland: {
        Warsaw: "Europe/Warsaw",
        "Kraków": "Europe/Warsaw"
    },
    Hungary: {
        Budapest: "Europe/Budapest"
    },
    Greece: {
        Athens: "Europe/Athens",
        Thessaloniki: "Europe/Athens"
    },
    Turkey: {
        Istanbul: "Europe/Istanbul",
        Ankara: "Europe/Istanbul",
        Izmir: "Europe/Istanbul"
    },
    Russia: {
        Moscow: "Europe/Moscow",
        "Saint Petersburg": "Europe/Moscow"
    },
    "United Arab Emirates": {
        Dubai: "Asia/Dubai",
        "Abu Dhabi": "Asia/Dubai"
    },
    "Saudi Arabia": {
        Riyadh: "Asia/Riyadh",
        Jeddah: "Asia/Riyadh"
    },
    Qatar: {
        Doha: "Asia/Qatar"
    },
    Kuwait: {
        "Kuwait City": "Asia/Kuwait"
    },
    Israel: {
        "Tel Aviv": "Asia/Jerusalem",
        Jerusalem: "Asia/Jerusalem"
    },
    Jordan: {
        Amman: "Asia/Amman"
    },
    Lebanon: {
        Beirut: "Asia/Beirut"
    },
    Iran: {
        Tehran: "Asia/Tehran"
    },
    India: {
        Delhi: "Asia/Kolkata",
        "New Delhi": "Asia/Kolkata",
        Mumbai: "Asia/Kolkata",
        Bengaluru: "Asia/Kolkata",
        Bangalore: "Asia/Kolkata",
        Hyderabad: "Asia/Kolkata",
        Chennai: "Asia/Kolkata",
        Kolkata: "Asia/Kolkata",
        Pune: "Asia/Kolkata",
        Ahmedabad: "Asia/Kolkata"
    },
    Pakistan: {
        Karachi: "Asia/Karachi",
        Lahore: "Asia/Karachi"
    },
    Bangladesh: {
        Dhaka: "Asia/Dhaka"
    },
    "Sri Lanka": {
        Colombo: "Asia/Colombo"
    },
    Nepal: {
        Kathmandu: "Asia/Kathmandu"
    },
    China: {
        Beijing: "Asia/Shanghai",
        Shanghai: "Asia/Shanghai",
        Shenzhen: "Asia/Shanghai",
        Guangzhou: "Asia/Shanghai",
        Chengdu: "Asia/Shanghai",
        Chongqing: "Asia/Shanghai"
    },
    "Hong Kong": {
        "Hong Kong": "Asia/Hong_Kong"
    },
    Taiwan: {
        Taipei: "Asia/Taipei"
    },
    Japan: {
        Tokyo: "Asia/Tokyo",
        Osaka: "Asia/Tokyo",
        Yokohama: "Asia/Tokyo",
        Nagoya: "Asia/Tokyo",
        Sapporo: "Asia/Tokyo"
    },
    "South Korea": {
        Seoul: "Asia/Seoul",
        Busan: "Asia/Seoul"
    },
    Philippines: {
        Manila: "Asia/Manila",
        Cebu: "Asia/Manila",
        Davao: "Asia/Manila"
    },
    Singapore: {
        Singapore: "Asia/Singapore"
    },
    Malaysia: {
        "Kuala Lumpur": "Asia/Kuala_Lumpur",
        Penang: "Asia/Kuala_Lumpur"
    },
    Indonesia: {
        Jakarta: "Asia/Jakarta",
        Surabaya: "Asia/Jakarta",
        Bandung: "Asia/Jakarta",
        "Bali (Denpasar)": "Asia/Makassar"
    },
    Thailand: {
        Bangkok: "Asia/Bangkok",
        "Chiang Mai": "Asia/Bangkok"
    },
    Vietnam: {
        "Ho Chi Minh City": "Asia/Ho_Chi_Minh",
        Hanoi: "Asia/Ho_Chi_Minh"
    },
    Australia: {
        Sydney: "Australia/Sydney",
        Melbourne: "Australia/Sydney",
        Brisbane: "Australia/Brisbane",
        Canberra: "Australia/Sydney",
        Adelaide: "Australia/Adelaide",
        Perth: "Australia/Perth"
    },
    "New Zealand": {
        Auckland: "Pacific/Auckland",
        Wellington: "Pacific/Auckland",
        Christchurch: "Pacific/Auckland"
    },
    Fiji: {
        Suva: "Pacific/Fiji"
    },
    Samoa: {
        Apia: "Pacific/Apia"
    },
    Tonga: {
        "Nuku'alofa": "Pacific/Tongatapu"
    },
    "South Africa": {
        Johannesburg: "Africa/Johannesburg",
        "Cape Town": "Africa/Johannesburg",
        Durban: "Africa/Johannesburg",
        Pretoria: "Africa/Johannesburg"
    },
    Egypt: {
        Cairo: "Africa/Cairo",
        Alexandria: "Africa/Cairo"
    },
    Nigeria: {
        Lagos: "Africa/Lagos",
        Abuja: "Africa/Lagos"
    },
    Kenya: {
        Nairobi: "Africa/Nairobi"
    },
    Morocco: {
        Casablanca: "Africa/Casablanca",
        Rabat: "Africa/Casablanca"
    },
    Ghana: {
        Accra: "Africa/Accra"
    }
};
/* ---------- UI HELPERS ---------- */
function populateCountrySelect(selectEl, placeholderText) {
    selectEl.innerHTML = "";
    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.textContent = placeholderText;
    selectEl.appendChild(placeholder);
    Object.keys(CITY_TIMEZONES)
        .sort()
        .forEach((country) => {
        const opt = document.createElement("option");
        opt.value = country;
        opt.textContent = country;
        selectEl.appendChild(opt);
    });
}
function updateCitiesSelect(countrySelectId, citySelectId) {
    const countrySelect = document.getElementById(countrySelectId);
    const citySelect = document.getElementById(citySelectId);
    const country = countrySelect.value;
    citySelect.innerHTML = "";
    if (!country) {
        citySelect.disabled = true;
        const opt = document.createElement("option");
        opt.value = "";
        opt.textContent = "Select a country first";
        citySelect.appendChild(opt);
        return;
    }
    const cityMap = CITY_TIMEZONES[country];
    if (!cityMap) {
        citySelect.disabled = true;
        const opt = document.createElement("option");
        opt.value = "";
        opt.textContent = "No cities configured";
        citySelect.appendChild(opt);
        return;
    }
    citySelect.disabled = false;
    Object.keys(cityMap)
        .sort()
        .forEach((city) => {
        const opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
    });
}
function findCountryCityByTimezone(zoneName) {
    for (const [country, cityMap] of Object.entries(CITY_TIMEZONES)) {
        for (const [city, tz] of Object.entries(cityMap)) {
            if (tz === zoneName)
                return { country, city };
        }
    }
    return null;
}
/* ---------- FORM INIT ---------- */
function initForm() {
    const dateInput = document.getElementById("sourceDate");
    const timeInput = document.getElementById("sourceTime");
    const sourceCountry = document.getElementById("sourceCountry");
    const targetCountry1 = document.getElementById("targetCountry1");
    const targetCountry2 = document.getElementById("targetCountry2");
    const targetCountry3 = document.getElementById("targetCountry3");
    // Prefill date & time with "now"
    const now = DateTime.local();
    dateInput.value = now.toISODate();
    timeInput.value = now.toFormat("HH:mm");
    // Populate country selects
    populateCountrySelect(sourceCountry, "Select source country…");
    populateCountrySelect(targetCountry1, "Select a country…");
    populateCountrySelect(targetCountry2, "(Optional) Not used");
    populateCountrySelect(targetCountry3, "(Optional) Not used");
    // Initialize city selects
    updateCitiesSelect("sourceCountry", "sourceCity");
    updateCitiesSelect("targetCountry1", "targetCity1");
    updateCitiesSelect("targetCountry2", "targetCity2");
    updateCitiesSelect("targetCountry3", "targetCity3");
    // Wire events
    sourceCountry.addEventListener("change", () => updateCitiesSelect("sourceCountry", "sourceCity"));
    targetCountry1.addEventListener("change", () => updateCitiesSelect("targetCountry1", "targetCity1"));
    targetCountry2.addEventListener("change", () => updateCitiesSelect("targetCountry2", "targetCity2"));
    targetCountry3.addEventListener("change", () => updateCitiesSelect("targetCountry3", "targetCity3"));
    document.getElementById("timeForm").addEventListener("submit", onSubmit);
    document.getElementById("useNowButton").addEventListener("click", useNow);
    // Try to map the current timezone to a city/country
    const guess = findCountryCityByTimezone(now.zoneName);
    if (guess) {
        sourceCountry.value = guess.country;
        updateCitiesSelect("sourceCountry", "sourceCity");
        document.getElementById("sourceCity").value = guess.city;
    }
}
function useNow() {
    const now = DateTime.local();
    document.getElementById("sourceDate").value = now.toISODate();
    document.getElementById("sourceTime").value = now.toFormat("HH:mm");
    const guess = findCountryCityByTimezone(now.zoneName);
    if (guess) {
        const sourceCountry = document.getElementById("sourceCountry");
        const sourceCity = document.getElementById("sourceCity");
        sourceCountry.value = guess.country;
        updateCitiesSelect("sourceCountry", "sourceCity");
        sourceCity.value = guess.city;
    }
}
/* ---------- ERROR HANDLING ---------- */
function showError(message) {
    const box = document.getElementById("errorBox");
    const msg = document.getElementById("errorMessage");
    box.style.display = "block";
    msg.textContent = message;
    const card = document.getElementById("resultCard");
    card.classList.remove("show");
    card.innerHTML = "";
}
function clearError() {
    const box = document.getElementById("errorBox");
    box.style.display = "none";
    document.getElementById("errorMessage").textContent = "";
}
/* ---------- FORMAT HELPERS ---------- */
function formatOffset(offsetMinutes) {
    const sign = offsetMinutes >= 0 ? "+" : "-";
    const abs = Math.abs(offsetMinutes);
    const hours = Math.floor(abs / 60);
    const minutes = abs % 60;
    return `${sign}${String(hours).padStart(2, "0")}:${String(minutes)
        .toString()
        .padStart(2, "0")}`;
}
function buildTargetsSentence(targets) {
    const pieces = targets.map((t) => `${t.day} ${t.time12} on ${t.dateNice} in ${t.city}, ${t.country} (${t.tz})`);
    if (pieces.length === 1)
        return pieces[0];
    if (pieces.length === 2)
        return `${pieces[0]} and ${pieces[1]}`;
    return `${pieces[0]}, ${pieces[1]} and ${pieces[2]}`;
}
/* ---------- MAIN SUBMIT ---------- */
function onSubmit(event) {
    event.preventDefault();
    clearError();
    const dateVal = document.getElementById("sourceDate").value;
    const timeVal = document.getElementById("sourceTime").value;
    const sourceCountry = document.getElementById("sourceCountry").value;
    const sourceCity = document.getElementById("sourceCity").value;
    if (!dateVal || !timeVal || !sourceCountry || !sourceCity) {
        showError("Please fill in date, time, source country, and source city.");
        return;
    }
    const cityMapForSource = CITY_TIMEZONES[sourceCountry] || {};
    const srcTz = cityMapForSource[sourceCity];
    if (!srcTz) {
        showError(`No timezone configured for ${sourceCity}, ${sourceCountry}.`);
        return;
    }
    const [year, month, day] = dateVal.split("-").map(Number);
    const [hour, minute] = timeVal.split(":").map(Number);
    const sourceDt = DateTime.fromObject({ year, month, day, hour, minute }, { zone: srcTz });
    if (!sourceDt.isValid) {
        showError("The source date or time is invalid. Please check the values.");
        return;
    }
    const targets = [];
    for (let i = 1; i <= 3; i++) {
        const countrySel = document.getElementById(`targetCountry${i}`);
        const citySel = document.getElementById(`targetCity${i}`);
        const country = countrySel.value;
        const city = citySel.value;
        if (i === 1) {
            if (!country || !city) {
                showError("Please select at least one target country and city (Location 1).");
                return;
            }
        }
        else {
            if (!country || !city)
                continue;
        }
        const cityMap = CITY_TIMEZONES[country] || {};
        const targetTz = cityMap[city];
        if (!targetTz) {
            showError(`No timezone configured for ${city}, ${country}.`);
            return;
        }
        const targetDt = sourceDt.setZone(targetTz);
        if (!targetDt.isValid) {
            showError(`Conversion failed for ${city}, ${country}.`);
            return;
        }
        targets.push({
            index: i,
            country,
            city,
            tz: targetTz,
            day: targetDt.toFormat("EEEE"),
            time12: targetDt.toFormat("hh:mm a"),
            dateNice: targetDt.toFormat("MM/dd/yyyy"),
            offset: formatOffset(targetDt.offset)
        });
    }
    if (targets.length === 0) {
        showError("Please configure at least one valid target location.");
        return;
    }
    const srcDay = sourceDt.toFormat("EEEE");
    const srcTime12 = sourceDt.toFormat("hh:mm a");
    const srcDateNice = sourceDt.toFormat("MM/dd/yyyy");
    const srcOffset = formatOffset(sourceDt.offset);
    const targetsSentence = buildTargetsSentence(targets);
    const sourcePlace = `${sourceCity}, ${sourceCountry} (${srcTz})`;
    const human = `When it is ${srcDay} ${srcTime12} on ${srcDateNice} in ${sourcePlace}, it is ${targetsSentence}.`;
    const card = document.getElementById("resultCard");
    const targetBlocksHtml = targets
        .map((t) => `
      <div class="result-block">
        <div class="result-label">Target location ${t.index}</div>
        <div class="result-time">${t.day} ${t.time12}</div>
        <div class="result-meta">
          ${t.dateNice}<br/>
          ${t.city}, ${t.country}<br/>
          ${t.tz} · UTC${t.offset}
        </div>
      </div>`)
        .join("");
    card.innerHTML = `
    <div class="result-main-line">
      ${human}
    </div>
    <div class="result-columns">
      <div class="result-block">
        <div class="result-label">Time you know (source)</div>
        <div class="result-time">${srcDay} ${srcTime12}</div>
        <div class="result-meta">
          ${srcDateNice}<br/>
          ${sourceCity}, ${sourceCountry}<br/>
          ${srcTz} · UTC${srcOffset}
        </div>
      </div>
      ${targetBlocksHtml}
    </div>
  `;
    requestAnimationFrame(() => {
        card.classList.add("show");
    });
}
/* ---------- BOOTSTRAP ---------- */
document.addEventListener("DOMContentLoaded", initForm);