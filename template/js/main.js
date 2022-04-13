document.querySelector('button').addEventListener('click', fetchingApi)
document.querySelector('#arrow').addEventListener('click', fetchingApi)
let url = ''
function fetchingApi(params) {
    let answer = document.querySelector("#input").value
    let searchType = document.querySelector('#selecting').value
    params.preventDefault();
    if (searchType === 'Ingredients') {
        searchBy(answer, searchType)
    } else if (searchType === 'Name') {
        searchBy(answer, searchType)
    }
}
    

function searchBy(answer, type) {
    if (type === 'Ingredients') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${answer}`
        fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            let num = Math.floor(Math.random() * data.drinks.length)
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${data.drinks[num].strDrink}`)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
                console.log(data)
            document.querySelector('#items').classList.remove('hidden')
            num = Math.floor(Math.random() * data.drinks.length)
            console.log(data.drinks)
            document.querySelector('#name').innerText = data.drinks[num].strDrink
            document.querySelector('#image').src = data.drinks[num].strDrinkThumb
            document.querySelector('#instructions').innerText = data.drinks[num].strInstructions

            document.querySelector('#type').innerText = data.drinks[num].strAlcoholic
            const itemList = document.querySelector("#ingred")
            var child = itemList.lastElementChild; 
            while (child) {
                itemList.removeChild(child);
                child = itemList.lastElementChild;
            }
            let arr = {
                "0" : "strIngredient1",
                "1" : "strIngredient2",
                "2" : "strIngredient3",
                "3" : "strIngredient4" 
            }

            for (let i = 0; i < 4; i++) {
                console.log(`${data.drinks[num][arr[i]]}`);
                if (data.drinks[num][arr[i]] == null || data.drinks[num][arr[i]] == undefined || data.drinks[num][arr[i]] === "") {
                    continue
                }
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(`${data.drinks[num][arr[i]]}`))
                itemList.appendChild(li)
            }
                
            })
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
    } else if (type === 'Name') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${answer}`
        fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            
            document.querySelector('#items').classList.remove('hidden')
            let num = Math.floor(Math.random() * data.drinks.length)
            console.log(data.drinks)
            document.querySelector('#name').innerText = num + 1 + ". " + data.drinks[num].strDrink
            document.querySelector('#image').src = data.drinks[num].strDrinkThumb
            document.querySelector('#instructions').innerText = data.drinks[num].strInstructions

            document.querySelector('#type').innerText = data.drinks[num].strAlcoholic
            const itemList = document.querySelector("#ingred")
            var child = itemList.lastElementChild; 
            while (child) {
                itemList.removeChild(child);
                child = itemList.lastElementChild;
            }
            let arr = {
                "0" : "strIngredient1",
                "1" : "strIngredient2",
                "2" : "strIngredient3",
                "3" : "strIngredient4" 
            }

            for (let i = 0; i < 4; i++) {
                console.log(`${data.drinks[num][arr[i]]}`);
                if (data.drinks[num][arr[i]] == null || data.drinks[num][arr[i]] == undefined || data.drinks[num][arr[i]] === "") {
                    continue
                }
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(`${data.drinks[num][arr[i]]}`))
                itemList.appendChild(li)
            }
                
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
    } 
}