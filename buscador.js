sync function getCountryFromApi(){
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