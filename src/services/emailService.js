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

        if(!email.campanha){
            erros.push('O campo Campanha é obrigatório.');
        }

        if(!email.assunto){
            erros.push('O campo Assunto é obrigatório.');
        }

        if(!email.conteudoEmail){
            erros.push('O campo Conteúdo do e-mail é obrigatório.');
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    obterListaClientes(responseData){
        let listaClientes = [];
        responseData.forEach(element => {
            listaClientes.push({label: element.name, value: element});
        });

        return listaClientes;
    }
}

export default EmailService