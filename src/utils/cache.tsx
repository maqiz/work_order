const PREFIX = 'cache_';

export default class Cache {
    static getItem(k: string | number): any{
        try {
            const result = localStorage.getItem(PREFIX + k)
            return typeof result === 'string' ? JSON.parse(result) : result
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

