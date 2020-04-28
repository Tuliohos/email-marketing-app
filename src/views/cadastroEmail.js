import React from 'react'
import {withRouter} from 'react-router-dom'

import EmailService from '../services/emailService'
import ClienteService from '../services/clienteService'

import * as messages from '../components/toastr'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import SelectMenu from '../components/select-menu'
import InputTextarea from 'primereact/inputtextarea'

class CadastroEmail extends React.Component{

    state = {
        clientes: [],
        campanha: '',
        assunto: '',
        conteudoEmail: '',
        opcoesClientes: [] 
    }

    constructor(){
        super();
        this.service = new EmailService();
        this.clienteService = new ClienteService();
    }

    componentDidMount(){

        const token = JSON.parse(localStorage.getItem('_xtoken'));

        this.clienteService.buscar(token)
            .then(response => {
                this.setState({opcoesClientes: this.service.obterListaClientes(response.data['data']), token: token});
            }).catch( error => {
                messages.mensagemErro("Não foi possível carregar a listagem de clientes.")
            })
    }

    cadastrar = () => {
        const {nome, email, emailConfirmacao, informacoes} = this.state;
        const state = { nome, email, emailConfirmacao, informacoes };

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
        
        return(
            <Card title='Cadastro de E-mail'>
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">

                    <FormGroup label="Clientes: " htmlFor="inputClientes">
                            <SelectMenu id="inputClientes"
                                lista={this.state.opcoesClientes} 
                                className="form-control"
                                name="clientes"
                                value={this.state.clientes}
                                onChange={e => this.setState({clientes: e.target.value})}/>
                        </FormGroup>

                        <FormGroup label="Campanha: *" htmlFor="inputCampanha">
                            <input type="text"
                                id="inputCampanha"
                                className="form-control"
                                name="campanha"
                                onChange={e => this.setState({campanha: e.target.value})}/>
                        </FormGroup>

                        <FormGroup label= "Assunto: *" htmlFor="inputAssunto">
                            <input type="text"
                                id="inputAssunto"
                                className="form-control"
                                name="assunto"
                                onChange={e => this.setState({assunto: e.target.value})}/>
                        </FormGroup>

                        <FormGroup label= "Conteúdo do e-mail: *" htmlFor="inputConteudoEmail">
                            <InputTextarea 
                                rows={10}
                                cols={80} 
                                id="inputConteudoEmail"
                                value={this.state.conteudoEmail} 
                                onChange={(e) => this.setState({conteudoEmail: e.target.value})} />
                        </FormGroup>s

                        <button type="button" className="btn btn-success" onClick={this.cadastrar}>Salvar</button>
                        <button onClick={this.cancelar} type="button" className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </div>
            </Card>
        )
    }
    
}

export default withRouter(CadastroEmail)