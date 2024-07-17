const btnSearch = document.querySelector('#search'); 
const inptCityName = document.querySelector('#city_name');


btnSearch.addEventListener('submit',async (event) =>{
    event.preventDefault();
    let cityName = inptCityName.value; 
    if(!cityName){
        document.querySelector('#weather').classList.remove('show');
        showAlert('Você precisa digitar uma cidade.');
        return; 
    }
    const apiKey = '802f04b5d680e2590eae2aa51b3f4b89';
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

    const results = await fetch(apiURL); 
    const json = await results.json();

    if(json.cod === 200){
        showInfos({
            city: json.name, 
            country: json.sys.country, 
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed:json.wind.speed, 
            humidity: json.main.humidity,


        })
    }
    else{
        document.querySelector('#weather').classList.remove('show');
        showAlert(`
            Não foi possível localizar...
            <img src="pageNotFound.svg"/>
            
            `)
    }
    
}); 

function showAlert(msg){
    document.querySelector('#alert').innerHTML = msg

}; 

function showInfos(json){
    showAlert(''); 
    document.querySelector('#weather').classList.add('show');

    document.querySelector('#title').innerHTML = `${json.city}, ${json.country}`;

    document.querySelector('#temp_value').innerHTML = `${json.temp.toFixed(1)} <sup>°C</sup>`;

    document.querySelector('#temp_description').innerHTML = `${json.description}`;

    document.querySelector('#temp_img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`); 

    document.querySelector('#temp_max').innerHTML = `${json.tempMax.toFixed(1)} <sup>°C</sup>`;
    document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1)} <sup>°C</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)} km/h`


}