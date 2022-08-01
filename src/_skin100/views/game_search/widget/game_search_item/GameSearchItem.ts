import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import getProxy from "@/core/global/getProxy";
import GameProxy from "@/proxy/GameProxy";
import GameSearchProxy from "../../proxy/GameSearchProxy";

@Component
export default class GameSearchItem extends AbstractView {
    LangUtil = LangUtil;
    @Prop() data!: any;

    onToggle() {
        const myProxy: GameSearchProxy = getProxy(GameSearchProxy);
        myProxy.toggleGame(this.data);
    }

    goGame() {
        const gameProxy: GameProxy = getProxy(GameProxy);
        gameProxy.api_vendor_var_ori_product_show_var(this.data);
    }
}
