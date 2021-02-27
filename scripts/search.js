document.getElementById("searchSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("searchInput").value;
    let urlEnding = "";
    if (value === "") {
        urlEnding = "pie";
    } else {
        urlEnding = value;
    }

    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + urlEnding;
    console.log(url);
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            let results = "";
            for (let singleMeal of json.meals) {
                results += '<h2 class="search-header">' + singleMeal.strMeal + "</h2>";
                results += '<div class="meal-box"><img src="' + singleMeal.strMealThumb + '" alt="Meal picutre">';
                results += '<div class="recipe-text"><p>Ingredients: ';
                for (let i = 1; i <= 20; i++) {
                    let ingredientName = "strIngredient" + i;
                    if (singleMeal[ingredientName]) {
                        if (i == 1) {
                            results += json.meals[0][ingredientName];
                        }
                        results += ", " + json.meals[0][ingredientName];
                    }
                }
                results += '</p></div></div>';
            }
            document.getElementById("searchResults").innerHTML = results;
        });
});