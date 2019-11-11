
var searchButton = $("#search");
var city;
var weatherCard = $("#weatherCard")
var currentDay = $("#currentDay");
var searchHistory = $("#city-history")
var date;
var countHistoryText;
var forecastDiv = $("#forecast");


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
            forecastDiv.empty()
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
                forecastDiv.empty();
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
    var tempCity = $("<p>").text("Temperature: " + cityData.main.temp + " °F")
    weatherEl.append(tempCity)

    //append Humidity data to elements created
    var humidityCity = $("<p>").text("Humidty: " + cityData.main.humidity + " %")
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



$("#city-history").on("click", "li", function (e) {
    console.log($(this).text())
    var clickCity = $(this).text()


    var queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + clickCity + "&appid=0c1d7d783028094c714253626e70f8d1&units=imperial";


    $.ajax({ url: queryUrl, method: "GET" })
        .then(function (response) {
            console.log("Weather Object: ", response)
            weatherCard.empty();
            currentDay.empty();
            date.empty();

            renderCityInfo(response)
            renderWeather(response)
            // renderuvIndex(response)
        })


    var forecastUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + clickCity + "&appid=0c1d7d783028094c714253626e70f8d1&units=imperial";

    $.ajax({ url: forecastUrl, method: "GET" })
        .then(function (forecast) {
            console.log("Forecast object: ", forecast)
            forecastDiv.empty();
            renderForecast(forecast)
        })

})


function renderForecast(forecastCity) {
    console.log("forecastCity = ", forecastCity)

    var forecastTitle = $("#forecastTitle");
    forecastTitle.text("5 Day Forecast: ")

    console.log(typeof forecastCity.list)
    var forecastOptions = forecastCity.list
    console.log(forecastOptions)


    var morning = $("<div>").addClass("row").attr("id", "morning-row")
    var morningColumn = $("<div>").addClass("col-md-2")
    var morningText = $("<p>").text("Morning ").addClass("align-middle")
    morningColumn.append(morningText)
    morning.append(morningColumn)

    var midday = $("<div>").addClass("row").attr("id", "midday-row")
    var middayColumn = $("<div>").addClass("col-md-2")
    var middayText = $("<p>").text("Midday ").addClass("align-middle")
    middayColumn.append(middayText)
    midday.append(middayColumn)

    var afternoon = $("<div>").addClass("row").attr("id", "afternoon-row")
    var afternoonColumn = $("<div>").addClass("col-md-2")
    var afternoonText = $("<p>").text("Afternoon ").addClass("align-middle")
    afternoonColumn.append(afternoonText)
    afternoon.append(afternoonColumn)

    forecastDiv.append(morning, midday, afternoon)

    for (let i = 0; i < forecastOptions.length; i++) {
        if (forecastOptions[i].dt_txt.indexOf("06:00:00") !== -1) {
            var column = $("<div>").addClass("col-md-2");
            var card = $("<div>").addClass("card bg-primary text-white");
            var body = $("<div>").addClass("card-body p-2");

            var title = $("<h6>").addClass("card-title").text(new Date(forecastOptions[i].dt_txt).toLocaleDateString());

            var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + forecastOptions[i].weather[0].icon + ".png");

            var p1 = $("<p>").addClass("card-text").text("Temp: " + forecastOptions[i].main.temp_max + " °F");

            var p2 = $("<p>").addClass("card-text").text("Humidity: " + forecastOptions[i].main.humidity + "%");

            // merge together and put on page
            column.append(card.append(body.append(title, img, p1, p2)));
            morning.append(column);
        }
    } 

    for (let i = 0; i < forecastOptions.length; i++) {
        if (forecastOptions[i].dt_txt.indexOf("12:00:00") !== -1) {
            var column = $("<div>").addClass("col-md-2");
            var card = $("<div>").addClass("card bg-primary text-white");
            var body = $("<div>").addClass("card-body p-2");

            var title = $("<h6>").addClass("card-title").text(new Date(forecastOptions[i].dt_txt).toLocaleDateString());

            var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + forecastOptions[i].weather[0].icon + ".png");

            var p1 = $("<p>").addClass("card-text").text("Temp: " + forecastOptions[i].main.temp_max + " °F");

            var p2 = $("<p>").addClass("card-text").text("Humidity: " + forecastOptions[i].main.humidity + "%");

            // merge together and put on page
            column.append(card.append(body.append(title, img, p1, p2)));
            midday.append(column);
        }
    }

    for (let i = 0; i < forecastOptions.length; i++) {
        if (forecastOptions[i].dt_txt.indexOf("18:00:00") !== -1) {
            var column = $("<div>").addClass("col-md-2");
            var card = $("<div>").addClass("card bg-primary text-white");
            var body = $("<div>").addClass("card-body p-2");

            var title = $("<h6>").addClass("card-title").text(new Date(forecastOptions[i].dt_txt).toLocaleDateString());

            var img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + forecastOptions[i].weather[0].icon + ".png");

            var p1 = $("<p>").addClass("card-text").text("Temp: " + forecastOptions[i].main.temp_max + " °F");

            var p2 = $("<p>").addClass("card-text").text("Humidity: " + forecastOptions[i].main.humidity + "%");

            // merge together and put on page
            column.append(card.append(body.append(title, img, p1, p2)));
            afternoon.append(column);
        }
    }
}
