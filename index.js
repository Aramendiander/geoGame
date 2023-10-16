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

// Get flags and names from the API's raw data
async function getFlagsFromApi(){
    try {
        const data = await rawData
        const flags = data.map(country => ({ 
            flag: country.flags.png,
            name: country.name.common
         }));
        return flags;
    } catch(error){
        console.log(error);
    }
}


async function chooseFourFlags(){
    let data = await getFlagsFromApi();
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

let gameFlags = null;
let chosenCountryName = null;
let storedScore = localStorage.getItem("score");
let score = storedScore ? parseInt(storedScore) : 0;
async function printGame(){
    gameFlags = await chooseFourFlags();
    const game = document.getElementById("game");
    const h1 = document.createElement("h1");
    const h2 = document.createElement("h2");
    h2.id = "score"
    game.appendChild(h1);
    game.appendChild(h2);
    const gamefield = document.getElementById("gamefield");
    const chosenCountry = Math.floor(Math.random() * gameFlags.length);
    gameFlags.forEach((flag, index) => {
        if (index === chosenCountry) {
            chosenCountryName = flag.name;
        }
        const option = document.createElement("img");
        option.src = flag.flag;
        gamefield.appendChild(option);
    });  
    h1.textContent = `Choose the flag of ${chosenCountryName}`
    h2.textContent = `Score: ${score}`
    game.insertBefore(h1, game.firstChild)
}

async function fullGame(){
    await printGame();
    const flags = document.querySelectorAll("img")
    flags.forEach((flag,index) => {
        flag.addEventListener("click", () => {
            if(gameFlags[index].name === chosenCountryName) {
                score += 100;
                storedScore = localStorage.setItem("score", score)
                updateScore();
                youWon()
            } else  {
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
    fireworks.start();

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
    h1.textContent = `Next flag in ${seconds}`;
  
    if (seconds > 0) {
      setTimeout(() => {
        updateCountdown(seconds - 1);
      }, 1000);
    } else {
        playAgain()
    }
}




fullGame()