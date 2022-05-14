import AbstractView from "@/core/abstract/AbstractView";
import GameProxy from "@/proxy/GameProxy";
import router from "@/router";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class GameSlideGroup extends AbstractView {
    gameProxy: GameProxy = this.getProxy(GameProxy);
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
        router.replace("/gamelist");
    }
}
