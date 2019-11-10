
var searchButton = $("#search");
var city;
var weatherCard = $("#weatherCard")
var currentDay = $("#currentDay");
var searchHistory = $("#city-history")
var date;
var countHistoryText;


searchButton.on("click", function () {
    var city = $("#city-value").val();
    $("#city-value").val("");
    console.log(city)

    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0c1d7d783028094c714253626e70f8d1&units=imperial";


    $.ajax({ url: queryUrl, method: "GET" })
        .then(function (response) {
            console.log("Weather Object: ", response)
            weatherCard.empty();
            currentDay.empty();
            date.empty();

            renderCityInfo(response)
            renderWeather(response)
            addToHistory(response)
            // renderuvIndex(response)
        })


    var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=0c1d7d783028094c714253626e70f8d1&units=imperial";

    $.ajax({ url: forecastUrl, method: "GET" })
        .then(function (forecast) {
            console.log("Forecast object: ", forecast)
            renderForecast(forecast)
        })

})

$(document).on("keypress", function (e) {
    if (e.which == 13) {
        var city = $("#city-value").val();
        $("#city-value").val("");
        console.log(city)

        var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0c1d7d783028094c714253626e70f8d1&units=imperial";


        $.ajax({ url: queryUrl, method: "GET" })
            .then(function (response) {
                console.log("Weather Object: ", response)
                weatherCard.empty();
                currentDay.empty();

                renderCityInfo(response)
                renderWeather(response)
                addToHistory(response)
                // renderuvIndex(response)
            })


        var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=0c1d7d783028094c714253626e70f8d1&units=imperial";

        $.ajax({ url: forecastUrl, method: "GET" })
            .then(function (forecast) {
                console.log("Forecast object: ", forecast)
                renderForecast(forecast)
            })
    }
})


function renderCityInfo(cityData) {
    var nameCity = $("<h3>").text(cityData.name)
    currentDay.append(nameCity)
    date = $("<div>");

    setInterval(getCurrentTime, 1000);
    function getCurrentTime() {
        date.text(moment().format("dddd, MMMM Do YYYY"));
        currentDay.append(date);
    }

}


function renderWeather(cityData) {

    weatherCard.attr("class", "card")

    var addRow = $("<div>").attr("class", "row")
    weatherCard.append(addRow)
    var addColumn = $("<div>").attr("class", "col-md-6").attr("id", "weather-data")
    addRow.append(addColumn)

    var addImgColumn = $("<div>").attr("class", "col-md-2").attr("id", "weather-img")
    addRow.append(addImgColumn)


    var weatherData = $("#weather-data")
    var weatherEl = $("<div>").addClass("card-body city-weather")

    weatherData.append(weatherEl)


    //append weather data to elements created
    var tempCity = $("<p>").text("Temperature F: " + cityData.main.temp)
    weatherEl.append(tempCity)

    //append Humidity data to elements created
    var humidityCity = $("<p>").text("Humidty: " + cityData.main.humidity)
    weatherEl.append(humidityCity)

    //append Wind Speed Data to elements created
    var windSpeedCity = $("<p>").text("Wind Speed: " + cityData.wind.speed + " mph")
    weatherEl.append(windSpeedCity)

    var uvIndexCity = $("<p>").text("UV Index: ").attr("class", "uv")
    weatherEl.append(uvIndexCity)

    renderuvIndex(cityData)


    //append image to image column
    var weatherImgDiv = $("#weather-img")
    var icon = cityData.weather[0].icon;
    var weatherImg = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
    weatherImgDiv.append(weatherImg)
    addImgColumn.append(weatherImgDiv)

}

function renderuvIndex(coordinates) {
    var lat = coordinates.coord.lat;
    var lon = coordinates.coord.lon;
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=0c1d7d783028094c714253626e70f8d1" + "&lat=" + lat + "&lon=" + lon;
    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function (getUV) {
        console.log("Latitude ", lat)
        console.log("Longitude ", lon)
        console.log("UV Index: ", getUV)
        console.log("UV Value: ", getUV.value)
        var uvValue = getUV.value;
        var uvTitle = $(".uv")
        var uvText = $('<p>' + uvValue + '</p>').css("display", "inline");
        uvTitle.append(uvText);
        if (uvValue >= 0 && uvValue <= 2.9) {
            uvText.attr("class", "low");
        }
        else if (uvValue >= 3.0 && uvValue <= 5.9) {
            uvText.attr("class", "moderate");
        }
        else if (uvValue >= 6.0 && uvValue <= 7.9) {
            uvText.attr("class", "high");
        }
        else if (uvValue >= 8.0 && uvValue <= 10.9) {
            uvText.attr("class", "very-high");
        }
        else if (uvValue >= 11.0) {
            uvText.attr("class", "extreme");
        }

    })
}


function addToHistory(cityName) {
    var historyDiv = $("#city-history")
    var listHistory = $("<li>").addClass("list-group-item d-flex justify-content-between align-items-center")
    listHistory.text(cityName.name)
    // var countHistorySpan = $("<span>")
    // countHistorySpan.textContent(countHistoryText)
    historyDiv.append(listHistory)
    // listHistory.append(countHistorySpan)


}

function renderForecast(forecastCity) {
    var forecastTitle = $("#forecastTitle");
    forecastTitle.text("5 Day Forecast: ")

    var day1 = $("#day1")
    var day2 = $("#day2")
    var day3 = $("#day3")
    var day4 = $("#day4")
    var day5 = $("#day5")

    var days = [day1, day2, day3, day4, day5]

    days.forEach(function (day) {
        var forecastCard = $("<div>").attr("card bg-primary text-white");
        var forecastCardBody = $("<div>").attr("card-body p-2")

        var forecastTitle = $("<h6>").addClass("")

    });

    // day1.empty();
    // day2.empty();
    // day3.empty();
    // day4.empty();
    // day5.empty();




}


// $(".history").on("click","li", function (event) {
//     event.stopPropagation();
//     renderCityInfo($(this).val());
//     renderWeather($(this).val());
//     renderuvIndex($(this).val());
// });

    // Define Varialbes
// Search button
    //grab input and assign to variable
    //click event on search button
    //append recent searches to the sidebar
// render results from object into city-weather div

//API call for UV Index
//API call for forecast and Weather Info



//create functions for 
    //current conditions
    //5-day forecast
    //search history
    //UV Index
    //local storage


//store search history in local storage
//get search history from local storage