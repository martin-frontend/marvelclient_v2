import getProxy from "@/core/global/getProxy";
import SelfProxy from "@/proxy/SelfProxy";

export default class DialogSafetyCenterProxy extends puremvc.Proxy {
    static NAME = "DialogSafetyCenterProxy";

    public onRegister(): void {
        this.api_public_area_code();
    }

    pageData = {
        loading: false,
        bShow: false,
        tabIndex: 0,
        formBindPhone: {
            user_id: 0,
            area_code: "",
            mobile: "",
            code: "",
        },
        formBindEmail: {
            user_id: 0,
            email: "",
            code: "",
        },
        formChangePassword: {
            user_id: 0,
            password_old: "",
            password: "",
            password_confirm: "",
        },
        areaCode: <any>[],
    };

    resetForm() {
        Object.assign(this.pageData.formBindPhone, {
            user_id: core.user_id,
            area_code: "86",
            mobile: "",
            code: "",
        });
        Object.assign(this.pageData.formBindEmail, {
            user_id: core.user_id,
            email: "",
            code: "",
        });
        Object.assign(this.pageData.formChangePassword, {
            user_id: core.user_id,
            password_old: "",
            password: "",
            password_confirm: "",
        });
        const selfProxy: SelfProxy = getProxy(SelfProxy);
        const { phone, email } = selfProxy.userInfo;
        if (phone && email) {
            this.pageData.tabIndex = 2;
        } else {
            if (phone) {
                this.pageData.tabIndex = 1;
            } else {
                this.pageData.tabIndex = 0;
            }
        }
    }

    api_user_bind_mobile_var() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_bind_mobile_var, this.pageData.formBindPhone);
    }

    api_user_bind_email_var() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_bind_email_var, this.pageData.formBindEmail);
    }

    api_user_change_password_var() {
        this.pageData.loading = true;
        const { user_id, password_old, password, password_confirm } = this.pageData.formChangePassword;
        this.sendNotification(net.HttpType.api_user_change_password_var, {
            user_id,
            password_old: core.MD5.createInstance().hex_md5(password_old),
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
        });
    }

    /**获取手机区号 */
    api_public_area_code() {
        this.sendNotification(net.HttpType.api_public_area_code);
    }
}
