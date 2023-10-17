async function getRawDataFromApi() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all")
        const countries = await response.json()
        return countries;
    } catch(error){
        console.log(error);
    }
}

const rawData = getRawDataFromApi()

// Get capitals and names from the API's raw data
async function getCountryFromApi(){
    try {
        const countries = await rawData
        const data = countries.filter(country=> country.capital !== undefined)
        const capitals = data.map(country => ({ 
            capital: country.capital,
            name: country.translations.spa.common
         }));
        return capitals;
    } catch(error){
        console.log(error);
    }
}



async function chooseFourCountries(){
    let data = await getCountryFromApi();
    let currentIndex = data.length
        let randomIndex;
        while (currentIndex > 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [data[currentIndex], data[randomIndex]] = [
                data[randomIndex], data[currentIndex]];
        }
        return data.slice(-4)
    
}


let gameCapitals = null;
let chosenCountryName = null;
let storedScore = localStorage.getItem("score");
let score = storedScore ? parseInt(storedScore) : 0;
async function printGame(){
    gameCapitals = await chooseFourCountries();
    const game = document.getElementById("game");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    h2.id = "score"
    game.appendChild(h1);
    game.appendChild(h2);
    const gamefield = document.getElementById("gamefield");
    const chosenCountry = Math.floor(Math.random() * gameCapitals.length);
    gameCapitals.forEach((capital, index) => {
        if (index === chosenCountry) {
            chosenCountryName = capital.name;
        }
        const option = document.createElement("button");
        option.textContent = capital.capital;
        gamefield.appendChild(option);
    });  
    h1.textContent = `Choose the capital of ${chosenCountryName}`
    h2.textContent = `Score: ${score}`
    game.insertBefore(h1, game.firstChild)
}

async function fullGame(){
    await printGame();
    const capitals = document.querySelectorAll("button")
    capitals.forEach((capital,index) => {
        capital.addEventListener("click", () => {
            if(gameCapitals[index].name === chosenCountryName) {
                score += 100;
                storedScore = localStorage.setItem("score", score)
                updateScore();
                youWon()
            } else  {
                console.log("wrong")
                score -= 50;
                updateScore()
            }

        })
    })

}

function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Score: ${score}`;
  }


function youWon () {

    const game = document.getElementById("game");
    const h1 = document.createElement("h1");
    const gamefield = document.getElementById("gamefield");
    gamefield.innerHTML = "";
    h1.textContent = "You won";
    game.appendChild(h1);
    const container = document.querySelector('.fireworks');
    const fireworks = new Fireworks.default(container);
    fireworks.launch(5);

    h1.textContent = updateCountdown(3)
    
}

function playAgain() {
    const game = document.getElementById("game");
    game.innerHTML = "";
    const h1 = document.createElement("h1");
    const gamefield = document.createElement("article")
    gamefield.id = "gamefield"
    game.appendChild(gamefield);
    game.insertBefore(h1, game.firstChild)
    fullGame();
}


function updateCountdown(seconds) {
    const h1 = document.querySelector("h1");
    h1.textContent = `Next country in ${seconds}`;
  
    if (seconds > 0) {
      setTimeout(() => {
        updateCountdown(seconds - 1);
      }, 1000);
    } else {
        playAgain()
    }
}




fullGame()



