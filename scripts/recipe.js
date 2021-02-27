document.getElementById("recipeSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("recipeInput").value;
    let urlEnding = "";
    if (value === "") {
        urlEnding = "random.php";
    } else {
        urlEnding = "search.php?s=" + value;
    }

    const url = "https://www.themealdb.com/api/json/v1/1/" + urlEnding;
    console.log(url);
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            let results = "";
            results += '<h2>' + json.meals[0].strMeal + "</h2>";
            results += '<img src="' + json.meals[0].strMealThumb + '" alt="Meal picutre">'
            results += '<div class="recipe-text"><h2>Ingredients</h2>';
            for (let i = 1; i <= 20; i++) {
                let ingredientName = "strIngredient" + i;
                let measure = "strMeasure" + i;
                if (json.meals[0][ingredientName]) {
                    results += '<li>' + json.meals[0][measure] + " " + json.meals[0][ingredientName] + "</li>";
                }
            }
            results += '</div><div class="recipe-text"><h2>Instructions</h2>';
            results += '<p>' + json.meals[0].strInstructions + "</p></div>";
            document.getElementById("recipeResults").innerHTML = results;
        });
});