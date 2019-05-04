//********************************************************************
//  function SelectCity() - Event handler for dropdown menu selection
//  The purpose of this function is to determine which city was selected
//  from the dropdown menu, set the CurrentCity global variable and 
//  display the current weather widget for the selected city
//********************************************************************
function SelectCity(inputCity) {
  if (DebugOn) console.log("In SelectCity " + inputCity);
  
  CurrentCity = inputCity;
  
  // Find the city in the CityList Array and set needed info
  
  for (i=0; i<CityList.length;i++){
    if (CityList[i].Name === CurrentCity) {
      ZomCityID = CityList[i].ZomID;   // set the Zomato City ID
    }  // if
  }  // for 

  DisplayCityBanner (CurrentCity);
//  DisplayWeather (CurrentCity);
}  // function SelectCity()

//********************************************************************
//  function DisplayCityBanner() - 
//  The purpose of this function is to display the current city
//  picture and "button" for the CurrentCity global variable
//********************************************************************
function DisplayCityBanner(City, Index) {

  // display the city button image  

  var CityLogoDiv = $("#logo");
  var CityPicStr = "assets/images/"+ City+".png";
  if (City === "Dallas")  /* this one has a different picture type */
     CityPicStr = "assets/images/"+ City+".jpg";
  var BackgroundStr = "url('" + CityPicStr + "')";

  if (DebugOn) console.log ("In DisplayCityBanner logo is:" + "assets/images/"+ City+"Logo.png");
  if (DebugOn) console.log ("In DisplayCityBanner background is:" + BackgroundStr);
  
  CityLogoDiv.attr("src", "assets/images/"+ City+"Logo.png");
  $('.jumbotron').css('background-image', BackgroundStr);

  //  Clear the screen when a new city is selected
  $("#content-area").html("");
  $("#content-area").css("src", "url('assets/images/image002.png')");
  
 }  // function DisplayCityBanner()
 

//********************************************************************
//  function DisplayWeather() - 
//  The purpose of this function is to display the current weather
//  widget for the CurrentCity global variable
//********************************************************************
function DisplayWeather(City, Index) {

  var WeatherWidgetDiv = $("<div>");

    
 }  // function DisplayWeather()
 
//********************************************************************
//  function getFood(Category) - Event handler for dropdown menu selection
//  The purpose of this function is to do an API Ajax Query for the input
//  Category for the global variable CurrentCity. Once the data comes back the 
//  appropriate data is parsed from the JSON and entered into the FoodArray
//  which is sent to function UpdateResultDisplay().  
//********************************************************************
function getFood(Category) {

if (DebugOn) console.log ("In getFood: " + CurrentCity + "," + Category);

// Assign the Zomamto CuisineID based on the input Category
var CuisineID = "1";  // default to American
switch (Category) {
 case "American" : 
   CuisineID = "1";
   break;
 case "Asian" : 
   CuisineID = "3";
   break;
 case "BBQ" : 
   CuisineID = "193";
   break;
 case "Italian" : 
   CuisineID = "55";
   break;
 case "Mexican" : 
   CuisineID = "73";
   break;
 default :
}  // switch (Category)

//var ZomatoAPIKey = "8361db6e811b9639f3fbd799b81695b0";   // Zomato API key

// Build the URL needed to query the database
var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
              "city_id=" + ZomCityID + "&count=" + FoodLimit + 
              "&cuisines=" + CuisineID + "&category=2&sort=rating&order=desc";
                    
// ajax Query with the cityName and Category
$.ajax({  
   url: queryURL,
   dataType: 'json',
   async: true,
   beforeSend: function(xhr){
     xhr.setRequestHeader('user-key', ZomatoAPIKey); // Insert the api key into the HTTP header        
   },  // ajax response
   success: function(response) { // after response from query
       var numResults = response.results_shown;
       var FoodArray = [];  // create pointer to empty FoodArray

       // One by one fill the FoodArray with the response data 
       for (i = 0; i < numResults; i++) {

           // create object of Food
           var Food = new Object();

           // Get the needed data from the Zomato response
           Food.Name = response.restaurants[i].restaurant.name;
           Food.Addr = response.restaurants[i].restaurant.location.address;
           Food.Phone = "NA";
           Food.Rate = response.restaurants[i].restaurant.user_rating.aggregate_rating;
           Food.Website = response.restaurants[i].restaurant.url;

           // push the Food object into the FoodArray 
           FoodArray.push(Food);
       }  // for 

       // Display the data on Food Page
       UpdateResultDisplay(FoodArray, CurrentCity, Category);
    }   //ajax response
});  // .ajax() function call

}  // function getFood (Category)

//******************************************************************************
//  function getNight(Category) - Event handler for dropdown menu selection
//  The purpose of this function is to do an API Ajax Query for the input
//  Category for the global variable CurrentCity.  Once the data comes back the 
//  appropriate data is parsed from the JSON and entered into the NightArray
//  which is sent to function UpdateResultDisplay().  
//*******************************************************************************
function getNight(Category) {

  if (DebugOn) console.log ("In getNight: " + CurrentCity + "," + Category);
  
  var CuisineID = "1";      // default to American
  var CollectionID = "55";  // default to Live Music
  var CategoryID = "11";    // default to Clubs & Lounges
  
  // Assign the Zomamto ID tags and urlQuery based on the input Category
  switch (Category) {
  case "Sports Bars" : 
      CollectionID = "15";
      var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
              "city_id=" + ZomCityID + "&count=" + NightLimit + 
              "&collection=" + CollectionID + "&sort=rating&order=desc";
      break;
  case "Craft Beer" : 
      CollectionID = "41";
      var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
              "city_id=" + ZomCityID + "&count=" + NightLimit + 
              "&collection=" + CollectionID + "&sort=rating&order=desc";
      break;
  case "Live Music" : 
      CollectionID = "55";
      var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
              "city_id=" + ZomCityID + "&count=" + NightLimit + 
              "&collection=" + CollectionID + "&sort=rating&order=desc";
      break;
  case "Clubs & Lounges" : 
      CategoryID = "14";
      EstablishmentID = "8"
      var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
              "city_id=" + ZomCityID + "&count=" + NightLimit + 
              "&establishment_type=" + EstablishmentID +
              "&category=" + CategoryID + "&sort=rating&order=desc";
      break;
  case "Wine Bar" : 
      EstablishmentID = "278"
      var queryURL = "https://developers.zomato.com/api/v2.1/search?" +
              "city_id=" + ZomCityID + "&count=" + NightLimit + 
              "&establishment_type=" + EstablishmentID +
              "&sort=rating&order=desc";
      break;
  default :
      CollectionID = "73";
      break;
  }  // switch (Category)
  
  //var ZomatoAPIKey = "8361db6e811b9639f3fbd799b81695b0";   // Zomato API key
  
  // ajax Query with the cityName and Category
  $.ajax({  
      url: queryURL,
      dataType: 'json',
      async: true,
      beforeSend: function(xhr){
        xhr.setRequestHeader('user-key', ZomatoAPIKey); // Insert the api key into the HTTP header        
   },  // ajax response
   success: function(response) { // after response from query
       var numResults = response.results_shown;
       var NightArray = [];  // create pointer to empty NightArray
  
       // One by one fill the NightArray with the response data 
       for (i = 0; i < numResults; i++) {
  
           // create object of Night
           var Night = new Object();
  
           // Get the needed data from the Zomato response
           Night.Name = response.restaurants[i].restaurant.name;
           Night.Addr = response.restaurants[i].restaurant.location.address;
           Night.Phone = "NA";
           Night.Rate = response.restaurants[i].restaurant.user_rating.aggregate_rating;
           Night.Website = response.restaurants[i].restaurant.url;
  
           // push the Night object into the NightArray 
           NightArray.push(Night);
       }  // for 
//       if (DebugOn) console.log ("NightArray:", NightArray);
//       if (DebugOn) console.log(response);
  
       // Display the data on Night Page
       UpdateResultDisplay(NightArray, CurrentCity, Category);
    }   //ajax response
  });  // .ajax() function call
}  // function getNight (Category)
  
//********************************************************************
//  function UpdateResultDisplay (inputArray)
//  The purpose of this function is display the contents of the inputArray
//  on the Food Page
//********************************************************************
function UpdateResultDisplay (inputArray, City, Category) {
  if (DebugOn) console.log ("In UpdateResultDisplay(): ", inputArray);

  $("#content-area").html("");
  // Populate the new row of display data
  var newRow = $("<tr>");

  //  name
  var resultDiv = $("<td>");
  resultDiv.text("Name");
  newRow.append(resultDiv);

  // addr
  var resultDiv = $("<td>");
  resultDiv.text("Address");
  newRow.append(resultDiv);

  // phone
  var resultDiv = $("<td>");
  resultDiv.text("Phone Number");
  newRow.append(resultDiv);

  // rating
  var resultDiv = $("<td>");
  resultDiv.text("Rating");
  newRow.append(resultDiv);

  // Display the new row
  $("#content-area").append(newRow);

  // list the results in table format
  for (var i = 0; i < inputArray.length; i++)  {
    // Populate the new row of display data
    var newRow = $("<tr>");

    //  name
    var resultDiv = $("<td>");
    resultDiv.html(`<a href=${inputArray[i].Website}>${inputArray[i].Name}</a>`);
    //resultDiv.attr("href", inputArray[i].Website);
    newRow.append(resultDiv);

    // addr
    var resultDiv = $("<td>");
    resultDiv.text(inputArray[i].Addr);
    newRow.append(resultDiv);

    // phone
    var resultDiv = $("<td>");
    resultDiv.text(inputArray[i].Phone);
    newRow.append(resultDiv);

    // rating
    var resultDiv = $("<td>");
    resultDiv.text(inputArray[i].Rate);
    newRow.append(resultDiv);

    // Display the new row
    $("#content-area").append(newRow);
  }  // for

}  // UpdateResultDisplay (inputArray, City, Category)

//******************************************************************************
//  function getThings(Category) - Event handler for dropdown menu selection
//  The purpose of this function is to do an API Ajax Query for the input
//  Category for the global variable CurrentCity.  Once the data comes back the 
//  appropriate data is parsed from the JSON and entered into the NightArray
//  which is sent to function UpdateResultDisplay().  
//*******************************************************************************
function getThings(Category) {

if (DebugOn) console.log ("In getYelp: " + CurrentCity + "," + Category);

//var YelpAPIKey = "2OmLWmtreHVEweRgkciRyyxorN-DnYkyTD4bmsrycQHjbI2XxTZAm8DKGZLwwvbVbuGIkUR1-Af8Olwv3WHEBdN396aBLUZBSEs69f62GUCBgDeJ9L5h9CAf6WG-XHYx";   // Yelp API key

// Build the URL needed to query the database
var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/" +
            "businesses/search?location="+CurrentCity+"&limit=10&term="+Category +
            "&sort_by=rating&order=desc";

$.ajax({
     url: queryURL,
     method: "GET",
     headers: {
         "accept": "application/json",
         "x-requested-with": "xmlhttprequest",
         "Access-Control-Allow-Origin":"*",
         "Authorization": `Bearer ${YelpAPIKey}`
     }
 }).then(function(response) {
     var NightArray = [];  // create pointer to empty FoodArray

     // One by one fill the FoodArray with the response data 
     for (i = 0; i < NightLimit; i++) {

         // create object of Food
         var Night = new Object();

         // Get the needed data from the Yelp response
         Night.Name = response.businesses[i].name;
         Night.Addr = response.businesses[i].location.display_address;
         Night.Phone = response.businesses[i].phone;
         Night.Rate = response.businesses[i].rating;
         Night.Website = response.businesses[i].url;

         // push the Night object into the NightArray 
         NightArray.push(Night);
     }  // for 
     console.log ("NightArray:", NightArray);
     console.log(response);

     // Display the data on Night Page
     UpdateResultDisplay(NightArray, CurrentCity, Category);

     if (DebugOn) console.log(businesses);
 });  // ajax function call
}  // function getThings (Category)

//********************************************************************
//  function CreateCityDropDown - 
//  The purpose of this function is to read the list of cities from
//  the CityList array and create a dynamic drop down list of cities
//********************************************************************
function CreateCityDropdown() {

  for (i=0; i<CityList.length; i++) {
      var curCity = CityList[i].Name;
      if (DebugOn) console.log ("curCity: "+curCity);
      var newButton = $("<option>");
      newButton.html(`<a value=${curCity}>${curCity}</a>`);
      $("#CityDropDown").append(newButton);
  }  // for

}  // function CreateCityDropdown()

//********************************************************************
//  function CreateCityDropDown - 
//  The purpose of this function is to read the list of cities from
//  the city database and dynamically create a CityList array.
//  It then calls CreateCityDropdown() to create dropdown list
//********************************************************************
function GetCitiesFromDB() {

  // For each of the items in the database update the CityList array
  var query = firebase.database().ref().orderByKey();
  query.once("value")
      .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {

              var key = childSnapshot.key;
              // childData will be the actual contents of the child
              var childData = childSnapshot.val();
             
              var City = {};  // Create a new City Object
              City.Name = childData.CityName;
              City.ZomID = childData.CityZomID;

              // push the City object into the CityList 
              CityList.push(City);
          });   // snapshot 

          // Make sure the CityList populated correctly from database
          if (CityList.length === 0) {  // did not populate correctly;
            CityList = DefaulCityList;
          }
          //  Create the City DropDown list
          CreateCityDropdown();
      });  // query 

}  // GetCitiesFromDB()

//********************************************************************
//  function validateEmail(email))
//  The purpose of this function is to verify that the input email 
//  address (in a string) is in a valid email format.
//********************************************************************
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}  // function validateEmail(email)


$(document).ready(function() {

  if (DebugOn) console.log ("Beginning Document ready funtion");

//******************************************************************************
// Initial execution of page will initialize the Firebase Database and 
// dynamically create the Cities dropdown list
//****************************************************************************
  // Initialize Firebase City Database
  var cityconfig = {
    apiKey: "AIzaSyBBIs52NALDi2rUuz2oCT-Iavtxxow6AmI",
    authDomain: "whdb-cb29a.firebaseapp.com",
    databaseURL: "https://whdb-cb29a.firebaseio.com",
    projectId: "whdb-cb29a",
    storageBucket: "whdb-cb29a.appspot.com",
    messagingSenderId: "642856253130"
  };
  firebase.initializeApp(cityconfig);
  
  // Create a variable to reference the city database
  var CityDB = firebase.database(); // pointer to datbase
  
  if (DebugOn) console.log("After dbase init");
  
  // read the cities from the database and create the dropdown menu
  GetCitiesFromDB();
  
  if (DebugOn) console.log("After building City pulldown menu");
  
  //********************************************************************
//  function - Event handler for user clicking newsletter Submit button
//  The purpose of this function is to verify that the input email 
//  address (in a string) is in a valid email format.
//********************************************************************
$("#submitBtn").on("click", function(event) {
  if (DebugOn) console.log("in submit event handler");

  // Preventing the button from trying to submit the form
  event.preventDefault();

  // Get the input name and email
  var inputName = $("#usrName").val().trim();
  var inputEmail = $("#usrEmail").val().trim();

  var $result = $("#usrMsg");

  // Check for valid name
  if (inputName === "") {    // invalid name
    $result.text("A name must be entered.");
    $result.css("color", "red");
  } else {      // Name field is valid, now check email field
      // Check for valid email addr
      if (inputEmail === "") {  // no email address entered
        $result.text("An email address must be entered.");
        $result.css("color", "red");
      }
      else if (validateEmail(inputEmail)) {    // email is valid
        // Clear the form fields
        document.getElementById("usrForm").reset();

        // Display success message
        $result.text(inputEmail + " is valid. Thanks for signing up, "+ inputName +"!");
        $result.css("color", "green");

        // both the input name and email address are valid
        // write the information to the database

      } 
      else {      // not valid email - needs to be corrected and submitted

        $result.text(inputEmail + " is not a valid email address.  Please correct and re-enter");
        $result.css("color", "red");
      }  // if (validateEmail(inputEmail))

  }  // if (inputName === "")
  
});  // event handler function for submit button


//********************************************************************
//  function - Event handler for user clicking Newsletter button
//  The purpose of this function is to invoke the Newsletter signup
//  modal popup box.
//********************************************************************
$("#myBtn").click(function(){
  
  // Clear the display area

  // Clear the form fields and user message area
  document.getElementById("usrForm").reset();
  $("#usrMsg").text("");
  
  if (DebugOn) console.log ("in myBtn click");
  
  $("#newsModal").modal();

  if (DebugOn) console.log ("after modal box");

});  //  $("#newsBtn").click(function()

// Get the modal
var modal = document.getElementById('NewsModal');

// Get the button that opens the modal
var Newsbtn = document.getElementById("newsBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
Newsbtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

});  // $(document.body).ready(function()
