/*
 * @Author: custer
 * @Date: 2023-10-03 19:08:22
 * @LastEditors: custer
 * @LastEditTime: 2023-10-05 10:13:10
 */
import Cookies from "js-cookie";

function getOptions(): Cookies.CookieAttributes {
    let domain = ""; //body.url.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/im)[1];
    if (process.env.VUE_APP_ENV == "production") {
        domain = window.location.host;
    } else {
        domain = "testjj9.com";
    }
    return { domain: `.${domain}`, sameSite: "None", secure: true };
}

/**---设置 巴西交易所 token---- */
export function setOrbitExchangeCookie(body: any) {
    const options = getOptions();
    Cookies.set("BIAB_CUSTOMER", body.token, options);
    Cookies.set("BIAB_LANGUAGE", core.lang.split("_")[0], options);
}

export function clearOrbitExchangeCookie() {
    const options = getOptions();
    Cookies.remove("BIAB_CUSTOMER", options);
    Cookies.set("BIAB_LANGUAGE", core.lang.split("_")[0], options);
}
