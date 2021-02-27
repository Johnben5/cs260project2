document.getElementById("categorySubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("categoryInput").value;
    let s = document.getElementById('selector');
    let type = s.options[s.selectedIndex].value;
    let urlEnding = "";

    if (value === "") {
        urlEnding = "list.php?" + type + "=list";
    } else {
        urlEnding = "filter.php?" + type + "=" + value;
    }

    const url = "https://www.themealdb.com/api/json/v1/1/" + urlEnding;
    console.log(url);
    fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            let results = "";
            
            if (value === "") {
                let numCategories = 0;
                let categoryName = "";
                let uniqueCat = [];
                if (type === "c") {
                    numCategories = 13;
                    categoryName = "strCategory";
                } else if (type === "a") {
                    numCategories = 25;
                    categoryName = "strArea";
                } else {
                    numCategories = 572;
                    categoryName = "strIngredient";
                }
                for (let i = 0; i < numCategories; i++) {
                    uniqueCat.push(json.meals[i][categoryName]); 
                }
                results += '<div class="idea-text">';
                for (let i = 0; i < 10; i++) {
                    let randomNum = Math.floor(Math.random() * numCategories);
                    results += '<li>' + uniqueCat[randomNum] + "</li>";
                    uniqueCat.splice(randomNum, 1);
                    numCategories--;
                }
                results += '</div>';
            } else {
                results += '<div class="grid">';
                for (let singleMeal of json.meals) {
                    results += '<div class="grid-box"><img src="' + singleMeal.strMealThumb + '" alt="Meal picutre">';
                    results += '<h3>' + singleMeal.strMeal + "</h3></div>";
                    
                }
                results += '</div>';
            }
            document.getElementById("categoryResults").innerHTML = results;
        });
});