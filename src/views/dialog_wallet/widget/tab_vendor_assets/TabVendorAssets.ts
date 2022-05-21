import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import getProxy from "@/core/global/getProxy";
import { Prop, Watch, Component } from "vue-property-decorator";
import DialogWalletProxy from "../../proxy/DialogWalletProxy";

@Component
export default class TabVendorAssets extends AbstractView {
    myProxy: DialogWalletProxy = getProxy(DialogWalletProxy);
    pageData = this.myProxy.pageData;

    plat_coins = GamePlatConfig.config.plat_coins;
    commonIcon = Assets.commonIcon;

    onWithdraw(coin_name_unique: string) {
        this.myProxy.api_user_var_vendor_withdraw(coin_name_unique);
    }

    get isEmpty(): boolean {
        const keys = Object.keys(this.pageData.gold_info);
        for (const key of keys) {
            if (parseFloat(this.pageData.gold_info[key].vendors_money) > 0) {
                return false;
            }
        }
        return true;
    }
}
