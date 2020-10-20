/* Assignment Code */

/* Gets HTML element with id of 'generate' */
var generateBtn = document.getElementById("generate");

/* Write password to the #password input */
function writePassword() {
    var password = generatePassword();  // Calls function generatePassword and obtain a random password

    // Gets HTML element with id of 'password'
    var passwordText = document.getElementById("password"); 

    passwordText.value = password;  // Replace textarea with the value of variable password 
}

/* This function takes an array and a variable to check for true or false values. 
If true, it adds the passed string ('lower', 'upper', 'number' or 'special') to the array. */
function addCriteria (checkCriteria, criteriaName, criteriaArray) {
    // Check if the criteria sent is true
    if(checkCriteria === true) {
        criteriaArray.push(criteriaName); // if true, add the string argument to the array
    }
}

/* This function takes an array and a length value. 
Then expand the array until it matched the required length. 
Finally, it uses Fisher-Yates Algorithm to shuffle the new array order */
function shufflePassword (myArray) {
    // Use Fisher-Yates Algorithm to shuffle the array order
    for(var x = myArray.length - 1; x > 0; x--){
        var y = Math.floor(Math.random() * x)   // Pick a random index from array excluding last index
        var temp = myArray[x]   // Store last index value on temp variable
        myArray[x] = myArray[y]  // Replace last index value for the selected random index value
        myArray[y] = temp  // Replace the random index for the temp variable value
    }
    return myArray;  // Returns new array
}

/* This function takes 2 numbers (lowNum and highNum, and return an array with 
the numbers in between including lowNum and highNum) */
function arrayFromLowNumToHighNum (lowNum, highNum) {
    var myArray = [];   // Create an empty array
    for (var index = lowNum; index <= highNum; index+=1) {  // Creates a loop from lowNum and highNum
        myArray.push(index);    // Add index value to myArray
    }
    return myArray;  // Returns myArray
}

/* This function takes an array and its length and pick a random value from it */
function pickRandomlyFromCharArray (charArray, arrayLength) {
    var randonIndex = Math.floor(Math.random() * arrayLength);  // Pick a random index value from arrayLength
    return String.fromCharCode(charArray[randonIndex]);  // Covert ascii code to string and return it 
}

/* This function generate and return a random sting of characters based on user criteria */
function generatePassword() {
    // Call function arrayFromLowNumToHighNum which return an array with values between the min and max numbers (including min and max num)
    var lowercaseCharCode = arrayFromLowNumToHighNum (97, 122); 
    var upppercaseCharCode = arrayFromLowNumToHighNum (65, 90);
    var numberCharCode = arrayFromLowNumToHighNum (48, 57);
    var specialCharCode = arrayFromLowNumToHighNum (32, 47).concat(    // Call arrayFromLowNumToHighNum and concatenate
        arrayFromLowNumToHighNum(58, 64)
        ).concat(arrayFromLowNumToHighNum(91, 96)
            ).concat(arrayFromLowNumToHighNum(123, 126));

    // Determinate the length of Characters Arrays
    var lowercaseLength = lowercaseCharCode.length;
    var uppercaseLength = upppercaseCharCode.length;
    var numbersCharLength = numberCharCode.length;
    var specialCharLength = specialCharCode.length;

    // Prompt to confirm how many characters the user would like in their password
    var passwordLength = prompt("How many characters would you like on your password?");

    // Check if Password length is within 8-128 characters. If not, ask user again for a new length
    while(passwordLength <= 7 || passwordLength >= 129 || isNaN(passwordLength)) {
        alert("Password length must be between 8-128 characters! Please Try Again");
        passwordLength = prompt("How many characters would you like on your password?");
    } 
    // console.log("Password Length", passwordLength);

    // Determine the parameters for the password
    var confirmLowercase = confirm("Would you like lowercase characters?");
    var confirmUppercase = confirm("Would you like upppercase characters?");
    var confirmNumbers = confirm("Would you like numbers characters?");
    var confirmSpecialChar = confirm("Would you like special characters?");

    // Loop back if all parameters are False
    while(confirmLowercase === false && confirmUppercase === false && confirmNumbers === false && confirmSpecialChar === false) {
        alert("You must choose at least 1 char type");
        confirmLowercase = confirm("Would you like lowercase characters?");
        confirmUppercase = confirm("Would you like upppercase characters?");
        confirmNumbers = confirm("Would you like numbers characters?");
        confirmSpecialChar = confirm("Would you like special characters?");
    }

    var criteriaList = [];  // This array will contain all the criteria selected by the user. 

    // Add criteria to criteriaList if True for confirmLowercase
    addCriteria(confirmLowercase, "lower", criteriaList);
    // Add criteria to criteriaList if True for confirmUppercase
    addCriteria(confirmUppercase, "upper", criteriaList);
    // Add criteria to criteriaList if True for confirmNumbers
    addCriteria(confirmNumbers, "num", criteriaList);
    // Add criteria to criteriaList if True for confirmSpecialChar
    addCriteria(confirmSpecialChar, "special", criteriaList);
    // console.log("Criteria required:", criteriaList);

    /* Store the new password generated */
    var passwordArray = [];
    
    var counter = 0;   // Counter for while loop

    // Loops through criteriaList array
    while(counter < criteriaList.length) {
        // Depending on the value of criteriaList at each loop, assign a corresponding Random Char type to passwordArray
        switch (criteriaList[counter]) {
            case "lower":
                // Calls function pickRandomlyFromCharArray which returns a random Char from the provided array 
                passwordArray[counter] = pickRandomlyFromCharArray(lowercaseCharCode, lowercaseLength);
                counter++;  // Increase counter by 1
                break;  // Stop Switch Case
            
            case "upper":
                // Calls function pickRandomlyFromCharArray which returns a random Char from the provided array 
                passwordArray[counter] = pickRandomlyFromCharArray(upppercaseCharCode, uppercaseLength);
                counter++;  // Increase counter by 1
                break;  // Stop Switch Case
            
            case "num":
                // Calls function pickRandomlyFromCharArray which returns a random Char from the provided array 
                passwordArray[counter] = pickRandomlyFromCharArray(numberCharCode, numbersCharLength);
                counter++;  // Increase counter by 1
                break;  // Stop Switch Case
            
            case "special":
                // Calls function pickRandomlyFromCharArray which returns a random Char from the provided array
                passwordArray[counter] = pickRandomlyFromCharArray(specialCharCode, specialCharLength);
                counter++;  // Increase counter by 1
                break;  // Stop Switch Case
        }
    }
    // console.log("Password Array with at least one of each char type:", passwordArray);

    // Loops through criteriaList array until password meet required length
    while (counter < passwordLength) {
        // Pick a random index from the criteriaList
        var randonIndex = Math.floor(Math.random() * criteriaList.length);
        // Validate criteriaList value at selected index
        switch (criteriaList[randonIndex]) {  
            case "lower":
                // Calls function pickRandomlyFromCharArray which returns a random Char from the provided array 
                passwordArray[counter] = pickRandomlyFromCharArray(lowercaseCharCode, lowercaseLength);
                counter++;  // Increase counter by 1
                break;  // Stop Switch Case
            
            case "upper":
                // Calls function pickRandomlyFromCharArray which returns a random Char from the provided array 
                passwordArray[counter] = pickRandomlyFromCharArray(upppercaseCharCode, uppercaseLength);
                counter++;  // Increase counter by 1
                break;  // Stop Switch Case
            
            case "num":
                // Calls function pickRandomlyFromCharArray which returns a random Char from the provided array 
                passwordArray[counter] = pickRandomlyFromCharArray(numberCharCode, numbersCharLength);
                counter++;  // Increase counter by 1
                break;  // Stop Switch Case
            
            case "special":
                // Calls function pickRandomlyFromCharArray which returns a random Char from the provided array 
                passwordArray[counter] = pickRandomlyFromCharArray(specialCharCode, specialCharLength);
                counter++;  // Increase counter by 1
                break;  // Stop Switch Case
        }
    }
    // console.log("Password Array before shuffled:", passwordArray);

    // Call shufflePassword function and return its value to passwordArray
    passwordArray = shufflePassword(passwordArray);
    // console.log("Password Array after shuffled:", passwordArray);

    var password = ""; // Create an empty string
    // Loop through passwordArray
    for (var y = 0; y < passwordArray.length; y++) {
        password += passwordArray[y];  // At each loop concatenate each passwordArray value to the password string
    }
    // console.log("Password:", password);    // Print password string to console
    return password;  // Return password string
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Find the textarea tag on the page and call this function when clicked
document.querySelector("textarea").onclick = function(){
    document.querySelector("textarea").select();   // Find textarea and select content inside
    document.execCommand('copy');  // Copy text to clipboard
}

// This toggle a popup message when click on textarea
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});