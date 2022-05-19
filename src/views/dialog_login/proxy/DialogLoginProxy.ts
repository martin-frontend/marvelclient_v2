export default class DialogLoginProxy extends puremvc.Proxy {
    static NAME = "DialogLoginProxy";

    public onRegister(): void {
        this.api_public_area_code();
    }

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
        tabIndex: 0, //0:手机找回 1:邮箱找回
        form: {
            area_code: "86",
            username: "",
            password: "",
            password_confirm: "",
            verify_code: "",
            type: 2,  // 2：邮箱  4：手机
        },
        // {icon:string, name:string,area_code:number}
        areaCode: <any>[],
    };

    resetForm() {
        Object.assign(this.pageData.form, {
            username: "",
            password: "",
        });
        Object.assign(this.forgetData.form, {
            area_code: "86",
            username: "",
            password: "",
            password_confirm: "",
            verify_code: "",
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
        const { username, password, password_confirm, verify_code, type } = this.forgetData.form;
        this.sendNotification(net.HttpType.api_user_reset_password, {
            username,
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
            verify_code,
            type
        });
    }
    /**获取手机区号 */
    api_public_area_code() {
        this.sendNotification(net.HttpType.api_public_area_code);
    }
}
