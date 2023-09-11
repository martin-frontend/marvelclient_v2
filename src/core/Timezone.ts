/**
 * 平台各个币种之间的转换
 */
import LangUtil from "@/core/global/LangUtil";
import GameConfig from "./config/GameConfig";
import { dateFormat } from "./global/Functions";
import * as moment from "moment-timezone";
interface timezoneItem {
    key: string;
    value: string;
    name: string;
    itemKey: string;
}
export default class Timezone {
    private static _Instance: Timezone;
    public static get Instance(): Timezone {
        if (!this._Instance) {
            this._Instance = new Timezone();
        }
        return this._Instance;
    }
    constructor() {
        this.Init();
    }

    private _timezonename: timezoneItem[] = [];
    curTimezoneItem!: timezoneItem;
    curSelectIndex = "";

    Init() {
        const saveItem = window.localStorage.getItem("timezoneitem") || "";
        if (saveItem) {
            this.curTimezoneItem = JSON.parse(saveItem);

            //老版本的兼容修复 防止 出错，因为老版本 保存的key值不正确
            for (let index = 0; index < this.timezonename.length; index++) {
                const element = this.timezonename[index];
                if (element.value == this.curTimezoneItem.value && element.key != this.curTimezoneItem.key) {
                    this.curTimezoneItem = element;
                    break;
                }
            }
        }
        //在列表中选择 与 之差距最小的那一个
        if (!this.curTimezoneItem || !this.curTimezoneItem.value) {
            //this.curTimezoneItem = this.timezonename[0];
            const offsettime = this.getLocalTimezoneOffset();
            // console.log("当前时区偏差为", offsettime);
            const nearItem = this.findClosestValue(offsettime);
            // console.log("查找到的最接近的对象为", nearItem);
            this.curTimezoneItem = nearItem;
        }

        this.curSelectIndex = this.curTimezoneItem.key;
    }

    findClosestValue(value: string) {
        const targetMinutes = this.getMinutesFromOffset(value);
        // console.log("------------targetMinutes--------", targetMinutes);
        let closest = null;
        let closestDiff = Infinity;

        for (let i = 0; i < this.timezonename.length; i++) {
            const currentMinutes = this.getMinutesFromOffset(this.timezonename[i].key);
            const diff = Math.abs(currentMinutes - targetMinutes);
            if (diff < closestDiff) {
                closest = this.timezonename[i];
                closestDiff = diff;
            }
        }
        if (!closest) {
            closest = this.timezonename[0];
        }
        return closest;
    }
    /**转为分钟 */
    getMinutesFromOffset(offset: string) {
        const [hours, minutes] = offset.split(":").map(Number);
        const sign = offset[0] === "+" ? 1 : -1;
        const totalMinutes = Math.abs(hours * 60) + minutes;
        return totalMinutes * sign;
    }

    setTimezone(val: timezoneItem) {
        this.curSelectIndex = val.key;
        if (this.curTimezoneItem != val) {
            this.curTimezoneItem = val;
            // console.log("修改 事件区域---", this.curTimezoneItem);
            // console.log("--- 当前----选择的时区为为 ", this.timezoneOffset);
            window.localStorage.setItem("timezoneitem", JSON.stringify(this.curTimezoneItem));
            return true;
        }
        return false;
        //this.curTimezoneItem = val;
        //window.localStorage.setItem("timezoneitem", JSON.stringify(this.curTimezoneItem));
    }

    get timezonename() {
        if (!this._timezonename || this._timezonename.length < 1) {
            this._timezonename.push(
                // { key: "-0", value: "", name: LangUtil("GMT-自动获取地区"), itemKey: "" },
                { key: "-8:00", value: "GMT-8", name: LangUtil("GMT-8_desc"), itemKey: "America/Los_Angeles" },
                { key: "-7:00", value: "GMT-7", name: LangUtil("GMT-7_desc"), itemKey: "America/Denver" },
                { key: "-6:00", value: "GMT-6 ", name: LangUtil("GMT-6_desc"), itemKey: "America/Mexico_City" },
                { key: "-5:00", value: "GMT-5 ", name: LangUtil("GMT-5_desc"), itemKey: "America/New_York" },
                { key: "-4:00", value: "GMT-4 ", name: LangUtil("GMT-4_desc"), itemKey: "America/Thule" },
                { key: "-3:00", value: "GMT-3 ", name: LangUtil("GMT-3_desc"), itemKey: "America/Sao_Paulo" },
                { key: "-2:00", value: "GMT-2 ", name: LangUtil("GMT-2_desc"), itemKey: "America/Noronha" },
                { key: "-1:00", value: "GMT-1 ", name: LangUtil("GMT-1_desc"), itemKey: "Atlantic/Azores" },

                { key: "+0:00", value: "GMT+0", name: LangUtil("GMT+0_desc"), itemKey: "Europe/London" },
                { key: "+1:00", value: "GMT+1 ", name: LangUtil("GMT+1_desc"), itemKey: "Europe/Paris" },
                { key: "+2:00", value: "GMT+2 ", name: LangUtil("GMT+2_desc"), itemKey: "Europe/Istanbul" },
                { key: "+3:00", value: "GMT+3 ", name: LangUtil("GMT+3_desc"), itemKey: "Europe/Moscow" },

                { key: "+3:30", value: "GMT+3:30 ", name: LangUtil("GMT+3-30_desc"), itemKey: "Asia/Tehran" },
                { key: "+4:00", value: "GMT+4 ", name: LangUtil("GMT+4_desc"), itemKey: "Asia/Dubai" },
                { key: "+4:30", value: "GMT+4:30", name: LangUtil("GMT+4-30_desc"), itemKey: "Asia/Kabul" },
                { key: "+5:00", value: "GMT+5 ", name: LangUtil("GMT+5_desc"), itemKey: "Asia/Karachi" },

                { key: "+5:30", value: "GMT+5:30", name: LangUtil("GMT+5-30_desc"), itemKey: "Asia/Colombo" },
                { key: "+5:45", value: "GMT+5:45", name: LangUtil("GMT+5-45_desc"), itemKey: "Asia/Kolkata" },
                { key: "+6:00", value: "GMT+6 ", name: LangUtil("GMT+6_desc"), itemKey: "Asia/Dhaka" },
                { key: "+6:30", value: "GMT+6:30 ", name: LangUtil("GMT+6-30_desc"), itemKey: "Asia/Yangon" },
                { key: "+7:00", value: "GMT+7 ", name: LangUtil("GMT+7_desc"), itemKey: "Asia/Bangkok" },
                { key: "+8:00", value: "GMT+8 ", name: LangUtil("GMT+8_desc"), itemKey: "Asia/Shanghai" },

                { key: "+9:00", value: "GMT+9 ", name: LangUtil("GMT+9_desc"), itemKey: "Asia/Tokyo" },
                { key: "+10:00", value: "GMT+10 ", name: LangUtil("GMT+10_desc"), itemKey: "Australia/Sydney" },
                { key: "+11:00", value: "GMT+11 ", name: LangUtil("GMT+11_desc"), itemKey: "Pacific/Noumea" },
                { key: "+12:00", value: "GMT+12 ", name: LangUtil("GMT+12_desc"), itemKey: "Pacific/Auckland" },

                { key: "+13:00", value: "GMT+13 ", name: LangUtil("GMT+13_desc"), itemKey: "Pacific/Apia" },
                { key: "+14:00", value: "GMT+14 ", name: LangUtil("GMT+14_desc"), itemKey: "Pacific/Kiritimati" }
            );
        }

        return this._timezonename;
    }
    /**返回 与标准时间之间的偏差量 例如 +5：30 */
    public get timezoneOffset(): string {
        return this.curTimezoneItem.key;
    }

    /**获取本地时间与 +0 时区 之间的时差 */
    getLocalTimezoneOffset(): string {
        const offsetMinutes = new Date().getTimezoneOffset();
        const sign = offsetMinutes > 0 ? "-" : "+";
        const absOffsetMinutes = Math.abs(offsetMinutes);
        const hours = Math.floor(absOffsetMinutes / 60);
        const minutes = absOffsetMinutes % 60;
        return `${sign}${this.padZero(hours)}:${this.padZero(minutes)}`;
    }
    /**
     * 时间的加减   传入时间格式为 2023-04-29 12:05:45  传入 与这个时间之间的偏差 输出  计算之后的 时间
     * @param timeStr 时间格式为 2023-04-29 12:05:45
     * @param duration 传入时间之间的偏差 例如 +2：15
     * @returns
     */
    addTime(timeStr: string, duration: string): string {
        const [hours, minutes] = duration.split(":").map(Number);
        const time = new Date(timeStr.replace(/-/g, "/"));
        time.setHours(time.getHours() + hours);
        time.setMinutes(time.getMinutes() + minutes);
        const year = time.getFullYear();
        const month = this.padZero(time.getMonth() + 1);
        const day = this.padZero(time.getDate());
        const hours24 = this.padZero(time.getHours());
        const minutes24 = this.padZero(time.getMinutes());
        const seconds24 = this.padZero(time.getSeconds());
        return `${year}-${month}-${day} ${hours24}:${minutes24}:${seconds24}`;
    }

    addTime_other(timeStr: number, duration: string): string {
        const [hours, minutes] = duration.split(":").map(Number);
        const time = new Date(timeStr);
        time.setUTCHours(time.getUTCHours() + hours);
        time.setUTCMinutes(time.getUTCMinutes() + minutes);
        const year = time.getUTCFullYear();
        const month = this.padZero(time.getUTCMonth() + 1);
        const day = this.padZero(time.getUTCDate());
        const hours24 = this.padZero(time.getUTCHours());
        const minutes24 = this.padZero(time.getUTCMinutes());
        const seconds24 = this.padZero(time.getUTCSeconds());
        return `${year}-${month}-${day} ${hours24}:${minutes24}:${seconds24}`;
    }
    /**时间补齐 00 */
    padZero(n: number): string {
        return n < 10 ? `0${n}` : `${n}`;
    }

    getLocalTimezoneString() {
        if (!this.curTimezoneItem) {
            this.Init();
        }
        return this.curTimezoneItem.key;
    }

    /**
     * 将传入的时间 转换为 本地时间 输出   传入 例如2023-01-18 15:28:33
     * @param datetimeString 传入的 时间文本 例如 "2023-01-18 15:28:33"
     * @returns
     */
    convertTime_to_Locale(datetimeString: string): string {
        if (!GameConfig.timezoneChange) {
            return datetimeString;
        }
        const newdata = this.addTime(datetimeString, "-8:00");
        return this.addTime(newdata, this.getLocalTimezoneString());
    }
    convertTime_to_Locale_utc(datetimeString: number): string {
        if (!GameConfig.timezoneChange) {
            return dateFormat(new Date(datetimeString), "yyyy-MM-dd hh:mm:ss");
        }
        const formattedDate = moment.tz(datetimeString, "Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss");
        console.warn("转换之后的是", formattedDate);

        return this.convertTime_to_Locale(formattedDate);
    }
    /**
     * 将输入的时间转换为北京时间，如果平台不需要转换时间 会返回 传入值
     * @param datetimeString 需要转换的时间文本
     * @returns 转换之后的文本
     */
    convertTime_to_Beijing(datetimeString: string): string {
        if (!GameConfig.timezoneChange) {
            return datetimeString;
        }
        let newstr = this.getLocalTimezoneString();
        if (newstr[0] === "-") {
            newstr = newstr.replace(/-/g, "+");
        } else {
            newstr = newstr.replace(/\+/g, "-");
        }
        //console.log(" 修改之后的 ---" ,newstr);
        const newdata = this.addTime(datetimeString, newstr);
        return this.addTime(newdata, "+8:00");
    }
}
