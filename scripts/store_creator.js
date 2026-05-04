let itemsObject = document.getElementById("itemsArea");

//Creating an element for each item, dynamicly
for(let i = 0; i < itemsCount; i++){
    itemsObject.innerHTML += '<div class="storeItem"><img class="imageThumbnail" src="' + itemsThumbnails[i] + '"> <p>' + items[i] + '</p><div class="viewItem" id="item' + i + '" onclick="makePopUp('+ i +')"></div></div>';
}

//Function that makes the popup of an item
function makePopUp(itemID){
    //Overlay maker
    let popUp = document.createElement("div");
    popUp.id = "overlay";

    //The "page" creator
    let innerPage = document.createElement("div");
    innerPage.id = "innerPage";
    popUp.appendChild(innerPage);

    //Creating a container for styles
    let conatainer = document.createElement("div");
    conatainer.className = "modal-content";
    let leftColumn = document.createElement("div");
    leftColumn.className = "left-col";
    let rightColumn = document.createElement("div");
    rightColumn.className = "right-col";
    conatainer.appendChild(leftColumn);
    conatainer.appendChild(rightColumn);
    innerPage.appendChild(conatainer);

    //Decisions to create the right forms, makes blank forms if it doesn't exsist
    if (items[itemID] === "A Picture"){
        createFormPicture(itemID, leftColumn, rightColumn);
    }
    else if (items[itemID] === "Flower Basket"){
        createFormFlower(itemID, leftColumn, rightColumn);
    }
    else if (items[itemID] === "Fruit Basket"){
        createFormFruit(itemID, leftColumn, rightColumn);
    }
    else if (items[itemID] === "Branded Shirt"){
        createFormShirt(itemID, leftColumn, rightColumn);
    }
    else if (items[itemID] === "Branded Stickers"){
        createFormSticker(itemID, leftColumn, rightColumn);
    }
    else if (items[itemID] === "Lolipops"){
        createFormLolipop(itemID, leftColumn, rightColumn);
    }
    else{
        let errorParagraph = document.createElement("p");
        errorParagraph.innerText = "Sorry, but that item doesn't exsist in our system.\n:["
        console.error("Item could not be displayed.");
        console.error(items[itemID]);
    }
    
    //Exit button creation
    let closeBox = document.createElement("div");
      closeBox.id = "StoreClose";
      closeBox.onclick = function() {
         document.body.removeChild(popUp);
    }
    innerPage.appendChild(closeBox);

    //Adds to the page
    document.body.appendChild(popUp);
}

/*
This function creates a form for the picture item
Using data from the store_data script, creating dynamic elements for it
*/
function createFormPicture(itemID, leftColumn, rightColumn){
    //Image of item
    let itemImage = document.createElement("img");
    itemImage.id = "pictureImage";
    itemImage.src = pictureImages[0];
    leftColumn.appendChild(itemImage);

    //Description of item
    let description = document.createElement("p");
    description.textContent = itemsDescriptions[itemID];
    leftColumn.appendChild(description);

    //Price of item
    let price = document.createElement("p");
    price.textContent = "Price: $" + picturePrice[0];
    price.id = "price";
    rightColumn.appendChild(price);

    //Form designater
    let form = document.createElement("form");
    rightColumn.appendChild(form);

    //Size label
    let sizeLabel = document.createElement("label");
    sizeLabel.for = "sizePicker";
    sizeLabel.innerText = "Pick a size:";
    form.appendChild(sizeLabel);

    //Size picker
    let sizePicker = document.createElement("select");
    sizePicker.id = "sizePicker";
    sizePicker.name = "size";
    sizePicker.onchange = function(){
        if (sizePicker.value === "Small (4x4)"){
            updatePrice("picture", 0);
        }
        else if (sizePicker.value === "Medium (6x6)"){
            updatePrice("picture", 1);
        }
        else if (sizePicker.value === "Large (10x10)"){
            updatePrice("picture", 2);
        }
        else if (sizePicker.value === "Extra Large (20x20)"){
            updatePrice("picture", 3);
        }
    }
    form.appendChild(sizePicker);
    for(let i = 0; i< pictureSizes.length; i++){
        let pickerOption = document.createElement("option");
        pickerOption.value = pictureSizes[i];
        pickerOption.innerText = pictureSizes[i];
        sizePicker.appendChild(pickerOption);
    }

    //Option label
    let optionLabel = document.createElement("label");
    optionLabel.for = "optionPicker";
    optionLabel.innerText = "Pick a picture:";
    form.appendChild(optionLabel);
    //Picture options picker
    let optionPicker = document.createElement("select");
    optionPicker.id = "optionPicker";
    optionPicker.name = "option";
    optionPicker.onchange = function(){
        if (optionPicker.value === "The Location"){
            updateImage("picture", 0, "pictureImage");
        }
        else if (optionPicker.value === "Lavender Room"){
            updateImage("picture", 1, "pictureImage");
        }
        else if (optionPicker.value === "Galactic Room"){
            updateImage("picture", 2, "pictureImage");
        }
    }
    form.appendChild(optionPicker);
    for(let i = 0; i< pictureOptions.length; i++){
        let pickerOption = document.createElement("option");
        pickerOption.value = pictureOptions[i];
        pickerOption.innerText = pictureOptions[i];
        optionPicker.appendChild(pickerOption);
    }
    //Quantity selector
    let quantityPicker = document.createElement("input");
    quantityPicker.type = "number";
    quantityPicker.id = "number";
    quantityPicker.name = "quantity";
    quantityPicker.min = "1";
    quantityPicker.value = '1';
    let quantityLabel = document.createElement("label");
    quantityLabel.htmlFor = "quantity";
    quantityLabel.innerText = "Set an amount:";
    form.appendChild(quantityLabel);
    form.appendChild(quantityPicker);
    //Submit button
    let submitButton = document.createElement("button");
    submitButton.innerText = "Add to cart";
    submitButton.id = "submitButton";
    submitButton.type = "button";
    submitButton.onclick = function() {
    if (quantityPicker.value < 1 || quantityPicker.value === ''){
        alert("You must have a quantity greater than 0!")
    }
    else{
        addToStorage(itemID, sizePicker.value, optionPicker.value, picturePrice, quantityPicker.value);
    }
    };
    form.appendChild(submitButton);
}

//Form for flower item
function createFormFlower(itemID, leftColumn, rightColumn){
    //Image of item
    let itemImage = document.createElement("img");
    itemImage.id = "pictureImage";
    itemImage.src = itemsThumbnails[itemID];
    leftColumn.appendChild(itemImage);

    //Description of item
    let description = document.createElement("p");
    description.textContent = itemsDescriptions[itemID];
    leftColumn.appendChild(description);

    //Price of item
    let price = document.createElement("p");
    price.textContent = "Price: $" + flowerPrice[0];
    price.id = "price";
    rightColumn.appendChild(price);

    //Form designater
    let form = document.createElement("form");
    rightColumn.appendChild(form);

    //Size label
    let sizeLabel = document.createElement("label");
    sizeLabel.for = "sizePicker";
    sizeLabel.innerText = "Pick a size:";
    form.appendChild(sizeLabel);

    //Size picker
    let sizePicker = document.createElement("select");
    sizePicker.id = "sizePicker";
    sizePicker.name = "size";
    sizePicker.onchange = function(){
        if (sizePicker.value === "Small"){
            updatePrice("flower", 0);
        }
        else if (sizePicker.value === "Medium"){
            updatePrice("flower", 1);
        }
        else if (sizePicker.value === "Large"){
            updatePrice("flower", 2);
        }
    }
    form.appendChild(sizePicker);
    for(let i = 0; i< flowerSizes.length; i++){
        let pickerOption = document.createElement("option");
        pickerOption.value = flowerSizes[i];
        pickerOption.innerText = flowerSizes[i];
        sizePicker.appendChild(pickerOption);
    }

    //Quantity selector
    let quantityPicker = document.createElement("input");
    quantityPicker.type = "number";
    quantityPicker.id = "number";
    quantityPicker.name = "quantity";
    quantityPicker.min = "1";
    quantityPicker.value = '1';
    let quantityLabel = document.createElement("label");
    quantityLabel.htmlFor = "quantity";
    quantityLabel.innerText = "Set an amount:";
    form.appendChild(quantityLabel);
    form.appendChild(quantityPicker);
    //Submit button
    let submitButton = document.createElement("button");
    submitButton.innerText = "Add to cart";
    submitButton.id = "submitButton";
    submitButton.type = "button";
    submitButton.onclick = function() {
    if (quantityPicker.value < 1 || quantityPicker.value === ''){
        alert("You must have a quantity greater than 0!")
    }
    else{
        addToStorage(itemID, sizePicker.value, 'None', flowerPrice, quantityPicker.value);
    }
    };
    form.appendChild(submitButton);
}

//Form for fruit item
function createFormFruit(itemID, leftColumn, rightColumn){
    //Image of item
    let itemImage = document.createElement("img");
    itemImage.id = "pictureImage";
    itemImage.src = itemsThumbnails[itemID];
    leftColumn.appendChild(itemImage);

    //Description of item
    let description = document.createElement("p");
    description.textContent = itemsDescriptions[itemID];
    leftColumn.appendChild(description);

    //Price of item
    let price = document.createElement("p");
    price.textContent = "Price: $" + fruitPrice[0];
    price.id = "price";
    rightColumn.appendChild(price);

    //Form designater
    let form = document.createElement("form");
    rightColumn.appendChild(form);

    //Size label
    let sizeLabel = document.createElement("label");
    sizeLabel.for = "sizePicker";
    sizeLabel.innerText = "Pick a size:";
    form.appendChild(sizeLabel);

    //Size picker
    let sizePicker = document.createElement("select");
    sizePicker.id = "sizePicker";
    sizePicker.name = "size";
    sizePicker.onchange = function(){
        if (sizePicker.value === "Small (80 pieces)"){
            updatePrice("fruit", 0);
        }
        else if (sizePicker.value === "Medium (140 pieces)"){
            updatePrice("fruit", 1);
        }
        else if (sizePicker.value === "Large (200 pieces)"){
            updatePrice("fruit", 2);
        }
    }
    form.appendChild(sizePicker);
    for(let i = 0; i< fruitSizes.length; i++){
        let pickerOption = document.createElement("option");
        pickerOption.value = fruitSizes[i];
        pickerOption.innerText = fruitSizes[i];
        sizePicker.appendChild(pickerOption);
    }

    //Quantity selector
    let quantityPicker = document.createElement("input");
    quantityPicker.type = "number";
    quantityPicker.id = "number";
    quantityPicker.name = "quantity";
    quantityPicker.min = "1";
    quantityPicker.value = '1';
    let quantityLabel = document.createElement("label");
    quantityLabel.htmlFor = "quantity";
    quantityLabel.innerText = "Set an amount:";
    form.appendChild(quantityLabel);
    form.appendChild(quantityPicker);
    //Submit button
    let submitButton = document.createElement("button");
    submitButton.innerText = "Add to cart";
    submitButton.id = "submitButton";
    submitButton.type = "button";
    submitButton.onclick = function() {
    if (quantityPicker.value < 1 || quantityPicker.value === ''){
        alert("You must have a quantity greater than 0!")
    }
    else{
        addToStorage(itemID, sizePicker.value, 'None', fruitPrice, quantityPicker.value);
    }
    };
    form.appendChild(submitButton);
}

//Form for shirt item
function createFormShirt(itemID, leftColumn, rightColumn){
    //Image of item
    let itemImage = document.createElement("img");
    itemImage.id = "pictureImage";
    itemImage.src = shirtImages[0];
    leftColumn.appendChild(itemImage);

    //Description of item
    let description = document.createElement("p");
    description.textContent = itemsDescriptions[itemID];
    leftColumn.appendChild(description);

    //Price of item
    let price = document.createElement("p");
    price.textContent = "Price: $" + shirtPrice[0];
    price.id = "price";
    rightColumn.appendChild(price);

    //Form designater
    let form = document.createElement("form");
    rightColumn.appendChild(form);

    //Size label
    let sizeLabel = document.createElement("label");
    sizeLabel.for = "sizePicker";
    sizeLabel.innerText = "Pick a size:";
    form.appendChild(sizeLabel);

    //Size picker
    let sizePicker = document.createElement("select");
    sizePicker.id = "sizePicker";
    sizePicker.name = "size";
    sizePicker.onchange = function(){
        if (sizePicker.value === "XXS" || sizePicker.value === "XS" || sizePicker.value === "S" || sizePicker.value === "M" || sizePicker.value === "L" || sizePicker.value === "XL"){
            updatePrice("shirt", 0);
        }
        else if (sizePicker.value === "XXL" || sizePicker.value === "XXXL" || sizePicker.value === "XXXXL"){
            updatePrice("shirt", 1);
        }
    }
    form.appendChild(sizePicker);
    for(let i = 0; i< shirtSizes.length; i++){
        let pickerOption = document.createElement("option");
        pickerOption.value = shirtSizes[i];
        pickerOption.innerText = shirtSizes[i];
        sizePicker.appendChild(pickerOption);
    }

    //Option label
    let optionLabel = document.createElement("label");
    optionLabel.for = "optionPicker";
    optionLabel.innerText = "Pick a color and gender:";
    form.appendChild(optionLabel);
    //Shirt color picker
    let optionPicker = document.createElement("select");
    optionPicker.id = "optionPicker";
    optionPicker.name = "option";
    optionPicker.onchange = function(){
        if (optionPicker.value === "Lavender"){
            updateImage("shirt", 0, "pictureImage");
        }
        else if (optionPicker.value === "White"){
            updateImage("shirt", 1, "pictureImage");
        }
        else if (optionPicker.value === "Black"){
            updateImage("shirt", 2, "pictureImage");
        }
    }
    form.appendChild(optionPicker);
    for(let i = 0; i< shirtColors.length; i++){
        let pickerOption = document.createElement("option");
        pickerOption.value = shirtColors[i];
        pickerOption.innerText = shirtColors[i];
        optionPicker.appendChild(pickerOption);
    }
    //Shirt gender picker
    let genderPicker = document.createElement("select");
    genderPicker.id = "genderPicker";
    genderPicker.name = "gender";
    form.appendChild(genderPicker);
    for(let i = 0; i< shirtGenders.length; i++){
        let pickerOption = document.createElement("option");
        pickerOption.value = shirtGenders[i];
        pickerOption.innerText = shirtGenders[i];
        genderPicker.appendChild(pickerOption);
    }
    //Quantity selector
    let quantityPicker = document.createElement("input");
    quantityPicker.type = "number";
    quantityPicker.id = "number";
    quantityPicker.name = "quantity";
    quantityPicker.min = "1";
    quantityPicker.value = '1';
    let quantityLabel = document.createElement("label");
    quantityLabel.htmlFor = "quantity";
    quantityLabel.innerText = "Set an amount:";
    form.appendChild(quantityLabel);
    form.appendChild(quantityPicker);
    //Submit button
    let submitButton = document.createElement("button");
    submitButton.innerText = "Add to cart";
    submitButton.id = "submitButton";
    submitButton.type = "button";
    submitButton.onclick = function() {
    if (quantityPicker.value < 1 || quantityPicker.value === ''){
        alert("You must have a quantity greater than 0!")
    }
    else{
        addToStorageShirt(itemID, sizePicker.value, optionPicker.value, shirtPrice, quantityPicker.value, genderPicker.value);
    }
    };
    form.appendChild(submitButton);
}

//Form for sticker item
function createFormSticker(itemID, leftColumn, rightColumn){
    //Image of item
    let itemImage = document.createElement("img");
    itemImage.id = "pictureImage";
    itemImage.src = itemsThumbnails[itemID];
    leftColumn.appendChild(itemImage);

    //Description of item
    let description = document.createElement("p");
    description.textContent = itemsDescriptions[itemID];
    leftColumn.appendChild(description);

    //Price of item
    let price = document.createElement("p");
    price.textContent = "Price: $" + stickerPrice[0];
    price.id = "price";
    rightColumn.appendChild(price);

    //Form designater
    let form = document.createElement("form");
    rightColumn.appendChild(form);

    //Size label
    let sizeLabel = document.createElement("label");
    sizeLabel.for = "sizePicker";
    sizeLabel.innerText = "Pick a size:";
    form.appendChild(sizeLabel);

    //Size picker
    let sizePicker = document.createElement("select");
    sizePicker.id = "sizePicker";
    sizePicker.name = "size";
    sizePicker.onchange = function(){
        if (sizePicker.value === "Singular"){
            updatePrice("sticker", 0);
        }
        else if (sizePicker.value === "Small (20 stickers)"){
            updatePrice("sticker", 1);
        }
        else if (sizePicker.value === "Medium (50 stickers)"){
            updatePrice("sticker", 2);
        }
        else if (sizePicker.value === "Large (100 stickers)"){
            updatePrice("sticker", 3);
        }
        else if (sizePicker.value === "Super (200 stickers)"){
            updatePrice("sticker", 4);
        }
        else if (sizePicker.value === "Gargantum (1000 stickers)"){
            updatePrice("sticker", 5);
        }
    }
    form.appendChild(sizePicker);
    for(let i = 0; i< stickerSizes.length; i++){
        let pickerOption = document.createElement("option");
        pickerOption.value = stickerSizes[i];
        pickerOption.innerText = stickerSizes[i];
        sizePicker.appendChild(pickerOption);
    }
    //Quantity selector
    let quantityPicker = document.createElement("input");
    quantityPicker.type = "number";
    quantityPicker.id = "number";
    quantityPicker.name = "quantity";
    quantityPicker.min = "1";
    quantityPicker.value = '1';
    let quantityLabel = document.createElement("label");
    quantityLabel.htmlFor = "quantity";
    quantityLabel.innerText = "Set an amount:";
    form.appendChild(quantityLabel);
    form.appendChild(quantityPicker);
    //Submit button
    let submitButton = document.createElement("button");
    submitButton.innerText = "Add to cart";
    submitButton.id = "submitButton";
    submitButton.type = "button";
    submitButton.onclick = function() {
    if (quantityPicker.value < 1 || quantityPicker.value === ''){
        alert("You must have a quantity greater than 0!")
    }
    else{
        addToStorage(itemID, sizePicker.value, 'None', stickerPrice, quantityPicker.value);
    }
    };
    form.appendChild(submitButton);
}

//Form for lolipop item
function createFormLolipop(itemID, leftColumn, rightColumn){
    //Image of item
    let itemImage = document.createElement("img");
    itemImage.id = "pictureImage";
    itemImage.src = itemsThumbnails[itemID];
    leftColumn.appendChild(itemImage);

    //Description of item
    let description = document.createElement("p");
    description.textContent = itemsDescriptions[itemID];
    leftColumn.appendChild(description);

    //Price of item
    let price = document.createElement("p");
    price.textContent = "Price: $" + lolipopPrice[0];
    price.id = "price";
    rightColumn.appendChild(price);

    //Form designater
    let form = document.createElement("form");
    rightColumn.appendChild(form);

    //Size label
    let sizeLabel = document.createElement("label");
    sizeLabel.for = "sizePicker";
    sizeLabel.innerText = "Pick a size:";
    form.appendChild(sizeLabel);

    //Size picker
    let sizePicker = document.createElement("select");
    sizePicker.id = "sizePicker";
    sizePicker.name = "size";
    sizePicker.onchange = function(){
        if (sizePicker.value === "Singular"){
            updatePrice("lolipop", 0);
        }
        else if (sizePicker.value === "Small (5 lolipops)"){
            updatePrice("lolipop", 1);
        }
        else if (sizePicker.value === "Medium (10 lolipops)"){
            updatePrice("lolipop", 2);
        }
        else if (sizePicker.value === "Large (20 lolipops)"){
            updatePrice("lolipop", 3);
        }
    }
    form.appendChild(sizePicker);
    for(let i = 0; i< lolipopSizes.length; i++){
        let pickerOption = document.createElement("option");
        pickerOption.value = lolipopSizes[i];
        pickerOption.innerText = lolipopSizes[i];
        sizePicker.appendChild(pickerOption);
    }
    //Quantity selector
    let quantityPicker = document.createElement("input");
    quantityPicker.type = "number";
    quantityPicker.id = "number";
    quantityPicker.name = "quantity";
    quantityPicker.min = "1";
    quantityPicker.value = '1';
    let quantityLabel = document.createElement("label");
    quantityLabel.htmlFor = "quantity";
    quantityLabel.innerText = "Set an amount:";
    form.appendChild(quantityLabel);
    form.appendChild(quantityPicker);
    //Submit button
    let submitButton = document.createElement("button");
    submitButton.innerText = "Add to cart";
    submitButton.id = "submitButton";
    submitButton.type = "button";
    submitButton.onclick = function() {
    if (quantityPicker.value < 1 || quantityPicker.value === ''){
        alert("You must have a quantity greater than 0!")
    }
    else{
        addToStorage(itemID, sizePicker.value, 'None', lolipopPrice, quantityPicker.value);
    }
    };
    form.appendChild(submitButton);
}

//Updaters
//Updates the 'priceElement' dynamicly based on changes passed by args
function updatePrice(itemType, indexOfPrice){
    let priceElement = document.getElementById("price");
    if (itemType === "picture"){
        priceElement.textContent = "Price: $" + picturePrice[indexOfPrice];
    }
    else if (itemType === "flower"){
        priceElement.textContent = "Price: $" + flowerPrice[indexOfPrice];
    }
    else if (itemType === "fruit"){
        priceElement.textContent = "Price: $" + fruitPrice[indexOfPrice];
    }
    else if (itemType === "shirt"){
        priceElement.textContent = "Price: $" + shirtPrice[indexOfPrice];
    }
    else if (itemType === "sticker"){
        priceElement.textContent = "Price: $" + stickerPrice[indexOfPrice];
    }
    else if (itemType === "lolipop"){
        priceElement.textContent = "Price: $" + lolipopPrice[indexOfPrice];
    }
}

//Updates images based on changes, changes are passed as args
function updateImage(itemType, indexOfImage, idOfImg){
    let imgElement = document.getElementById(idOfImg);
    //Pulls from pictureImages array
    if (itemType === "picture"){
        imgElement.src = pictureImages[indexOfImage];
    }
    //Pulls from shirtImages array
    else if (itemType === "shirt"){
        imgElement.src = shirtImages[indexOfImage];
    }
}

//Appenders
function addToStorage(itemID, sizeValue, optionValue, priceList, quantity){
    let newItemData = [items[itemID], sizeValue, optionValue, priceList, quantity];

    //Flags
    let isDuplicate = false;
    let quantityChange = false;
    let targetKey = null;
    
    //Iterating through each key to check for matches
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("Item")) {
            let existingItemString = localStorage.getItem(key);
            if (existingItemString) {
                let existingItemData = JSON.parse(existingItemString);
                
                if (existingItemData[0] === newItemData[0] &&
                    existingItemData[1] === newItemData[1] &&
                    existingItemData[2] === newItemData[2]) {
                    targetKey = key; //Adding the target if a match is found
                    
                    if (existingItemData[4] === newItemData[4]) {
                        isDuplicate = true; //Raising flag if everything is exactly the same
                    } else {
                        quantityChange = true; //Raising flag if quantity has changed
                    }
                    break;
                }
            }
        }
    }
    //Warns user and does no operation
    if (isDuplicate) {
        alert("This exact item and quantity is already in your cart!");
    }
    //Changes the quntity of the item, removing the popUp afterwards
    else if (quantityChange) {
        localStorage.setItem(targetKey, JSON.stringify(newItemData));
        alert("Quantity of an existing item has been updated!");

        let overlayElement = document.getElementById("overlay");
        document.body.removeChild(overlayElement);
    }
    else {
        // Adding a brand new item to the cart
        let itemIndex = 0;
        while (localStorage.getItem("Item" + itemIndex) !== null) {
            itemIndex++;
        }
        localStorage.setItem("Item" + itemIndex, JSON.stringify(newItemData));
        alert("Added to cart!");

        let overlayElement = document.getElementById("overlay");
        document.body.removeChild(overlayElement);
    }
}

//Same as addToStorage but with one slight difference
function addToStorageShirt(itemID, sizeValue, optionValue, priceList, quantity, gender){
    let newItemData = [items[itemID], sizeValue, optionValue, priceList, quantity, gender];

    let isDuplicate = false;
    let quantityChange = false;
    let targetKey = null;
    
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("Item")) {
            let existingItemString = localStorage.getItem(key);
            if (existingItemString) {
                let existingItemData = JSON.parse(existingItemString);
                
                if (existingItemData[0] === newItemData[0] &&
                    existingItemData[1] === newItemData[1] &&
                    existingItemData[2] === newItemData[2] &&
                    existingItemData[5] === newItemData[5]) { //This is the difference
                    targetKey = key;
                    
                    if (existingItemData[4] === newItemData[4]) {
                        isDuplicate = true;
                    } else {
                        quantityChange = true;
                    }
                    break;
                }
            }
        }
    }
    if (isDuplicate) {
        alert("This exact item and quantity is already in your cart!");
    }
    else if (quantityChange) {
        localStorage.setItem(targetKey, JSON.stringify(newItemData));
        alert("Quantity of an existing item has been updated!");

        let overlayElement = document.getElementById("overlay");
        document.body.removeChild(overlayElement);
    }
    else {
        // Adding a brand new item to the cart
        let itemIndex = 0;
        while (localStorage.getItem("Item" + itemIndex) !== null) {
            itemIndex++;
        }
        localStorage.setItem("Item" + itemIndex, JSON.stringify(newItemData));
        alert("Added to cart!");

        let overlayElement = document.getElementById("overlay");
        document.body.removeChild(overlayElement);
    }
}