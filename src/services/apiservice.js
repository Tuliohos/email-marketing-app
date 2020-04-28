import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'https://projeto-sd-api.herokuapp.com/',
    headers: {'Content-Type': 'multipart/form-data' }
})

class ApiService{

    post(url, objeto){
        const requestUrl = `${url}`
        return httpClient.post(requestUrl, objeto);
    }

    postWithToken(url, objeto, token){
        const requestUrl = `${url}`
        return httpClient.post(requestUrl, objeto, {
            headers: {'x-token': token}
        });
    }

    put(url, objeto){
        const requestUrl = `${url}`
        return httpClient.put(requestUrl, objeto);
    }

    delete(url){
        const requestUrl = `${url}`
        return httpClient.delete(requestUrl);
    }

    get(url){
        const requestUrl = `${url}`
        return httpClient.get(requestUrl);
    }

    getWithToken(url, token){
        const requestUrl = `${url}`
        return httpClient.get(requestUrl, {
            headers: {'x-token': token}
        })
    }
}

export default ApiService