/**
 * 全局属性和方法
 */
module core {
    /**
     * 格式化日期
     * @param d
     * @param fmt
     */
    export function dateFormat(d, fmt): string {
        var o = {
            "M+": d.getMonth() + 1, //月份
            "d+": d.getDate(), //日
            "h+": d.getHours(), //小时
            "m+": d.getMinutes(), //分
            "s+": d.getSeconds(), //秒
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度
            S: d.getMilliseconds(), //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return fmt;
    }

    /**
     * 转换成货币格式
     */
    export function moneyFormat(s, symbol: string = "¥"): string {
        if (!s) s = 0;
        s = s.toString();
        if (/[^0-9\.]/.test(s)) return "invalid value";
        s = s.replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s)) s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        return symbol + s.replace(/^\./, "0.");
    }

    /**
     * 获取UUID
     */
    export function generateUUID() {
        var d = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }

    /**
     * 获取字符串和真实长度。全角字符长度为2
     */
    export function getStringLength(str: string): number {
        var length = str.length;
        var realLength = 0;
        for (var i = 0; i < length; i++) {
            var charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
        }
        return realLength;
    }

    /**
     * 显示长字段时，在后面加上...
     */
    export function getLimitString(str: string, len: number) {
        str = str.replace(/\n/g, "...");
        var length = str.length;
        var realLength = 0;
        for (var i = 0; i < length; i++) {
            var charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            } else {
                realLength += 2;
            }
            if (realLength >= len) {
                return str.substring(0, i) + "...";
            }
        }
        return str;
    }

    /**
     * 获取URL参数
     * @param value
     */
    export function getQueryVariable(value: string): string | null {
        // const query = window.location.search.substring(1);
        let query = window.localStorage.getItem("query");
        if(!query) query = window.location.search.substring(1);
        const vars = query.split("&");
        for (const item of vars) {
            const idx = item.search("=");
            if (item.substring(0, idx) == value) {
                return item.substr(idx + 1);
            }
        }
        return null;
    }

    /**
     * 将对象转换为Http请求的form表单数据
     * @param obj
     */
    export function getFormWithObject(obj: any) {
        const fData = new FormData();
        for (const key of Object.keys(obj)) {
            if (obj[key] && key != "hideWaiting") fData.append(key, obj[key]);
        }
        return fData;
    }

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
        const Regx = /^[A-Za-z0-9]*$/;
        return value.length >= 6 && value.length <= 20 && Regx.test(value);
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
        const Regx = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
        return Regx.test(value);
    }

    /**
     * 检测QQ是否合法
     * @param value
     */
    export function checkQQ(value: string): boolean {
        return /^[1-9]\d{4,9}$/.test(value);
    }
    /**
     *
     * @param value 检测用户名是否合法
     * @returns
     */
    export function checkNickName(value: string): boolean {
        const len = getStringLength(value);
        return len >= 4 && len <= 12;
    }

    /**
     * 是否为移动设备
     */
    export function isMobile() {
        const flag = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        );
        return flag;
    }
    /**是否android */
    export function isAndroid() {
        const flag = navigator.userAgent.match(
            /(Android)/i
        );
        return flag;
    }
    /**是否IOS */
    export function isIOS() {
        const flag = navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad)/i
        );
        return flag;
    }

    /**
     * 有时候图片地址没有协议头，给它加上
     */
    export function formatImageUrl(url: string): string {
        if (url && url.indexOf("http") == 0) {
            return url;
        }
        return window.location.protocol + url;
    }
    /**
     * 获取今日零点时间
     * @offset 偏移天数
     * @offsetSecond 偏移秒
     */
    export function getTodayOffset(offset = 0, offsetSecond = 0): Date {
        const d = new Date(new Date().toLocaleDateString());
        d.setTime(d.getTime() + 3600 * 1000 * 24 * offset - offsetSecond);
        return d;
    }
    /**
     * 去掉空属性/空符串，并返回一个新对象
     */
    export function objectRemoveNull(obj, except = [undefined, null, ""]): any {
        const result = {};
        for (const c of Object.keys(obj)) {
            if (except.indexOf(obj[c]) == -1) {
                result[c] = obj[c];
            }
        }
        return result;
    }
    
}
