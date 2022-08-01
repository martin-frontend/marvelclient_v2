import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import GameProxy from "@/proxy/GameProxy";
import SelfProxy from "@/proxy/SelfProxy";
import router from "@/_skin100/router";
import dialog_game_rate from "@/_skin100/views/dialog_game_rate";
import dialog_recharge from "@/_skin100/views/dialog_recharge";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class Wallet extends AbstractView {
    LangUtil = LangUtil;
    selfProxy: SelfProxy = getProxy(SelfProxy);
    gameProxy: GameProxy = getProxy(GameProxy);

    GamePlatConfig = GamePlatConfig;

    onItemClick(key: string) {
        this.gameProxy.setCoin(key);
        if (router.currentRoute.path == "/page_game_play") {
            const gameProxy: GameProxy = this.getProxy(GameProxy);
            gameProxy.api_vendor_var_ori_product_show_var(gameProxy.currGame);
        }
    }

    onCoinIn() {
        dialog_recharge.show();
    }

    handlerGameRate() {
        dialog_game_rate.show();
    }
}
