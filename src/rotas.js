import React from 'react'

import Login from './views/login'
import CadastroEmpresa from './views/cadastroEmpresa'
import ListagemClientes from './views/cliente/listagemClientes'
import CadastroCliente from './views/cliente/cadastroCliente'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

function Rotas(){
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/login"/> }/>
                <Route path="/login" component={Login}/>
                <Route path="/cadastro-empresa" component={CadastroEmpresa}/>
                <Route path="/clientes" component={ListagemClientes}/>
                <Route path="/cadastro-cliente" component={CadastroCliente}/>
            </Switch>
        </HashRouter>
    )
}

export default Rotas