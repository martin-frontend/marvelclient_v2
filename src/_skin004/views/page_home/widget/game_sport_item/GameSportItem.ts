import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import GameProxy from "@/proxy/GameProxy";
import LoginEnter, { EnterGame } from "@/_skin004/core/global/LoginEnter";

@Component
export default class GameSportItem extends AbstractView {
    LangUtil = LangUtil;
    @Prop() category!: number;
    @Prop() data!: any;

    goGamePlay() {
        //console.log("当前点击222",this.data);
        LoginEnter(() => {
            EnterGame(this.data);
            // const gameProxy: GameProxy = this.getProxy(GameProxy);
            // gameProxy.api_vendor_var_ori_product_show_var(this.data);
        });
    }
}
