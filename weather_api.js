 let weather = {
    apikey: "2d3144ddf8102e3c3774569c52668e0d",
    fetchWeather: function(city) {
       fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+ this.apikey
       )
       .then((response) => response.json())
       .then((data) => this.displayWeather(data));
    },
        displayWeather: function(data){
        const { name } = data;
        const { icon } = data.weather[0];
        const { description }  = data.weather[0];
        const { temp,humidity } =  data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText="Weather in "+name;
        document.querySelector(".icon").src="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText= temp + " °C";
        document.querySelector(".Humidity").innerText = "Humidity: "+ humidity;
        document.querySelector(".Wind").innerText =" Wind-Speed: "+speed+" km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+name+"')"
    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};
document.getElementById("bt").addEventListener("click",function(){
    weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if(event.key == "Enter")
    {
        weather.search();
    }
});


