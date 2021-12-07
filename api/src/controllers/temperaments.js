const express = require ('express')
require('dotenv').config();
const { API_KEY } = process.env; 
const { Breed, Temperament } = require('../db');
const axios = require('axios');

const getAllTemperaments = async () => {
    try {
        let temperamentsApiInfo = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data.map(el => el.temperament).join().split(",")
        let temperamentsEach = temperamentsApiInfo.map((el) => el.trim()).sort() //Trim elimina los especios en blanco en ambos extremos del string y sort los ordena alfabéticamente.
        let noEmptyTemperaments = [] //Temperamentos sin espacios vacíos, pero con temperamentosrepetidos
        let noRepeatedTemperaments = [] 
        
        temperamentsEach.forEach( el => { if(el !== '') return noEmptyTemperaments.push(el)}) //esto elimina los temperamentos vacíos
        noEmptyTemperaments.forEach(el => {if(!noRepeatedTemperaments.includes(el)) return noRepeatedTemperaments.push(el)}) 
      return noRepeatedTemperaments
    } catch (error) {
      console.log(error)
    }
  }

  module.exports = getAllTemperaments;