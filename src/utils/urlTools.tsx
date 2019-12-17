// 获取地址上的所有参数转换为对象
export const fetchUrlParams = (url: string = window.location.href) => {
    const params = url.match(/([^?=&]+)(=([^(&|#)]*))/g)
    if (params === null) {
        return {}
    } else {
        return params.reduce(
            (a: any, v: string) => {
                a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)
                return a
            }, {}
        )
    }
}