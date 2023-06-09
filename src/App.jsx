import { UseState } from './UseState';
import { ClassState } from './ClassState';
import './App.css'
import { UseReducer } from './UseReducer';


function App() {

  return (
    <div className="App">
      <UseState name="UseState" />
      {/* <ClassState name="ClassState" /> */}
      <UseReducer name="Use Reducer"  />
    </div>
  )
}

export default App
