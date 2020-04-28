import axios from 'axios'

const baseURL = 'https://projeto-sd-api.herokuapp.com/';

const httpClient = axios.create({
    baseURL: baseURL,
    headers: {'Content-Type': 'multipart/form-data' }
})

class ApiService{

    post(url, objeto){
        const requestUrl = `${url}`
        return httpClient.post(requestUrl, objeto);
    }

    put(url, objeto){
        const requestUrl = `${url}`
        return httpClient.put(requestUrl, objeto);
    }

    delete(url){
        const requestUrl = `${url}`
        return httpClient.delete(requestUrl);
    }

    get(url, token){
        return axios.get(`${baseURL}${url}`, {
            headers: {'x-token': token}
        })
    }
}

export default ApiService