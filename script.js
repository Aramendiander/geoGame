const opciones = [];

const apiUrl = "https://restcountries.com/v3.1/all";

async function getRawDataFromApi() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all")
        const countries = await response.json()
        return countries;
        
    } catch(error){
        console.log(error);
    }
}

async function getRandomCountry (){
    const tdArr=[];
    //Datuk jaso
    const countries = await getRawDataFromApi();
    //numero aleatorioak atera
    shuffleArray(countries);
    //Country aleatorioak aukeratu
    const country0=countries[0];
    const country1=countries[1];
    const country2=countries[2];
    const country3=countries[3];
    //h3 sortu
    const h3= document.createElement("h3");
    h3.innerHTML=country0.translations.spa.common;
    const section = document.getElementById("capitalesSec");
    section.innerHTML="";
    section.appendChild(h3);
    //Tabla aukeratu eta vaciar
    const table = document.getElementById("capitalesTable");
    table.innerHTML="";
    //"button"-ak sortu
    const button0= document.createElement("button");
    button0.innerHTML=country0.capital.toString();
    button0.setAttribute("class", "incorrecto");
    button0.addEventListener("click", ()=>{
        button0.style.backgroundColor="green"
        button1.style.display="none"
        button2.style.display="none"
        button3.style.display="none"
    });
    const button1= document.createElement("button");
    button1.innerHTML=country1.capital.toString();
    button1.setAttribute("class", "incorrecto")
    button1.addEventListener("click", ()=>{
        button1.style.backgroundColor="red"
        button0.style.display="none"
        button2.style.display="none"
        button3.style.display="none"
    });
    const button2= document.createElement("button");
    button2.innerHTML=country2.capital.toString();
    button2.setAttribute("class", "incorrecto")
    button2.addEventListener("click", ()=>{
        button2.style.backgroundColor="red"
        button1.style.display="none"
        button0.style.display="none"
        button3.style.display="none"
    });
    const button3= document.createElement("button");
    button3.innerHTML=country3.capital.toString();
    button3.setAttribute("class", "correcto");
    button3.addEventListener("click", ()=>{
        button3.style.backgroundColor="red"
        button1.style.display="none"
        button2.style.display="none"
        button0.style.display="none"
    });
    opciones.push(button0,button1,button2,button3);
    shuffleArray(opciones);
    table.appendChild(opciones[0]);
    table.appendChild(opciones[1]);
    table.appendChild(opciones[2]);
    table.appendChild(opciones[3]);
}


//Random zenbakiak atera
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

getRandomCountry ();

