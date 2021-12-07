import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {postBreed, getTemperaments} from '../../actions';

function validate(input){
    let errors = {}
    if (!input.name) {
        errors.name = 'Name is required';
    } else if (!input.image) {
        errors.image = 'Image is required'
    }
    return errors;
}

export default function BreedCreate(){
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    const history = useHistory(); // metodo del router para redirigirme a la ruta que le diga
    const [errors, setErrors] = useState ({}) //Estado local q arranca con objeto vacío

    useEffect(()=> {
        dispatch(getTemperaments())
    },[dispatch]);


    const [input, setInput] = useState({
        name: '',
        image: '',
        life_span: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        temperament: [] //Si coloco un string vacio no me da la posibilidad de colocar mas de 1 temperamento
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value ////Cuando hago handleChange, primero se setea el input, a medida q voy escribiendo mi estado input va recibiendo y guardando lo q escribo y el e.target.name se setea en el e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelectTemperament(e){
        setInput({...input, temperament:[...input.temperament, e.target.value]})
    }

    function handleSubmit(e){
        e.preventDefault();
        //if(input.heightMin >= 0 && input.weightMin >= 0 && parseInt(input.heightMax) >= parseInt(input.heightMin) && parseInt(input.weightMax) >= parseInt(input.weightMin) && input.name){
        dispatch(postBreed(input))
        alert('Dog created!')
        setInput({
            name: '',
            image: '',
            life_span: '',
            heightMin: '',
            heightMax: '',
            weightMin: '',
            weightMax: '',
            temperament: []
        })
/*     } else {
        alert('Oops! Something went wrong!');
    } */
        history.push('/home')
    }

    function handleDeleteTemperaments(el){  
        setInput({...input, temperament: input.temperament.filter(tem => tem !== el)}) 
       }

    return(
        <div>
            <Link to= '/home'><button>Go back</button></Link>
            <h1>Create your own dog</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                        type= 'text'
                        value= {input.name}
                        name= 'name'
                        onChange={(e)=>handleChange(e)}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type= 'text'
                        value= {input.image}
                        name= 'image'
                        onChange={(e)=>handleChange(e)}
                    />
                    {errors.image && (
                        <p className='error'>{errors.image}</p>
                    )}
                </div>
                <div>
                    <label>Life Span:</label>
                    <input
                        type= 'number'
                        value= {input.life_span}
                        name= 'life_span'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Minimum height:</label>
                    <input
                        type= 'number'
                        value= {input.heightMin}
                        name= 'heightMin'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Maximum height:</label>
                    <input
                        type= 'number'
                        value= {input.heightMax}
                        name= 'heightMax'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Minimum weight:</label>
                    <input
                        type= 'number'
                        value= {input.weightMin}
                        name= 'weightMin'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Maximum weight:</label>
                    <input
                        type= 'number'
                        value= {input.weightMax}
                        name= 'weightMax'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <select onChange={(e) => handleSelectTemperament(e)}>
                <option value=''>Choose temperaments</option>
                    {temperaments.map((temp) => (
                        <option value={temp.name}>{temp.name}</option>
                    ))}
                </select>
{/*                 <ul><li>{input.temperament.map(el => ' *' + el)}</li></ul> */}
            </form>
            {input.temperament.map(el =>
                <div className='divTemp'>
                    <p>{el}</p>
                    <button className='botonX' onClick={() => handleDeleteTemperaments(el)}>X</button>
                </div>    
                )}
            <button type='submit'>Create dog</button>
        </div>
    )
}