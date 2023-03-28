var http = {
    post: function (url, data = {}, callback) {
        data.device_type = 3;
        data.app_type = 4;
        data.device = uuid;
        data.plat_id = config.platID;
        data.channel_id = config.channelID;

        console.group("request: ", url);
        console.log(data);
        console.groupEnd();

        var request = new XMLHttpRequest();
        request.open("post", config.apiUrl + url);
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

function api_public_area_code() {
    http.post("/api/public/area_code", { lang: window.config.lang || "en_EN" }, function (response) {
        const ifr = document.getElementById("ifr");
        if (ifr) {
            ifr.contentWindow.postMessage({ action: "api_public_area_code", params: response.data }, "*");
        }
    });
}

function api_public_auth_code() {
    http.post("/api/public/auth_code", { uuid: uuid, lang: window.config.lang || "en_EN" }, function (response) {
        const ifr = document.getElementById("ifr");
        if (ifr) {
            ifr.contentWindow.postMessage({ action: "api_public_auth_code", params: response.data }, "*");
        }
    });
}

function api_public_email_send(params) {
    http.post(
        "/api/public/email/send",
        { type: 6, email: params.email, auth_code: params.auth_code, uuid: uuid, lang: window.config.lang || "en_EN" },
        function (response) {
            console.log(">>>>>>api_public_email_send: ", response);
            const ifr = document.getElementById("ifr");
            if (ifr) {
                ifr.contentWindow.postMessage({ action: "api_public_email_send", params: response.data }, "*");
            }
        }
    );
}

function api_public_sms_send(params) {
    http.post(
        "/api/public/sms/send",
        {
            type: 6,
            mobile: params.mobile,
            auth_code: params.auth_code,
            area_code: params.area_code,
            uuid: uuid,
            lang: window.config.lang || "en_EN",
        },
        function (response) {
            if (response.status == 0) {
                if (ifr) {
                    ifr.contentWindow.postMessage({ action: "sms_success" }, "*");
                }
            } else {
                const ifr = document.getElementById("ifr");
                if (ifr) {
                    ifr.contentWindow.postMessage({ action: "api_public_sms_send", params: response }, "*");
                }
            }
        }
    );
}

function api_user_register(params) {
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
            uuid: uuid,
            mobile_username: params.mobile_username,
            lang: window.config.lang || "en_EN",
        },
        function (data) {
            if (data.status == 0) {
                // location.href = config.platUrl;
                if (ifr) {
                    ifr.contentWindow.postMessage({ action: "register_succeed", params: data }, "*");
                }
            } else {
                api_public_auth_code();
                const ifr = document.getElementById("ifr");
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
            this.location.href = this.window.config.platUrl;
            break;
    }
});
