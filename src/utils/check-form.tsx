export default class CheckForm {
    // 验证非空
    static notEmpty(str: any) {
        return (typeof str !== 'undefined' && String(str).trim() !== '' && str !== null)
    }
}