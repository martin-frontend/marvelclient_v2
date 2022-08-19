import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import LoginEnter from "@/core/global/LoginEnter";
import router from "@/_skin100/router";
import { Prop, Watch, Component } from "vue-property-decorator";
import page_bonus from "../page_bonus";
import page_extension from "../page_extension";
import page_mine from "../page_mine";

@Component
export default class MobileMenu extends AbstractView {
    LangUtil = LangUtil;
    menuList = [
        {
            id: 0,
            name: LangUtil("首页"),
            icon: require("../../assets/footer/tab-1.png"),
            activeIcon: require("../../assets/footer/tab-1-active.png"),
            path: "/",
        },
        {
            id: 1,
            name: LangUtil("挖矿"),
            icon: require("../../assets/footer/tab-2.png"),
            activeIcon: require("../../assets/footer/tab-2-active.png"),
            path: "/page_mine",
        },
        {
            id: 2,
            name: LangUtil("质押"),
            icon: require("../../assets/footer/tab-3.png"),
            activeIcon: require("../../assets/footer/tab-3-active.png"),
            path: "/page_mine",
        },
        {
            id: 3,
            name: LangUtil("链游"),
            icon: require("../../assets/footer/tab-4.png"),
            activeIcon: require("../../assets/footer/tab-4-active.png"),
            path: "/page_extension",
        },
        {
            id: 4,
            name: LangUtil("我的"),
            icon: require("../../assets/footer/tab-5.png"),
            activeIcon: require("../../assets/footer/tab-5-active.png"),
            path: "/page_mine",
        },
    ];

    routerPath = this.$router.app.$route.path;
    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
    }

    onItemClick(item: any) {
        switch (item.id) {
            case 0:
                router.push(item.path);
                break;
            case 1:
                router.push(item.path);
                break;
            case 2:
                LoginEnter(page_mine.show);
                break;
            case 3:
                LoginEnter(page_extension.show);
                break;
            case 4:
                LoginEnter(page_bonus.show);
                break;
        }
    }
}
