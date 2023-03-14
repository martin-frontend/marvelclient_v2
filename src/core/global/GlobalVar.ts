import GameConfig from "../config/GameConfig";

export default class GlobalVar {
    static host_urls: string = "";
    static server_time = 0;
    static skin = "";
    static game_address_method = 0; // 0: api方式 1: hash域名方式

    private static _globalVar: GlobalVar;
    public static get instance() {
        if (!this._globalVar) {
            this._globalVar = new GlobalVar();
        }
        return this._globalVar;
    }

    /**是否显示 注册 按钮 */
    public get isShowRegiter(): boolean {
        //console.log("------" ,GameConfig.config.modules_switch.register);

        // if (GameConfig.config.modules_switch.register === 0)
        // {
        //     console.log("----dasdasd");
        // }
        if (
            GameConfig.config.modules_switch &&
            GameConfig.config.modules_switch.register != undefined &&
            GameConfig.config.modules_switch.register == 0
        )
            return false;
        else return true;
    }

    /**是否显示 充值 兑换 */
    public get isShowRecharge(): boolean {
        if (
            GameConfig.config.modules_switch &&
            GameConfig.config.modules_switch.recharge != undefined &&
            GameConfig.config.modules_switch.recharge == 0
        )
            return false;
        else return true;
    }

    /**是否显示 兑换 按钮 */
    public get isShowExchange(): boolean {
        //return GameConfig.config.modules_switch.exchange != 0;
        if (
            GameConfig.config.modules_switch &&
            GameConfig.config.modules_switch.exchange != undefined &&
            GameConfig.config.modules_switch.exchange == 0
        )
            return false;
        else return true;
    }

    /**是否显示 划转 按钮 */
    public get isShowTransfer(): boolean {
        if (
            GameConfig.config.modules_switch &&
            GameConfig.config.modules_switch.transfer != undefined &&
            GameConfig.config.modules_switch.transfer == 0
        )
            return false;
        else return true;
    }

    /**是否显示 打开充值界面的按钮 兑换 */
    public get isShowBtnRecharge(): boolean {
        if (this.isShowRecharge || this.isShowExchange || this.isShowTransfer) {
            return true;
        }
        return false;
    }
    /**用户是否登录 */
    public get isNullUser(): boolean {
        return core.user_id == 0;
        // if (core.user_id)
        // {
        //     return false;
        // }

        // return true;
    }
}
