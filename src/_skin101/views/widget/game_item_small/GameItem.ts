import AbstractView from "@/core/abstract/AbstractView";
import LoginEnter from "@/_skin101/core/global/LoginEnter";
import GameProxy from "@/proxy/GameProxy";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class GameItem extends AbstractView {
    @Prop() item!: any;
    ww = 163.8;
    hh = 204;

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
        if (this.$vuetify.breakpoint.mobile) {
            (this.ww = 124), (this.hh = 154);
        } else {
            (this.ww = 163.8), (this.hh = 204);
        }
    }

    getBoxClass() {
        let classStr = "box";
        if (this.item) {
            classStr += " box-height";
            if (this.item.status != 1) {
                classStr += " filter-gray";
            }
        }
        return classStr;
    }

    goGamePlay() {
        if (this.item) {
            LoginEnter(() => {
                const gameProxy: GameProxy = this.getProxy(GameProxy);
                gameProxy.api_vendor_var_ori_product_show_var(this.item);
            });
        }
    }
}
