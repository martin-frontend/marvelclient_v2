import { getAuthDragValue } from "@/_skin005/core/AuthDragFun";
import { objectRemoveNull } from "@/core/global/Functions";

export default class DialogGetVerityProxy extends puremvc.Proxy {
    static NAME = "DialogGetVerityProxy";

    private timer = 0;

    private downcountHandler() {
        this.pageData.downcount--;
        if (this.pageData.downcount == 0) {
            clearInterval(this.timer);
        }
    }

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
        //倒计时计数
        downcount: 0,
        verification: -1,
    };
    setAuthDrag(data: any) {
        // this.pageData.loading = false;
        this.pageData.verification = getAuthDragValue(data);
    }
    resetForm() {
        Object.assign(this.pageData.form, {
            type: 0,
            email: "",
            auth_code: "",
            plat_id: core.plat_id,
            uuid: core.device,
            user_id: core.user_id,
        });
        this.pageData.verification = -1;
        this.api_public_auth_code();
    }

    beginDowncount() {
        this.pageData.downcount = 60;
        this.timer = setInterval(this.downcountHandler.bind(this), 1000);
    }

    api_public_auth_code() {
        this.pageData.loading = true;
        this.pageData.form.auth_code = "";
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }
    api_public_auth_drag() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_public_auth_drag, { uuid: core.device });
    }
    api_public_email_send() {
        this.pageData.loading = true;
        const { type, email, auth_code, plat_id, uuid, user_id } = this.pageData.form;
        this.sendNotification(net.HttpType.api_public_email_send, { type, email, auth_code, plat_id, uuid, user_id });
    }

    api_public_sms_send() {
        this.pageData.loading = true;
        const { type, area_code, mobile, auth_code, plat_id, uuid, user_id } = this.pageData.form;
        this.sendNotification(
            net.HttpType.api_public_sms_send,
            objectRemoveNull({ type, area_code, mobile, auth_code, plat_id, uuid, user_id }, [undefined, null, "", 0, "0"])
        );
    }
}
