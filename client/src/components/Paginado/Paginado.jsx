import React from 'react';

export default function Paginado ({breedsPerPage, allBreeds, paginado}) { //por destructuring {} se lo paso como propiedades
    const pageNumbers = []  
    for (let i = 1; i <= Math.ceil(allBreeds/breedsPerPage); i++) {   
        pageNumbers.push(i);
    }

    return(   
        <nav>
            <div className='paginado'>
                <label> Pages: </label>
                {pageNumbers &&
                pageNumbers.map(number =>(
                    <button className='pagbtn' onClick={() => paginado(number)}> {number} </button>
                ))}
            </div>
        </nav>
    )
}