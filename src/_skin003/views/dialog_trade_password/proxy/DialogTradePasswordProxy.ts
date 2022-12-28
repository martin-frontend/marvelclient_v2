export default class DialogTradePasswordProxy extends puremvc.Proxy {
    static NAME = "DialogTradePasswordProxy";

    pageData = {
        loading: false,
        bShow: false,
        form: {
            verify_code: "",
            password: "",
            password_confirm: "",
            area_code: "86",
        },
    };

    resetForm() {
        Object.assign(this.pageData.form, {
            verify_code: "",
            password: "",
            password_confirm: "",
        });
    }

    show() {
        this.resetForm();
        this.pageData.bShow = true;
    }

    hide() {
        this.pageData.bShow = false;
    }

    api_user_change_password_gold_var() {
        this.pageData.loading = true;
        const { password, password_confirm, verify_code } = this.pageData.form;
        this.sendNotification(net.HttpType.api_user_change_password_gold_var, {
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
            code: verify_code,
            user_id: core.user_id,
        });
    }
}
