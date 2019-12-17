// 表单验证

const regs = {
    number: /^[0-9]*$/,
    integer: /^[+]{0,1}(\d+)$/,
    figure: /^([1-9]\d*|0)(\.\d{1,2})?$/,
    char: /^[A-Za-z]+$/,
    bigChar: /[A-Z]/,
    chinese: /^[\u4e00-\u9fa5]+$/gi,
    anyChinese: /[\u4E00-\u9FA5\uF900-\uFA2D]/,
    mobile: /^1[3456789]{1}[0-9]{9}$/,
    phone: /^([+][0-9]{2,3}[-])?(\(\d{3,4}\)|\d{3,4}-|\s)?\d{6,8}$/,
    numChar: /^[A-Za-z0-9]+$/,
    blankSpace: /\s/,
    email: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
    password: /^[0-9A-Za-z]{6,20}$/,
    image: /^image\/(png|jpe?g|gif)$/,
    license: /(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4}))$)|(^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$)/,
    filepack: /^(.*zip.*)$/,
}

export default class CheckForm {
    // 验证非空
    static notEmpty(str) {
        return (typeof str !== 'undefined' && String(str).trim() !== '' && str !== null)
    }

    //非空验证
    static isPass(arg) {
        if (arg instanceof Array) {
            if (arg.length === 0) {
                return false
            }
            
            return arg.every((item) => {
                return typeof item !== 'undefined' && String(item).trim() !== '' && item !== null
            })
        } else {
            throw new Error('isPass参数类型错误！')
        }
    }

    // 限制长度
    static lengthLimit(str, minLen, maxLen) {
        let len = 0
        const strLen = str.length
        for (let i = 0; i < strLen; i += 1) {
            if (str[i].match(/[^x00-xff]/ig) !== null) {
                len += 2
            } else {
                len += 1
            }
        }
        if (!maxLen) return len >= minLen
        return (len >= minLen && len <= maxLen)
    }

    // 包含空格
    static hasBlankSpace(str) {
        return regs.blankSpace.test(str)
    }

    /** 基本格式验证 */


    // 验证数字 （包含0开头）
    static isNumber(str) {
        return regs.number.test(str)
    }

    // 验证正整数 （包括0）
    static isInteger(str) {
        return regs.integer.test(str)
    }

    // 验证正整数和小数
    static isFigure(str) {
        return regs.figure.test(str)
    }

    // 验证字母
    static isChar(str) {
        return regs.char.test(str)
    }

    // 验证所有为汉字
    static isChinese(str) {
        return regs.chinese.test(str)
    }

    // 验证有汉字
    static isAnyChinese(str) {
        return regs.anyChinese.test(str)
    }

    // 验证邮件格式
    static isEmail(str) {
        return regs.email.test(str)
    }

    // 验证手机号码格式
    static isMobile(str) {
        return regs.mobile.test(str)
    }

    // 验证电话号码
    static isPhone(str) {
        return regs.phone.test(str)
    }

    // 密码校验
    static isPassword(str) {
        return regs.password.test(str)
    }

    // 验证身份证号码
    static isIdCard(idCardNo) {
        return idCardNo && (/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(idCardNo))
    }

    //验证上传图片的类型
    static isImage(str) {
        return str && regs.image.test(str)
    }

    // 验证车牌号
    static isLicense(str) {
        return regs.license.test(str)
    }

    //验证rar zip压缩包
    static isFilepackage(str) {
        return str && regs.filepack.test(str)
    }
}