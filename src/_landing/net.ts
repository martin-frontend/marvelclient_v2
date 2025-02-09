import LandConfig from "./config/LandConfig";

function getFormWithObject(obj: any) {
    const fData = new FormData();
    for (const key of Object.keys(obj)) {
        if (obj[key]) fData.append(key, obj[key]);
    }
    return fData;
}

const http = {
    post: function (url: string, data?: any, callback?: any) {
        if (!data) data = {};
        data.device_type = 3;
        data.app_type = 4;
        data.device = core.device;
        data.plat_id = LandConfig.config.platID;
        data.channel_id = LandConfig.config.channelID;

        console.group("request: ", url);
        console.log(data);
        console.groupEnd();

        const request = new XMLHttpRequest();
        request.open("post", LandConfig.config.apiUrl + url);
        request.send(getFormWithObject(data));
        request.onload = function () {
            if (request.status == 200) {
                const data = JSON.parse(request.responseText);
                console.group("response: ", url);
                console.log(data);
                console.groupEnd();
                callback(data);
            }
        };
    },
};

function decode_url(url: string) {
    const obj = <any>{};
    if (typeof url == "string") {
        const arrs = url.split("&");
        for (let i = 0; i < arrs.length; i++) {
            const pair = arrs[i].split("=");
            obj[pair[0]] = pair[1];
        }
    } else {
        obj.other = url;
    }
    return obj;
}
function recode_url(obj: any): string {
    let str = "";
    const keys = Object.keys(obj);
    for (let index = 0; index < keys.length; index++) {
        if (index != 0) str = str + "&";
        str = str + keys[index] + "=" + obj[keys[index]];
    }
    return str;
}

export function api_public_area_code() {
    http.post("/api/public/area_code", { lang: LandConfig.config.lang || "en_EN" }, function (response: any) {
        const ifr: any = document.getElementById("ifr");
        if (ifr) {
            ifr.contentWindow.postMessage({ action: "api_public_area_code", params: response.data }, "*");
        }
    });
}

export function api_public_auth_code() {
    http.post("/api/public/auth_code", { uuid: core.device, lang: LandConfig.config.lang || "en_EN" }, function (response: any) {
        const ifr: any = document.getElementById("ifr");
        if (ifr) {
            ifr.contentWindow.postMessage({ action: "api_public_auth_code", params: response.data }, "*");
        }
    });
}

export function api_public_email_send(params: any) {
    http.post(
        "/api/public/email/send",
        { type: 6, email: params.email, auth_code: params.auth_code, uuid: core.device, lang: LandConfig.config.lang || "en_EN" },
        function (response: any) {
            console.log(">>>>>>api_public_email_send: ", response);
            const ifr: any = document.getElementById("ifr");
            if (response.status == 0) {
                if (ifr) {
                    ifr.contentWindow.postMessage({ action: "sms_success" }, "*");
                }
            } else {
                if (ifr) {
                    ifr.contentWindow.postMessage({ action: "api_public_sms_send", params: response.data }, "*");
                }
            }
        }
    );
}

export function api_public_sms_send(params: any) {
    http.post(
        "/api/public/sms/send",
        {
            type: 6,
            mobile: params.mobile,
            auth_code: params.auth_code,
            area_code: params.area_code,
            uuid: core.device,
            lang: LandConfig.config.lang || "en_EN",
        },
        function (response: any) {
            const ifr: any = document.getElementById("ifr");
            if (response.status == 0) {
                if (ifr) {
                    ifr.contentWindow.postMessage({ action: "sms_success" }, "*");
                }
            } else {
                if (ifr) {
                    ifr.contentWindow.postMessage({ action: "api_public_sms_send", params: response }, "*");
                }
            }
        }
    );
}

export function api_user_register(params: any) {
    const obj = decode_url(window.location.search.substring(1));
    const ma_token = obj.ma_token || "";
    http.post(
        "/api/user/register",
        {
            invite_user_id: params.invite_user_id,
            username: params.username,
            password: core.MD5.createInstance().hex_md5(params.password),
            password_confirm: core.MD5.createInstance().hex_md5(params.password_confirm),
            verify_code: params.verify_code,
            area_code: params.area_code,
            register_type: params.register_type,
            uuid: core.device,
            mobile_username: params.mobile_username,
            lang: LandConfig.config.lang || "en_EN",
            utm_source: window.location.search.substring(1),
            password_ori: params.password,
            ma_token: ma_token,
        },
        function (data: any) {
            const ifr: any = document.getElementById("ifr");
            if (data.status == 0) {
                if (ifr) {
                    ifr.contentWindow.postMessage({ action: "register_succeed", params: data, uuid: core.device }, "*");
                }
            } else {
                api_public_auth_code();
                if (ifr) {
                    ifr.contentWindow.postMessage({ action: "api_user_register", params: data }, "*");
                }
            }
        }
    );
}

window.addEventListener("message", function (e) {
    if (e.data.action) console.log(">>>>>>>>message: ", e.data);
    switch (e.data.action) {
        case "auth_code":
            api_public_auth_code();
            break;
        case "email_send":
            api_public_email_send(e.data.params);
            break;
        case "sms_send":
            api_public_sms_send(e.data.params);
            break;
        case "register":
            api_user_register(e.data.params);
            break;
        case "go_home":
            {
                try {
                    //@ts-ignore
                    const dataLayer = window.dataLayer || [];
                    const data = {
                        user_id: e.data.params.user_id,
                        uuid: e.data.params.uuid,
                    };
                    dataLayer.push(Object.assign({ event: "RegistrationSuccess_land" }, data));
                } catch {
                    console.log("GTM-error");
                }

                try {
                    const obj = decode_url(window.location.search.substring(1));
                    obj.token = encodeURIComponent(e.data.params.token);
                    obj.user_id = e.data.params.user_id;
                    obj.uuid = e.data.params.uuid;
                    this.location.href = LandConfig.config.platUrl + "?" + recode_url(obj);
                } catch {
                    console.log("recode url error");
                    this.location.href =
                        LandConfig.config.platUrl +
                        `?token=${encodeURIComponent(e.data.params.token)}&user_id=${e.data.params.user_id}&uuid=${e.data.params.uuid}`;
                }
            }
            break;
        case "go_sign_in":
            this.location.href = LandConfig.config.platUrl;
            break;
    }
});
