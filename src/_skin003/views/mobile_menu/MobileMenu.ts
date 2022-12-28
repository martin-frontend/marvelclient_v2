import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import LoginEnter from "@/core/global/LoginEnter";
import router from "@/router";
import { Prop, Watch, Component } from "vue-property-decorator";
import page_bonus from "../page_bonus";
import page_extension from "../page_extension";
import page_mine from "../page_mine";

@Component
export default class MobileMenu extends AbstractView {
    LangUtil = LangUtil;
    menuList = [
        { id: 0, name: LangUtil("首页"), icon: "mdi-home", path: "/" },
        { id: 1, name: LangUtil("大厅"), icon: "mdi-google-controller", path: "/page_game_list" },
        { id: 2, name: LangUtil("挖矿"), icon: "mdi-mine", path: "/page_mine" },
        { id: 3, name: LangUtil("推广"), icon: "mdi-offer", path: "/page_extension" },
        { id: 4, name: LangUtil("分红"), icon: "mdi-poll", path: "/page_bonus" },
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
                LoginEnter(page_bonus.show);
                break;
        }
    }
}
