export default class DialogRegisterProxy extends puremvc.Proxy {
    static NAME = "DialogRegisterProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        form: {
            invite_user_id: "",
            email: "",
            password: "",
            password_confirm: "",
            email_code: "",
        },
    };

    resetForm() {
        Object.assign(this.pageData.form, {
            invite_user_id: "",
            email: "",
            password: "",
            password_confirm: "",
            email_code: "",
        });
    }

    show(){
        this.resetForm();
        this.pageData.bShow = true;
    }

    /**--账号--注册*/
    api_user_register() {
        const { invite_user_id, email, password, password_confirm, email_code } = this.pageData.form;
        this.sendNotification(net.HttpType.api_user_register, {
            invite_user_id,
            email,
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
            email_code,
            uuid: core.device,
        });
    }
}
