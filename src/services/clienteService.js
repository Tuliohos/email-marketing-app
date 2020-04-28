import ApiService from './apiservice'
import ErroValidacao from '../exception/erroValidacao'

class ClienteService extends ApiService {

    buscar(token){
        return this.get('/client', token);
    }
}

export default ClienteService