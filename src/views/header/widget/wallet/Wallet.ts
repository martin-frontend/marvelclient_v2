import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import GameProxy from "@/proxy/GameProxy";
import SelfProxy from "@/proxy/SelfProxy";
import router from "@/router";
import dialog_recharge from "@/views/dialog_recharge";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class Wallet extends AbstractView {
    selfProxy:SelfProxy = getProxy(SelfProxy);
    gameProxy:GameProxy = getProxy(GameProxy);

    CoinIcon = Assets.CoinIcon;

    onItemClick(key: string) {
        this.gameProxy.coin_name_unique = key;
        if (router.currentRoute.path == "/page_game_play") {
            const gameProxy: GameProxy = this.getProxy(GameProxy);
            gameProxy.api_vendor_var_ori_product_show_var(gameProxy.currGame);
        }
    }

    onCoinIn() {
        dialog_recharge.show();
    }
}
