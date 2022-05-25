import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import GameProxy from "@/proxy/GameProxy";
import page_game_list from "@/views/page_game_list";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class GameSport extends AbstractView {
    CategoryIcon = Assets.CategoryIcon;
    @Prop() data!: any;

    getIcon(item: any) {
        if (item.icon.indexOf("http") != -1) {
            return item.icon;
        } else {
            if (item.list_type == 0) {
                return `img/productimage/${item.icon}`;
            } else {
                return `img/changlogo/${item.icon}`;
            }
        }
    }

    goGamePlay(item:any) {
        const gameProxy: GameProxy = this.getProxy(GameProxy);
        gameProxy.api_vendor_var_ori_product_show_var(item);
    }

    onShowAll() {
        page_game_list.show();
    }
}
