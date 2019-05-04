// Global Variable Definitions
var ThingsLimit = 10;        
var FoodLimit = 10;
var NightLimit = 10;
var CurrentCity = "Dallas";  // assign a starting or default City
var ZomCityID = "276";       // assign a starting or default City
var CityList = [];           // create pointer to empty CityArray
var ZomatoAPIKey = "8361db6e811b9639f3fbd799b81695b0";   // Ann's Zomato API key
var YelpAPIKey = "2OmLWmtreHVEweRgkciRyyxorN-DnYkyTD4bmsrycQHjbI2XxTZAm8DKGZLwwvbVbuGIkUR1-Af8Olwv3WHEBdN396aBLUZBSEs69f62GUCBgDeJ9L5h9CAf6WG-XHYx";   // Ann's Yelp API key

var DebugOn = true;


//********************************************************************************
// Things To Do Object Definition
var Things = {
    Name: "",    // string - name of place
    Addr: "",    // string - physical location of place
    Phone: "",   // string - phone number of place
    Rate: "",    // string - rating of place
    Website: ""  // string - url of website
};

// Food Object Definition
var Food = {
    Name: "",    // string - name of place
    Addr: "",    // string - physical location of place
    Phone: "",   // string - phone number of place
    Rate: "",    // string - rating of place
    Website: ""  // string - url of website
};
 
// Night Life Object Definition  
var Night = {
    Name: "",    // string - name of place
    Addr: "",    // string - physical location of place
    Phone: "",   // string - phone number of place
    Rate: "",    // string - rating of place
    Website: ""  // string - url of website
};

// City List Database Object Definition
var City = {
    Name: "",
    ZomID: ""
};

var DefaultCityList = [
    {Name: "Dallas",
     ZomId: "276"},
     {Name: "Houston",
     ZomId: "277"},
     {Name: "New York",
     ZomId: "280"},
     {Name: "Chicago",
     ZomId: "292"},
     {Name: "Los Angeles",
     ZomId: "281"}
];




