import GamePlatConfig from "@/core/config/GamePlatConfig";
import { objectRemoveNull } from "@/core/global/Functions";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import Cookies from "js-cookie";
export default class DialogLoginProxy extends puremvc.Proxy {
    static NAME = "DialogLoginProxy";

    public onRegister(): void {}

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        form: {
            username: "",
            password: "",
        },
        remember: false,
        is_login_need_google: 0,
    };

    /**找回密码 */
    forgetData = {
        bShow: false,
        tabIndex: 0, //0:手机找回 1:邮箱找回
        form: {
            area_code: "",
            username: "",
            password: "",
            password_confirm: "",
            verify_code: "",
            type: 2, // 2：邮箱  4：手机
        },
        // {icon:string, name:string,area_code:number}
        areaCode: <any>[],
    };

    resetForm() {
        Object.assign(this.pageData.form, {
            username: "",
            password: "",
        });
        Object.assign(this.forgetData.form, {
            area_code: "",
            username: "",
            password: "",
            password_confirm: "",
            verify_code: "",
        });
        this.setAreaCode();
        const user = Cookies.get("username");
        const pwd = Cookies.get("password");
        if (user && pwd) {
            this.pageData.form.username = user;
            this.pageData.form.password = pwd;
            this.pageData.remember = true;
        }
    }
    setAreaCode() {
        if (this.forgetData.areaCode && this.forgetData.areaCode.length > 0) {
            this.forgetData.form.area_code = this.forgetData.areaCode[0].area_code;
        }
    }
    show() {
        this.forgetData.bShow = false;
        this.pageData.bShow = true;
        this.forgetData.form.type = GamePlatConfig.config.validate_type.includes(1) ? 2 : 4;
    }

    hide() {
        this.pageData.bShow = false;
        this.forgetData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    /**--账号--登入*/
    api_user_login(google_code?: any) {
        this.pageData.loading = true;
        const { username, password } = this.pageData.form;
        window.localStorage.setItem("username", username);
        const copyForm = {
            password: core.MD5.createInstance().hex_md5(password),
            username,
            google_code,
        };
        this.sendNotification(net.HttpType.api_user_login, objectRemoveNull(copyForm));
        if (this.pageData.remember) {
            Cookies.set("username", username, { expires: 7 });
            Cookies.set("password", password, { expires: 7 });
        } else {
            Cookies.remove("username");
            Cookies.remove("password");
        }
    }
    /**--账号--重置密码*/
    api_user_reset_password() {
        this.pageData.loading = true;
        const { username, password, password_confirm, verify_code, type } = this.forgetData.form;
        this.sendNotification(net.HttpType.api_user_reset_password, {
            username,
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
            verify_code,
            type,
        });
    }
    /**获取手机区号 */
    api_public_area_code() {
        this.sendNotification(net.HttpType.api_public_area_code);
    }

    /**用户登陆前置验证 */
    api_user_login_check() {
        this.pageData.loading = true;
        const { username, password } = this.pageData.form;
        this.sendNotification(net.HttpType.api_user_login_check, {
            username,
            password: core.MD5.createInstance().hex_md5(password),
        });
    }
}
