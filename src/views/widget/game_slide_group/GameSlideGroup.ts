import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import page_game_list from "@/views/page_game_list";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class GameSlideGroup extends AbstractView {
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

    onShowAll() {
        page_game_list.show(this.data.category);
    }
}
