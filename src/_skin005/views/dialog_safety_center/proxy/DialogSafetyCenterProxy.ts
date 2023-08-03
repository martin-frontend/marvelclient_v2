import { getAuthDragValue } from "@/_skin005/core/AuthDragFun";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GameConfig from "@/core/config/GameConfig";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import getProxy from "@/core/global/getProxy";
import SelfProxy from "@/proxy/SelfProxy";

export default class DialogSafetyCenterProxy extends puremvc.Proxy {
    static NAME = "DialogSafetyCenterProxy";
    GameConfig = GameConfig;
    // public onRegister(): void {

    // }

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
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
        form: {
            verify_code: "",
            password: "",
            password_confirm: "",
            area_code: "86",
            logonPassword: "", //登录密码
        },
        auth_image: "",
        auth_drag_position: -1,
    };

    resetForm() {
        Object.assign(this.pageData.formBindPhone, {
            user_id: core.user_id,
            area_code: "",
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
        Object.assign(this.pageData.form, {
            verify_code: "",
            password: "",
            password_confirm: "",
            ogonPassword: "", //登录密码
        });
        this.setAreaCode();
        if (this.pageData.tabIndex < 0) {
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
    }
    setAuthDrag(data: any) {
        PanelUtil.showAppLoading(false);
        this.pageData.auth_drag_position = getAuthDragValue(data);
    }
    show() {
        this.resetForm();
        this.pageData.bShow = true;
    }

    hide() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }
    public get passWordShowType(): number {
        //console.log("------" + this.GameConfig.config.changeGoldPasswordFollowSetting + " ----- " + this.GameConfig.config.changeGoldPasswordFirstSetting);
        const selfProxy = PanelUtil.getProxy_selfproxy;
        if (selfProxy.userInfo.password_gold_exists == 1) {
            return this.GameConfig.config.changeGoldPasswordFollowSetting || 3;
        } else {
            return this.GameConfig.config.changeGoldPasswordFirstSetting || 3;
        }
    }
    get isDragAuth() {
        return GamePlatConfig.config.auth_types == 2;
    }
    onAuthcode_error() {
        this.pageData.form.verify_code = "";
        if (!this.isDragAuth) {
            this.api_public_auth_code();
        }
    }
    setAreaCode() {
        if (this.pageData.areaCode && this.pageData.areaCode.length > 0) {
            this.pageData.formBindPhone.area_code = this.pageData.areaCode[0].area_code;
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
            password_ori: password,
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
        });
    }

    /**获取手机区号 */
    api_public_area_code() {
        this.sendNotification(net.HttpType.api_public_area_code);
    }
    api_public_auth_code() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }
    api_user_change_password_gold_var() {
        //this.pageData.loading = true;
        const { password, password_confirm, verify_code, logonPassword } = this.pageData.form;
        const sendobj = <any>{
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
            user_id: core.user_id,
        };
        if (this.passWordShowType == 1) {
            sendobj.uuid = core.device;
            sendobj.code = verify_code;
        } else if (this.passWordShowType == 2) {
            sendobj.password_old = core.MD5.createInstance().hex_md5(logonPassword);
        } else if (this.passWordShowType == 3) {
            sendobj.code = verify_code;
        }
        console.log("发送的数据为", sendobj);
        this.sendNotification(net.HttpType.api_user_change_password_gold_var, sendobj);
    }
    api_public_auth_drag() {
        PanelUtil.showAppLoading(true);
        this.sendNotification(net.HttpType.api_public_auth_drag, { uuid: core.device });
    }
}
