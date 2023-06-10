const searchInput = document.querySelector(".search-input");
const searchResults = document.querySelector(".search-result");
const form = document.querySelector("form");

const appKey = "01edbbe4a7c44b35eaeb82c781f0f958"
const appId = "4eaf1b12"
const recipeUrl = "https://api.edamam.com/search?q=";

form.addEventListener("submit" , function(e){
    e.preventDefault()
    let searchedRecipe = searchInput.value ; 
    getRecipe(searchedRecipe);
})

async function getRecipe(searchQ)
{
    const recipeData = await fetch(`${recipeUrl}${searchQ}&app_id=${appId}&app_key=${appKey}&to=30`);
    const response = await recipeData.json();
    console.log(response.hits);
    displayRecipes(response.hits)
}

function displayRecipes(recipes)
{
    let recipeList = ""
    recipes.forEach(recipe => {
        recipeList +=
        ` <div class="item">
        <img src="${recipe.recipe.image}" />
        <div class="content-wrapper">
          <h2 class="recipe-title">${recipe.recipe.label}</h2>
          <a href="${recipe.recipe.url}" class="view-recipe" target ="_blank" >View Recipe</a>
        </div>
        <div class="recipe-desc">
          <p class="item-data">Calories : ${recipe.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet Labels : ${recipe.recipe.dietLabels}</p>
          <p class="item-data">Health Labels : ${recipe.recipe.healthLabels.slice(0 , 5).join(" , ")}</p>
          <p class="item-data">Source : ${recipe.recipe.source}</p>
        </div>
      </div>
      `
        
    });
    searchResults.innerHTML = recipeList;
}
