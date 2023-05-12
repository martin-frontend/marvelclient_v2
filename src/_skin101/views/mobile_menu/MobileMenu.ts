import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import LoginEnter from "@/_skin101/core/global/LoginEnter";
import { getVersion } from "@/core/global/Functions";
// import LoginEnter from "@/core/global/LoginEnter";
import router from "@/router";
import { Prop, Watch, Component } from "vue-property-decorator";
import page_bonus from "../page_bonus";
import page_extension from "../page_extension";
import page_mine from "../page_mine";
import page_activity from "../page_activity";

import f_1_a from "../../assets/img/mobile_menu/f_1_a.png";
import f_1 from "../../assets/img/mobile_menu/f_1.png";
import f_2_a from "../../assets/img/mobile_menu/f_2_a.png";
import f_2 from "../../assets/img/mobile_menu/f_2.png";
import f_3_a from "../../assets/img/mobile_menu/f_3_a.png";
import f_3 from "../../assets/img/mobile_menu/f_3.png";
import f_4_a from "../../assets/img/mobile_menu/f_4_a.png";
import f_4 from "../../assets/img/mobile_menu/f_4.png";
import f_5_a from "../../assets/img/mobile_menu/f_5_a.png";
import f_5 from "../../assets/img/mobile_menu/f_5.png";

@Component
export default class MobileMenu extends AbstractView {
    LangUtil = LangUtil;
    // getVersion = getVersion;
    // getChannelID() {
    //     return core.channel_id;
    // }
    menuList = [
        { id: 0, name: LangUtil("首页"), icon: f_1, activeIcon: f_1_a, path: "/" },
        { id: 1, name: LangUtil("大厅"), icon: f_2, activeIcon: f_2_a, path: "/page_game_list" },
        { id: 2, name: LangUtil("挖矿"), icon: f_3, activeIcon: f_3_a, path: "/page_mine" },
        { id: 3, name: LangUtil("推广"), icon: f_4, activeIcon: f_4_a, path: "/page_extension" },
        // { id: 4, name: LangUtil("分红"), icon: f_5, activeIcon: f_5_a, path: "/page_bonus" },
        { id: 4, name: LangUtil("活动"), icon: f_5, activeIcon: f_5_a, path: "/page_activity" },
    ];

    routerPath = this.$router.app.$route.path;
    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
    }

    onItemClick(item: any) {
        switch (item.id) {
            case 0:
                this.$router.push(item.path);
                break;
            case 1:
                this.$router.push(item.path);
                break;
            case 2:
                LoginEnter(page_mine.show);
                break;
            case 3:
                LoginEnter(page_extension.show);
                break;
            case 4:
                // LoginEnter(page_bonus.show);
                this.$router.push(item.path);
                break;
        }
    }
}
