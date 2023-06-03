import GlobalVar from "@/core/global/GlobalVar";
import WebViewBridge from "../../core/native/WebViewBridge";
import SkinVariable from "./SkinVariable";
import { AFInAppEventType } from "./enum/AFInAppEventType";
import dialog_empty_iframe from "../views/dialog_empty_iframe";
import GameConfig from "@/core/config/GameConfig";
import CoinTransformHelper from "./CoinTransformHelper";

export class TrackData {
    private static _instance: TrackData;
    public static get Instance(): TrackData {
        if (!this._instance) {
            this._instance = new TrackData();
        }
        return this._instance;
    }

    constructor() {}

    eventData = <any>[];

    addEventData(data: any): boolean {
        if (!data) return false;
        if (!this.eventData) {
            this.eventData = <any>[];
        }

        //检查当前事件 是否已经包含在 内
        if (this.eventData.some((e: any, index: any, array: any) => e.bet_id == data.bet_id)) {
            return false;
        }
        this.eventData.push(data);
        return true;
    }
}
/**绑定gtm对象 */
export function initGTM(id: string) {
    if (!id || !id.trim()) return;

    (function (w: any, d: any, s: any, l: any, i: any) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        const f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", id);
}

/**google tag manager */
function gmt(eventName: string, data: any) {
    if (SkinVariable.useGTM) {
        //@ts-ignore
        const dataLayer = window.dataLayer || [];
        dataLayer.push(Object.assign({ event: eventName }, data));
        /**针对GTM的内置的事件 */
        switch (eventName) {
            case TrackEventMap.loginSuccess: //登录成功
                dataLayer.push(Object.assign({ event: "login" }, data));
                break;
            case TrackEventMap.RegistrationSuccess: //注册成功
                dataLayer.push(Object.assign({ event: "sign_up" }, data));
                break;
            case TrackEventMap.repeatDepositSuccess: //充值成功
            case TrackEventMap.FTDDepositSuccess: //充值成功
                {
                    data.value = data.amount_usd;
                    data.currency = "USD";
                    data.transaction_id = data.bet_id;
                    dataLayer.push(Object.assign({ event: "purchase" }, data));
                }
                break;
            case TrackEventMap.withdrawalSuccess: //提现成功
                {
                    data.value = data.amount_usd;
                    data.currency = "USD";
                    data.transaction_id = data.bet_id;
                    dataLayer.push(Object.assign({ event: "refund" }, data));
                }
                break;
            default:
                break;
        }
    }
}
/**fackbook pixel */
function fbq(eventName: string, data: any, type: string = "track") {
    // //@ts-ignore
    // const fbq = window.fbq;
    // if (fbq) {
    //     //@ts-ignore
    //     // const appid = Object.keys(window.fbq.instance.pixelsByID)[0];
    //     if (GlobalVar.skin == "skin008") {
    //         if (eventName == TrackEventMap.RegistrationSuccess) {
    //             fbq("track", "CompleteRegistration");
    //         } else if (type == TrackTypeMap.Purchase) {
    //             fbq("track", "Purchase", { value: data.amount, currency: data.coin_name_unique });
    //         }
    //     } else {
    //         fbq("trackCustom", eventName, data);
    //     }
    // }
}
/**Apps Flyer */
function flyer(eventName: string, data: any) {
    if (core.app_type == core.EnumAppType.APP && SkinVariable.useFlyerLog) {
        //加钱的情况 ， 此时表示 平台收到的钱，钱为正
        const addMoneyEvens = [TrackEventMap.repeatDepositSuccess, TrackEventMap.FTDDepositSuccess];
        //标签 用户提走的钱，钱需要为负数
        const reduceMoneyEvens = [TrackEventMap.withdrawalSuccess];
        const newData: any = {};
        if (data.user_id) newData.UserID = data.user_id;
        if (data.phone) newData.Phone = data.phone;
        if (data.account_name) newData.AccountName = data.account_name;

        if (data.amount) {
            //设置钱的金额
            if (addMoneyEvens.includes(eventName)) {
                newData.af_revenue = data.amount;
            } else if (reduceMoneyEvens.includes(eventName)) {
                newData.af_revenue = Number(data.amount) * -1 + "";
            } //其他情况 用户这个金额不能算
            else {
                newData.af_price = data.amount;
            }
        }

        if (data.coin_name_unique) newData.af_currency = data.coin_name_unique;
        delete data.user_id, data.phone, data.account_name, data.amount, data.coin_name_unique;
        Object.assign(newData, data);
        //@ts-ignore
        WebViewBridge.getInstance().flyerLog({ eventName: AFInAppEventType[eventName] || eventName, eventValues: newData });
    }
}
/**南美体育专属 */
function clube96(eventName: string, data: any, type: string) {
    //@ts-ignore
    const AnalyticsWebInterface = window.AnalyticsWebInterface;
    if (AnalyticsWebInterface) {
        AnalyticsWebInterface.onEvent(eventName, JSON.stringify(data));
        if (type == TrackTypeMap.Purchase) {
            AnalyticsWebInterface.onPurchase(data.amount, data.coin_name_unique);
        }
    }
}
export const TrackTypeMap = {
    normal: "normal",
    Purchase: "Purchase",
};
/**打点事件名 */
export const TrackEventMap = {
    /**用户注册 */
    RegistrationSuccess: "RegistrationSuccess",
    /**用户登录 */
    loginSuccess: "loginSuccess",
    /**用户设置真实姓名 */
    SetAccountName: "SetAccountName",
    /**用户点击存款按扭 */
    AddCashClick: "AddCashClick",
    /**存款成功 */
    repeatDepositSuccess: "repeatDepositSuccess",
    /**存款失败 */
    repeatDepositFailed: "repeatDepositFailed",
    /**用户请求提款 */
    withdrawalRequested: "withdrawalRequested",
    /**用户提款成功 */
    withdrawalSuccess: "withdrawalSuccess",

    /**用户第一次点击存款按扭 */
    FTDAddCashClick: "FTDAddCashClick",
    /**用户第一次存款成功 */
    FTDDepositSuccess: "FTDDepositSuccess",
    /**用户第一次存款失败 */
    FTDDepositFailed: "FTDDepositFailed",
    /**第一次板球投注 */
    FTDCricketBet: "FTDCricketBet",
    /**第一次足球投注 */
    FTDFootballBet: "FTDFootballBet",
    /**第一次娱乐场投注 */
    FTDCasinoBet: "FTDCasinoBet",
};

export function track(eventName: string, data: any = {}, type: string = "normal") {

    data.amount = data.gold || 0;
    if (data.amount) {
        data.amount_usd = Number(
            CoinTransformHelper.TransformMoney(data.amount, 4, "USDT", data.coin_name_unique, false, false, false, false)
        );
    }
    if (process.env.VUE_APP_ENV == "production") {
        if (core.user_id) Object.assign(data, { user_id: core.user_id });
        gmt(eventName, data);
        fbq(eventName, data, type);
        flyer(eventName, data);
        clube96(eventName, data, type);
        /**008皮 页面 跳转  */
        if (GlobalVar.skin == "skin008") {
            let kwaiq_id = GameConfig.config.kwaiq_id;
            if (!kwaiq_id) {
                kwaiq_id = "485558583095734343";
            }

            if (eventName == TrackEventMap.repeatDepositSuccess || eventName == TrackEventMap.FTDDepositSuccess) {
                const obj = {
                    title: "充值成功",
                    url: `./depositsuccess?${kwaiq_id}`,
                };
                dialog_empty_iframe.show(obj);
            } else if (eventName == TrackEventMap.RegistrationSuccess) {
                const obj = {
                    title: "注册成功",
                    url: `./registersucess?${kwaiq_id}`,
                };
                dialog_empty_iframe.show(obj);
            }
        }
    } else {
        if (core.user_id) Object.assign(data, { user_id: core.user_id });
        gmt(eventName, data);
    }
}
