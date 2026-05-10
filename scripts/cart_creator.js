//Creating a submit button that moves the user to the next page
let submitButton = document.createElement("button");
submitButton.innerText = "Continue to shipping";
submitButton.id = "submitButton";
submitButton.type = "button";
submitButton.disabled = true; //Disabled by default
submitButton.onclick = function(){
    saveNewCart();
}

//Creating a back button that moves the user back to the store front
let backButton = document.createElement("button");
backButton.innerText = "Continue shopping";
backButton.id = "backButton";
backButton.type = "button";
backButton.onclick = function(){
    window.location.href = "storefront.html";
}

//Appending both buttons to a set button div in the HTML code
document.getElementById("buttons").appendChild(submitButton);
document.getElementById("buttons").appendChild(backButton);

//Checking and showing a message if the cart is empty
if (localStorage.length === 0){
    let emptyCart = document.createElement("h2");
    emptyCart.innerText = "Looks like your cart is empty\n:p";
    document.getElementById("cartItems").appendChild(emptyCart);
}
else{
    //Title for the cart
    let titleCart = document.createElement("h2");
    titleCart.className = "cartTitle";
    titleCart.innerText = "Your Items";
    document.getElementById("cartItems").appendChild(titleCart);
    
    //Form creation based on each item in storage
    //Form and subtotal containers are first
    let formContainer = document.createElement("form");
    let subtotalContainer = document.createElement("div");
    subtotalContainer.className = "subTotals";
    document.getElementById("totals").appendChild(subtotalContainer);
    document.getElementById("cartItems").appendChild(formContainer);
    
    //subtotal, tax, and total is appended and created to the subtotalContainer
    let subText = document.createElement("p");
    subText.id = "cartSubtotal";
    subText.className = "finalSubtotal";
    
    let taxText = document.createElement("p");
    taxText.id = "cartTax";
    taxText.className = "tax";
    
    let totalText = document.createElement("p");
    totalText.id = "cartTotal";
    totalText.className = "finalTotal";
    
    subtotalContainer.appendChild(subText);
    subtotalContainer.appendChild(taxText);
    subtotalContainer.appendChild(totalText);

    /*
    Okay so this decision structure is a bit complex, kinda due to the help of AI
    I'll try to break this down for you
    */
    let cartKeys = Object.keys(localStorage).filter(key => key.startsWith("Item")); //Here we are grabbing an array of actual valid keys
    for (let index = 0; index < cartKeys.length; index++){
        let currentKey = cartKeys[index]; //Setting it as our current key
        let i = currentKey.replace("Item", ""); //i becomes an identifier taken by a part of the key
        
        //Item container is made
        let itemContainer = document.createElement("div");
        itemContainer.id = "item" + i;
        
        //Now a unique item can be made since we have a valid current key
        let uniqueItem = JSON.parse(localStorage.getItem(currentKey));

        //Form container is made
        formContainer.appendChild(itemContainer);
        if (uniqueItem[0] === "Branded Shirt"){
            //Item label
            let itemLabel = document.createElement("label");
            itemLabel.innerText = uniqueItem[0];
            itemLabel.htmlFor = uniqueItem[0] + i;
            itemContainer.appendChild(itemLabel);
            //Item price
            let itemSubPrice = document.createElement("p");
            itemSubPrice.id = "subtotal" + i;
            itemSubPrice.innerText = fetchShirtPrice(uniqueItem[1]);
            itemContainer.appendChild(itemSubPrice);
            //Size picker and label
            let sizeLabel = document.createElement("label");
            sizeLabel.innerText = "Size";
            sizeLabel.htmlFor = "Size" + i;
            itemContainer.appendChild(sizeLabel);
            let sizePicker = document.createElement("select");
            sizePicker.name = "Size" + i;
            sizePicker.onchange = function(){
                //For loop to add dynamic(ish) pricing
                for (let n = 0; n < shirtSizes.length; n++){
                    if (sizePicker.value === "XXL" || sizePicker.value === "XXXL" || sizePicker.value === "XXXXL"){
                        itemSubPrice.innerText = "Price of each: $" + uniqueItem[3][1];
                    }
                    else{
                        itemSubPrice.innerText = "Price of each: $" + uniqueItem[3][0];
                    }
                }
                //Running calculateTotals afterwards
                calculateTotals();
            }
            //Redefining the valid options
            for(let f = 0; f< shirtSizes.length; f++){
                let pickerOption = document.createElement("option");
                pickerOption.value = shirtSizes[f];
                pickerOption.innerText = shirtSizes[f];
                sizePicker.appendChild(pickerOption);
            }
            sizePicker.value = uniqueItem[1];
            itemContainer.appendChild(sizePicker);
            //Color label and picker
            let colorLabel = document.createElement("label");
            colorLabel.for = "color"+i;
            colorLabel.innerText = "Color";
            itemContainer.appendChild(colorLabel);
            let colorPicker = document.createElement("select");
            colorPicker.id = "color"+i;
            colorPicker.name = "color"+i;
            itemContainer.appendChild(colorPicker);
            //Redefining the valid options
            for(let i = 0; i< shirtColors.length; i++){
                let pickerOption = document.createElement("option");
                pickerOption.value = shirtColors[i];
                pickerOption.innerText = shirtColors[i];
                colorPicker.appendChild(pickerOption);
            }
            colorPicker.value = uniqueItem[2];
            //Shirt gender picker and label
            let genderLabel = document.createElement("label");
            genderLabel.for = "gender" + i;
            genderLabel.innerText = "Gender";
            itemContainer.appendChild(genderLabel);
            let genderPicker = document.createElement("select");
            genderPicker.id = "genderPicker" + i;
            genderPicker.name = "gender" + i;
            itemContainer.appendChild(genderPicker);
            //Redefining the valid options
            for(let i = 0; i< shirtGenders.length; i++){
                let pickerOption = document.createElement("option");
                pickerOption.value = shirtGenders[i];
                pickerOption.innerText = shirtGenders[i];
                genderPicker.appendChild(pickerOption);
            }
            genderPicker.value = uniqueItem[5];
            //Quantity selector
            let quantityPicker = document.createElement("input");
            quantityPicker.type = "number";
            quantityPicker.id = "number"+i;
            quantityPicker.name = "quantity"+i;
            quantityPicker.min = "1";
            quantityPicker.value = uniqueItem[4];
            quantityPicker.onchange = function() {
                calculateTotals(); //Running calculateTotals anytime this is changed
            };
            let quantityLabel = document.createElement("label");
            quantityLabel.htmlFor = "quantity"+i;
            quantityLabel.innerText = "Quantity";
            itemContainer.appendChild(quantityLabel);
            itemContainer.appendChild(quantityPicker);

            //Remove button
            let removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.id = "remove" + i;
            removeButton.innerText = "Remove Item";
            removeButton.onclick = function(){
                localStorage.removeItem("Item" + i); 
                window.location.reload(); //Reloading the page just seemed easier
            }
            itemContainer.appendChild(removeButton);

            let divider = document.createElement("hr");
            divider.className = "itemDivider";
            itemContainer.appendChild(divider);
        }
        //Universal for all but shirts sadly
        else{
            //Item label
            let itemLabel = document.createElement("label");
            itemLabel.innerText = uniqueItem[0];
            itemLabel.htmlFor = uniqueItem[0] + i;
            itemContainer.appendChild(itemLabel);
            //Item price
            let itemSubPrice = document.createElement("p");
            itemSubPrice.id = "subtotal" + i;
            itemSubPrice.innerText = fetchPrice(uniqueItem[1], uniqueItem[0]);
            itemContainer.appendChild(itemSubPrice);
            //Size picker and label
            let sizeLabel = document.createElement("label");
            sizeLabel.innerText = "Size";
            sizeLabel.htmlFor = "Size" + i;
            itemContainer.appendChild(sizeLabel);
            let sizePicker = document.createElement("select");
            sizePicker.name = "Size" + i;
            sizePicker.onchange = function(){
                itemSubPrice.innerText = fetchPrice(sizePicker.value, uniqueItem[0])
            calculateTotals();};

            //Decision structure to give valid options for each item that we have
            if (uniqueItem[0] === items[0]){
                for(let f = 0; f< pictureSizes.length; f++){
                let pickerOption = document.createElement("option");
                pickerOption.value = pictureSizes[f];
                pickerOption.innerText = pictureSizes[f];
                sizePicker.appendChild(pickerOption);
                }
            }
            else if (uniqueItem[0] === items[1]){
                for(let f = 0; f< flowerSizes.length; f++){
                let pickerOption = document.createElement("option");
                pickerOption.value = flowerSizes[f];
                pickerOption.innerText = flowerSizes[f];
                sizePicker.appendChild(pickerOption);
                }
            }
            else if (uniqueItem[0] === items[2]){
                for(let f = 0; f< fruitSizes.length; f++){
                let pickerOption = document.createElement("option");
                pickerOption.value = fruitSizes[f];
                pickerOption.innerText = fruitSizes[f];
                sizePicker.appendChild(pickerOption);
                }
            }
            else if (uniqueItem[0] === items[4]){
                for(let f = 0; f< stickerSizes.length; f++){
                let pickerOption = document.createElement("option");
                pickerOption.value = stickerSizes[f];
                pickerOption.innerText = stickerSizes[f];
                sizePicker.appendChild(pickerOption);
                }
            }
            else if (uniqueItem[0] === items[5]){
                for(let f = 0; f< lolipopSizes.length; f++){
                let pickerOption = document.createElement("option");
                pickerOption.value = lolipopSizes[f];
                pickerOption.innerText = lolipopSizes[f];
                sizePicker.appendChild(pickerOption);
                }
            }
            sizePicker.value = uniqueItem[1];
            itemContainer.appendChild(sizePicker);
            if (uniqueItem[0] === items[0]){
                //Picture picker
                let pictureLabel = document.createElement("label");
                pictureLabel.for = "color"+i;
                pictureLabel.innerText = "Picture";
                itemContainer.appendChild(pictureLabel);
                let picturePicker = document.createElement("select");
                picturePicker.id = "color"+i;
                picturePicker.name = "color"+i;
                itemContainer.appendChild(picturePicker);
                for(let i = 0; i< pictureOptions.length; i++){
                    let pickerOption = document.createElement("option");
                    pickerOption.value = pictureOptions[i];
                    pickerOption.innerText = pictureOptions[i];
                    picturePicker.appendChild(pickerOption);
                }
                picturePicker.value = uniqueItem[2];
            }
            //Quantity selector
            let quantityPicker = document.createElement("input");
            quantityPicker.type = "number";
            quantityPicker.id = "number"+i;
            quantityPicker.name = "quantity"+i;
            quantityPicker.min = "1";
            quantityPicker.value = uniqueItem[4];
            quantityPicker.onchange = function() {
                calculateTotals();
            };
            let quantityLabel = document.createElement("label");
            quantityLabel.htmlFor = "quantity"+i;
            quantityLabel.innerText = "Quantity";
            itemContainer.appendChild(quantityLabel);
            itemContainer.appendChild(quantityPicker);

            //Remove button
            let removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.id = "remove" + i;
            removeButton.innerText = "Remove Item";
            removeButton.onclick = function(){
                localStorage.removeItem("Item" + i); 
                window.location.reload(); 
            }
            itemContainer.appendChild(removeButton);

            let divider = document.createElement("hr");
            divider.className = "itemDivider";
            itemContainer.appendChild(divider);
        }
    }
    submitButton.disabled = false;
    calculateTotals();
}

function fetchPrice(size, name){
    if (name === items[0]){
        for (let n = 0; n < pictureSizes.length; n++){
            if (size === pictureSizes[n]){
                return "Price of each: $" + picturePrice[n];
            } else {continue;}
        }
    }
    if (name === items[1]){
        for (let n = 0; n < flowerSizes.length; n++){
            if (size === flowerSizes[n]){
                return "Price of each: $" + flowerPrice[n];
            } else {continue;}
        }
    }
    if (name === items[2]){
        for (let n = 0; n < fruitSizes.length; n++){
            if (size === fruitSizes[n]){
                return "Price of each: $" + fruitPrice[n];
            } else {continue;}
        }
    }
    if (name === items[4]){
        for (let n = 0; n < stickerSizes.length; n++){
            if (size === stickerSizes[n]){
                return "Price of each: $" + stickerPrice[n];
            } else {continue;}
        }
    }
    if (name === items[5]){
        for (let n = 0; n < lolipopSizes.length; n++){
            if (size === lolipopSizes[n]){
                return "Price of each: $" + lolipopPrice[n];
            } else {continue;}
        }
    }
}

function fetchShirtPrice(size){
    for (let n = 0; n < shirtSizes.length; n++){
        if (size === shirtSizes[n]){
            if (size === "XXL" || size === "XXXL" || size === "XXXXL"){
                return "Price of each: $" + shirtPrice[1];
            }
            else{
                return "Price of each: $" + shirtPrice[0];
            }
        }
        else{
            continue
        }
    }
}

//AI Helped me out a lot on these two
function calculateTotals() {
    let cartKeys = Object.keys(localStorage).filter(key => key.startsWith("Item"));
    let subtotal = 0;
    
    for (let index = 0; index < cartKeys.length; index++) {
        let i = cartKeys[index].replace("Item", "");
        
        // 1. Find the price text on the screen and split it at the '$' to get just the number
        let priceElement = document.getElementById("subtotal" + i);
        let price = parseFloat(priceElement.innerText.split("$")[1]);
        
        // 2. Find the current quantity in the number box
        let quantityElement = document.getElementById("number" + i);
        let quantity = parseInt(quantityElement.value);
        
        // 3. Multiply and add to the running subtotal
        if (!isNaN(price) && !isNaN(quantity)) {
            subtotal += (price * quantity);
        }
    }
    
    let tax = subtotal * 0.0825;
    let finalTotal = subtotal + tax;

    document.getElementById("cartSubtotal").innerText = "Subtotal: $" + subtotal.toFixed(2);
    document.getElementById("cartTax").innerText = "Tax (8.25%): $" + tax.toFixed(2);
    document.getElementById("cartTotal").innerText = "Total: $" + finalTotal.toFixed(2);
}

function saveNewCart() {
    let cartKeys = Object.keys(localStorage).filter(key => key.startsWith("Item"));

    for (let index = 0; index < cartKeys.length; index++) {
        let currentKey = cartKeys[index];
        
        // Get the number 'i' so we can find the matching HTML elements
        let i = currentKey.replace("Item", ""); 

        // Grab the original item array from storage so we don't lose the Price List (Index 3)
        let itemData = JSON.parse(localStorage.getItem(currentKey));

        // --- UPDATE THE ARRAY WITH NEW VALUES FROM THE SCREEN ---

        let quantityElement = document.getElementById("number" + i);
        if (quantityElement) {
            itemData[4] = quantityElement.value;
        }

        let sizeElement = document.querySelector('select[name="Size' + i + '"]');
        if (sizeElement) {
            itemData[1] = sizeElement.value;
        }

        let optionElement = document.getElementById("color" + i);
        if (optionElement) {
            itemData[2] = optionElement.value;
        }

        let genderElement = document.getElementById("genderPicker" + i);
        if (genderElement) {
            itemData[5] = genderElement.value;
        }
        localStorage.setItem(currentKey, JSON.stringify(itemData));
    }
    window.location.href = "shipping.html";
}