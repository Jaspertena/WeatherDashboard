/* =========================================================================
 * Identifying different DOM elements
 * ========================================================================= */
console.log("is this connected")

var APIKey = "cf03651acb889096c89d126b31fba9f0";
// var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=";

// console.log(api.openweathermap.org/data/2.5/forecast?q=Atlanta&appid=APIKey
/* =========================================================================
 * Identifying different DOM elements
 * ========================================================================= */
// function GetWeather () {
//     const newName= document.getElementById("citySearch");
//     const cityName= document.getElementById("cardTitle");
//     cityName.innerHTML = "--"+newNewName.value+"--";
// }

// fetch("api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=cf03651acb889096c89d126b31fba9f0)
// .then(response => response.json())
// .then(data =>{
//     for(i=0; i<5; i++){
//         document.getElementById("day" +(i+1)+"Min").innerHTML="Min:" +number(data.list[i].main.temp_min).toFixed(1) 
//     }
//     for(i=0; i<5; i++){   
//         document.getElementById("day" +(i+1)+"Max").innerHTML="Min:" +number(data.list[i].main.temp_min).toFixed(1) 

var searchButton = document.getElementById("search");
var inputSearch = document.getElementById("inputSearch");

searchButton.addEventListener("click", function(event){
    event.preventDefault();
    
    getCoordinate(inputSearch.value)
})

const newName= document.getElementById("citySearch");
const cityName= document.getElementById("cardTitle");

function getCoordinate(city){   
    var baseURL = "http://api.openweathermap.org/geo/1.0/direct?q="
    var rest = "&limit=1&appid="
    fetch (baseURL + city + rest + APIKey)
        .then(function(response){
            response.json()
            .then(function(data){
                getCurrentWeather(data[0].lat, data[0].lon);
                getForecastWeather(data[0].lat, data[0].lon)
            })
        })
}


function getCurrentWeather (lat, lon) {
    var baseURL = "https://api.openweathermap.org/data/2.5/onecall?lat=";
    var rest = "&lon=";
    var rest2 = "&units=imperial&exclude=minutely,hourly,daily,alerts&appid=";
    fetch (baseURL + lat + rest + lon + rest2 + APIKey)
        .then(function(response){
            response.json()
            .then(function(data){console.log(data)})
        })
}

function getForecastWeather (lat, lon) {
    var baseURL = "https://api.openweathermap.org/data/2.5/onecall?lat=";
    var rest = "&lon=";
    var rest2 = "&units=imperial&exclude=minutely,hourly,current,alerts&appid=";
    fetch (baseURL + lat + rest + lon + rest2 + APIKey)
        .then(function(response){
            response.json()
            .then(function(data){console.log(data)})
        })

    }

function displayCurrentData(data) {
    var weatherCard = document.getElementById("")
}

function displayForecastData(data) {
    var weatherCard = document.getElementById("")
    for(i=1; i<6; i++);
        getForecastWeather (weatherCard)

        // create a card 
}