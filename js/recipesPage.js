const searchinput= document.getElementById('searchInput');
const recipeCard = document.querySelectorAll('.card');
const searchbtn = document.getElementById('searchButton');

function searchRecipes(){
    const searchValue = searchinput.value.toLowerCase();

    recipeCard.forEach(function(card){
        const title = card.querySelector('.recipe-title')?.textContent.toLowerCase() || '' ;
        const ingridents = card.querySelector('.ingredients')?.textContent.toLowerCase() || '';


        const isMatch = title.includes(searchValue) || ingridents.includes(searchValue);
        card.style.display = isMatch ? 'block' : 'none';
    })

}


searchinput.addEventListener('click', searchRecipes);










