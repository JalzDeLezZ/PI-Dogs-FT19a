const express = require ('express')
require('dotenv').config();
const { API_KEY } = process.env; 
const { Breed, Temperament } = require('../db');
const axios = require('axios');

const getAllTemperaments = async () => {
    try {
        let temperamentsApiInfo = await axios.get('https://api.thedogapi.com/v1/breeds', { headers: {'x-api-key': `${API_KEY}` }}).data.map(el => el.temperament).join().split(",") // una vez accediendo a los temperamentos, Join los une a todos, luego split los mete en un arreglo separandolos en strings separados por "coma" 
        let temperamentsEach = temperamentsApiInfo.map((el) => el.trim()).sort() //Trim elimina los especios en blanco en ambos extremos del string y sort los ordena alfabéticamente.
        let noEmptyTemperaments = [] //Temperamentos sin espacios vacíos, pero con temperamentosrepetidos
        let noRepetedTemperaments = [] 
        
        temperamentsEach.forEach( el => { if(el !== '') return noEmptyTemperaments.push(el)}) //esto elimina los temperamentos vacíos
        noEmptyTemperaments.forEach(el => {if(!noRepetedTemperaments.includes(el)) return noRepetedTemperaments.push(el)}) 
      return noRepetedTemperaments
    } catch (error) {
      console.log(error)
    }
    console.log('DB successfully loaded')
  }

  module.exports = getAllTemperaments;