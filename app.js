import {reservamos_url, weather_base_url, weather_key} from './config.js'


//const weather_url ='api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'
export async function GetCities(){ //funcion que obtiene todos los lugares que tinen "city" como valor asignado en result_type
    try{
        const places_list = await fetch(`${reservamos_url}`,{
            headers:{},
            cache:'no-cache'
        })
        .then(res => res.json())
        .then(result =>{
            const cities_filter = result?result.filter((city) => city.result_type=='city'):'No se encontraron ciudades'
            return cities_filter
        })
        return places_list;
    }catch(err){
        return err;
    }
}

export async function GetCitiesByName(city_name){//funcion que obtiene ciudades por nombre y así mismo tienen "city" como valor asignado en result_type 
    try{
        const places_list = await fetch(`${reservamos_url}?q=${city_name}`,{
            headers:{},
            cache:'no-cache'
        })
        .then(res => res.json())
        .then(result =>{

            const cities_filter = result?result.filter((city) => city.result_type=='city'):'No se encontraron ciudades'
            const city =GetWeather(19.2452342,-103.7240868)
            return cities_filter
        })
        return places_list;
    }catch(err){
        return err;
    }
}

export async function GetWeather(lat, lon) { //Obtenemos el clima de una ciudad según su latitud y longitud
    try{
        const weather_place = await fetch(`${weather_base_url}lat=${lat}&lon=${lon}&appid=${weather_key}`)
        .then(res => res.json())
        .then(result =>{
            console.log(result.list)
            return result;
        })
    }catch(err){
        console.log(err)
        return err;
    }
}