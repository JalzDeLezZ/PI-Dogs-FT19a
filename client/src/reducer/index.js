const initialState = {
    breeds : [],
    backUpBreeds : [],  //con este estado, evito q al filtrar quede vacio para el siguiente filtro.
    temperaments: [],
    detail: []
}

function rootReducer (state= initialState, action){
 switch(action.type) {

  case 'GET_BREEDS': return {...state, breeds: action.payload, backUpBreeds: action.payload}

  case 'GET_TEMPERAMENT': return {...state, temperaments: action.payload}
  
  case 'GET_NAME_BREEDS': return {...state, breeds: action.payload}
  
  case 'POST_BREED': return {...state,} //No hace nada sólo devuelve el estado como está porq voy a crearlo en una ruta nueva, pero si o si tiene q estar en el reducer
  
  case 'GET_DETAILS': return {...state, detail: action.payload}

  case 'FILTER_BY_TEMPERAMENTS': {
  if (!action.payload) return { ...state, breeds: state.backUpBreeds};

     let filteredByTemperament = state.breeds.filter((e) => {
      if (e.createdInDb) return e.temperaments.some((a) => a.name === action.payload)
       return e.temperament.some((a) => a === action.payload)
      })
    return {...state, breeds: filteredByTemperament}
 }
  
  case 'FILTER_BY_WEIGHT': 
  if (action.payload === 'less') return { ...state, breeds: [...state.breeds].sort(function (a, b){
    if(Number(a.weight.split('-')[0]) > (Number(b.weight.split('-')[0] ))) return 1;
    if(Number(b.weight.split('-')[0]) > (Number(a.weight.split('-')[0] ))) return -1; 
    return 0;})}
  return { ...state, breeds: [...state.breeds].sort(function (a, b) {
    if(Number(a.weight.split('-')[0]) > (Number(b.weight.split('-')[0] ))) return -1;
    if(Number(b.weight.split('-')[0]) > (Number(a.weight.split('-')[0] ))) return 1
    return 0;
  })}

     
  case 'FILTER_CREATED': 
  const allBreeds2 = state.backUpBreeds
  const createdFilter = action.payload === 'created' ? allBreeds2.filter(e => e.createdInDb) : allBreeds2.filter(e => !e.createdInDb)
  return {
      ...state,
      breeds: action.payload === 'all' ? state.backUpBreeds : createdFilter
  }
  
  case 'ORDER_BY_NAME':
   let sortedArr1 = action.payload === 'asc' ? state.breeds.sort(function (a, b){
     if (a.name > b.name) return 1; //el a.name queda en la posición 1
     if (a.name < b.name) return -1; //el a.name queda en la posición -1 del array
     return 0;  //devuelve 0 si son iguales por lo q ambos quedan en la misma posición
   }) : state.breeds.sort(function (a, b){  //Si no es "asc" se ejecuta así q es "desc"
    if (a.name > b.name) return -1;
    if (a.name < b.name) return 1;
    return 0;
  })
   return { ...state, breeds: sortedArr1}
  
  default: return state;
 } 
}

export default rootReducer;