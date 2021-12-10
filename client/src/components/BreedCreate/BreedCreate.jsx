import React from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {postBreed, getTemperaments} from '../../actions';
import style from './create.module.css';

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
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector((state) => state.temperaments);
    const [errors, setErrors] = useState ({})

    const [input, setInput] = useState({
        name: '',
        image: '',
        height_min: '',
        height_max: '',
        weight_min: '',
        weight_max: '',
        life_span: '',
        temperament: []
    })

    useEffect(() => {
        dispatch(getTemperaments());
    }, [])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        console.log(input)
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value],
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postBreed(input))
        alert('Dog created :)')
        setInput({
            name: '',
            image: '',
            height_min: '',
            height_max: '',
            weight_min: '',
            weight_max: '',
            life_span: '',
            temperament: []
        })
        history.push('./home')
    }

    function handleDeleteTemperaments(el){  
        setInput({...input, temperament: input.temperament.filter(tem => tem !== el)}) 
    }

    return (
        <div>
            <NavLink to= '/home' ><button className={style.backBtn}>Go back</button></NavLink>
            <h1>Create your own dog</h1>
            <section className={style.form}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                        className= {style.control}
                        type= 'text'
                        value= {input.name}
                        name= 'name'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        className= {style.control}
                        type= 'text'
                        value= {input.image}
                        name= 'image'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Minimum height:</label>
                    <input 
                        className= {style.control}
                        type= 'number'
                        value= {input.height_min}
                        name= 'height_min'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Maximum height:</label>
                    <input 
                        className= {style.control}
                        type= 'number'
                        value= {input.height_max}
                        name= 'height_max'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Minimum weight:</label>
                    <input 
                        className= {style.control}
                        type= 'number'
                        value= {input.weight_min}
                        name= 'weight_min'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Maximum weight:</label>
                    <input 
                        className= {style.control}
                        type= 'number'
                        value= {input.weightMax}
                        name= 'weight_max'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                    <label>Life span:</label>
                    <input 
                        className= {style.control}
                        type= 'text'
                        value= {input.life_span}
                        name= 'life_span'
                        onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div>
                <select className= {style.control} onChange={(e) => handleSelect(e)}>
                <option value=''>Choose temperaments</option>
                    {temperaments.map((temp) => (
                        <option value={temp.name}>{temp.name}</option>
                    ))}
                </select>
                <button type='submit' onSubmit={(e) => handleSubmit(e)}>Create dog!</button>
                </div>
            </form>
            {input.temperament.map(el =>
                <div className='divTemp'>
                    <p>{el}</p>
                    <button className='botonX' onClick={() => handleDeleteTemperaments(el)}>X</button>
                </div>    
                )}

            </section>
        </div>
    )

}