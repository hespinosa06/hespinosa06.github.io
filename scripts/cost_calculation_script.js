//Declaring constants
const LAVENDER_WEEKDAY_PRICE = 125.00;
const LAVENDER_WEEKEND_PRICE = 150.00;
const SPACE_WEEKDAY_PRICE = 110.00;
const SPACE_WEEKEND_PRICE = 145.00;
const VALETPARK_PRICE = 50.00;
const FRUITBASKET_PRICE = 25.00;
const BASEMENT_PRICE = 75.00;
const PRIVATETRANSPORT_PRICE = 60.00;
const STATE_TAX = 0.085;

//Event listeners to run the function determineTotal
window.addEventListener("load", determineTotal);

document.getElementById("lavenderRoom").onclick = determineTotal;
document.getElementById("spaceRoom").onchange = determineTotal;
document.getElementById("startDate").onchange = determineTotal;
document.getElementById("endDate").onclick = determineTotal;
document.getElementById("valetPark").onclick = determineTotal;
document.getElementById("fruitBasket").onclick = determineTotal;
document.getElementById("basementAccess").onclick = determineTotal;
document.getElementById("privateTrans").onclick = determineTotal;
document.getElementById("resetButton").onclick = determineTotal;

/*determineTotal function calculates all totals*/
function determineTotal(){
    /*Declaring variables, starting with accumulators*/
    let totalRoomCost = 0.00;
    let totalExpansionCost = 0.00;
    let subTotal = 0.00;
    let totalTax = 0.00;
    let total = 0.00;

    /*Now doing bolleans and date values*/
    /*Room Variables*/
    let lavenderRoomSelected = document.getElementById("lavenderRoom").checked;
    let spaceRoomSelected = document.getElementById("spaceRoom").checked;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;

    /*Expansion Variables*/
    let valetParkSelected = document.getElementById("valetPark").checked;
    let fruitBasketSelected = document.getElementById("fruitBasket").checked;
    let basementAccessSelected = document.getElementById("basementAccess").checked;
    let privateTransportSelected = document.getElementById("privateTrans").checked;

    /*Room Total Calculation*/
    if (lavenderRoomSelected) { 
        totalRoomCost = calculateDateRangeCost(
            startDate, 
            endDate, 
            LAVENDER_WEEKDAY_PRICE, 
            LAVENDER_WEEKEND_PRICE
        );
    } else if (spaceRoomSelected) { 
        totalRoomCost = calculateDateRangeCost(
            startDate, 
            endDate, 
            SPACE_WEEKDAY_PRICE, 
            SPACE_WEEKEND_PRICE
        );
    }

    /*Expansion Total Calculation*/
    totalExpansionCost += valetParkSelected ? VALETPARK_PRICE : 0;
    totalExpansionCost += fruitBasketSelected ? FRUITBASKET_PRICE : 0;
    totalExpansionCost += basementAccessSelected ? BASEMENT_PRICE : 0;
    totalExpansionCost += privateTransportSelected ? PRIVATETRANSPORT_PRICE : 0;

    /*Sub Total, total, and tax calculation*/
    subTotal = totalRoomCost + totalExpansionCost
    totalTax = subTotal * STATE_TAX
    total = subTotal + totalTax

    /*Displaying results to the site*/
    document.getElementById("roomCost").innerHTML = "Cost for room: $" + totalRoomCost.toFixed(2);
    document.getElementById("expansionCost").innerHTML = "Cost of expansinons: $" + totalExpansionCost.toFixed(2);
    document.getElementById("subTotal").innerHTML = "Subtotal: $" + subTotal.toFixed(2);
    document.getElementById("tax").innerHTML = "Tax: $" +totalTax.toFixed(2);
    document.getElementById("total").innerHTML = "Overall cost: $" +total.toFixed(2);
}

/*Used a bit of AI here to figure out javascript arguments properly.
Also used it a bit to help with debugging.*/
function calculateDateRangeCost(startDateStr, endDateStr, weekdayPrice, weekendPrice) {
    let cost = 0;
    
    //Converts the string that is grabed to a date locally here
    //Ai recomend that "Appending 'T00:00:00' prevents timezone shifting issues with HTML date inputs"
    let currentDate = new Date(startDateStr + 'T00:00:00');
    let endDate = new Date(endDateStr + 'T00:00:00');

    //Simple data validation check
    if (isNaN(currentDate) || isNaN(endDate) || currentDate >= endDate) {
        return 0; 
    }

    //Loop through each night until we hit the checkout date
    while (currentDate < endDate) {
        // .getDay() is a built in function that returns a numeric value for a day, starting with sunday at 0
        let dayOfWeek = currentDate.getDay();
        
        //Check if it is Sunday (0) or Saturday (6)
        let isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);

        if (isWeekend) {
            cost += weekendPrice;
        } else {
            cost += weekdayPrice;
        }

        //Move the loop forward by exactly 1 day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return cost;
}

//Will always run when the page loads
//Another set of lines I used AI to solve an issue I had
let today = new Date();
let year = today.getFullYear();
/*AI Clarified to me that:
"JavaScript months are 0-indexed (January is 0), so we add 1. 
.padStart(2, '0') ensures months like '4' become '04' to match HTML's required format."*/
let month = String(today.getMonth() + 1).padStart(2, '0'); 
let day = String(today.getDate()).padStart(2, '0');

//HTML uses year-month-day format, learned this from my mistakes :p
let formattedToday = `${year}-${month}-${day}`;

//Changes the min attribute
document.getElementById("startDate").min = formattedToday;
document.getElementById("endDate").min = formattedToday;