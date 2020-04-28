import React from 'react'
import {withRouter} from 'react-router-dom'

import EmailService from '../services/emailService'
import ClienteService from '../services/clienteService'

import * as messages from '../components/toastr'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import {InputTextarea} from 'primereact/inputtextarea'
import {MultiSelect} from 'primereact/multiselect'

class CadastroEmail extends React.Component{

    state = {
        clientes: [],
        campanha: '',
        assunto: '',
        conteudoEmail: '',
        opcoesClientes: [],
        token: ''
    }

    constructor(){
        super();
        this.service = new EmailService();
        this.clienteService = new ClienteService();
    }

    cadastrar = () => {
        const {clientes, campanha, assunto, conteudoEmail, opcoesClientes} = this.state;
        const state = { clientes, campanha, assunto, conteudoEmail, opcoesClientes };

        try{
            this.service.validar(state)
        }catch(erro){
            const msgs = erro.mensagens;
            msgs.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        const emailCreate = new FormData();
        emailCreate.set('message', this.state.conteudoEmail);
        emailCreate.set('users', this.state.clientes);

        this.service.cadastrar(emailCreate, this.state.token)
            .then(response => {
                this.props.history.push('/clientes');
                messages.mensagemSucesso('E-mail cadastrado com sucesso !')
            }).catch(error =>{
                messages.mensagemErro(error.response.data);
            });
    }

    cancelar = () => {
        this.props.history.push('/clientes');
    }

    render(){

        const token = JSON.parse(localStorage.getItem('_xtoken'));

        this.clienteService.buscar(token)
            .then(response => {
                const opcoes = this.service.obterListaClientes(response.data['data']);
                this.setState({opcoesClientes: opcoes, token: token});
            }).catch( error => {
                messages.mensagemErro("Não foi possível carregar a listagem de clientes.")
            });
        
        return(
            <Card title='Cadastro de E-mail'>

                <div className="row">
                    <div className="col-md-3">

                        <FormGroup label="Clientes: " htmlFor="inputClientes">
                            <MultiSelect value={this.state.clientes} 
                                id="inputClientes"
                                className="form-control"
                                options={this.state.opcoesClientes}
                                onChange={(e) => this.setState({clientes: e.value})} />
                        </FormGroup>

                    </div>
                </div>

                <div className="row">

                    <div className="col-md-6">
                        <FormGroup label="Campanha: *" htmlFor="inputCampanha">
                            <input type="text"
                                id="inputCampanha"
                                className="form-control"
                                name="campanha"
                                onChange={e => this.setState({campanha: e.target.value})}/>
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup label= "Assunto: *" htmlFor="inputAssunto">
                            <input type="text"
                                id="inputAssunto"
                                className="form-control"
                                name="assunto"
                                onChange={e => this.setState({assunto: e.target.value})}/>
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup label= "Conteúdo do e-mail: *" htmlFor="inputConteudoEmail">
                            <InputTextarea 
                                rows={10}
                                cols={70} 
                                id="inputConteudoEmail"
                                value={this.state.conteudoEmail} 
                                onChange={(e) => this.setState({conteudoEmail: e.target.value})} />
                        </FormGroup>
                    </div>
                </div>

                <button type="button" className="btn btn-success" onClick={this.cadastrar}>Salvar</button>
                <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>

            </Card>
        )
    }
    
}

export default withRouter(CadastroEmail)