import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import LoginEnter from "@/core/global/LoginEnter";
import GameProxy from "@/proxy/GameProxy";
import page_game_list from "@/views/page_game_list";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class GameSport extends AbstractView {
    LangUtil = LangUtil;
    CategoryIcon = Assets.CategoryIcon;
    @Prop() data!: any;

    get width(): number {
        switch (this.$vuetify.breakpoint.name) {
            case "sm":
                return 900;
            case "md":
                return 430;
            case "lg":
                if (this.$vuetify.breakpoint.width < 1426) return 1185 / 2 - 20;
                return 697;
        }
        return 697;
    }

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

    goGamePlay(item: any) {
        LoginEnter(() => {
            const gameProxy: GameProxy = this.getProxy(GameProxy);
            gameProxy.api_vendor_var_ori_product_show_var(item);
        });
    }

    onShowAll() {
        page_game_list.show(this.data.category);
    }
}
