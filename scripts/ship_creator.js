let submitButton = document.createElement("button");
submitButton.innerText = "Submit info";
submitButton.id = "submitButton";
submitButton.type = "button";
submitButton.disabled = true;
submitButton.onclick = function(){
    performValidation();
};

let backButton = document.createElement("button");
backButton.innerText = "Back to cart";
backButton.id = "backButton";
backButton.type = "button";
backButton.onclick = function(){
    window.location.href = "cart.html";
}

document.getElementById("buttons").appendChild(submitButton);
document.getElementById("buttons").appendChild(backButton);


if (localStorage.length === 0){
    let emptyCart = document.createElement("h2");
    emptyCart.innerText = "Hey, you are NOT supposed to be here, yet >:(";
    document.getElementById("cartItems").appendChild(emptyCart);
}
else{
    //Title for the cart
    let titleCart = document.createElement("h2");
    titleCart.className = "cartTitle";
    titleCart.innerText = "Your Items";
    document.getElementById("cartItems").appendChild(titleCart);
    //Form creation based on each item in storage
    let formContainer = document.createElement("form");
    let subtotalContainer = document.createElement("div");
    subtotalContainer.className = "subTotals";
    document.getElementById("totals").appendChild(subtotalContainer);
    document.getElementById("cartItems").appendChild(formContainer);
    
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

    //This is exactly the same from the cart_creator script, just everything is disabled
    let cartKeys = Object.keys(localStorage).filter(key => key.startsWith("Item"));
    for (let index = 0; index < cartKeys.length; index++){
        let currentKey = cartKeys[index];
        let i = currentKey.replace("Item", ""); 
        let itemContainer = document.createElement("div");
        itemContainer.id = "item" + i;
        let uniqueItem = JSON.parse(localStorage.getItem(currentKey));
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
                for (let n = 0; n < shirtSizes.length; n++){
                    if (sizePicker.value === "XXL" || sizePicker.value === "XXXL" || sizePicker.value === "XXXXL"){
                        itemSubPrice.innerText = "Price of each: $" + uniqueItem[3][1];
                    }
                    else{
                        itemSubPrice.innerText = "Price of each: $" + uniqueItem[3][0];
                    }
                }
                calculateTotals();
            }
            for(let f = 0; f< shirtSizes.length; f++){
                let pickerOption = document.createElement("option");
                pickerOption.value = shirtSizes[f];
                pickerOption.innerText = shirtSizes[f];
                sizePicker.appendChild(pickerOption);
            }
            sizePicker.value = uniqueItem[1];
            sizePicker.disabled = true;
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
            for(let i = 0; i< shirtColors.length; i++){
                let pickerOption = document.createElement("option");
                pickerOption.value = shirtColors[i];
                pickerOption.innerText = shirtColors[i];
                colorPicker.appendChild(pickerOption);
            }
            colorPicker.value = uniqueItem[2];
            colorPicker.disabled = true;
            //Shirt gender picker and label
            let genderLabel = document.createElement("label");
            genderLabel.for = "gender" + i;
            genderLabel.innerText = "Gender";
            itemContainer.appendChild(genderLabel);
            let genderPicker = document.createElement("select");
            genderPicker.id = "genderPicker" + i;
            genderPicker.name = "gender" + i;
            itemContainer.appendChild(genderPicker);
            for(let i = 0; i< shirtGenders.length; i++){
                let pickerOption = document.createElement("option");
                pickerOption.value = shirtGenders[i];
                pickerOption.innerText = shirtGenders[i];
                genderPicker.appendChild(pickerOption);
            }
            genderPicker.value = uniqueItem[5];
            genderPicker.disabled = true
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
            quantityPicker.disabled = true;
            let quantityLabel = document.createElement("label");
            quantityLabel.htmlFor = "quantity"+i;
            quantityLabel.innerText = "Quantity";
            itemContainer.appendChild(quantityLabel);
            itemContainer.appendChild(quantityPicker);

            let divider = document.createElement("hr");
            divider.className = "itemDivider";
            itemContainer.appendChild(divider);
        }
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
            sizePicker.disabled = true;
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
                picturePicker.disabled = true;
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
            quantityPicker.disabled = true;
            let quantityLabel = document.createElement("label");
            quantityLabel.htmlFor = "quantity"+i;
            quantityLabel.innerText = "Quantity";
            itemContainer.appendChild(quantityLabel);
            itemContainer.appendChild(quantityPicker);

            let divider = document.createElement("hr");
            divider.className = "itemDivider";
            itemContainer.appendChild(divider);
        }
    }

    
    let infoDIV = document.getElementById("info");
    //User info form creator

    //Full name label and input
    let nameLabel = document.createElement("label");
    nameLabel.htmlFor = "fullname";
    nameLabel.innerText = "Enter your full name:";
    let nameInput = document.createElement("input");
    nameInput.name = "fullname";
    nameInput.type = "text";
    nameInput.autocomplete = "shipping name";
    nameInput.placeholder = "Full name here...";
    infoDIV.appendChild(nameLabel);
    infoDIV.appendChild(nameInput);

    //Email label and input
    let emailLabel = document.createElement("label");
    emailLabel.htmlFor = "email";
    emailLabel.innerText = "Enter your email:";
    let emailInput = document.createElement("input");
    emailInput.name = "email";
    emailInput.type = "email";
    emailInput.placeholder = "Email here...";
    emailInput.autocomplete = "email"
    infoDIV.appendChild(emailLabel);
    infoDIV.appendChild(emailInput);

    //Phone label and input
    let phoneLabel = document.createElement("label");
    phoneLabel.htmlFor = "phone";
    phoneLabel.innerText = "Enter your phone number:";
    let phoneInput = document.createElement("input");
    phoneInput.name = "phone";
    phoneInput.type = "phone";
    phoneInput.placeholder = "Phone number here...";
    phoneInput.autocomplete = "shipping tel"
    infoDIV.appendChild(phoneLabel);
    infoDIV.appendChild(phoneInput);

    //Address label and input
    let addressLabel = document.createElement("label");
    addressLabel.htmlFor = "streetAddress";
    addressLabel.innerText = "Enter your address:";
    let addressInput = document.createElement("input");
    addressInput.name = "streetAddress";
    addressInput.type = "text";
    addressInput.placeholder = "Street address here...";
    addressInput.autocomplete = "billing address-line1";
    infoDIV.appendChild(addressLabel);
    infoDIV.appendChild(addressInput);

    //City label and input
    let cityLabel = document.createElement("label");
    cityLabel.htmlFor = "city";
    cityLabel.innerText = "Enter your city:";
    let cityInput = document.createElement("input");
    cityInput.name = "city";
    cityInput.type = "text";
    cityInput.placeholder = "City here...";
    infoDIV.appendChild(cityLabel);
    infoDIV.appendChild(cityInput);

    //State label and input
    let stateLabel = document.createElement("label");
    stateLabel.htmlFor = "state";
    stateLabel.innerText = "Enter your state:";
    let stateInput = document.createElement("input");
    stateInput.name = "state";
    stateInput.type = "text";
    stateInput.maxLength = 2;
    stateInput.placeholder = "State abriviation here...";
    infoDIV.appendChild(stateLabel);
    infoDIV.appendChild(stateInput);

    //Zip label and input
    let zipLabel = document.createElement("label");
    zipLabel.htmlFor = "zip";
    zipLabel.innerText = "Enter your zip:";
    let zipInput = document.createElement("input");
    zipInput.name = "zip";
    zipInput.type = "text";
    zipInput.maxLength = 5
    zipInput.placeholder = "Zip code here...";
    infoDIV.appendChild(zipLabel);
    infoDIV.appendChild(zipInput);


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

//AI Helped me out a lot on this one
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
        let i = currentKey.replace("Item", ""); 
        let itemData = JSON.parse(localStorage.getItem(currentKey));

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

function performValidation() {
    let name = document.querySelector('input[name="fullname"]').value.trim();
    let email = document.querySelector('input[name="email"]').value.trim();
    let phone = document.querySelector('input[name="phone"]').value.trim();
    let address = document.querySelector('input[name="streetAddress"]').value.trim();
    let city = document.querySelector('input[name="city"]').value.trim();
    let state = document.querySelector('input[name="state"]').value.trim();
    let zip = document.querySelector('input[name="zip"]').value.trim();

    let errors = [];

    if (!name || !email || !phone || !address || !city || !state || !zip) {
        errors.push("Please fill out all of the required fields.");
    }

    if (email && (!email.includes("@") || !email.includes("."))) {
        errors.push("Please enter a valid email address.");
    }

    if (state && state.length !== 2) {
        errors.push("State must be a 2-letter abbreviation (e.g., TX).");
    }

    if (zip && zip.length !== 5) {
        errors.push("Zip code must be exactly 5 digits long.");
    }

    if (errors.length > 0) {
        alert("Oops! Please fix the following issues:\n\n- " + errors.join("\n- "));
    } else {
        alert("Shipping info validated! Your order is ready to be placed.");
        
        localStorage.clear();
        window.location.href = "storefront.html"; 
    }
}