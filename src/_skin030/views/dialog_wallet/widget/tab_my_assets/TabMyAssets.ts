import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import { amountFormat } from "@/core/global/Functions";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import { Prop, Watch, Component } from "vue-property-decorator";
import DialogWalletProxy from "../../proxy/DialogWalletProxy";

@Component
export default class TabMyAssets extends AbstractView {
    LangUtil = LangUtil;
    GamePlatConfig = GamePlatConfig;
    myProxy: DialogWalletProxy = getProxy(DialogWalletProxy);
    pageData = this.myProxy.pageData;
    plat_coins = GamePlatConfig.config.plat_coins;
    amountFormat(nub: any, isb = true) {
        return amountFormat(nub, isb);
    }

    get dataList() {
        const list = <any>{};
        const keys = Object.keys(this.pageData.gold_info);
        for (let index = 0; index < keys.length; index++) {
            if (GamePlatConfig.isShowCoin(keys[index])) {
                list[keys[index]] = this.pageData.gold_info[keys[index]];
            }
        }

        return list;
    }
}
