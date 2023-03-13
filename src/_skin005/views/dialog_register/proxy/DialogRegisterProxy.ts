export default class DialogRegisterProxy extends puremvc.Proxy {
    static NAME = "DialogRegisterProxy";

    public onRegister(): void {
        // this.api_public_area_code();
    }

    pageData = {
        loading: false,
        bShow: false,
        bHidden:false, //暂时隐藏
        //如果是列表，使用以下数据，否则删除
        form: {
            invite_user_id: core.invite_user_id,
            username: "",
            password: "",
            password_confirm: "",
            verify_code: "",
            register_type: 1, //1：用户名 2：邮箱 4：手机
            area_code: "86",
        },
        auth_image: "",
        areaCode: <any>[],
    };

    resetForm() {
        Object.assign(this.pageData.form, {
            invite_user_id: core.invite_user_id,
            username: "",
            password: "",
            password_confirm: "",
            verify_code: "",
        });
    }

    show() {
        this.resetForm();
        this.pageData.bShow = true;
    }

    api_public_auth_code() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }

    /**--账号--注册*/
    api_user_register() {
        this.pageData.loading = true;
        const { invite_user_id, username, password, password_confirm, verify_code, area_code, register_type } = this.pageData.form;
        this.sendNotification(net.HttpType.api_user_register, {
            invite_user_id,
            username,
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
            verify_code,
            uuid: core.device,
            area_code,
            register_type,
        });
    }

    /**获取手机区号 */
    api_public_area_code() {
        this.sendNotification(net.HttpType.api_public_area_code);
    }
}
