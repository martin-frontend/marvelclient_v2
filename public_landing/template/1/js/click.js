$(document).ready(function () {
    $("#btnTagAccount").click((e) => {
        register_type = 1;
        $(".username_mobile").css("display", "none");
        $("#username").css({ "padding-left": "10px" });
    });

    $("#btnTagMobile").click((e) => {
        register_type = 4;
        $(".username_mobile").css("display", "none");
        $("#username").css({ "padding-left": "110px" });
    });

    $("#btnTagEmail").click((e) => {
        register_type = 2;
        $(".username_mobile").css("display", "none");
        $("#username").css({ "padding-left": "10px" });
    });

    $("#btnTagEmailMobile").click((e) => {
        register_type = 8;
        $(".username_mobile").css("display", "block");
        $("#username").css({ "padding-left": "110px" });
    });

    $(".btn-tag").click((e) => {
        $(".btn-tag").removeClass("btn-tag-active");
        $(e.target).addClass("btn-tag-active");
        resetForm();
    });

    $(".btnImagCode").click((e) => {
        sendPostMessage({ action: "auth_code" });
    });

    $("#btnGetCode").click((e) => {
        if (register_type == 4 || register_type == 8) {
            const phone = $("#username").val();
            if (checkPhone(phone)) {
                $("#dialog").css("display", "flex");
            } else {
                $("#username_error").css("display", "block");
            }
        }
        if (register_type == 2) {
            const email = $("#username").val();
            if (checkMail(email)) {
                $("#dialog").css("display", "flex");
            } else {
                $("#username_error").css("display", "block");
            }
        }
    });

    $("#btnSendCode").click((e) => {
        $("#dialog").css("display", "none");
        console.log(">>>>>.register_type: ", register_type);
        if (register_type == 4 || register_type == 8) {
            sendPostMessage({
                action: "sms_send",
                params: { mobile: $("#username").val(), auth_code: $("#formItemVerifyCode1").val(), area_code: $("#area_code").val() },
            });
            $("#loading").css("display", "flex");
            $("#formItemVerifyCode1").val("");
            sendPostMessage({ action: "auth_code" });
        } else if (register_type == 2) {
            sendPostMessage({ action: "email_send", params: { email: $("#username").val(), auth_code: $("#formItemVerifyCode1").val() } });
            $("#loading").css("display", "flex");
            $("#formItemVerifyCode1").val("");
            sendPostMessage({ action: "auth_code" });
        }
    });

    $("#close-img").click((e) => {
        $("#dialog").css("display", "none");
    });

    $("#btnCloseConfirm").click((e) => {
        $("#dialog_confirm").css("display", "none");
        $("#txtMsg").empty();
        if (register_type == 4) {
            sendPostMessage({
                action: "sms_send",
                params: { mobile: $("#username").val(), auth_code: $("#formItemVerifyCode1").val(), area_code: $("#area_code").val() },
            });
        } else if (register_type == 2) {
            sendPostMessage({ action: "email_send", params: { email: $("#username").val(), auth_code: $("#formItemVerifyCode1").val() } });
        }
    });

    $("#btnSignUp").click((e) => {
        if (checkForm()) {
            const form = {
                invite_user_id: $("#invite_user_id").val(),
                username: $("#username").val(),
                mobile_username: $("#username_mobile").val(),
                password: $("#password").val(),
                password_confirm: $("#password_confirm").val(),
                verify_code: $("#verify_code").val(),
                area_code: $("#area_code").val(),
                register_type: register_type,
            };
            sendPostMessage({ action: "register", params: form });
            $("#loading").css("display", "flex");
        }
    });

    $("#btn_hide_password").click((e) => {
        $("#btn_hide_password").css("display", "none");
        $("#btn_show_password").css("display", "flex");
        $("#password").attr("type", "password");
    });

    $("#btn_show_password").click((e) => {
        $("#btn_show_password").css("display", "none");
        $("#btn_hide_password").css("display", "flex");
        $("#password").attr("type", "text");
    });

    $("#btn_hide_password_confirm").click((e) => {
        $("#btn_hide_password_confirm").css("display", "none");
        $("#btn_show_password_confirm").css("display", "flex");
        $("#password_confirm").attr("type", "password");
    });

    $("#btn_show_password_confirm").click((e) => {
        $("#btn_show_password_confirm").css("display", "none");
        $("#btn_hide_password_confirm").css("display", "flex");
        $("#password_confirm").attr("type", "text");
    });

    $("#aHome").click((e) => {
        sendPostMessage({ action: "go_home" });
    });

    $("#btnGoHome").click((e) => {
        sendPostMessage({ action: "go_home" });
    });

    $("#btnCloseSucceed").click((e) => {
        $("#dialog_succeed").css("display", "none");
    });

    $("#btnCloseSMSConfirm").click((e) => {
        $("#dialog_sms_confirm").css("display", "none");
        $("#txtSMSMsg").empty();
    });

    $("#username").focusout(function () {
        const username = $("#username").val();
        const usernameCheckMap = { 1: checkUserName, 4: checkPhone, 2: checkMail, 8: checkPhone };
        if (usernameCheckMap[register_type](username)) {
            $("#username_error").css("display", "none");
        } else {
            $("#username_error").css("display", "block");
        }
    });

    $("#password").focusout(function () {
        if (checkUserPassword($("#password").val())) {
            $("#password_error").css("display", "none");
        } else {
            $("#password_error").css("display", "block");
        }
    });

    $("#password_confirm").focusout(function () {
        if (checkUserPassword($("#password_confirm").val())) {
            $("#password_confirm_error").css("display", "none");
        } else {
            $("#password_confirm_error").css("display", "block");
        }
    });

    $("#verify_code").focusout(function () {
        const verify_code = $("#verify_code").val();
        if (verify_code.length >= 4) {
            $("#verify_code_error").css("display", "none");
        } else {
            $("#verify_code_error").css("display", "block");
        }
    });

    $("#username_mobile").focusout(function () {
        if (register_type == 8) {
            if (checkUserName($("#username_mobile").val())) {
                $("#username_mobile_error").css("display", "none");
            } else {
                $("#username_mobile_error").css("display", "block");
            }
        }
    });
});
