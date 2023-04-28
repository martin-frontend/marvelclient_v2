/**
 * 平台各个币种之间的转换
 */
import LangUtil from "@/core/global/LangUtil";
import moment from "moment-timezone"; //Asia/Shanghai
import GameConfig from "./config/GameConfig";
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
        if (saveItem) this.curTimezoneItem = JSON.parse(saveItem);

        if (!this.curTimezoneItem) {
            this.curTimezoneItem = this.timezonename[0];
        }
        if (!this.curTimezoneItem.itemKey) {
            this.curTimezoneItem.itemKey = moment.tz.guess(); // 自动识别本地时区
        }
        this.curSelectIndex = this.curTimezoneItem.key;
    }

    setTimezone(val: timezoneItem) {
        this.curSelectIndex = val.key;
        this.curTimezoneItem = val;
        console.log("修改 事件区域---", this.curTimezoneItem);
        window.localStorage.setItem("timezoneitem", JSON.stringify(this.curTimezoneItem));
    }

    get timezonename() {
        //return moment.tz.names();
        if (!this._timezonename || this._timezonename.length < 1) {
            this._timezonename.push(
                // { key: "-0", value: "", name: LangUtil("GMT-自动获取地区"), itemKey: "" },
                { key: "-8", value: "GMT-8", name: LangUtil("GMT-8_desc"), itemKey: "America/Los_Angeles" },
                { key: "-7", value: "GMT-7", name: LangUtil("GMT-7_desc"), itemKey: "America/Denver" },
                { key: "-6", value: "GMT-6 ", name: LangUtil("GMT-6_desc"), itemKey: "America/Mexico_City" },
                { key: "-5", value: "GMT-5 ", name: LangUtil("GMT-5_desc"), itemKey: "America/New_York" },
                { key: "-4", value: "GMT-4 ", name: LangUtil("GMT-4_desc"), itemKey: "America/Halifax" },
                { key: "-3", value: "GMT-3 ", name: LangUtil("GMT-3_desc"), itemKey: "America/Sao_Paulo" },
                { key: "-2", value: "GMT-2 ", name: LangUtil("GMT-2_desc"), itemKey: "America/Noronha" },
                { key: "-1", value: "GMT-1 ", name: LangUtil("GMT-1_desc"), itemKey: "Atlantic/Azores" },

                { key: "+0", value: "GMT+0", name: LangUtil("GMT+0_desc"), itemKey: "Europe/London" },
                { key: "+1", value: "GMT+1 ", name: LangUtil("GMT+1_desc"), itemKey: "Europe/Paris" },
                { key: "+2", value: "GMT+2 ", name: LangUtil("GMT+2_desc"), itemKey: "Europe/Istanbul" },
                { key: "+3", value: "GMT+3 ", name: LangUtil("GMT+3_desc"), itemKey: "Europe/Moscow" },

                { key: "+3:30", value: "GMT+3:30 ", name: LangUtil("GMT+3-30_desc"), itemKey: "Asia/Tehran" },
                { key: "+4", value: "GMT+4 ", name: LangUtil("GMT+4_desc"), itemKey: "Asia/Dubai" },
                { key: "+4:30", value: "GMT+4:30", name: LangUtil("GMT+4-30_desc"), itemKey: "Asia/Kabul" },
                { key: "+5", value: "GMT+5 ", name: LangUtil("GMT+5_desc"), itemKey: "Asia/Karachi" },

                { key: "+5:30", value: "GMT+5:30", name: LangUtil("GMT+5-30_desc"), itemKey: "Asia/Colombo" },
                { key: "+5:45", value: "GMT+5:45", name: LangUtil("GMT+5-45_desc"), itemKey: "Asia/Kolkata" },
                { key: "+6", value: "GMT+6 ", name: LangUtil("GMT+6_desc"), itemKey: "Asia/Dhaka" },
                { key: "+6:30", value: "GMT+6:30 ", name: LangUtil("GMT+6-30_desc"), itemKey: "Asia/Yangon" },
                { key: "+7", value: "GMT+7 ", name: LangUtil("GMT+7_desc"), itemKey: "Asia/Bangkok" },
                { key: "+8", value: "GMT+8 ", name: LangUtil("GMT+8_desc"), itemKey: "Asia/Shanghai" },

                { key: "+9", value: "GMT+9 ", name: LangUtil("GMT+9_desc"), itemKey: "Asia/Tokyo" },
                { key: "+10", value: "GMT+10 ", name: LangUtil("GMT+10_desc"), itemKey: "Australia/Sydney" },
                { key: "+11", value: "GMT+11 ", name: LangUtil("GMT+11_desc"), itemKey: "Pacific/Noumea" },
                { key: "+12", value: "GMT+12 ", name: LangUtil("GMT+12_desc"), itemKey: "Pacific/Auckland" },

                { key: "+13", value: "GMT+13 ", name: LangUtil("GMT+13_desc"), itemKey: "Pacific/Apia" },
                { key: "+14", value: "GMT+14 ", name: LangUtil("GMT+14_desc"), itemKey: "Pacific/Kiritimati" }
            );

            this._timezonename.unshift({ key: "-0", value: "", name: moment.tz.guess(), itemKey: moment.tz.guess() });
        }

        return this._timezonename;
    }

    public get timezoneOffset(): string {
        return this.getDiffTimezone(this.getLocalTimezoneString());
    }

    /**
     * 获取目标地区时间与标准美国时间的时间差 输出为：+4:30 这种
     * @param location 目标地区的名字 例如 America/New_York
     */
    getDiffTimezone(location: string) {
        const date = new Date();
        const timeZone = moment.tz.zone(location);

        if (!timeZone) {
            return "Invalid timezone";
        }
        //@ts-ignore
        const offsetInMinutes = timeZone.utcOffset(date);
        const offsetHours = Math.floor(Math.abs(offsetInMinutes) / 60);
        const offsetMinutes = Math.abs(offsetInMinutes) % 60;
        const sign = offsetInMinutes < 0 ? "+" : "-";
        // const sign = offsetInMinutes < 0 ? "-" : "+";
        return `${sign}${offsetHours}:${offsetMinutes < 10 ? "0" : ""}${offsetMinutes}`;
    }

    getLocalTimezoneString() {
        //return moment.tz.guess(); // 自动识别本地时区
        if (!this.curTimezoneItem) {
            this.Init();
        }
        return this.curTimezoneItem.itemKey;
    }
    convertTimezone(dateTimeString: string, targetTimezone: string, destTimezone: string): string {
        //const sourceTimezone = moment.tz.guess(); // 自动识别本地时区
        if (!dateTimeString) return dateTimeString; // 如果参数为空，返回 源数据
        const sourceMoment = moment.tz(dateTimeString, destTimezone);
        if (!sourceMoment.isValid()) return dateTimeString; // 如果日期时间无效，返回 源数据
        const targetMoment = sourceMoment.clone().tz(targetTimezone);
        return targetMoment.format("YYYY-MM-DD HH:mm:ss");
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
        return this.convertTimezone(datetimeString, this.getLocalTimezoneString(), "Asia/Shanghai");
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
        return this.convertTimezone(datetimeString, "Asia/Shanghai", this.getLocalTimezoneString());
    }
}
