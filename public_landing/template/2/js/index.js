var register_type = 0;
var areaCodeArr = [];
var version = 1.2;
var token = "";
var user_id = "";
var uuid = "";

if (window.self === window.top) {
    const registrationType = [1, 2, 4, 8];
    const code = [
        { icon: "", name: "JP", area_code: 81 },
        { icon: "", name: "CN", area_code: 86 },
        { icon: "", name: "VN", area_code: 84 },
    ];
    areaCode(code);

    register_type = registrationType[0];
    if (registrationType.length > 1) {
        $(".tag-box-method").css("display", "flex");
        if (registrationType.includes(1)) {
            $("#btnTagAccount").css("display", "block");
        }
        if (registrationType.includes(4)) {
            $("#btnTagMobile").css("display", "block");
        }
        if (registrationType.includes(2)) {
            $("#btnTagEmail").css("display", "block");
        }
        if (registrationType.includes(8)) {
            $("#btnTagEmailMobile").css("display", "block");
        }
        $(".btn-tag").first().addClass("btn-tag-active");
    }

    if (registrationType.length == 1 && registrationType.includes(8)) {
        $(".username_mobile").css("display", "block");
        $("#username").css({ "padding-left": "110px" });
    }

    if (registrationType.includes(4) && !registrationType.includes(1) && !registrationType.includes(2)) {
        $("#username").css({ "padding-left": "110px" });
    }

    $("#aHome").attr("href", "https://api.testjj9.com");

    resetForm();

    if (registrationType.includes(4) && !registrationType.includes(1)) {
        $("#area_code").css("display", "flex");
        $("#username").css({ "padding-left": "110px" });
        $("#username").attr("placeholder", str.mobile_placeholder);
    }
}

// 初始化
function init() {
    const registrationType = window.config.registrationType;
    const inviteHide = window.config.inviteHide;

    if (inviteHide == 1) {
        $("#refer_code").css("display", "none");
    }

    if (registrationType.length == 0) {
        console.log("error: registrationType");
        return;
    }

    register_type = registrationType[0];
    if (registrationType.length > 1) {
        $(".tag-box-method").css("display", "flex");
        if (registrationType.includes(1)) {
            $("#btnTagAccount").css("display", "block");
        }
        if (registrationType.includes(4)) {
            $("#btnTagMobile").css("display", "block");
        }
        if (registrationType.includes(2)) {
            $("#btnTagEmail").css("display", "block");
        }
        if (registrationType.includes(8)) {
            $("#btnTagEmailMobile").css("display", "block");
        }
        $(".btn-tag").first().addClass("btn-tag-active");
    } else {
        $("#tag_box").addClass("tag_box");
    }

    if (registrationType.length == 1 && registrationType.includes(8)) {
        $(".username_mobile").css("display", "block");
        $("#username").css({ "padding-left": "110px" });
    }

    if (registrationType.includes(4) && !registrationType.includes(1) && !registrationType.includes(2)) {
        $("#username").css({ "padding-left": "110px" });
    }

    $("#aHome").attr("href", window.config.platUrl);

    resetForm();

    if (registrationType.includes(4) && !registrationType.includes(1)) {
        $("#area_code").css("display", "flex");
        $("#username").css({ "padding-left": "110px" });
        $("#username").attr("placeholder", str.mobile_placeholder);
    }

    if (isMobile()) {
        $("#mobile").css("display", "block");
        $("#pc").css("display", "none");
    } else {
        $("#pc").css("display", "block");
        $("#mobile").css("display", "none");
    }
}
//重置表单
function resetForm() {
    $(".input-error").css("display", "none");
    $("#invite_user_id").val("");
    $("#username").val("");
    $("#username_mobile").val("");
    $("#password").val("");
    $("#password_confirm").val("");
    $("#verify_code").val("");
    $("#one_code").val("");
    $(".input-error").css("display", "none");

    $("#divImageCode").css("display", register_type == 1 ? "block" : "none");
    $("#btnGetCode").css("display", register_type == 1 ? "none" : "flex");
    $("#area_code").css("display", register_type == 4 || register_type == 8 ? "block" : "none");
    $("#one_code").css("display", "none");

    $("#password").attr("placeholder", str.password_placeholder);
    $("#password_error").html(str.password_error);
    $("#password_confirm").attr("placeholder", str.password_confirm_placeholder);
    $("#password_confirm_error").html(str.password_confirm_error);
    $("#verify_code").attr("placeholder", str.verify_code_placeholder);
    $("#verify_code_error").html(str.verify_code_error);
    switch (register_type) {
        case 1:
            $("#username").attr("placeholder", str.username_placeholder);
            $("#username_error").html(str.username_error);
            $("#formItemVerifyCode").appendTo($("#form"));
            break;
        case 4:
            $("#username").attr("placeholder", str.mobile_placeholder);
            $("#username_error").html(str.mobile_error);
            $("#formItemPassword").appendTo($("#form"));
            $("#formItemPasswordConfirm").appendTo($("#form"));
            break;
        case 2:
            $("#username").attr("placeholder", str.email_placeholder);
            $("#username_error").html(str.email_error);
            $("#formItemPassword").appendTo($("#form"));
            $("#formItemPasswordConfirm").appendTo($("#form"));
            break;
        case 8:
            $("#username_mobile").attr("placeholder", str.username_placeholder);
            $("#username").attr("placeholder", str.mobile_placeholder);
            $("#username_error").html(str.mobile_error);
            $("#username_mobile_error").html(str.username_error);
            $("#formItemPassword").appendTo($("#form"));
            $("#formItemPasswordConfirm").appendTo($("#form"));
            break;
    }
}
//验证表单
function checkForm() {
    let bPass = true;
    const username = $("#username").val();
    const usernameCheckMap = { 1: checkUserName, 4: checkPhone, 2: checkMail, 8: checkPhone };
    if (usernameCheckMap[register_type](username)) {
        $("#username_error").css("display", "none");
    } else {
        $("#username_error").css("display", "block");
        bPass = false;
    }

    if (register_type == 8) {
        if (checkUserName($("#username_mobile").val())) {
            $("#username_mobile_error").css("display", "none");
        } else {
            $("#username_mobile_error").css("display", "block");
            bPass = false;
        }
    }

    if (checkUserPassword($("#password").val())) {
        $("#password_error").css("display", "none");
    } else {
        $("#password_error").css("display", "block");
        bPass = false;
    }

    if (checkUserPassword($("#password_confirm").val())) {
        $("#password_confirm_error").css("display", "none");
    } else {
        $("#password_confirm_error").css("display", "block");
        bPass = false;
    }

    const verify_code = $("#verify_code").val();
    if (verify_code.length >= 4) {
        $("#verify_code_error").css("display", "none");
    } else {
        $("#verify_code_error").css("display", "block");
        bPass = false;
    }
    return bPass;
}

function areaCode(code) {
    for (var i = 0; i < code.length; ++i) {
        $("#area_code").append(
            $("<option></option>")
                .attr("value", code[i].area_code)
                .html("<div><div>" + code[i].name + "</div><div> +" + code[i].area_code + "</div></div>")
        );
    }
    if (code.length == 1) {
        if (isSafari()) {
            $("#area_code").addClass("area_code_safari_one_option");
        } else {
            $("#area_code").addClass("area_code_one_option");
        }
    } else {
        if (isSafari()) {
            $("#area_code").addClass("area_code_safari");
        } else {
            $("#area_code").addClass("area_code");
        }
    }
}

function beginCountdown() {
    var downcount = 60;
    $("#btnGetCode").css("pointer-events", "none");
    var x = setInterval(function () {
        downcount--;
        document.getElementById("btnGetCode").innerHTML = downcount;
        if (downcount <= 0) {
            document.getElementById("btnGetCode").innerHTML = "Get Code";
            $("#btnGetCode").css("pointer-events", "auto");
            clearInterval(x);
        }
    }, 1000);
}

function isSafari() {
    return (
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent) &&
        !/iPhone/.test(navigator.userAgent) &&
        !/iPad/.test(navigator.userAgent)
    );
}

function isMobile() {
    const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
}
