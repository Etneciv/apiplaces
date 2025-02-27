import express from 'express';
import { GetCities, GetCitiesByName } from './app.js';

const app = express();


app.get('/',async(req, res)=>{ //Obtenemos todos los items disponibles
    const result = await GetCities();
    res.json(result);
})

app.get('/city/:city_name',async(req, res)=>{//Solicitamos los items con el nombre o similar disponibles
    const city_name = req.params.city_name;
    const result = await GetCitiesByName(city_name.toLowerCase())
    
    res.json(result);
})

app.listen(3000,(req, res)=>{
    console.log(`Server listen on port ${3000}`)
});

