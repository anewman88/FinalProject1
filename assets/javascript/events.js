var localEventsArray = [];  // create pointer to empty localEvents Array

function getLocalEvents() {
    var queryURL = "https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search/?location.address=DALLAS&start_date.range_start=2019-04-24T00:00:01Z&start_date.range_end=2019-05-31T00:00:01Z&token=H4CT3G2MGSHPWA6SXQIL";
    var apiKey = "H4CT3G2MGSHPWA6SXQIL";


    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            "accept": "application/json",
            "x-requested-with": "xmlhttprequest",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${apiKey}`
        }
    }).then(function (response) {
        var localEventsNumbberOfRows = 10;
        console.log(response);


        for (var i = 0; localEventsNumbberOfRows > i; i++) {

            var startDate = response.events[i].end.local;
            var eventStartDate = GetFormattedDate(startDate);

            var endDate = response.events[i].end.utc;
            var eventEndDate = GetFormattedDate(endDate);

           console.log(eventStartDate);


            // create object of Night
            var localEvents = new Object();

            // Get the needed data from the Eventful response
            localEvents.Name = response.events[i].name.text;
            localEvents.Summary = response.events[i].summary;
            localEvents.Start = eventStartDate;
            localEvents.End = eventEndDate;
            localEvents.Website = response.events[i].url;

            // push the eventFul object into the eventfulArray
            localEventsArray.push(localEvents);
            console.log(localEventsArray[i]);

        }
        updateEventLocalDisplay(localEventsArray);

    });
}

// getLocalEvents();


function updateEventLocalDisplay(inputArray) {
    $("#content-area").html("");

    // Populate the new row of display data
    var newRow = $("<tr>");

    //  name
    var resultDiv = $("<td>");
    resultDiv.text("Event");
    newRow.append(resultDiv);

    // addr
    var resultDiv = $("<td>");
    resultDiv.text("Description");
    newRow.append(resultDiv);

    // phone
    var resultDiv = $("<td>");
    resultDiv.text("Start Date");
    newRow.append(resultDiv);

    // rating
    var resultDiv = $("<td>");
    resultDiv.text("End Date");
    newRow.append(resultDiv);

    // rating
    var resultDiv = $("<td>");
    resultDiv.text("Link");
    newRow.append(resultDiv);

    // list the results in table format
    for (var i = 0; i < inputArray.length; i++) {
        // Populate the new row of display data
        var newRow = $("<tr>");

        //  Name and URL
        var resultDiv = $("<td>");
        resultDiv.html(`<a target="blank" href=${inputArray[i].Website}>${inputArray[i].Name}</a>`);
        resultDiv.attr('_Op')
        //resultDiv.attr("href", inputArray[i].Website);
        newRow.append(resultDiv);

        // Summary
        var resultDiv = $("<td>");
        resultDiv.text(inputArray[i].Summary);
        newRow.append(resultDiv);

        // Start Date
        var resultDiv = $("<td>");
        resultDiv.text(inputArray[i].Start);
        newRow.append(resultDiv);

        // End Date
        var resultDiv = $("<td>");
        resultDiv.text(inputArray[i].End);
        newRow.append(resultDiv);


        // Display the new row
        $("#content-area").append(newRow);
    }  // for

}



function GetFormattedDate(myDate) {
    console.log("myDate = " + myDate);

    var inputDate = new Date(myDate);

    console.log("inputDate = " + inputDate);

    var month = inputDate.getMonth();
    var day = inputDate.getDate();
    var year = inputDate.getFullYear();
    return month + "/" + day + "/" + year;
}



