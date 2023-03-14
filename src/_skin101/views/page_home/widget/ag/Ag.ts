import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import NoticeProxy from "@/proxy/NoticeProxy";
import { Prop, Watch, Component } from "vue-property-decorator";
import gsap, { Linear } from "gsap";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";

import LoginEnter from "@/_skin101/core/global/LoginEnter";
import GameProxy from "@/proxy/GameProxy";

@Component
export default class Advertise extends AbstractView {
    @Prop() data!: any;
    LangUtil = LangUtil;
    GamePlatConfig = GamePlatConfig;
    noticeProxy: NoticeProxy = getProxy(NoticeProxy);
    selectIndex = 0;
    isEnter1 = false;
    core = core;
    progressObj = {
        value: 0,
    };

    goGamePlay(item: any) {
        if (item) {
            LoginEnter(() => {
                const gameProxy: GameProxy = this.getProxy(GameProxy);
                gameProxy.api_vendor_var_ori_product_show_var(item);
            });
        }
    }
    getIcon(item: any) {
        if (!item) return null;
        if (item && item.icon.indexOf("http") != -1) {
            return item ? item.icon : "";
        } else {
            if (item.list_type == 0) {
                return `img/productimage/${item.icon}`;
            } else {
                return `img/changlogo/${item.icon}`;
            }
        }
    }
}
