import {  SephoraEndpoints, SephoraURLOptions } from "../interface"

export class Sephora {
    // Singleton
    private static  baseLink = 'https://sephora.p.rapidapi.com/'
    private static options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '715cdd7baemshebc3d6b2e27d381p176df1jsnd7252b7ea217',
            'X-RapidAPI-Host': 'sephora.p.rapidapi.com'
        }
    }
    static load({ endpoint, queryPath = {} }: {endpoint: SephoraEndpoints, queryPath?: SephoraURLOptions }) 
    {
        return fetch(this.makeUrl(queryPath, endpoint), this.options)
        .then(this.errorHandler.bind(this))
        .then((res) => res.json())
        .catch(() => console.error(` Здравствуйте! В проекте использовался freemeum API (для карточек товаров) с лимитом в 500 запросов в месяц.
        Если товары перестанут грузиться, то ключ можно получить по ссылке (зайти через google и нажать Subscribe to test):
        https://rapidapi.com/apidojo/api/sephora/ (указан в разделе Header Parameters и используется для параметра X-RapidAPI-Key в модели Sephora.ts).
        После истечения лимита никаких платежей не будет, просто пойдут ошибки при загрузке (сталкивался неоднократно)`))
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
