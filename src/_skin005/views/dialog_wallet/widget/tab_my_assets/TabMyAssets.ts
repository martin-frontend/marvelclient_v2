import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import { amountFormat } from "@/core/global/Functions";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";
import DialogWalletProxy from "../../proxy/DialogWalletProxy";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";

@Component
export default class TabMyAssets extends AbstractView {
    LangUtil = LangUtil;
    GamePlatConfig = GamePlatConfig;
    myProxy: DialogWalletProxy = getProxy(DialogWalletProxy);
    pageData = this.myProxy.pageData;
    plat_coins = GamePlatConfig.config.plat_coins;
    getCoinAlias = CoinTransformHelper.GetCoinAlias;

    amountFormat(nub: any, isb = true) {
        return amountFormat(nub, isb);
    }
}
