import ApiService from './apiservice'
import ErroValidacao from '../exception/erroValidacao'

class EmailService extends ApiService {

    cadastrar(email, token){
        return this.postWithToken('/email', email, token);
    }

    validar(email){

       const erros = []

        if(!email.clientes || email.clientes.length < 1){
            erros.push('Selecione ao menos um cliente na listagem');
        }

        if(!email.nome){
            erros.push('O campo Nome da Campanha é obrigatório.');
        }

        if(!email.assunto){
            erros.push('O campo Nome da Campanha é obrigatório.');
        }

        if(!email.corpoEmail){
            erros.push('O campo Nome da Campanha é obrigatório.');
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    obterListaClientes(responseData){
        let listaClientes= [];

        responseData.forEach(element => {
            listaClientes.push({label: element.name, value: element});
        });

        return listaClientes;
    }
}

export default EmailService