import React from 'react'
import ClienteService from '../../services/clienteService'
import {mensagemErro} from '../../components/toastr'
import Card from '../../components/card'

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
//import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';

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
        this.props.history.push('/cadastro-lancamentos')
    }

    render(){

        return(
            <Card title="Clientes">
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

export default ListagemClientes