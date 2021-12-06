import React from "react";

export default function Card({name, image, weight, temperament, temperaments}) { //como le paso esto por props no necesito traerme ningún estado pq ya tengo la lógica en el home 
    return (
        <div>
            <h3>{name}</h3>
            <img src={image} alt='img not found' width='180px' height='180px'/>
            <h6>Weight [Kg]: {weight}</h6>
            {<h6>Temperaments: {temperament ? temperament.map((e) => ( `${'*'+e} `)) : temperaments.map((e) => (`${'*'+e.name} `))}</h6>}
        </div>
    );
}