/* =========================================================================
 * Identifying different DOM elements
 * ========================================================================= */
console.log("is this connected")

var APIKey = "5552027f7503c27427f8a590ee79ad38";

var current = moment().format('dddd MMMM DD, YYYY');

function setDate () {
    var now = document.querySelector("#currentDay");
    now.textContent=current;
}
setDate();


var searchButton = document.getElementById("search");
var inputSearch = document.getElementById("inputSearch");
var cityList = []

var buttonContainer = document.querySelector(".buttonContainer")
searchButton.addEventListener("click", function(event){
    event.preventDefault();
    
    getCoordinate(inputSearch.value);
    cityList.push(inputSearch.value);
    console.log(cityList);
    var cityBtn = document.createElement("button");
    cityBtn.textContent = inputSearch.value;
    cityBtn.classList.add("btn","btn-primary","mb-2", "col-8");
    buttonContainer.appendChild(cityBtn);
    cityBtn.addEventListener("click", function(event){
        event.preventDefault();
        getCoordinate(cityBtn.textContent)
    })
    saveCity()
})

    function saveCity() {
    for (var i = 0; i <cityList.length; i++) {
        localStorage.setItem(i,cityList[i])
    }
}
function getCity (){
    for (var i = 0; i <localStorage.length; i++) {
        var keyValue=localStorage.key(i)
        var city=localStorage.getItem(keyValue)
        var cityBtn = document.createElement("button");
        cityBtn.textContent = city;
        cityBtn.classList.add("btn","btn-primary","mb-2", "col-8");
        buttonContainer.appendChild(cityBtn);
        cityBtn.addEventListener("click", function(event){
            event.preventDefault();
            getCoordinate(city)
        })
    }
}
getCity()
const newName= document.getElementById("citySearch");
const cityName= document.getElementById("cardTitle");

function getCoordinate(city){   
    var baseURL = "https://api.openweathermap.org/geo/1.0/direct?q="
    var rest = "&limit=1&appid="
    fetch (baseURL + city + rest + APIKey)
        .then(function(response){
            response.json()
            .then(function(data){
                getCurrentWeather(data[0].lat, data[0].lon, data[0].name);
                getForecastWeather(data[0].lat, data[0].lon)
                console.log(data)

            })
        })
}


function getCurrentWeather (lat, lon, city) {
    var baseURL = "https://api.openweathermap.org/data/2.5/onecall?lat=";
    var rest = "&lon=";
    var rest2 = "&units=imperial&exclude=minutely,hourly,daily,alerts&appid=";
    var searchCity = city
    fetch (baseURL + lat + rest + lon + rest2 + APIKey)
        .then(function(response){
            response.json()
            .then(function(data){displayCurrentData(data,searchCity)})

        })
}

function getForecastWeather (lat, lon) {
    var baseURL = "https://api.openweathermap.org/data/2.5/onecall?lat=";
    var rest = "&lon=";
    var rest2 = "&units=imperial&exclude=minutely,hourly,current,alerts&appid=";
    fetch (baseURL + lat + rest + lon + rest2 + APIKey)
        .then(function(response){
            response.json()
            .then(function(data){displayForecastData(data)
            console.log(data)})
        })

    }
var getCurrentWeatherContainer = document.querySelector(".currentContainer")


function displayCurrentData(data, city) {
    getCurrentWeatherContainer.innerHTML=""
    var weatherCard = document.createElement("div")
    weatherCard.setAttribute("class", "card")
    var cityName = document.createElement("h1")
    cityName.textContent=city
    cityName.setAttribute("class", "text-center")
    weatherCard.appendChild(cityName)
    var currentTemp = document.createElement("h4")
    currentTemp.textContent="Temp: "+data.current.temp+"°"
    weatherCard.appendChild(currentTemp)
    var currentHumidity = document.createElement("h4")
    currentHumidity.textContent="Humidity: "+data.current.humidity+"%"
    weatherCard.appendChild(currentHumidity)
    var currentWindSpeed = document.createElement("h4")
    currentWindSpeed.textContent="Wind: "+data.current.wind_speed+" km/h"
    weatherCard.appendChild(currentWindSpeed)
    var currentUVI = document.createElement("h4")
    currentUVI.textContent="UVI: "+data.current.uvi
    if (currentUVI.textContent<1){
        currentUVI.setAttribute("class", "bg-success")
    }
    else{
        currentUVI.setAttribute("class", "bg-danger")
    }
    weatherCard.appendChild(currentUVI)
    getCurrentWeatherContainer.appendChild(weatherCard)

}

var forecastContainer = document.querySelector(".forecastContainer")

function displayForecastData(data) {
    forecastContainer.innerHTML = ""
    for(i=1; i<6; i++){
        var weatherCard = document.createElement("div")
    weatherCard.setAttribute("class", "card")
    var currentTemp = document.createElement("h4")
    currentTemp.textContent="Temp: "+data.daily[i].temp.day+"°"
    weatherCard.appendChild(currentTemp)
    var currentHumidity = document.createElement("h4")
    currentHumidity.textContent="Humidity: "+data.daily[i].humidity+"%"
    weatherCard.appendChild(currentHumidity)
    forecastContainer.appendChild(weatherCard)
    var currentWindSpeed = document.createElement("h4")
    currentWindSpeed.textContent="Wind: "+data.daily[i].wind_speed+" km/h"
    weatherCard.appendChild(currentWindSpeed)
    var currentUVI = document.createElement("h4")
    currentUVI.textContent="UVI: "+data.daily[i].uvi
    if (currentUVI.textContent<1){
        currentUVI.setAttribute("class", "bg-success")
    }
    else{
        currentUVI.setAttribute("class", "bg-danger")
    }
    weatherCard.appendChild(currentUVI)
    }
}


