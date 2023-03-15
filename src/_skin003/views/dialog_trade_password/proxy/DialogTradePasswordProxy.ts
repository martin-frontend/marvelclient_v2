import GameConfig from "@/core/config/GameConfig";
import getProxy from "@/core/global/getProxy";
import SelfProxy from "@/proxy/SelfProxy";
export default class DialogTradePasswordProxy extends puremvc.Proxy {
    static NAME = "DialogTradePasswordProxy";
    GameConfig = GameConfig;
    pageData = {
        loading: false,
        bShow: false,
        form: {
            verify_code: "",
            password: "",
            password_confirm: "",
            area_code: "86",
            logonPassword: "", //登录密码
        },
        auth_image: "",
    };

    resetForm() {
        Object.assign(this.pageData.form, {
            verify_code: "",
            password: "",
            password_confirm: "",
            logonPassword: "", //登录密码
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
        }
        else if (this.passWordShowType == 2) {
            sendobj.password_old = core.MD5.createInstance().hex_md5(logonPassword);
        }
        else if (this.passWordShowType == 3) {
            sendobj.code = verify_code;
        }
        console.log("发送的数据为", sendobj);
        this.sendNotification(net.HttpType.api_user_change_password_gold_var, sendobj);
    }
    public get passWordShowType(): number {
        //console.log("------" + this.GameConfig.config.changeGoldPasswordFollowSetting + " ----- " + this.GameConfig.config.changeGoldPasswordFirstSetting);
        const selfProxy: SelfProxy = getProxy(SelfProxy);
        if (selfProxy.userInfo.password_gold_exists == 1) {
            return this.GameConfig.config.changeGoldPasswordFollowSetting || 3;
        }
        else {
            return this.GameConfig.config.changeGoldPasswordFirstSetting || 3;
        }
    }
    api_public_auth_code() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }
}
