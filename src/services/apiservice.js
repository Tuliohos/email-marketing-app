import axios from 'axios'

const httpClient = axios.create({
    baseURL: "https://projeto-sd-api.herokuapp.com/",
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

    get(url){
        const requestUrl = `${url}`
        return httpClient.get(requestUrl)
    }
}

export default ApiService