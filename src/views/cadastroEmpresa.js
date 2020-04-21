import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import {withRouter} from 'react-router-dom'

class CadastroEmpresa extends React.Component{

    state = {
        razaoSocial: '',
        cnpj: '',
        ramo: '',
        email: '',
        emailConfirmacao: '',
        senha: '',
        senhaConfirmacao: ''
    }

    cadastrar = () => {
        console.log(this.state);
    }

    cancelar = () => {
        this.props.history.push('/login');
    }
    
    render(){
        return(
            <Card title='Cadastro de Empresa'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <FormGroup label="Razão social: *" htmlFor="inputRazaoSocial">
                            <input type="text"
                                id="inputRazaoSocial"
                                className="form-control"
                                name="razaoSocial"
                                onChange={e => this.setState({razaoSocial: e.target.value})}/>
                        </FormGroup>
                        <FormGroup label="CNPJ: *" htmlFor="inputCnpj">
                            <input type="text"
                                id="inputCnpj"
                                className="form-control"
                                name="cnpj"
                                onChange={e => this.setState({cnpj: e.target.value})}/>
                        </FormGroup>
                        <FormGroup label="Ramo: *" htmlFor="inputRamo">
                            <input type="text"
                                id="inputRamo"
                                className="form-control"
                                name="ramo"
                                onChange={e => this.setState({ramo: e.target.value})}/>
                        </FormGroup>
                        <FormGroup label= "E-mail: *" htmlFor="inputEmail">
                            <input type="email"
                                id="inputEmail"
                                className="form-control"
                                name="email"
                                onChange={e => this.setState({email: e.target.value})}/>
                        </FormGroup>
                        <FormGroup label= "Confirmar e-mail: *" htmlFor="inputConfirmarEmail">
                            <input type="email"
                                id="inputConfirmarEmail"
                                className="form-control"
                                name="emailConfirmacao"
                                onChange={e => this.setState({emailConfirmacao: e.target.value})}/>
                        </FormGroup>
                        <FormGroup label= "Senha: *" htmlFor="inputSenha">
                            <input type="password"
                                id="inputSenha"
                                className="form-control"
                                name="senha"
                                onChange={e => this.setState({senha: e.target.value})}/>
                        </FormGroup>
                        <FormGroup label= "Confirmar senha: *" htmlFor="inputConfirmarSenha">
                            <input type="password"
                                id="inputConfirmarSenha"
                                className="form-control"
                                name="senhaConfirmacao"
                                onChange={e => this.setState({senhaConfirmacao: e.target.value})}/>
                        </FormGroup>
                        <button type="button" className="btn btn-success" onClick={this.cadastrar}>Salvar</button>
                        <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </div>
            </Card>
        
        )
    }
}

export default withRouter(CadastroEmpresa)