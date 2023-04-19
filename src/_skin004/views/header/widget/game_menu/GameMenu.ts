import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import BlurUtil from "@/core/global/BlurUtil";
import LoginEnter, { EnterGame } from "@/_skin004/core/global/LoginEnter";
import GameProxy from "@/proxy/GameProxy";
import page_game_list from "@/_skin004/views/page_game_list";

@Component
export default class GameMenu extends AbstractView {
    LangUtil = LangUtil;
    @Prop() data!: any;
    @Prop({ default: false }) isShow!: boolean;
    getIcon(item: any) {
        if (!item || !item.menu_icon) {
            return "";
        }
        return item.menu_icon;
    }
    isNomalState(item: any) {
        return item.status == 1;
    }
    onClick(item: any) {
        if (!item) return;

        console.log(" 点击  ");
        if (item.entrance_type == 2) {
            //是游戏
            this.goGamePlay(item);
        } else if (item.entrance_type == 1) {
            page_game_list.show(item.vendor_type, item.vendor_id);
        } else {
            console.log("无效--- ", item);
        }
    }

    goGamePlay(item: any) {
        LoginEnter(() => {
            EnterGame(item);
            // const gameProxy: GameProxy = this.getProxy(GameProxy);
            // gameProxy.api_vendor_var_ori_product_show_var(item);
        });
    }
}
