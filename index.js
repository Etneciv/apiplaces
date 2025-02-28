import express from 'express';
import { GetCities, GetCitiesByName, GetCityById } from './app.js';

const app = express();

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.get('/',async(req, res)=>{ //Obtenemos todos los items disponibles
    const result = await GetCities();
    res.json(result);
})

app.get('/citySearch/:city_name',async(req, res)=>{//Solicitamos los items con el nombre o similar disponibles
    const city_name = req.params.city_name;
    const result = await GetCitiesByName(city_name.toLowerCase())
    
    res.json(result);
})

app.get('/citySpecific/:city_id',async(req, res)=>{
    const city_id = req.params.city_id;
    
    const result = await GetCityById(city_id);

    res.json(result)
})
app.listen(3000,(req, res)=>{
    console.log(`Server listen on port ${3000}`)
});

