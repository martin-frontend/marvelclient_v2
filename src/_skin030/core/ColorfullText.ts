import { amountFormat } from "@/core/global/Functions";

/**
 * 获取钱的颜色
 * @param str 传入的值
 * @returns 颜色类
 */
export function getMoneyColor(str: any): string {
    if (!str) return "";
    let amount = 0;
    if (typeof str == "string") {
        const newstr = str.replace("$", "");
        amount = Number(newstr);
    } else {
        amount = str;
    }
    if (amount == 0) {
        return "";
    }
    if (amount < 0) {
        return "red--text";
    } else if (amount > 0) {
        return "textGreen--text";
    }
    return "";
    //return (!!str && str.search('-') == -1) ? "textGreen--text" : "red--text";
}
/**
 * 取得钱的文本值
 * @param str 传入钱的金额
 * @returns + -的文本
 */
export function getMoneyValue(str: any, decimalLang: number = 2, isautoUsdt: boolean = false): string {
    if (!str) return str;
    let amount = 0;
    if (typeof str == "string") {
        const newstr = str.replace("$", "");
        amount = Number(newstr);
        if (!amount) return str;
    } else {
        amount = str;
    }
    if (amount == 0) {
        return str;
    }
    let newstr = str;
    if (typeof str == "number") {
        newstr = str + "";
    }

    //console.log("--计算的结果",newstr);
    if (!!newstr && newstr.search("-") == -1) return "+" + amountFormat(newstr, true, decimalLang, isautoUsdt);
    return amountFormat(newstr, true, decimalLang, isautoUsdt);
}
