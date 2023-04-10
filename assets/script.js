

// Declare variables for the search form and search history
const searchForm = document.querySelector("#search-form");
const searchHistory = document.querySelector("#search-history");

// Add an event listener to the search form to handle search requests
searchForm.addEventListener("submit", function (event)) {
  event.preventDefault(); // prevent form submission

  const cityInput = document.querySelector("#city-input");
  const city = cityInput.value;

  // Call the Open Weather Map API to fetch weather data for the given city
  fetch(
    `api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={6}&appid=e081906e41053d0045aef1f5836faf73`
  )
    .then((response) => response.json())
    .then((data) => {
      // Update the UI with current weather data for the city
      const currentWeather = document.querySelector("#current-weather");

      // Create HTML elements for the current weather data
      const cityName = document.createElement("h2");
      cityName.textContent = data.name;
      const date = document.createElement("p");
      date.textContent = new Date().toLocaleDateString();
      const weatherIcon = document.createElement("img");
      weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      const temperature = document.createElement("p");
      temperature.textContent = `Temperature: ${data.main.temp} °F`;
      const humidity = document.createElement("p");
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      const windSpeed = document.createElement("p");
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} mph`;

      // Append the current weather data to the UI
      currentWeather.innerHTML = "";
      currentWeather.appendChild(cityName);
      currentWeather.appendChild(date);
      currentWeather.appendChild(weatherIcon);
      currentWeather.appendChild(temperature);
      currentWeather.appendChild(humidity);
      currentWeather.appendChild(windSpeed);

      // Save the city to the search history
      const searchItem = document.createElement("li");
      searchItem.textContent = data.name;
      searchItem.addEventListener("click", function () {
        // When a city in the search history is clicked, fetch weather data for that city
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${data.name}&units=imperial&appid=e081906e41053d0045aef1f5836faf73`
        )
          .then((response) => response.json())
          .then((data) => {
            // Update the UI with current weather data for the city
            currentWeather.innerHTML = "";
            currentWeather.appendChild(cityName);
            currentWeather.appendChild(date);
            currentWeather.appendChild(weatherIcon);
            currentWeather.appendChild(temperature);
            currentWeather.appendChild(humidity);
            currentWeather.appendChild(windSpeed);
          });
      });

      searchHistory.appendChild(searchItem);
    });

  // Call the Open Weather Map API to fetch a 5-day forecast for the given city
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=e081906e41053d0045aef1f5836faf73`
  )
    .then((response) => response.json())
    .then((data) => {
      const forecast = document.querySelector("#forecast");
      forecast.innerHTML = ""; // clear previous forecast data
    
      // Loop through the forecast data and create HTML elements for each day
for (let i = 0; i < data.list.length; i += 8) {
    const date = new Date(data.list[i].dt_txt).toLocaleDateString();
    const weatherIcon = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
    const temperature = Math.round(data.list[i].main.temp);
    const humidity = data.list[i].main.humidity;
    const windSpeed = data.list[i].wind.speed;
  
    const card = document.createElement("div");
    card.classList.add("col-md-2", "mx-2", "my-2");
  
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body", "p-3");
  
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = date;
  
    const icon = document.createElement("img");
    icon.setAttribute("src", weatherIcon);
    icon.setAttribute("alt", data.list[i].weather[0].description);
  
    const tempEl = document.createElement("p");
    tempEl.classList.add("card-text");
    tempEl.innerHTML = `Temp: ${temperature}&#176;F`;
  
    const humidityEl = document.createElement("p");
    humidityEl.classList.add("card-text");
    humidityEl.textContent = `Humidity: ${humidity}%`;
  
    const windEl = document.createElement("p");
    windEl.classList.add("card-text");
    windEl.textContent = `Wind Speed: ${windSpeed} MPH`;
  
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(icon);
    cardBody.appendChild(tempEl);
    cardBody.appendChild(humidityEl);
    cardBody.appendChild(windEl);
    card.appendChild(cardBody);
    forecastEl.appendChild(card);
  };