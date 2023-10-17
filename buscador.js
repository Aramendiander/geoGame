const inputBuscador = document.getElementById('buscador');
const resultadosLista = document.getElementById('resultados');
const data2 = document.getElementById("countrylist");

// Hacer una solicitud a la API para obtener los datos
async function fetchData() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para filtrar los datos por el nombre
function filtrarPorNombre(data, searchTerm) {
    return data.filter(country => {
        return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    });
}




// Función para mostrar los resultados en la lista
function mostrarResultados(resultados) {
    resultadosLista.innerHTML = '';
    resultados.forEach(country => {
        //if (!paisesMostrados[countryName])
        const countryName = country.name.common
        const countryFlag = country.flags.png
        const countryCapital = country.capital
        const countryContinent = country.continents
        const countryDriveDirection = country.car.side
        const countryPopulation = country.population
        const countryCurrency = country.currencies //multiples
        const countryLanguages = country.languages //multiples
        const countryTime = country.timezones //multiples
        const articleCountry = document.createElement("article")
        articleCountry.id = "country"
        const countryList = document.getElementById("countrylist")
        countryList.appendChild(articleCountry)
        // Country Name
        const printCountryName = document.createElement("h2");
        printCountryName.textContent = countryName;
        articleCountry.appendChild(printCountryName)
        // Country flag
        const printCountryFlag = document.createElement("img");
        printCountryFlag.src = countryFlag;
        printCountryFlag.className ="flag"
        articleCountry.appendChild(printCountryFlag)
        // Country capital
        const printCountryCapital = document.createElement("p");
        printCountryCapital.textContent = `Capital: ${countryCapital}`;
        articleCountry.appendChild(printCountryCapital)
        // Country Continent
        const printCountryContinent = document.createElement("p");
        printCountryContinent.textContent = `Continent: ${countryContinent}`;
        articleCountry.appendChild(printCountryContinent)
        // Country drive direction
        const printCountryDriveDirection = document.createElement("p");
        printCountryDriveDirection.textContent = `They drive on the ${countryDriveDirection} side of the road`;
        articleCountry.appendChild(printCountryDriveDirection)
        // Country population
        const printCountryPopulation = document.createElement("p");
        printCountryPopulation.textContent = `Population: ${countryPopulation}`;
        articleCountry.appendChild(printCountryPopulation)
        // Country currencies
        const printCurrencyDiv = document.createElement("div")
        printCurrencyDiv.className = "currencies"
        articleCountry.appendChild(printCurrencyDiv);
        for (let currency in countryCurrency) {
            
            const printCountryCurrency = document.createElement("span");
            printCountryCurrency.textContent = `Currency: ${countryCurrency[currency].name}`;
            
            printCurrencyDiv.appendChild(printCountryCurrency)

        }
        // Country languages
        const printLanguagesDiv = document.createElement("div")
        printLanguagesDiv.className = "languages"
        articleCountry.appendChild(printLanguagesDiv);
        for (let language in countryLanguages) {
            const printCountryLanguages = document.createElement("span");
            printCountryLanguages.textContent = `Language: ${countryLanguages[language]}`;
            printLanguagesDiv.appendChild(printCountryLanguages)
        } 
    });
}



// Escuchar el evento input para la búsqueda en tiempo real
inputBuscador.addEventListener('keydown', async (event) => {
    if (event.key === "Enter") {
        const searchTerm = inputBuscador.value;
        const data = await fetchData();
        const resultadosFiltrados = filtrarPorNombre(data, searchTerm);
        data2.innerHTML="";
        mostrarResultados(resultadosFiltrados);
    }
});

