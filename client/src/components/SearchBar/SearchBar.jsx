import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux'
import {getNameBreeds} from '../../actions';

export default function SearchBar(){
 const dispatch = useDispatch() 
 const [name, setName] = useState('') 

function handleInputChange(e){  //para guardar en mi estado local lo q vaya apareciendo en el input 
 e.preventDefault()
 setName(e.target.value)      //el value del input debe tomar el value del state para lo cual seteo el name
/*  dispatch (getNameBreeds(name)) Esto es para que busque el name a medida q voy tecleando*/ 
 console.log(name) 
}

function handleSubmit(e){  
 e.preventDefault()
 dispatch (getNameBreeds(name))
 setName ('')
   //despacho la acción con el name q es el estado local q va guardando lo q tipea el usuario. en resumen el usuario tipea el nombre, eso se guarda en el estado local name, se despacha esa acción, la acción va a llamar al back y le pasa el name q es lo q escribió el usuario
}

return ( 
 <div>
     <input type = 'text' placeholder = 'Search breed...' value= {name} onChange = {(e) => handleInputChange(e)} /> {/* Si no pongo value funciona, pero no se limpia el placeholder, onKeyDpwn se descomenta si quiero reemplazar el boton por el enter */}
     <button type = 'submit' onSubmit = {(e) => handleSubmit(e)}>Search</button>
 </div>
)
}