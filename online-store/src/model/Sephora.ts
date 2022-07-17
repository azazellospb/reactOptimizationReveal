import {  SephoraEndpoints, SephoraURLOptions } from "../interface"

export class Sephora {
    // Singleton
    private static  baseLink = 'https://sephora.p.rapidapi.com/'
    private static options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3b9a3d512fmshd8a8642d1524aa7p146d05jsn399e169cda6e',
            'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
        }
    }
    static load({ endpoint, queryPath = {} }: {endpoint: SephoraEndpoints, queryPath?: SephoraURLOptions }) 
    {
        return fetch(this.makeUrl(queryPath, endpoint), this.options)
        .then(this.errorHandler.bind(this))
        .then((res) => res.json())
        .catch((err) => console.error(err))
    }
    static errorHandler(res: Response) 
    {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`)
            throw Error(res.statusText)
        }
        return res
    }
    static makeUrl(queryPath: SephoraURLOptions, endpoint: SephoraEndpoints) 
    {
        const queryToURL = { ...queryPath }
        let url = `${this.baseLink}${endpoint}?`

        Object.keys(queryToURL).forEach((key) => {
            url += `${key}=${queryToURL[key]}&`
        })
        return url.slice(0, -1)
    }
}
