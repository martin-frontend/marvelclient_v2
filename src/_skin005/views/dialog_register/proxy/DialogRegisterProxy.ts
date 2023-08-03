import { getAuthDragValue } from "@/_skin005/core/AuthDragFun";
import PanelUtil from "@/_skin005/core/PanelUtil";

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
        } = this.pageData.form;
        this.sendNotification(net.HttpType.api_user_register, {
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
        });
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
