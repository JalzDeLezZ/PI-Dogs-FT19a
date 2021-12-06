const express = require ('express')
require('dotenv').config();
const { Breed, Temperament } = require('../db');
const getAllBreeds = require('../Controllers/Breeds')
// const { response } = require('express');
const router = require('express').Router();

//GET/breeds y GET /breeds?name="...":
router.get('/breeds', async (req, res) => {
    const {name} = req.query
     try {
       let breedsTotal = await getAllBreeds();  
       if(name){
         let breedName = await breedsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase())); //q se fije si el nombre incluye el name q me pasan por query
         if (breedName.length) return res.status(200).send(breedName)         //Si no coloco return en cada res.send o res.json me lanza un error de header por lo q el operador ternario no me sirve
         return res.json({data: {error:'Breed not found'}}) 
       }
       return res.status(200).send(breedsTotal)   
     } catch (error) {
       console.log(error);
     }
   }) 

//GET/breeds/{idBreed}
router.get('/breeds/:id', async (req, res) => {
    const {id} = req.params;
   try {
     const breedsTotal = await getAllBreeds();
     if (id){
       let breedId = await breedsTotal.filter(el => el.id == id);
       breedId.length ? res.status(200).json( breedId) : res.json({data: {error:'Breed not found'}})             
     }
   } catch (error) {
     console.log(err);
   }
   })

//POST/breed
router.post('/breed', async (req, res) => {
    let { name, image, height, weight, life_span, temperament, createdInDb} = req.body;
      try {
        if( !name || !height || !weight ) return res.status( 404 ).send( 'Name, height and weight are required' )
          let breedCreated = await Breed.create({   //Para crear la raza uso el modelo Breed + create pq quedará en base de datos, no le paso temperamento pq está en una relación aparte en la DB
            name,
            image,
            height,
            weight,
            life_span,
            createdInDb
          })
           let temperamentsDb = await Temperament.findAll({
              where: {name:temperament}  //Debe ser igual al temperament que le paso por body
          })
          breedCreated.addTemperament(temperamentsDb)  //q al breedCreated le agregue el temperamento q está en la base de datos q coincidió con lo q viene del body. AddGenre pq el modelo se llama Genre
          res.status(200).send('Breed created successfully')
      } catch (err) {
          console.log(err);
      } 
  })
   
     
module.exports = router;