import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class GameSlideGroup extends AbstractView {
    LangUtil = LangUtil;
    CategoryIcon = Assets.CategoryIcon;
    @Prop() data!: any;
    @Prop() bShowAll!: boolean;

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

    getCols() {
        if (this.$mobile) {
            return 4;
        }
        return 2;
    }

    onShowAll() {
        //console.log("全部按钮" ,this.data.category);
        PanelUtil.openpanel_gamelist(this.data.category);
        //page_game_list.show(this.data.category);
    }

    goGamePlay(item: any) {
        PanelUtil.openpage_soccer(item);
    }
    isgameClose(item: any) {
        if (!item) return false;

        return item.status != 1;
    }
}
