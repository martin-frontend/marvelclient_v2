import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import GameProxy from "@/proxy/GameProxy";
import LoginEnter from "@/core/global/LoginEnter";

@Component
export default class GameSportItem extends AbstractView {
    LangUtil = LangUtil;
    @Prop() category!:number;
    @Prop() data!:any

    goGamePlay() {
        LoginEnter(() => {
            const gameProxy: GameProxy = this.getProxy(GameProxy);
            gameProxy.api_vendor_var_ori_product_show_var(this.data);
        });
    }
}
