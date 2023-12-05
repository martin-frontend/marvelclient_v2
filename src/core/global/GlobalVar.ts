import GameConfig from "../config/GameConfig";
type Config = Record<string, { date_format: "yyyy-MM-dd" | "dd-MM-yyyy" }>;
const LangConfigJSON = require("../../assets/json/lang_config.json") as Config;
// 根据当前语言返回DateFormat string
const LangToDateFormat = new Map(Object.entries(LangConfigJSON).map(([a, b]) => [a, b.date_format] as const));

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
    /**是否显示登录按钮 */
    public get isShowLogin(): boolean {
        if (
            GameConfig.config.modules_switch &&
            GameConfig.config.modules_switch.canLogin != undefined &&
            GameConfig.config.modules_switch.canLogin == 0
        )
            return false;
        else return true;
    }
    /**是否显示 退出按钮 */
    public get isShowLogout(): boolean {
        if (GlobalVar.skin == "skin020") {
            //@ts-ignore
            const whisper = window["Whisper"];
            if (!whisper) {
                return true;
            }
        }

        return this.isShowLogin;
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
    /**日期 format string */
    public get DateFormat() {
        return LangToDateFormat.get(core.lang) ?? LangToDateFormat.get(core.lang.slice(0, 2)) ?? "dd-MM-yyyy";
    }
    /**日期 format string + HH:mm */
    public get DateFormatHHMM() {
        return `${this.DateFormat} HH:mm` as const;
    }
}
