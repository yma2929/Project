
//random quotes starts here
const quoteElement = document.getElementById("random-facts");
function generateRandomQuote() {
    const randomIndex = getRandomInt(0,5);
    
    switch(randomIndex) {
        case 0:
            quoteElement.innerHTML =  "🍳 Cooking is like love. It should be entered into with abandon or not at all.";
            break;
        case 1:
            quoteElement.innerHTML =  "🧂 Salt doesn’t just season — it enhances and unlocks flavors.";
            break;
        case 2:
            quoteElement.innerHTML = "🍝 Pasta was first eaten in China, not Italy!";
            break;
        case 3:
            quoteElement.innerHTML = "🥦 Broccoli contains more protein than steak per calorie!";
            break;
        case 4:
            quoteElement.innerHTML =  "🍋 Cooking tip: Add a bit of acid (like lemon) to brighten any dish!";
            break;

     
    
    }
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
quoteElement.addEventListener("mouseover",generateRandomQuote);
//random quotes ends here


// form validation starts here
const form = document.getElementsByName("ratingForm")[0];


form.addEventListener("submit",isValid);

function isValid(e){

    e.preventDefault();

    validateform();
    

}

function validateform() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("emailAddress").value.trim();
    const phoneNumber = document.getElementById("phoneNum").value.trim();
    const rating = document.querySelector('input[name="recipeRate"]:checked');

    let errorMessages = ["The first name must be at least 2 characters long.",
        "The last name must be at least 2 characters long.",
        "The email must be a valid email address and follow the usual format.",
        "The phone number must be a valid phone number and follow the usual format.",
        "You must select only one  rating between 1 and 5.",

        
];
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/ ;

    if(firstName.length < 2 || firstName == "" || !firstName.match("[a-zA-Z]{2,}")) {
        window.alert(errorMessages[0]);

        
    }
    if(lastName.length < 2 || lastName == "" || !lastName.match("[a-zA-Z]{2,}")) {
        window.alert(errorMessages[1]);
        
    }
    if (email.length<10 || email == "" || !email.match(emailPattern) ) {
        window.alert(errorMessages[2]);
    
    }
    if (phoneNumber.length<10 || phoneNumber == "" || !phoneNumber.match("[0-9]{10}")) {
        window.alert(errorMessages[3]);
        
    }
    if (rating == null) {
        window.alert(errorMessages[4]);
        
    }
    let validName = (firstName.length > 2  && firstName.match("[a-zA-Z]{2,}")) &&  (lastName.length > 2  && lastName.match("[a-zA-Z]{2,}"));
    let validEmail = email != "" || email.match(emailPattern);
    let validPhone = phoneNumber.length ==10 || phoneNumber != "" || phoneNumber.match("[0-9]{10}");
    let validRating = rating != null;

    if(validName && validEmail && validPhone && validRating) {

 window.alert("Form submitted successfully!");
    }
    
}





