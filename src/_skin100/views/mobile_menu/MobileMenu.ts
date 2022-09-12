import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import LoginEnter from "@/_skin100/core/global/LoginEnter";
import router from "@/_skin100/router";
import { Prop, Watch, Component } from "vue-property-decorator";
import page_bonus from "../page_bonus";
import page_extension from "../page_extension";
import page_mine from "../page_mine";
import tab_1 from "../../assets/footer/tab-1.png";
import tab_1_active from "../../assets/footer/tab-1-active.png";
import tab_2 from "../../assets/footer/tab-2.png";
import tab_2_active from "../../assets/footer/tab-2-active.png";
import tab_3 from "../../assets/footer/tab-3.png";
import tab_3_active from "../../assets/footer/tab-3-active.png";
import tab_4 from "../../assets/footer/tab-4.png";
import tab_4_active from "../../assets/footer/tab-4-active.png";
import tab_5 from "../../assets/footer/tab-5.png";
import tab_5_active from "../../assets/footer/tab-5-active.png";
@Component
export default class MobileMenu extends AbstractView {
    active = 0;
    drawer = false;
    LangUtil = LangUtil;
    menuList = [
        // {
        //     id: 0,
        //     name: LangUtil("首页"),
        //     icon: require("../../assets/footer/tab-1.png"),
        //     activeIcon: require("../../assets/footer/tab-1-active.png"),
        //     path: "/",
        // },
        // {
        //     id: 1,
        //     name: LangUtil("挖矿"),
        //     icon: require("../../assets/footer/tab-2.png"),
        //     activeIcon: require("../../assets/footer/tab-2-active.png"),
        //     path: "/page_mine",
        // },
        // {
        //     id: 2,
        //     name: LangUtil("质押"),
        //     icon: require("../../assets/footer/tab-3.png"),
        //     activeIcon: require("../../assets/footer/tab-3-active.png"),
        //     path: "/page_bonus",
        // },
        // {
        //     id: 3,
        //     name: LangUtil("链游"),
        //     icon: require("../../assets/footer/tab-4.png"),
        //     activeIcon: require("../../assets/footer/tab-4-active.png"),
        //     path: "/page_extension",
        // },
        // {
        //     id: 4,
        //     name: LangUtil("我的"),
        //     icon: require("../../assets/footer/tab-5.png"),
        //     activeIcon: require("../../assets/footer/tab-5-active.png"),
        // },

        {
            id: 0,
            name: LangUtil("首页"),
            icon: tab_1,
            activeIcon: tab_1_active,
            path: "/",
        },
        {
            id: 1,
            name: LangUtil("挖矿"),
            icon: tab_2,
            activeIcon: tab_2_active,
            path: "/page_mine",
        },
        {
            id: 2,
            name: LangUtil("质押"),
            icon: tab_3,
            activeIcon: tab_3_active,
            path: "/page_bonus",
        },
        {
            id: 3,
            // name: LangUtil("链游"),
            name: LangUtil("推广"),
            icon: tab_4,
            activeIcon: tab_4_active,
            path: "/page_extension",
        },
        {
            id: 4,
            name: LangUtil("我的"),
            icon: tab_5,
            activeIcon: tab_5_active,
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
                this.active = 0;
                break;
            case 1:
                // router.push(item.path);
                LoginEnter(page_mine.show);
                this.active = 1;
                break;
            case 2:
                // router.push(item.path);
                LoginEnter(page_bonus.show);
                this.active = 2;
                break;
            case 3:
                LoginEnter(page_extension.show);
                this.active = 3;
                break;
            case 4:
                // LoginEnter(page_bonus.show);
                LoginEnter(() => {});
                this.active = 4;
                this.drawer = true;
                break;
        }
    }
    closeDrawer(isClose: boolean) {
        this.drawer = false;
    }
}
