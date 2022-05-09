import AbstractProxy from "@/core/abstract/AbstractProxy";

export default class LoginProxy extends AbstractProxy {
    static NAME = "LoginProxy";

    /**登录 */
    loginData = {
        bShow: false,
        form: {
            username: "",
            password: "",
        },
    };
    /**找回密码 */
    forgetData = {
        bShow: false,
        form: {
            email: "",
            password: "",
            password_confirm: "",
            email_code: "",
        },
    };
    /**注册 */
    registerData = {
        bShow: false,
        form: {
            invite_user_id: "",
            email: "",
            password: "",
            password_confirm: "",
            email_code: "",
        },
    };
    /**广告 */
    advertiseData = [
        { img: "https://staticff.kvwuua.com/group1/M00/00/24/rBQVwGIOFBSAevwYAAC2QEz_gcA41.webp", url: "" },
        { img: "https://staticff.kvwuua.com/group2/M00/02/C0/rBQVwWJWlC6AfNqpAADqlBkQuZ041.webp", url: "" },
    ];

    showLogin() {
        Object.assign(this.loginData.form, {
            username: "",
            password: "",
        });
        this.registerData.bShow = false;
        this.forgetData.bShow = false;
        this.loginData.bShow = true;
    }

    showRegister() {
        this.loginData.bShow = false;
        this.registerData.bShow = true;
    }

    hideLogin() {
        this.loginData.bShow = false;
        this.forgetData.bShow = false;
    }

    hideRegister() {
        this.registerData.bShow = false;
    }
}
