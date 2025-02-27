const base_url = 'https://search.reservamos.mx/api/v2/places'

export async function GetCities(){ //funcion que obtiene todos los lugares que tinen "city" como valor asignado en result_type
    try{
        const places_list = await fetch(`${base_url}`,{
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
        const places_list = await fetch(`${base_url}?q=${city_name}`,{
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