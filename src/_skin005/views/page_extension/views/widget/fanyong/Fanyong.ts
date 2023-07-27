import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PageExtensionProxy from "../../../proxy/PageExtensionProxy";
import { amountFormat } from "@/core/global/Functions";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class Fanyong extends AbstractView {
    LangUtil = LangUtil;

    myProxy: PageExtensionProxy = this.getProxy(PageExtensionProxy);
    tableData = this.myProxy.pageData.tableData;
    pageData = this.myProxy.pageData;
    transformMoney(val: any) {
        return this.myProxy.transformMoney(val);
    }

    transformMoney_commission(val: any) {
        const scale = CoinTransformHelper.GetMainCoinScale;
        const coinMoney = val[CoinTransformHelper.platCoins.mainCoin.name] || 0;

        const sss = coinMoney * CoinTransformHelper.GetMainCoinScale;

        if (!ModulesHelper.RebateDisplayType()) {
            return amountFormat(sss / 100, true) + this.LangUtil("%");
        }
        return amountFormat(sss, true);
    }
    ModulesHelper = ModulesHelper;

    getCommissionNum_totle(val: any) {
        if (!ModulesHelper.RebateListType()) {
            return this.transformMoney(val);
        }
        //计算是多少万
        const res = CoinTransformHelper.TransformMoney(val, 2, GameConfig.config.SettlementCurrency, "USDT", false, false, false, false);
        if (parseFloat(res) > 10000) {
            const aaa = CoinTransformHelper.GetCoinSymbol(GameConfig.config.SettlementCurrency) + amountFormat(res / 10000, true);
            return LangUtil("{0}万", aaa);
        }

        return this.transformMoney(val);
    }
}
