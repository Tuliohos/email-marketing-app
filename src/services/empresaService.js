import ApiService from './apiservice'
import ErroValidacao from '../exception/erroValidacao'

class EmpresaService extends ApiService {

    autenticar(credenciais){
        return this.post('/singup', credenciais)
    }

    cadastrar(empresa){
        return this.post('/singin', empresa);
    }

    validar(empresa){

        const erros = []

        if(!empresa.razaoSocial){
            erros.push('O campo Razão Social é obrigatório.');
        }

        if(!empresa.cnpj){
            erros.push('O campo CNPJ é obrigatório.');
        }

        if(!empresa.ramo){
            erros.push('O campo Ramo é obrigatório.');
        }

        if(!empresa.email || !empresa.emailConfirmacao){
            erros.push('Preencha os campos E-mail e E-mail Confirmação.')
        }else if(!empresa.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Informe um E-mail válido');
        }else if(empresa.email !== empresa.emailConfirmacao){
            erros.push('Os e-mails não batem.');
        }

        if(!empresa.senha || !empresa.senhaConfirmacao){
            erros.push('Preencha os campos Senha e Repita a Senha')
        } else if (empresa.senha !== empresa.senhaConfirmacao){
            erros.push('As senhas não batem.')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }
}

export default EmpresaService