setInterval(getCurrentTime, 1000);

    var currentDay = $("#currentDay");
    var date = $("<div>");
    function getCurrentTime() {
      date.text(moment().format("dddd, MMMM Do YYYY"));
      currentDay.append(date);
      
    }

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