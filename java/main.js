var currentDay = moment().format('MM/DD/YYYY');
var pastSearches = [];
var lastSearch = [];
var APIKey = "166a433c57516f51dfab1f7edaed8413";

onStart();

$(".form-inline").on("submit", function() {
  event.preventDefault();
  var searchParameter = $(".form-control").val().trim();
  if (searchParameter === "") {
    return;
  }
  for (var i = 0; i < pastSearches.length; i++) {
    if (searchParameter.toLowerCase() === pastSearches[i].toLowerCase()) {
      renderItemsOnPage(searchParameter)
      return
    }
  }
  var newLI = $("<li>");
  var newCityBtn = $("<button>");
  newLI.append(newCityBtn);
  newCityBtn.attr("data-city", searchParameter);
  newCityBtn.attr("class", "button col-12");
  newCityBtn.text(searchParameter);
  $(".cityButtons").append(newLI);
  renderItemsOnPage(searchParameter);
  pastSearches.push(searchParameter);
  saveSearches();
})

$(".button").on("click", function() {
  var buttonData = $(this).val($(this).attr("data-city"))
  var searchParameter = buttonData[0].attributes[0].value;
  console.log(searchParameter);
  renderItemsOnPage(searchParameter);
})

function onStart() {
  var storedSearches = JSON.parse(localStorage.getItem("pastSearches"));
  if (storedSearches !== null) {
    pastSearches = storedSearches;
  }
  renderSearches();
}

function saveSearches() {
  localStorage.setItem("pastSearches", JSON.stringify(pastSearches))
}

function renderSearches() {
  for (var i = 0; i < pastSearches.length; i++) {
    var newLI = $("<li>");
    var newCityBtn = $("<button>");
    newLI.append(newCityBtn);
    newCityBtn.attr("data-city", pastSearches[i]);
    newCityBtn.attr("class", "button col-12");
    newCityBtn.text(pastSearches[i]);
    $(".cityButtons").append(newLI);
  }
}

function renderItemsOnPage(searchParameter) {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + searchParameter + "&cnt=6&appid=" + APIKey + "&units=imperial",
    method: "GET"
  }).then(function(response) {
    $(".firstDay").attr("class", "card card-body");
    $(".cityName").text(response.city.name + "  " + currentDay);
    $(".firstPic").attr("src", "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");
    $(".cityTemp").text("Temperature:  " + response.list[0].temp.day + " °F");
    $(".cityHumidity").text("Humidity:  " + response.list[0].humidity + "%");
    $(".cityWind").text("Wind Speed:  " + response.list[0].speed + " MPH");

    $(".fiveDaysHeader").text("5-Day Forecast: ");

    $(".secondDay").attr("class", "card card-body bg-primary text-white mb-3 ml-4")
    $(".secondDate").text(moment().add(1, 'days').format('MM/DD/YYYY'));
    $(".secondPic").attr("src", "http://openweathermap.org/img/wn/" + response.list[1].weather[0].icon + "@2x.png");
    $(".secondTemp").text("Temp: " + response.list[1].temp.day + " °F");
    $(".secondHumidity").text("Humidity: " + response.list[1].humidity + "%");

    $(".thirdDay").attr("class", "card card-body bg-primary text-white mb-3 ml-4")
    $(".thirdDate").text(moment().add(2, 'days').format('MM/DD/YYYY'));
    $(".thirdPic").attr("src", "http://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png");
    $(".thirdTemp").text("Temp: " + response.list[2].temp.day + " °F");
    $(".thirdHumidity").text("Humidity: " + response.list[2].humidity + "%");

    $(".fourthDay").attr("class", "card card-body bg-primary text-white mb-3 ml-4")
    $(".fourthDate").text(moment().add(3, 'days').format('MM/DD/YYYY'));
    $(".fourthPic").attr("src", "http://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + "@2x.png");
    $(".fourthTemp").text("Temp: " + response.list[3].temp.day + " °F");
    $(".fourthHumidity").text("Humidity: " + response.list[3].humidity + "%");

    $(".fifthDay").attr("class", "card card-body bg-primary text-white mb-3 ml-4")
    $(".fifthDate").text(moment().add(4, 'days').format('MM/DD/YYYY'));
    $(".fifthPic").attr("src", "http://openweathermap.org/img/wn/" + response.list[4].weather[0].icon + "@2x.png");
    $(".fifthTemp").text("Temp: " + response.list[4].temp.day + " °F");
    $(".fifthHumidity").text("Humidity: " + response.list[4].humidity + "%");

    $(".sixthDay").attr("class", "card card-body bg-primary text-white mb-3 ml-4")
    $(".sixthDate").text(moment().add(5, 'days').format('MM/DD/YYYY'));
    $(".sixthPic").attr("src", "http://openweathermap.org/img/wn/" + response.list[5].weather[0].icon + "@2x.png");
    $(".sixthTemp").text("Temp: " + response.list[5].temp.day + " °F");
    $(".sixthHumidity").text("Humidity: " + response.list[5].humidity + "%");

    var lat = response.city.coord.lat;
    var lon = response.city.coord.lon;
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon,
        method: "GET"
      }).then(function(uvResponse) {
        console.log(uvResponse);
        var uvValue = uvResponse.value
        var uvDiv = $("<div>").text(uvValue)
        if (uvValue >= 8) {
          uvDiv.attr("class", "uvDanger")
        } else if (uvValue < 8 && uvValue >= 4) {
          uvDiv.attr("class", "uvMedium")
        } else {
          uvDiv.attr("class", "uvMild")
        }
        $(".cityUv").text("UV Index:  ").append(uvDiv);
      })
  });
}