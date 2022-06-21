import GlobalVar from "./GlobalVar";
/**
 * 全局属性和方法
 */

/**
 * 格式化日期
 * @param d
 * @param fmt
 */
export function dateFormat(d: Date, fmt: string): string {
    const o = {
        "M+": d.getMonth() + 1, //月份
        "d+": d.getDate(), //日
        "h+": d.getHours(), //小时
        "m+": d.getMinutes(), //分
        "s+": d.getSeconds(), //秒
        "q+": Math.floor((d.getMonth() + 3) / 3), //季度
        S: d.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (const k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            // @ts-ignore
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return fmt;
}
/**
 * 获取今日零点时间
 * @offset 偏移天数
 * @offsetSecond 偏移秒
 */
export function getTodayOffset(offset: any = 0, offsetSecond: any = 0): Date {
    const d = new Date(new Date().toLocaleDateString());
    d.setTime(d.getTime() + 3600 * 1000 * 24 * offset - offsetSecond);
    return d;
}

/**
 * 去掉空属性/空符串，并返回一个新对象
 */
export function objectRemoveNull(obj: any, except: any[] = [undefined, null, ""]): any {
    const result: any = {};
    for (const c of Object.keys(obj)) {
        if (!except.includes(obj[c])) {
            result[c] = obj[c];
        }
    }
    return result;
}

/**
 * 取得版本號
 */
export function getVersion(): string {
    let v = "";
    // @ts-ignore
    const compiletype = process.env.VUE_APP_ENV;
    if (compiletype === "development") {
        v += "dev";
    } else if (compiletype === "production") {
        v += "P";
    } else {
        v += "T";
    }
    v += "-" + "[AIV]{date}[/AIV]";
    return v;
}
/**
 * 取得本周一、本周日日期
 */
export function getThisWeekRange(): any {
    const date = new Date();
    // 本周一日期
    date.setDate(date.getDate() - date.getDay() + 1);
    const startDate = core.dateFormat(date, "yyyy-MM-dd");
    // 本周日日期
    date.setDate(date.getDate() + 6);
    const endDate = core.dateFormat(date, "yyyy-MM-dd");
    return [startDate, endDate];
}

/**
 * 取得上周一、上周日日期
 */
export function getLastWeekRange() {
    const date = new Date();
    // 上周一日期
    date.setDate(date.getDate() - 7 - date.getDay() + 1);
    const startDate = core.dateFormat(date, "yyyy-MM-dd");
    // 上周日日期
    date.setDate(date.getDate() + 6);
    const endDate = core.dateFormat(date, "yyyy-MM-dd");
    return [startDate, endDate];
}

/**
 * 取得本月日期
 */
export function getThisMonthRange() {
    const date = new Date();
    // 本月开始日期
    date.setDate(1);
    const startDate = core.dateFormat(date, "yyyy-MM-dd");
    // 本月结束日期
    date.setMonth(date.getMonth() + 1);
    date.setDate(0);
    const endDate = core.dateFormat(date, "yyyy-MM-dd");
    return [startDate, endDate];
}

// /**
//  * 格式化字符串
//  * @param str
//  * @param args
//  * @constructor
//  */
// export function stringFormat(str: string, ...args: any): string {
//     var i = 0;
//     while (args.length > 0) {
//         var pa = args.shift();
//         var reg = "$" + i;
//         str = str.replace(reg, pa);
//         i++;
//     }
//     return str;
// }
// /**
//  * 转换成货币格式
//  */
export function moneyFormat(s: any, symbol: string = "$"): string {
    if (!s) s = 0;
    s = s.toString();
    if (/[^0-9\.]/.test(s)) return "invalid value";
    s = s.replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    const re = /(\d)(\d{3},)/;
    while (re.test(s)) s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    return symbol + s.replace(/^\./, "0.");
}

// /**
//  * 获取UUID
//  */
// export function generateUUID() {
//     var d = new Date().getTime();
//     var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
//         var r = (d + Math.random() * 16) % 16 | 0;
//         d = Math.floor(d / 16);
//         return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
//     });
//     return uuid;
// }

// /**
//  * 获取字符串和真实长度。全角字符长度为2
//  */
// export function getStringLength(str: string): number {
//     var length = str.length;
//     var realLength = 0;
//     for (var i = 0; i < length; i++) {
//         var charCode = str.charCodeAt(i);
//         if (charCode >= 0 && charCode <= 128) {
//             realLength += 1;
//         } else {
//             realLength += 2;
//         }
//     }
//     return realLength;
// }

// /**
//  * 显示长字段时，在后面加上...
//  */
// export function getLimitString(str: string, len: number) {
//     str = str.replace(/\n/g, "...");
//     var length = str.length;
//     var realLength = 0;
//     for (var i = 0; i < length; i++) {
//         var charCode = str.charCodeAt(i);
//         if (charCode >= 0 && charCode <= 128) {
//             realLength += 1;
//         } else {
//             realLength += 2;
//         }
//         if (realLength >= len) {
//             return str.substring(0, i) + "...";
//         }
//     }
//     return str;
// }

// /**
//  * 获取URL参数
//  * @param value
//  */
// export function getQueryVariable(value: string): string | null {
//     const query = window.location.search.substring(1);
//     const vars = query.split("&");
//     for (const item of vars) {
//         const pair = item.split("=");
//         if (pair[0] === value) {
//             return pair[1];
//         }
//     }
//     return null;
// }

// /**
//  * 将对象转换为Http请求的form表单数据
//  * @param obj
//  */
// export function getFormWithObject(obj: any) {
//     const fData = new FormData();
//     for (const key of Object.keys(obj)) {
//         if (key != "hideLoading" && obj[key] !== undefined && obj[key] !== null) {
//             fData.append(key, obj[key]);
//         }
//     }
//     return fData;
// }

// /**
//  * 验证数值是否为正数
//  * @param value
//  */
// export function checkPositiveValue(e: any) {
//     const Regx = /^([0-9]{1,}|[0-9]{1,}[.][0-9]*)$/;
//     if (!Regx.test(e.target.value)) {
//         // Message.warning("请输入正整数");
//         e.target.value = 0;
//     }
// }

/**
 * 验证用户名是否合法
 * @param value
 */
export function checkUserName(value: string): boolean {
    const Regx = /^[A-Za-z0-9]*$/;
    return value.length >= 4 && value.length <= 20 && Regx.test(value);
}

/**
 * 验证密码是否合法
 * @param value
 */
export function checkUserPassword(value: string): boolean {
    // const Regx = /^[A-Za-z0-9]*$/;
    // const Regx = new RegExp("(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}");
    return value.length >= 6 && value.length <= 20; // && Regx.test(value);
}

/**
 * 验证手机号是否合法
 * @param value
 */
export function checkPhone(value: string): boolean {
    // const Regx = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
    const Regx = /^[1-9]+[0-9]*]*$/;
    return value.length >= 7 && value.length <= 11 && Regx.test(value);
}

/**
 * 验证邮箱是否合法
 * @param value
 */
export function checkMail(value: string): boolean {
    // const Regx = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
    const Regx = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return Regx.test(value);
}
/**验证验证码是否合法 */
export function checkVerifyVode(value: string): boolean {
    // const Regx = /^[0-9]*$/;
    return value.length >= 4 && value.length <= 6; //  && Regx.test(value);
}

// /**
//  * 是否为移动设备
//  */
// export function isMobile() {
//     const flag = navigator.userAgent.match(
//         /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
//     );
//     return flag;
// }

// /**
//  * Check if an element has a class
//  * @param {HTMLElement} elm
//  * @param {string} cls
//  * @returns {boolean}
//  */
// export function hasClass(ele: HTMLElement, cls: string) {
//     return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
// }

// /**
//  * Add class to element
//  * @param {HTMLElement} elm
//  * @param {string} cls
//  */
// export function addClass(ele: HTMLElement, cls: string) {
//     if (!hasClass(ele, cls)) ele.className += " " + cls;
// }

// /**
//  * Remove class from element
//  * @param {HTMLElement} elm
//  * @param {string} cls
//  */
// export function removeClass(ele: HTMLElement, cls: string) {
//     if (hasClass(ele, cls)) {
//         const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
//         ele.className = ele.className.replace(reg, " ");
//     }
// }
// /**
//  * @param {string} path
//  * @returns {Boolean}
//  */
// export function isExternal(path: string): boolean {
//     return /^(https?:|mailto:|tel:)/.test(path);
// }

// /**
//  * 获取最近几天时间
//  */
// export function getDateRange(days: number): string[] {
//     if (days >> 0 < 1) throw "must > 1";
//     const today = new Date(new Date().toLocaleDateString());
//     const begin = new Date(today);
//     begin.setDate(today.getDate() - (days - 1));
//     const end = new Date(today);
//     end.setDate(today.getDate() + 1);
//     return [formatDateByOffset(begin, "yyyy-MM-dd hh:mm:ss"), formatDateByOffset(end, "yyyy-MM-dd hh:mm:ss")];
// }

// /**
//  * 获取不同时区下的时间
//  */
// export function formatDateByOffset(d: Date, fmt: string = "yyyy-MM-dd"): string {
//     const offset = d.getTimezoneOffset() / 60;
//     var localTime = d.getTime();
//     var localOffset = d.getTimezoneOffset() * 60000;
//     var utc = localTime + localOffset;
//     var calctime = utc - 3600000 * offset;
//     var nd = new Date(calctime);
//     return dateFormat(nd, fmt);
// }

// /**
//  * 表单跟原数据对比，提取变化的数据
//  * @param obj 表单数据
//  * @param source 源数据
//  */
// export function formCompared(obj: any, source: any, except: string[] = []): any {
//     const result: any = {};

//     for (const c of Object.keys(obj)) {
//         if (obj[c] && typeof obj[c] == "object") {
//             if (except.includes(c) || JSON.stringify(obj[c]) != JSON.stringify(source[c])) {
//                 result[c] = JSON.stringify(obj[c]);
//             }
//         } else if (except.includes(c) || obj[c] != source[c]) {
//             result[c] = obj[c];
//         }
//     }
//     return objectRemoveNull(result, [undefined, null]);
// }

// /**
//  * 检测是否为json
//  * @param str
//  */
// export function isJsonString(str: string): boolean {
//     try {
//         if (typeof JSON.parse(str) == "object") {
//             return true;
//         }
//     } catch (e) {
//         console.log("not json");
//     }
//     return false;
// }
// /**
//  * json字符串转对象
//  * @param str
//  */
// export function jsonToObject(str: string): any {
//     try {
//         var obj = eval("(" + str + ")");
//         return obj;
//     } catch (e) {
//         return {};
//     }
// }
// /**
//  * 将对象或者字符串转换为json字符串
//  * @param value
//  */
// export function jsonStringify(value: any): string {
//     if (typeof value == "string") {
//         return JSON.stringify(JSON.parse(value));
//     }
//     return JSON.stringify(value);
// }

// /**
//  * 去除重复字串
//  * @param data 数组资料
//  * @param targetKey 目标字串
//  * @param splitStr 分割字串
//  */
// export function removeRepeatStr(data: any[], targetKey: string, splitStr: string) {
//     let list = "";
//     let dict: any = {};
//     for (let i = 0; i < data.length; i++) {
//         Object.keys(data[i]).map((key: any) => {
//             if (key == targetKey) {
//                 let value = data[i][key];
//                 if (!dict[value]) {
//                     dict[value] = 1;
//                     if (i < data.length - 1) {
//                         list += data[i][key] + splitStr;
//                     } else {
//                         list += data[i][key];
//                     }
//                 }
//             }
//         });
//     }
//     return list;
// }

// /**
//  * 取得数组的第一笔key
//  * @param options 数组资料
//  */
// export function getFirstKey(options: { [index: string]: string }) {
//     let key = "";
//     if (Object.keys(options).length > 0) {
//         key = Object.keys(options)[0] as string;
//     }
//     return key;
// }
// /**
//  * 有时候图片地址没有协议头，给它加上
//  */
// export function formatImageUrl(url: string): string {
//     if (url && url.indexOf("http") == 0) {
//         return url;
//     }
//     return window.location.protocol + url;
// }
// /**
//  * 限制使用者输入正数 "-" "e" @keydown.native = "inputOnlyPositive"
//  */
// export function inputOnlyPositive(e: any) {
//     let key = e.key;
//     if (key === "-" || key === "e") {
//         e.returnValue = false;
//         return false;
//     }
//     return true;
// }
// // 首字大写
// String.prototype.firstUpperCase = function () {
//     return this.replace(/^\S/, function (s) {
//         return s.toUpperCase();
//     });
// };
