const PREFIX = 'cache_';

export default class Cache {
    static getItem(k: string | number): any{
        try {
            // const result: string | null = localStorage.getItem(PREFIX + k)
            // if( result ) {
            //     console.log(result, JSON.parse(result))
            //     return JSON.parse(result)
            // } else {
            //     return ''
            // }
            return localStorage.getItem(PREFIX + k)
        } catch (e) {
            return undefined
        }
    }

    static setItem(k: string | number, v: any) {
        const d = typeof v === 'string' ? v : JSON.stringify(v)
        localStorage.setItem(PREFIX + k, d)
    }

    static removeItem(k: string | number) {
        localStorage.removeItem(PREFIX + k)
    }

    static clear() {
        Object.keys(localStorage).filter(i => i.startsWith(PREFIX)).forEach(j => localStorage.removeItem(j))
    }
}

