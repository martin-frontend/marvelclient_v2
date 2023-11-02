import GameConfig from "@/core/config/GameConfig";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import PanelUtil from "@/_skin030/core/PanelUtil";
import { getAuthDragValue } from "@/_skin030/core/AuthDragFun";

export default class DialogTradePasswordProxy extends puremvc.Proxy {
    static NAME = "DialogTradePasswordProxy";
    GameConfig = GameConfig;
    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
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
    setAuthDrag(data: any) {
        PanelUtil.showAppLoading(false);
        this.pageData.auth_drag_position = getAuthDragValue(data);
    }
    resetForm() {
        Object.assign(this.pageData.form, {
            verify_code: "",
            password: "",
            password_confirm: "",
            ogonPassword: "", //登录密码
        });
    }

    show() {
        this.resetForm();
        this.pageData.bShow = true;
    }

    hide() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
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
        // this.sendNotification(net.HttpType.api_user_change_password_gold_var, {
        //     password: core.MD5.createInstance().hex_md5(password),
        //     password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
        //     code: verify_code,
        //     user_id: core.user_id,
        //     uuid: core.device,
        //     password_old:logonPassword,
        // });
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
    api_public_auth_code() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }
    api_public_auth_drag() {
        PanelUtil.showAppLoading(true);
        this.sendNotification(net.HttpType.api_public_auth_drag, { uuid: core.device });
    }
}
