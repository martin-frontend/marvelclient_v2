import { getAuthDragValue } from "@/_skin005/core/AuthDragFun";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";

export default class DialogRegisterProxy extends puremvc.Proxy {
    static NAME = "DialogRegisterProxy";

    public onRegister(): void {
        // this.api_public_area_code();
    }
    dateObj = {
        year: "",
        month: "",
        day: "",
    };
    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        //如果是列表，使用以下数据，否则删除
        form: {
            invite_user_id: core.invite_user_id,
            username: "",
            password: "",
            password_confirm: "",
            verify_code: "",
            mobile_username: "", //手机账号的 用户名
            register_type: 1, //1：用户名 2：邮箱 4：手机
            area_code: "",
            email_username: "",
            birth_date: "",
            invite_code: "",
        },
        auth_image: "",
        auth_drag_position: -1, //滑动验证滑块所在的位置
        areaCode: <any>[],
    };

    setAreaCode() {
        if (this.pageData.areaCode && this.pageData.areaCode.length > 0) {
            // @ts-ignore
            const obj = this.pageData.areaCode.find((item) => item.default);
            if (obj) {
                this.pageData.form.area_code = obj.area_code;
            } else {
                this.pageData.form.area_code = this.pageData.areaCode[0].area_code;
            }
        }
    }
    setAuthDrag(data: any) {
        PanelUtil.showAppLoading(false);
        this.pageData.auth_drag_position = getAuthDragValue(data);
    }
    resetForm() {
        Object.assign(this.pageData.form, {
            invite_user_id: core.invite_user_id,
            username: "",
            password: "",
            password_confirm: "",
            verify_code: "",
            mobile_username: "",
            email_username: "",
            birth_date: "",
        });
        Object.assign(this.dateObj, {
            year: "",
            month: "",
            day: "",
        });
    }
    get isDragAuth() {
        return GamePlatConfig.config.auth_types == 2;
    }
    show() {
        this.resetForm();
        this.pageData.bShow = true;
    }

    api_public_auth_code() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }
    onAuthcode_error() {
        this.pageData.form.verify_code = "";
        if (this.isDragAuth && (this.pageData.form.register_type == 1 || this.pageData.form.register_type == 32)) {
            console.log("--");
        } else this.api_public_auth_code();
    }
    /**--账号--注册*/
    api_user_register() {
        this.pageData.loading = true;
        const {
            invite_user_id,
            username,
            password,
            password_confirm,
            verify_code,
            area_code,
            register_type,
            mobile_username,
            email_username,
            birth_date,
            ...rest // includes invite_code
        } = this.pageData.form;
        const sendObj = <any>{
            invite_user_id,
            username,
            password_ori: password,
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
            verify_code,
            uuid: core.device,
            area_code,
            register_type,
            mobile_username,
            email_username,
            birth_date,
            ...rest,
        };
        if (core.other_params && core.other_params.ma_token && core.other_params.ma_token.trim()) {
            const exArr = ["plat_id", "channel_id", "channelCode", "platformConfig"];
            const keys_send = Object.keys(sendObj);
            const keys_other = Object.keys(core.other_params);
            for (let index = 0; index < keys_other.length; index++) {
                const element = keys_other[index];
                const val = core.other_params[element];
                if (val && val.trim() && !keys_send.includes(element) && !exArr.includes(element)) {
                    sendObj[element] = val;
                }
            }
        }
        this.sendNotification(net.HttpType.api_user_register, sendObj);
    }

    /**获取手机区号 */
    api_public_area_code() {
        this.sendNotification(net.HttpType.api_public_area_code);
    }
    api_public_auth_drag() {
        PanelUtil.showAppLoading(true);
        this.sendNotification(net.HttpType.api_public_auth_drag, { uuid: core.device });
    }
}
