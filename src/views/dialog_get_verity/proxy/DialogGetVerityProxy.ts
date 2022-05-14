export default class DialogGetVerityProxy extends puremvc.Proxy {
    static NAME = "DialogGetVerityProxy";

    pageData = {
        loading: false,
        bShow: false,
        form: {
            type: 0,
            email: "",
            auth_code: "",
            plat_id: core.plat_id,
            uuid: core.device,
            user_id: 0,
        },
        auth_image: "",
    };

    api_public_auth_code() {
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }

    api_public_email_send() {
        this.pageData.form.user_id = core.user_id;
        this.sendNotification(net.HttpType.api_public_email_send, this.pageData.form);
    }
}
