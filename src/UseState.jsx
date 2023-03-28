import { useEffect, useState } from "react";

const SECURITY_CODE = 'paradigma';

export const UseState = ({ name }) => {

  const [state, setState] = useState({
    value: '',
    error: false,
    isLoading: false,
    deleted: false,
    confirmed: false 
  })
  // const [value, setValue] = useState('');
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  

  useEffect(() => {

    if (!!state.isLoading){
      
      setState({ ...state, error: false });

      setTimeout(() => {
        console.log('haciendo validacion');

        if(state.value === SECURITY_CODE){
          setState({ ...state, error: false, isLoading: false, confirmed: true });
        } else{
          setState({...state, isLoading: false, error: true});
        }
        
        console.log('terminando validacion');
      }, 3000);

    }

    console.log('terminando el efecto');
  
  }, [state.isLoading])

  const onInputChange = (e) =>{
    setState({ ...state, value: e.target.value });
  }
  
  if(!state.deleted && !state.confirmed){
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el codigo de seguridad</p>
  
        {state.error && (
          <h1>Error: El codigo es incorrecto</h1>
        )}
  
        {state.isLoading && (
          <h1>Cargando...</h1>
        )}
  
        <input
         placeholder="Codigo de seguridad" 
         value={state.value}
         onChange={onInputChange}
        />
        <button
          onClick={ () => setState({ ...state, isLoading: true}) }
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
          onClick={ 
            ()=> setState({ 
              ...state, 
              deleted: true 
            })
          }
        >
          SI
        </button>
        <button 
          onClick={
             ()=> setState({ 
              ...state, 
              value:"", 
              confirmed: false 
            })
          }
        
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
          onClick={ 
            ()=> setState({ 
              ...state, 
              value:"", 
              confirmed: false, 
              deleted: false 
            })
          }
        >
          RECUPERAR
        </button>
      </>
    )
  }
}
