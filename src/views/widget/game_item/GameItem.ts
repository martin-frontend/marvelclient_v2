import AbstractView from "@/core/abstract/AbstractView";
import GameProxy from "@/proxy/GameProxy";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class GameItem extends AbstractView {
    @Prop() item!: any;
    ww = 224;
    hh = 280;

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

    @Watch("$vuetify.breakpoint.mobile")
    onWatchWidth() {
        if(this.$vuetify.breakpoint.mobile){
            this.ww = 124, this.hh = 154;
        }else{
            this.ww = 224, this.hh = 280;
        }
    }

    goGamePlay() {
        const gameProxy: GameProxy = this.getProxy(GameProxy);
        gameProxy.api_vendor_var_ori_product_show_var(this.item);
    }
}
