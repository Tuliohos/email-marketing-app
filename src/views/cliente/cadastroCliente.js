import React from 'react'
import ClienteService from '../../services/clienteService'
import * as messages from '../../components/toastr'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import {withRouter} from 'react-router-dom'

class CadastroCliente extends React.Component{

    state = {
        nome: '',
        email: '',
        emailConfirmacao: '',
        informacoes: ''
    }
    
    constructor(){
        super();
        this.service = new ClienteService();
    }

    cadastrar = () => {
        const token = JSON.parse(localStorage.getItem('_xtoken'));
        const {nome, email, emailConfirmacao, informacoes} = this.state;
        const state = { nome, email, emailConfirmacao, informacoes };

        try{
            this.service.validar(state)
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        const cliente = new FormData();
        cliente.set('email', state.email);
        cliente.set('name', state.nome);

        this.service.cadastrar(cliente, token)
            .then(response => {
                this.props.history.push('/clientes');
                messages.mensagemSucesso('Cliente cadastrado com sucesso !')
            }).catch(error =>{
                messages.mensagemErro(error.response.data);
            });

    }

    cancelar = () => {
        this.props.history.push('/clientes');
    }
    
    render(){
        return(
            <Card title='Cadastro de Cliente'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">

                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="text"
                                id="inputNome"
                                className="form-control"
                                name="nome"
                                onChange={e => this.setState({nome: e.target.value})}/>
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

                        <FormGroup label="Informações: " htmlFor="inputInformacoes">
                            <input type="text"
                                id="inputInformacoes"
                                className="form-control"
                                name="informacoes"
                                onChange={e => this.setState({informacoes: e.target.value})}/>
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

export default withRouter(CadastroCliente)