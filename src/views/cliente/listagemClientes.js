import React from 'react'
import ClienteService from '../../services/clienteService'
import {mensagemErro} from '../../components/toastr'
import Card from '../../components/card'
import {withRouter} from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

class ListagemClientes extends React.Component {

    state = {
        clientes: []
    }

    constructor() {
        super();
        this.service = new ClienteService();
        
    }

    componentDidMount(){

        const token = JSON.parse(localStorage.getItem('_xtoken'));

        this.service.buscar(token)
            .then(response => {
                this.setState({clientes: response.data['data']});
            }).catch( error => {
                mensagemErro("Não foi possível carregar sua listagem de clientes.")
            })
    }

    preparaFormularioCadastro = () => {
        this.props.history.push('/cadastro-cliente')
    }

    render(){

        return(
            <Card title="Clientes">
                <div className="row b-3">
                    <div className="col-md-12">
                        <button type="button" 
                            className="btn btn-success float-right"
                            onClick={this.preparaFormularioCadastro}>
                            <i className="pi pi-users"></i>
                            Cadastrar Cliente
                        </button>
                    </div>
                </div>
               
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <DataTable value={this.state.clientes}>
                                <Column field='email' header='E-mail' />
                                <Column field='name' header='Nome' />
                            </DataTable>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter (ListagemClientes)