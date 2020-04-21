import React from 'react';

import 'bootswatch/dist/superhero/bootstrap.css'
import './custom.css'

import Rotas from './rotas'

class App extends React.Component{
  render(){
    return (
      <>
        <div className="container">
          <Rotas  />
        </div>
      </>
    );
  }
  
}

export default App;
