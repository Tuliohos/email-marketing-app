import React from 'react';

import 'bootswatch/dist/superhero/bootstrap.css'
import './custom.css'
import 'toastr/build/toastr.css'

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
