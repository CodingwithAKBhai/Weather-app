const apikey = "1da35683e6461e506902398f0830711d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loader = document.querySelector(".loader");

async function checkWeather(city) {
    loader.style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "none";

    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
        } else {
            const data = await response.json();
            document.querySelector(".city").textContent = data.name;
            document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").textContent = data.main.humidity + "%";
            document.querySelector(".wind").textContent = data.wind.speed + " km/h";

            switch (data.weather[0].main) {
                case "Clouds": weatherIcon.src = "clouds.png"; break;
                case "Clear": weatherIcon.src = "clear.png"; break;
                case "Rain": weatherIcon.src = "rain.png"; break;
                case "Drizzle": weatherIcon.src = "drizzle.png"; break;
                case "Mist": weatherIcon.src = "mist.png"; break;
                case "Snow": weatherIcon.src = "snow.png"; break;
                case "Thunderstorm": weatherIcon.src = "thunder.png"; break;
                default: weatherIcon.src = "default.png";
            }

            document.querySelector(".weather").style.display = "block";
        }
    } catch (error) {
        document.querySelector(".error").style.display = "block";
    } finally {
        loader.style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value.trim());
    }
});
