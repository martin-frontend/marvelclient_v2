/**
 * 平台各个币种之间的转换
 */

import GamePlatConfig from "@/core/config/GamePlatConfig";
import GameConfig from "@/core/config/GameConfig";
import BigNumber from "bignumber.js";

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

    static amountFormat(val: any, decimalLang: number = 2) {
        if (val === undefined) return val;

        const intValue = parseFloat(val);
        if (!intValue) {
            const sss = val.toLocaleString(core.lang.substring(0, 2));
            return val.toLocaleString(core.lang.substring(0, 2));
        }
        const allsum = intValue.toLocaleString(core.lang.substring(0, 2), {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimalLang,
        });
        return allsum;
    }
    /**
     * 取得钱的文本值
     * @param str 传入钱的金额
     * @returns + -的文本
     */
    static getMoneyValue(str: any): string {
        let newstr = str;
        if (typeof str == "number") {
            newstr = str + "";
        }
        //console.log("--计算的结果",newstr);
        if (!!newstr && newstr.search("-") == -1) return "+" + newstr;
        return newstr;
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
        //如果两个币种一样则只需要 加上 符号 就可以
        if (typeof val == "string" && val.includes("$")) {
            newVal = val.replace("$", "");
        }
        const intValue = parseFloat(newVal);
        if (intValue == undefined) return val;

        const coins = GamePlatConfig.config.plat_coins;
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
            return this.ReturnValue(intValue, decimalLang, isformat, ismoney);
        }
        if (!fromcoin) {
            fromcoin = "USDT";
        }
        if (!coins[maincoin] || !coins[fromcoin]) {
            return this.ReturnValue(intValue, decimalLang, isformat, ismoney);
        }
        let res = intValue + "";
        if (maincoin != fromcoin) {
            const destCoinScale = new BigNumber(coins[maincoin].scale);
            const restCoinScale = new BigNumber(coins[fromcoin].scale);
            const input = new BigNumber(intValue);
            res = input.multipliedBy(restCoinScale).dividedBy(destCoinScale).toString();
        }
        res = this.ReturnValue(res, decimalLang, isformat, ismoney);

        if (isNeedSymbol) {
            res = this.GetCoinSymbol(maincoin) + res;
        }
        if (iscoinName) {
            res = maincoin + res;
        }
        return res;
    }

    static ReturnValue(val: any, decimalLang: number, isformat: boolean, ismoney: boolean) {
        if (isformat) {
            if (ismoney) {
                return this.getMoneyValue(this.amountFormat(val, decimalLang));
            } else {
                return this.amountFormat(val, decimalLang);
            }
        } else {
            if (ismoney) {
                return this.getMoneyValue(val);
            } else {
                return val;
            }
        }
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
    static get GetMainCoinName() {
        if (!this.platCoins.mainCoin.name) {
            this._getCurrentCoin();
        }
        return this.platCoins.mainCoin.name;
        // if (!GameConfig.config.SettlementCurrency) {
        //     GameConfig.config.SettlementCurrency = "USDT";
        // }
        // return GameConfig.config.SettlementCurrency;
    }
    /**判断主币 是否与 结算货币 相同 */
    static get isSelectSameMain() {
        if (!this.platCoins.mainCoin.name) {
            this._getCurrentCoin();
        }
        if (!GameConfig.config.SettlementCurrency) {
            GameConfig.config.SettlementCurrency = "USDT";
        }
        return this.platCoins.mainCoin == GameConfig.config.SettlementCurrency;
    }
    /**获取币种别名 */
    static GetCoinAlias(coinname: string) {
        return GamePlatConfig.config.plat_coins[coinname]?.coin_alias ?? coinname;
    }
}
