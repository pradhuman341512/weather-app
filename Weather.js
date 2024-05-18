document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "c4f345e53da6c699c57247af6639dd0f";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
    const tempElement = document.querySelector(".temp");
    const cityElement = document.querySelector(".city");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind");

    searchBtn.addEventListener("click", () => {
        const city = searchBox.value.trim();
        if (city !== "") {
            getWeather(city);
        }
    });

    async function getWeather(city) {
        try {
            const response = await fetch(apiUrl + city + "&appid=" + apiKey);
            const data = await response.json();
            updateUI(data);
        } catch (error) {
            console.error("Error fetching weather data: ", error);
        }

    }

    function updateUI(data) {
        cityElement.textContent = data.name;
        tempElement.textContent = Math.round(data.main.temp) + "°C";
        humidityElement.textContent = "Humidity: " + data.main.humidity + "%";
        windElement.textContent = "Wind Speed: " + data.wind.speed + " km/h";
        // Assuming you have an appropriate way to determine the weather icon
        // For simplicity, we'll just set it to a rain icon if it's raining
        if (data.weather[0].main === "Cloud") {
            weatherIcon.src = "clouds.png";
        } else if(data.weather[0].main === "Clear"){
            weatherIcon.src = "clear.png";
        }else if(data.weather[0].main === "Rain"){
            weatherIcon.src = "rain.png";
        }else if(data.weather[0].main === "Drizzle"){
            weatherIcon.src = "drizzle.png";
        }else if(data.weather[0].main === "Mist"){
            weatherIcon.src = "mist.png";
        }
      document.querySelector(".weather").style.display="block";
    };
});

