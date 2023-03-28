import React from "react"
import { Loading } from "./Loading";

const SECURITY_CODE = 'paradigma';
 


class ClassState extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      error: false,
      loading: false,
      value: '',
    }
  }

  // UNSAFE_componentWillMount(){
  //   console.log("componentWillMount");
  // }

  // componentDidMount(){
  //   console.log("componentDidMount");
  // }

  componentDidUpdate(){
    console.log("Se actualizo");

    if (!!this.state.loading){

      setTimeout(() => {
        console.log('haciendo validacion');

        if ( SECURITY_CODE === this.state.value ){
          this.setState({ error: false});
        }else{
          this.setState({ error: true});
        }

        this.setState({loading: false});
        
        console.log('terminando validacion');
      }, 3000);

    }

  } 

  onInputChange = (e) =>{
    this.setState({value: e.target.value});
  }

  render() {

    const { loading, error, value } = this.state;

    return (
      <div>
        <h2>Eliminar {this.props.name}</h2>
        <p>Por favor, escribe el codigo de seguridad</p>

        {(error && !loading) && (
          <h1>Error: El codigo es incorrecto</h1>
        )}

        {loading && (
          <Loading />
        )}

        <input 
          placeholder="Codigo de seguridad" 
          value={value}
          onChange={this.onInputChange}
        />
        <button
          onClick={ () => this.setState( ({ loading: true }) ) }
        >
          Comprobar
        </button>
      </div>
    )
  }
}

export { ClassState }


