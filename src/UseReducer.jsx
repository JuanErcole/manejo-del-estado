import { useEffect, useReducer, useState } from "react";

const SECURITY_CODE = 'paradigma';

export const UseReducer = ({ name }) => {

  const [state, dispatch] = useReducer(reducer, initialState);
console.log(state);
  

  const onConfirm = () =>{
    dispatch({type: 'CONFIRM'})
  }

  const onError = () =>{
    dispatch({type: 'ERROR'})
  }

  useEffect(() => {

    if (!!state.loading){

      

      setTimeout(() => {
        console.log('haciendo validacion');

        if(state.value === SECURITY_CODE){
          onConfirm();
        } else{
          onError();
        }
        
        console.log('terminando validacion');
      }, 3000);

    }

    console.log('terminando el efecto');
  
  }, [state.loading])

  const onInputChange = (e) =>{
    dispatch({type: 'WRITE', payload: e.target.value})
  }

  const onCheck = () => {
    dispatch({type: 'CHECK'})
  }

  const onReset = () => {
    dispatch({type: 'RESET'})
  }

  const onDeleted = ()=>{
    dispatch({type: 'DELETED'})
  }

  
  if(!state.deleted && !state.confirmed){
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el codigo de seguridad</p>
  
        {state.error && (
          <h1>Error: El codigo es incorrecto</h1>
        )}
  
        {state.loading && (
          <h1>Cargando...</h1>
        )}
  
        <input
         placeholder="Codigo de seguridad" 
         value={state.value}
         onChange={onInputChange}
        />
        <button
          onClick={ onCheck }
        >
          Comprobar
        </button>
      </div>
    )
  } else if(!!state.confirmed && !state.deleted){
    return (
      <>
        <h2>Estado de confirmacion</h2>
        <h4>Desea borrar?</h4>
        <button 
          onClick={onDeleted}
        >
          SI
        </button>
        <button 
          onClick={onReset}
        >
          NO
        </button>
      </>
    )
  }else{
    return (
      <>
        <h3>Eliminado con exito</h3>
        <button 
          onClick={onReset}
        >
          RECUPERAR
        </button>
      </>
    )
  }
}


const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
}

const reducerObject = (state, payload) => ({

  'ERROR': {
    ...state,
    error: true,
    loading: false
  },
  'CHECK': {
    ...state,
    error: false,
    loading: true
  },
  'RESET': {
    ...state,
    value: "",
    confirmed: false,
    deleted: false
  },
  'CONFIRM': {
    ...state,
    error: false,
    loading: false,
    confirmed: true
  },
  'DELETED': {
    ...state,
    deleted: true
  },
  'WRITE':{
    ...state,
    value: payload
  }
})

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
}

