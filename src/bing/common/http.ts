import * as request from 'request'
import * as qs from 'querystring'

export default class http{
    private static setUrl(_url: string): string{
        if(_url.startsWith('http')){
            return _url
        }
        return 'http://' + _url;
    }

    public static async get(_url: string, params = {}): Promise<any>{
        return new Promise((resolve, reject) => {
            params['_'] = Math.random();
            let url = this.setUrl(_url)
            url += `?${qs.stringify(params)}` 
            var httpOptions = {
                url: url,
                method: 'get',
                headers: {
                    'Accept': 'application/json'
                }
            }
            
            request(httpOptions, function(err, res, body) {
                if (err) {
                    reject(err)
                } else {
                    try{
                        resolve(JSON.parse(body))
                    } catch(e){
                        resolve({})
                    }
                }
            })
        })
    }

    public static async post(_url: string, params: object = {}): Promise<any>{
        return new Promise((resolve, reject) => {
            let url = this.setUrl(_url)
            var httpOptions = {
                url: url,
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(params),
                form: params
            }
            
            request(httpOptions, function(err, res, body) {
                if (err) {
                    reject(err)
                } else {
                    try{
                        resolve(JSON.parse(body))
                    } catch(e){
                        resolve({})
                    }
                }
            })
        })
    }
}