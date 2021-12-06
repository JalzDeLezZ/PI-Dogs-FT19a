const getAllTemperaments = require('../Controllers/Temperaments')
const { Temperament } = require('../db');  //Sin esto no funcionan findAll y resto de propiedades sequelize
// const axios = require('axios');
const router = require('express').Router();


router.get('/temperaments', async (req, res) => {
  try {
    let temperaments = await getAllTemperaments()
    await temperaments.forEach(el => {
      Temperament.findOrCreate({   //Si está no lo hace nada y si no está lo crea esto me elimina 
       where: {name: el}
      })
    }) 
    const allTemperaments = await Temperament.findAll(); 
    res.status(200).send(allTemperaments)  
  } catch (error) {
    console.log(error)
  }
 })


module.exports = router;