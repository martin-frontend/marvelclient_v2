import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_coin_exchange from "@/_skin001/views/dialog_coin_exchange";
import { Prop, Watch, Component } from "vue-property-decorator";
import DialogWalletProxy from "../../proxy/DialogWalletProxy";

@Component
export default class TabMyAssets extends AbstractView {
    LangUtil = LangUtil;
    selfProxy:SelfProxy = getProxy(SelfProxy);
    myProxy: DialogWalletProxy = getProxy(DialogWalletProxy);
    pageData = this.myProxy.pageData;
    plat_coins = GamePlatConfig.config.plat_coins;

    get is_gold_exchange(){
        //@ts-ignore
        return this.selfProxy.userInfo.is_gold_exchange == 1;
    }

    onExchange(from_coin_name_unique:string){
        dialog_coin_exchange.show(from_coin_name_unique);
    }
}
