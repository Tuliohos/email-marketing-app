import ApiService from './apiservice'
import ErroValidacao from '../exception/erroValidacao'

class ClienteService extends ApiService {

    buscar(token){
        return this.getWithToken('/client', token);
    }

    cadastrar(cliente, token){
        return this.postWithToken('/client', cliente, token);
    }

    validar(cliente){

        const erros = []

        if(!cliente.nome){
            erros.push('O campo Nome é obrigatório.');
        }

        if(!cliente.email || !cliente.emailConfirmacao){
            erros.push('Preencha os campos E-mail e E-mail Confirmação.')
        }else if(!cliente.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Informe um E-mail válido');
        }else if(cliente.email !== cliente.emailConfirmacao){
            erros.push('Os e-mails não batem.');
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }
}

export default ClienteService