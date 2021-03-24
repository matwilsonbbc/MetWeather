const readline = require("readline-sync");
var got = require("got");
var location = [];
var weather;
var foundLocation = location;
var prettyWeather = require("./prettyWeather.js");
//import getWeather

//Ask user for input, read user location inpit
function displayMenuGetInput() {
  console.log("Please enter your location:");
  const userLocation = readline.prompt();
  return userLocation;
}

//Converts response to json
var options = {
  responseType: "json",
};

//Retrieves all locations from API and outputs location information based on user input
let siteList = got("http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=a0032f60-f816-4c7e-973a-b2adff757c84", options)

siteList.then(response => {
  location = response.body.Locations.Location;
  // console.log(location)

  let userLocation = displayMenuGetInput();
  // let foundLocation = null;

  for (let i = 0; i < location.length; i++) {
    if (userLocation == location[i].name) {
      console.log("Location found");
      foundLocation = location[i];
    }
  }

  if (foundLocation == null) {
    console.log("Location not found");
  } else {
    console.log(foundLocation);
  }

  let weather = getWeather(foundLocation);


})

// let weather1 = getWeather.userWeather
// console.log(foundLocation.userWeather)
function displayMenuforWeather() {
  console.log("Please enter weather details:");
  const userWeather = readline.prompt();
  return userWeather;
}


function printWeather(weather) {
  for (let key in weather) {
    console.log(prettyWeather[key] + ' ' + weather[key]);
  }
  var realTime = (weather.$ / 60).toFixed(2)
  console.log(realTime)

  // let hours = realTime / 60;
  // let minutes = (realTime % 60).toFixed(2);

  // console.log(hours + ':' + minutes)
}

//Inputs location id into API URL and returns weather
function getWeather(foundLocation) {
  got(
    `http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${foundLocation.id}?res=3hourly&key=a0032f60-f816-4c7e-973a-b2adff757c84`,
    options
  ).then((response) => {
    let weather = response.body.SiteRep.DV.Location.Period[0].Rep[0];
    printWeather(weather)
console.log(response.body.SiteRep.DV.Location)
  }).catch(err => {
    console.log('Ooops')
  });

}