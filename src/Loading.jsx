import React from "react"

class Loading extends React.Component {


  componentWillUnmount(){
    console.log("componentWillUnmount");
  }

  render() {

    return (
      <h1>Loading...</h1>
    )
  }
}

export { Loading }



