import AbstractProxy from "@/core/abstract/AbstractProxy";

export default class SelfProxy extends AbstractProxy {
    static NAME = "SelfProxy";

    public onRegister(): void {
        setInterval(() => {
            this.api_user_show_var([2]);
        }, 10000);
    }

    /**验证码图片地址 */
    authCode = "";
    /**用户个人信息 */
    userInfo: core.UserInfoVO = { user_id: 0, nick_name: "", bsc_address: "", gold_info: {} };

    public get isLogin(): boolean {
        return !!this.userInfo.user_id;
    }

    setUserInfo(value: any) {
        Object.assign(this.userInfo, value);
        core.user_id = <any>this.userInfo.user_id;
    }

    loginout() {
        core.user_id = 0;
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user_id");
        window.localStorage.removeItem("username");
        this.userInfo.user_id = 0;
    }

    /**--账号--登出*/
    api_user_logout() {
        this.sendNotification(net.HttpType.api_user_logout);
    }
    /**--账号--修改密码*/
    api_user_change_password_var({ password, password_confirm, password_old }: any) {
        this.sendNotification(net.HttpType.api_user_change_password_var, {
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
            password_old: core.MD5.createInstance().hex_md5(password_old),
            user_id: this.userInfo.user_id,
        });
    }
    /**--会员资料--获取用户基本信息*/
    api_user_show_var(modules: number[]) {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_show_var, { user_id: core.user_id, modules: JSON.stringify(modules) });
        }
    }
    /**--账号--获取验证码图片*/
    api_public_auth_code() {
        this.sendNotification(net.HttpType.api_public_auth_code, { uuid: core.device });
    }
    /**--短信--重置密码发送短信*/
    api_sms_reset_password_sent({ auth_code, username }: any) {
        this.sendNotification(net.HttpType.api_sms_reset_password_sent, {
            uuid: core.device,
            auth_code,
            username,
        });
    }
    /**--短信--发送短信 [验证码和获取注册验证码调用同一方法即可]*/
    api_sms_send(data: any) {
        this.sendNotification(net.HttpType.api_sms_send, {
            ...data,
            user_id: core.user_id,
            uuid: core.device,
        });
    }
    /**--会员资料--修改用户基本信息*/
    api_user_update_var(data: any) {
        this.sendNotification(net.HttpType.api_user_update_var, {
            ...data,
            user_id: core.user_id,
        });
    }
    /**--会员资料--用户绑定手机*/
    api_user_bind_mobile_var(data: any) {
        this.sendNotification(net.HttpType.api_user_bind_mobile_var, {
            ...data,
            user_id: core.user_id,
        });
    }
    /**--会员资料--提取用户所有厂商的余额*/
    api_user_var_vendor_withdraw() {
        this.sendNotification(net.HttpType.api_user_var_vendor_withdraw, {
            user_id: core.user_id,
        });
    }
    /**--会员资料--用户保险箱存取款*/
    api_user_update_var_safe_gold({ gold, type }: any) {
        this.sendNotification(net.HttpType.api_user_update_var_safe_gold, {
            user_id: core.user_id,
            gold,
            type,
        });
    }
    /**--短信--金币划转发送短信*/
    api_sms_transfer({ auth_code }: any) {
        this.sendNotification(net.HttpType.api_sms_transfer, {
            user_id: core.user_id,
            auth_code,
            uuid: core.device,
        });
    }
    /**--会员资料--金币划转*/
    api_user_var_gold_transfer({ gold, to_user_id, code, password_gold }: any) {
        this.sendNotification(net.HttpType.api_user_var_gold_transfer, {
            user_id: core.user_id,
            gold,
            to_user_id,
            code,
            password_gold: password_gold == "" ? "" : core.MD5.createInstance().hex_md5(password_gold),
        });
    }

    /**--短信--收款方式发送短信*/
    api_sms_exchange(code: any) {
        // console.warn(code.auth_code);

        this.sendNotification(net.HttpType.api_sms_exchange, {
            user_id: core.user_id,
            uuid: core.device,
            auth_code: code.auth_code,
        });
    }

    api_user_change_password_gold_var({ password, password_confirm, code }: any) {
        this.sendNotification(net.HttpType.api_user_change_password_gold_var, {
            password: core.MD5.createInstance().hex_md5(password),
            password_confirm: core.MD5.createInstance().hex_md5(password_confirm),
            code,
            user_id: core.user_id,
        });
    }
}
