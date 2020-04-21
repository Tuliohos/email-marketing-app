import React from 'react'

import Login from './views/login'
import CadastroEmpresa from './views/cadastroEmpresa'

import { Route, Switch, HashRouter } from 'react-router-dom'

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                {/* <Route path="/home" component={Home}/> */}
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-empresa" component={CadastroEmpresa}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas