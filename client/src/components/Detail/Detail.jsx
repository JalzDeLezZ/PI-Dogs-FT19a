import React from 'react';
import {useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getDetail} from '../../actions';
import {Link} from 'react-router-dom';

export default function Detail (props){
 //console.log(props)
 const dispatch = useDispatch() 

 useEffect(()=> {
  dispatch(getDetail(props.match.params.id))  //de esta forma accedo al id de ese detalle pasandole props a mi componente
},[dispatch]);

 const myBreed = useSelector ((state)=> state.detail)  //así me traigo el detalle desde el reducer 

 return (
  <div>
    <div>
        {myBreed.length > 0 ?
         <div>
             <h1>Name: {myBreed[0].name}</h1>
             <img src={myBreed[0].image} alt="" width="400px" height="250px"/>
             <h4>Temperaments: {!myBreed[0].createdInDb ? myBreed[0].temperament.join(' *'):  myBreed[0].temperaments.map(el => el.name + (' *'))}</h4> {/* este caso es para cuando la api y la DB traen diferente la info, entonces: myBreed no está creado en la DB? (o sea es de la api?), entonces q me traiga myBreed.genre pq en la api está como genre y es un array de strings le agrego un espacio pq sino las trae todas pegadas.Si no q mapee el genres de la DB q es un array de obj*/}
             <h4>Life span: {myBreed[0].life_span}</h4> 
             <h4>Height [cm]: {myBreed[0].height}</h4>  
             <h4>Weight [Kg]: {myBreed[0].weight}</h4>
         </div> : <p>Loading...</p>
        }
        <Link to= '/home'>
            <button>Go back</button>
        </Link>
    </div>
  </div>
 )
}