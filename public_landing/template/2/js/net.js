//发送消息
function sendPostMessage(data) {
    if (window.parent) window.parent.postMessage(data, "*");
}

//获取配置信息
window.addEventListener("message", (e) => {
    switch (e.data.action) {
        case "config":
            window.config = e.data.params;
            console.log(e.data);
            init();
            break;
        case "api_public_area_code":
            areaCodeArr = e.data.params;
            areaCode(areaCodeArr);
            break;
        case "api_public_auth_code":
            {
                const imgCodes = document.getElementsByClassName("imgCode");
                for (const imgCode of imgCodes) {
                    imgCode.setAttribute("src", e.data.params);
                }
            }
            break;
        case "api_user_register":
            $("#loading").css("display", "none");
            $("#txtMsg").append(e.data.params.msg);
            $("#dialog_confirm").css("display", "flex");
            break;
        case "register_succeed":
            token = e.data.params.data.token;
            user_id = e.data.params.data.user_id;
            uuid = e.data.uuid;
            $("#loading").css("display", "none");
            sendPostMessage({ action: "go_home", params: { token: token, uuid: uuid, user_id: user_id } });
            // $("#dialog_succeed").css("display", "flex");
            // resetForm();
            // sendPostMessage({ action: "auth_code" });
            break;
        case "api_public_sms_send":
            $("#loading").css("display", "none");
            $("#txtSMSMsg").append(e.data.params.msg);
            $("#dialog_sms_confirm").css("display", "flex");
            break;
        case "sms_success":
            $("#loading").css("display", "none");
            beginCountdown();
            break;
    }
});
