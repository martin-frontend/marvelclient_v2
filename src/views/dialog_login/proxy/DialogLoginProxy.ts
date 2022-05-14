export default class DialogLoginProxy extends puremvc.Proxy {
    static NAME = "DialogLoginProxy";

    pageData = {
        loading: false,
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

    resetForm() {
        Object.assign(this.pageData.form, {
            username: "",
            password: "",
        });
        Object.assign(this.forgetData.form, {
            email: "",
            password: "",
            password_confirm: "",
            email_code: "",
        });
    }

    show() {
        Object.assign(this.pageData.form, {
            username: "",
            password: "",
        });
        this.forgetData.bShow = false;
        this.pageData.bShow = true;
    }

    hide() {
        this.pageData.bShow = false;
        this.forgetData.bShow = false;
    }

    /**--账号--登入*/
    api_user_login() {
        this.pageData.loading = true;
        const { username, password } = this.pageData.form;
        window.localStorage.setItem("username", username);
        this.sendNotification(net.HttpType.api_user_login, {
            username,
            password: core.MD5.createInstance().hex_md5(password),
        });
    }
    /**--账号--重置密码*/
    api_user_reset_password() {
        this.pageData.loading = true;
        const { email, password, password_confirm, email_code } = this.forgetData.form;
        this.sendNotification(net.HttpType.api_user_reset_password, {
            email,
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
            email_code,
        });
    }
}
