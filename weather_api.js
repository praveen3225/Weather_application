let weather = {
    apikey: "2d3144ddf8102e3c3774569c52668e0d",  // OpenWeather API key
    unsplashApiKey: "L3o7o-TsFSdG0v6jVCcJRTmr_6KHQ0dhDIYsxALUeLk",  // Unsplash API key
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apikey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    fetchCityImage: function(city) {
        return fetch(
            `https://api.unsplash.com/search/photos?query=${city}&client_id=${this.unsplashApiKey}&orientation=landscape&per_page=1`
        )
        .then(response => response.json())
        .then((data) => {
            // Ensure there's an image available
            if (data.results && data.results.length > 0) {
                return data.results[0].urls.regular;  // Get the image URL
            } else {
                return null;  // Fallback if no image is found
            }
        });
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon } = data.weather[0];
        const { description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        // Update weather information in the UI
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".Humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".Wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");

        // Fetch city image from Unsplash and set as background
        this.fetchCityImage(name).then((imageUrl) => {
            if (imageUrl) {
                document.body.style.backgroundImage = `url(${imageUrl})`;
            } else {
                // Optional: handle case where no image is found
                document.body.style.backgroundImage = `url('default-background.jpg')`;  // Fallback image
            }
        });
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

// Add event listeners for search actions
document.getElementById("bt").addEventListener("click", function() {
    weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});
