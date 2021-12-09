import React from 'react';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getBreeds, filterBreedsByWeight, filterCreated, orderByName, filterTemperaments, getTemperaments} from '../../actions';
import {Link} from 'react-router-dom';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import style from "./Home.module.css"

export default function Home(){

    const dispatch = useDispatch(); // para ir despachando mis acciones
    const allBreeds = useSelector((state) => state.breeds) // lo mismo q hacer mapstatetoprops
    const temperaments = useSelector ((state) => state.temperaments)
    const [currentPage, setCurrentPage] = useState (1) //q me guarde la pag actual en un estado local y es 1 pq arranco en la primera página 
    const [breedsPerPage, /* setbreedsPerPage */] = useState (8) //q me guarde 9 paginas en esta otra constante en otro estado local 
    const [orden, setOrden] = useState ('')  //Estado local vacío
    const indexOfLastBreed = currentPage * breedsPerPage   //La pag actual en la q estoy x la cantidad de razas x pagina inicia en 8 (1*8)
    const indexOfFirstBreed = indexOfLastBreed - breedsPerPage //es 0 pq es 8-8=0, en la segunda pag va a ser 8, en la tercera 116
    const currentBreeds = allBreeds.slice(indexOfFirstBreed, indexOfLastBreed) //va a tener a las razas q estan en la pag actual, allBreed q es el arreglo del estado q me traigo con el useSelector q me trae del reducer el estado breeds, ese estado breeds me trae todos las razas
  
   const paginado = (pageNumber) => {    //le paso un número de pagina, esta constante ayuda al renderizado
     setCurrentPage(pageNumber)          //Seteo la pagina en ese número de página que es el número de pagina q voy apretando y cuando voy apretando todos los indexof cambian y el slice de la L22 se va a ir modificando.
   }


    useEffect(() => {  // traernos del estado las razas cuando el componente se monta
        dispatch(getBreeds())
        dispatch(getTemperaments())
    },[dispatch]) // para q no se nos genere un loop infinito

    function handleClick(e){
        e.preventDefault(); //para q no se rompa
        dispatch(getBreeds()) // por si se buggea, recargo todo
    }

    function handleFilterTemperaments(e){
        e.preventDefault()
        dispatch(filterTemperaments(e.target.value))
        setCurrentPage(1)
      }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }

    function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);  //Cuando se haga el ordenamiento q setee la pag en la primera
        setOrden(`Ordenado ${e.target.value}`)  //Cuando seteo en esta página 1, se modifique este estado local, q arranca vacio, pero ahora está seteado ordenado de tal forma, solo para q haga la modificación en el renderizado. si comento esta linea no funciona.
      }

    function handleFilterWeight(e){
        dispatch(filterBreedsByWeight(e.target.value))
        console.log(e.target.value)
        setCurrentPage(1)
    }

    return(
        <div className={style.home}>
            <Link to= '/breed' className={style.createbtn}> Create dog </Link>
 {/*            <h1> All dog's in one place</h1> */}
            <div>
            <select onChange={e => handleFilterTemperaments(e)}>
                <option value=''>Temperaments</option>
                {temperaments.map((el) => (<option key={el.id} value={el.name}>{el.name} </option>))}
            </select>
            <select onChange={e => handleFilterCreated(e)}>
                <option value= 'All'>All</option> 
                <option value= 'created'>Created</option>
                <option value= 'api'>Existing</option>
            </select>
            <select onChange={e => handleSort(e)}>
                <option value= ''> Alphabetical Sort</option> 
                <option value= 'asc'>A - Z</option> 
                <option value= 'desc'>Z - A</option>
            </select>
            <select onChange={e => handleFilterWeight(e)}>
                <option value= ''> Weight Sort </option> 
                <option value= 'more'>More/Less</option>
                <option value= 'less'>Less/More</option>
            </select>
            <Paginado
                breedsPerPage = {breedsPerPage} allBreeds = {allBreeds.length} paginado = {paginado} key = {paginado.toString()}
            />
            <SearchBar/>
            <div className={style.cardContainer}>
            {currentBreeds?.map((c) =>{
                    return (
                    <Link className={style.link} to={'/home/' + c.id}>
                    <Card name={c.name} image={c.image} weight={(c.createdInDb ? (c.weight_min + ' - ' + c.weight_max) : c.weight)} temperament={c.temperament} temperaments={c.temperaments} key={c.id}/>
                    </Link>
                    )
            })}
            </div>
            </div>
            <button className={style.reload} onClick={e => {handleClick(e)}}>
                Refresh
            </button>
        </div>
    )
}