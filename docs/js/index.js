
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
