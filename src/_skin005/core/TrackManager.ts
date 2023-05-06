import GlobalVar from "@/core/global/GlobalVar";
import WebViewBridge from "../../core/native/WebViewBridge";
import SkinVariable from "./SkinVariable";

/**google tag manager */
function gmt(eventName: string, data: any) {
    if (SkinVariable.useGTM) {
        //@ts-ignore
        const dataLayer = window.dataLayer || [];
        dataLayer.push(Object.assign({ event: eventName }, data));
    }
}
/**fackbook pixel */
function fbq(eventName: string, data: any, type: string = "track") {
    //@ts-ignore
    const fbq = window.fbq;
    if (fbq) {
        //@ts-ignore
        // const appid = Object.keys(window.fbq.instance.pixelsByID)[0];
        if (GlobalVar.skin == "skin008") {
            if (eventName == TrackEventMap.RegistrationSuccess) {
                fbq("track", "CompleteRegistration");
            } else if (type == TrackTypeMap.Purchase) {
                fbq("track", "Purchase", { value: data.amount, currency: data.coin_name_unique });
            }
        } else {
            fbq("trackCustom", eventName, data);
        }
    }
}
/**Apps Flyer */
function flyer(eventName: string, data: any) {
    if (core.app_type == core.EnumAppType.APP && SkinVariable.useFlyerLog) {
        WebViewBridge.getInstance().flyerLog({ eventName, eventValues: data });
    }
}
/**南美体育专属 */
function clube96(eventName: string, data: any, type: string) {
    //@ts-ignore
    const AnalyticsWebInterface = window.AnalyticsWebInterface;
    if (AnalyticsWebInterface) {
        AnalyticsWebInterface.onEvent(eventName, data);
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
    if (process.env.VUE_APP_ENV == "production") {
        if (core.user_id) Object.assign(data, { user_id: core.user_id });
        gmt(eventName, data);
        fbq(eventName, data, type);
        flyer(eventName, data);
        clube96(eventName, data, type);
    }
}
