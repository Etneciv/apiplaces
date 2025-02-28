import {reservamos_url, weather_base_url, weather_key} from './config.js'


//const weather_url ='api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}'
export async function GetCities(){ //funcion que obtiene todos los lugares que tinen "city" como valor asignado en result_type
    try{
        const places_list = await fetch(`${reservamos_url}`,{
            headers:{},
            cache:'no-cache'
        })
        .then(res => res.json())
        .then(async result => {
            const cities_filter = result?.filter((city) => city.result_type === 'city') || 'No se encontraron ciudades'; //filtramos el result_type para que solo nos muestre los que tienen "city" como valor
            const cities_popularity = cities_filter.sort((prev_city, next_city) =>  next_city.popularity - prev_city.popularity); //Ordenamos por popularidad
            
            const cities_withWeather = await Promise.all(cities_popularity.map(async city => { //Agregamos la infomación del clima correspondiente de la ciudad
                const weather = await GetWeather(city.lat, city.long); //Guardamos el valor del clima de la WeatherApi
                return { ...city, city_weather: weather.list[0] };
            }));
            
            return cities_withWeather;
        });
        return places_list;
    } catch(err){
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
            
            return cities_filter
        })
        return places_list;
    }catch(err){
        return err;
    }
}

export async function GetCityById(city_id){ //Regresa una ciudad especifíca y se añade la información de weather api al json de reservamos
    console.log(city_id)
    try{
        const city_specific = await fetch(`${reservamos_url}`,{
            headers:{},
            cache:'no-cache'
        })
        .then(res => res.json())
        .then(async result =>{
            const search_city = result?result.find((city) => city.id==city_id):'No se encontraron ciudades'
            const city_weather = await GetWeather(search_city.lat, search_city.long)
            search_city["pronostic_weather"]=city_weather?city_weather.list.filter(item=>item.dt_txt.includes('12:00:00')):null
            return search_city;
        })
        return city_specific
    }catch(err){
        console.log(err)
        return err;
    }
}
export async function GetWeather(lat, lon) { //Obtenemos el clima de una ciudad según su latitud y longitud
    try{
        const weather_place = await fetch(`${weather_base_url}lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`)
        .then(res => res.json())
        .then(result =>{
            return result;
        })
        return weather_place;
    }catch(err){
        console.log(err)
        return err;
    }
}