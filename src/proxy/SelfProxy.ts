import AbstractProxy from "@/core/abstract/AbstractProxy";
import getProxy from "@/core/global/getProxy";
import GameProxy from "./GameProxy";

export default class SelfProxy extends AbstractProxy {
    static NAME = "SelfProxy";

    public onRegister(): void {
        setInterval(() => {
            this.api_user_show_var([2]);
        }, 10000);
    }

    /**用户个人信息 */
    userInfo: core.UserInfoVO = { user_id: 0, nick_name: "", bsc_address: "", gold_info: <any>{} };

    setUserInfo(value: any) {
        Object.assign(this.userInfo, value);
        core.user_id = <any>this.userInfo.user_id;

        const gameProxy: GameProxy = getProxy(GameProxy);
        const keys = Object.keys(value.gold_info);
        if (gameProxy.coin_name_unique == "") gameProxy.coin_name_unique = keys[0];
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
    /**--会员资料--获取用户基本信息*/
    api_user_show_var(modules: number[]) {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_show_var, { user_id: core.user_id, modules: JSON.stringify(modules) });
        }
    }
}
