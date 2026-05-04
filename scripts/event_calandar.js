//Declaring a set of arrays
//Dates on the calendar
let eventDates = ["02/01/2026", "02/02/2026", "02/03/2026", "02/04/2026", "02/05/2026", "02/06/2026", "02/07/2026",
    "02/08/2026", "02/09/2026", "02/10/2026", "02/11/2026", "02/12/2026", "02/13/2026", "02/14/2026",
    "02/15/2026", "02/16/2026", "02/17/2026", "02/18/2026", "02/19/2026", "02/20/2026", "02/21/2026",
    "02/22/2026", "02/23/2026", "02/24/2026", "02/25/2026", "02/26/2026", "02/27/2026", "02/28/2026"]
//Name of events and their times
let eventNames = ["none", "Star Gazing", "Kareoke @ Bar", "Public Kart Racing", "Profesional Kart Racing"]
let eventTimes = ["none", "10pm to 12am", "7pm to 10pm", "8am to 5pm", "1pm to 4pm"]

//Name and time index relation to the index of eventDates
let name_timeDateIndex = [3, 2, 0, 0, 1, 4, 4,
    0, 2, 1, 1, 0, 3, 3,
    4, 1, 3, 3, 0, 2, 0,
    0, 2, 0, 1, 1, 3, 4]

//Event to run the function upon page load
window.addEventListener("load", populateCalendar)

//This populates the calendar using the arrays
function populateCalendar(){
    for (let i = 0; i < eventDates.length; i++){
        let calendarData = "";

        calendarData += "<h3>" + eventDates[i] + "</h3>";

        if (name_timeDateIndex[i] === 1){
            calendarData += "<p><br>" + eventNames[1];
            calendarData += "<br>" + eventTimes[1];
        }
        else if (name_timeDateIndex[i] === 2){
            calendarData += "<p><br>" + eventNames[2];
            calendarData += "<br>" + eventTimes[2];
        }
        else if (name_timeDateIndex[i] === 3){
            calendarData += "<p><br>" + eventNames[3];
            calendarData += "<br>" + eventTimes[3];
        }
        else if (name_timeDateIndex[i] === 4){
            calendarData += "<p><br>" + eventNames[4];
            calendarData += "<br>" + eventTimes[4];
        }
        else{
            calendarData += "<p><br> Nothing";
            calendarData += "<br> N/A";
        }

        calendarData += "</P>";

        let tableCell = document.getElementById(eventDates[i]);
        tableCell.insertAdjacentHTML("beforeend", calendarData);
    }
}