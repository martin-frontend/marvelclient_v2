/**
 * 平台各个币种之间的转换
 */

import GamePlatConfig from "@/core/config/GamePlatConfig";
import { amountFormat } from "@/core/global/Functions";
import { getMoneyValue } from "./ColorfullText";

export default class CoinTransformHelper {
    /**平台的主要货币 和 奖励 货币 */
    static platCoins = <any>{
        mainCoin: {},
        rewardCoin: {},
    };
    /**取目前的主币 奖励币 */
    static _getCurrentCoin() {
        const plat_coins = <any>GamePlatConfig.config.plat_coins;
        const coinsKey = Object.keys(plat_coins);
        coinsKey.forEach((key: any) => {
            if (plat_coins[key].type === 2) {
                this.platCoins.mainCoin = plat_coins[key];
                this.platCoins.mainCoin.name = key;
            }
            if (plat_coins[key].type === 3) {
                this.platCoins.rewardCoin = plat_coins[key];
                this.platCoins.rewardCoin.name = key;
            }
        });
    }
    static Init() {
        this._getCurrentCoin();
    }
    private static _gameRateList = <any>{} || null;

    static get gameRateList() {
        return GamePlatConfig.config.plat_coins;
        //return this._gameRateList;
    }

    /**
     * 币种之间的转换
     * @param val 需要转的对象
     * @param decimalLang 保留的小数点位数
     * @param destCoinName 目标币种名字
     * @param resCoinName 源数据的币种名字
     * @param isformat 是否格式化显示
     * @param isNeedSymbol 是否需要货币符号
     * @param ismoney 是否显示为数字，例如： +100.00 ， -969.00
     * @param iscoinName 是否需要币种的名字
     * @returns
     */
    static TransformMoney(
        val: any,
        decimalLang: number = 2,
        destCoinName: string = "",
        resCoinName: string = "",
        isformat: boolean = false,
        isNeedSymbol: boolean = true,
        ismoney: boolean = false,
        iscoinName: boolean = false
    ) {
        let newVal = val;
        if (val == undefined) return val;
        if (typeof val == "string" && val.includes("$")) {
            newVal = val.replace("$", "");
        }

        const intValue = parseFloat(newVal);
        if (intValue == undefined) return val;
        const coins = GamePlatConfig.config.plat_coins;
        let defaultRes;
        if (ismoney) {
            defaultRes = getMoneyValue(newVal, decimalLang, false);
        } else {
            defaultRes = amountFormat(newVal, true, decimalLang, false);
        }
        //console.log("-1111---",defaultRes);
        let maincoin = destCoinName;
        let fromcoin = resCoinName;
        if (!maincoin || !coins[maincoin]) {
            if (!this.platCoins.mainCoin.name) {
                this._getCurrentCoin();
            }
            maincoin = this.platCoins.mainCoin.name;
        }

        //如果当前没有 找到 主币
        if (!maincoin) {
            console.log("没有找到主 币", val);
            return isformat ? defaultRes : val;
        }
        if (!fromcoin) {
            console.log("没有找到 币种111", val);
            fromcoin = "USDT";
        }

        if (!coins[maincoin] || !coins[fromcoin]) {
            console.log("没有找到币种maincoin：" + maincoin + "---fromcoin:" + fromcoin);
            return isformat ? defaultRes : val;
            //return val;
        }
        const destCoinScale = coins[maincoin].scale;
        const restCoinScale = coins[fromcoin].scale;
        let res = ((intValue * restCoinScale) / destCoinScale).toFixed(decimalLang);
        if (isformat) {
            if (ismoney) {
                res = getMoneyValue(res, decimalLang, false);
            } else {
                res = amountFormat(res, true, decimalLang, false);
            }
        }
        //console.log("---结果-111--",res);
        if (isNeedSymbol) {
            res = this.GetCoinSymbol(maincoin) + res;
        }
        if (iscoinName) {
            res = maincoin + res;
        }
        //console.log("---结果-222--",res);
        return res;
    }
    static AddCoinSymbol(val: any, destCoinName: string = "") {
        return this.GetCoinSymbol(destCoinName) + val;
    }

    static GetCoinSymbol(coinname: string) {
        if (coinname === undefined) return "";
        //console.warn("--- 需要的名字为",coinname);
        return GamePlatConfig.config.plat_coins[coinname].symbol || "";
    }
    static GetCoinScale(coinname: string) {
        if (coinname === undefined) return 1;
        //console.log(" 需要获取的币种位", coinname);
        return GamePlatConfig.config.plat_coins[coinname].scale || 1;
    }
    static get GetMainCoinScale() {
        if (!this.platCoins.mainCoin.name) {
            this._getCurrentCoin();
        }
        return GamePlatConfig.config.plat_coins[this.platCoins.mainCoin.name].scale || 1;
    }

    static get GetMainCoinSymbol() {
        if (!this.platCoins.mainCoin.name) {
            this._getCurrentCoin();
        }
        return this.GetCoinSymbol(this.platCoins.mainCoin.name);
    }
}
