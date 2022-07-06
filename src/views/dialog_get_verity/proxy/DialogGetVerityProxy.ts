import { objectRemoveNull } from "@/core/global/Functions";

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

            area_code: "",
            mobile: "",
        },
        category: 0, // 0:邮箱 1:短信
        auth_image: "",
    };

    resetForm() {
        Object.assign(this.pageData.form, {
            type: 0,
            email: "",
            auth_code: "",
            plat_id: core.plat_id,
            uuid: core.device,
            user_id: core.user_id,
        });
        this.api_public_auth_code();
    }

    api_public_auth_code() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }

    api_public_email_send() {
        this.pageData.loading = true;
        const { type, email, auth_code, plat_id, uuid, user_id } = this.pageData.form;
        this.sendNotification(net.HttpType.api_public_email_send, { type, email, auth_code, plat_id, uuid, user_id });
    }

    api_public_sms_send() {
        this.pageData.loading = true;
        const { type, area_code, mobile, auth_code, plat_id, uuid, user_id } = this.pageData.form;
        this.sendNotification(net.HttpType.api_public_sms_send, objectRemoveNull({ type, area_code, mobile, auth_code, plat_id, uuid, user_id }, [undefined, null, "", 0, "0"]));
    }
}
