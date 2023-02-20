import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class GameSport extends AbstractView {
    LangUtil = LangUtil;
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

    goGamePlay(item: any) {
        PanelUtil.openpage_soccer(item);
    }

    onShowAll() {
        //console.log("点击全部 " , this.data.category);
        PanelUtil.openpanel_gamelist(this.data.category);
        //page_game_list.show(this.data.category);
    }
}
