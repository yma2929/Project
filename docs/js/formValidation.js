//creating a form
const form = document.getElementById("ratingForm");
//adding an event listener that is triggered by submission
form.addEventListener("submit", function(event) {
    //stops submission before validation
    event.preventDefault();

    
    //read user input
    const firstName = document.getElementById("fName").value.trim();
    const lastName = document.getElementById("lName").value.trim();
    const email = document.getElementById("emailAddress").value.trim();
    const phoneNumber = document.getElementById("phoneNum").value.trim();
    const comments = document.getElementById("textarea").value;
    const rateRange =document.getElementById("rating").value;


    const recipes = Array.from(document.querySelectorAll('input[name="recipeType"]:checked')).map(el => el.value);
const pages = Array.from(document.querySelectorAll('input[name="websitePages"]:checked')).map(el => el.value);
const rating = document.querySelector('input[name="recipeRate"]:checked')?.value;

    const validFormData = validateform(firstName, lastName, email, phoneNumber, rating);

    if(validFormData){

    fetch("http://localhost:4000/dataProcessing",{
        //sending 3 objects
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({ //data enterned by user
            firstName:firstName,
            lastName:lastName,
            email:email,
            phoneNumber:phoneNumber,
            pages:pages,
            recipes:recipes,
            rating:rating,
            comments:comments,
            rateRange:rateRange
        }),
    })
    .then(function(response){
        if(response.ok){
            return response.json(); //convert to json

        }else{
            throw new Error("Oppss! Network response was interrupted.");
        }
    })
    .then(function(data){
        
        if(data.status){
            document.getElementById("confirmation-message").innerHTML = "<span style='background-color:#f4e8d0; color:#003049;    padding: 20px;margin: 20px;border-radius:15px; font-family:serif;'>Thank you, your review has been received.</span>";
        }else{
            throw new Error(data.err);
        }
    })
    
    .catch(function(error){
        document.getElementById("confirmation-message").innerHTML = "<span style='color:red; background-color:#f4e8d0;    padding: 20px;margin: 20px;border-radius:15px; font-family:serif;'>Sorry! There seems to be an error.</span>";
    }
    );
}
else{
    alert("Please fill out the form correctly.");
}

});
function validateform(firstName, lastName, email, phoneNumber, rating) {

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/ ;


    let errorMessages = ["The first name must be at least 2 characters long.",
        "The last name must be at least 2 characters long.",
        "The email must be a valid email address and follow the usual format.",
        "The phone number must be a valid phone number and follow the usual format.",
        "You must select only one  rating between 1 and 5.",
];

    

    if(firstName.length < 2 || firstName == "" || !firstName.match("[a-zA-Z]+")) {
    alert(errorMessages[0]);
    return false;

        
    }
    if(lastName.length < 2 || lastName == "" || !lastName.match("[a-zA-Z]+")) {
    alert(errorMessages[1]);
    return false;
        
    }
    if (email.length<10 || email == "" || !email.match(emailPattern) ) {
        alert(errorMessages[2]);
        return false;
    
    }
    if (phoneNumber.length<10 || phoneNumber == "" || !phoneNumber.match("[0-9]{10}")) {
        alert(errorMessages[3]);
        return false;
        
    }
    if (rating == null) {
    alert(errorMessages[4]);
    return false;
        
    }

    return true;
}





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




