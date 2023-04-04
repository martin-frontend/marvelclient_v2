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
export function getMoneyValue(str: any): string {
    if (!str) return str;
    let amount = 0;
    if (typeof str == "string") {
        const newstr = str.replace("$", "");
        amount = Number(newstr);
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

    if (!!newstr && newstr.search("-") == -1) return "+" + newstr;
    return newstr;
}
