import AbstractView from "@/core/abstract/AbstractView";
import LoginEnter from "@/core/global/LoginEnter";
import router from "@/router";
import { Prop, Watch, Component } from "vue-property-decorator";
import page_extension from "../page_extension";
import page_mine from "../page_mine";

@Component
export default class MobileMenu extends AbstractView {
    menuList = [
        { id: 0, name: "首页", icon: "mdi-home", path: "/" },
        { id: 1, name: "大厅", icon: "mdi-home", path: "/page_game_list" },
        { id: 2, name: "挖矿", icon: "mdi-home", path: "/page_mine" },
        { id: 3, name: "赚钱", icon: "mdi-home", path: "/page_extension" },
        { id: 4, name: "分红", icon: "mdi-home" },
    ];

    routerPath = this.$router.app.$route.path;
    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
    }

    onItemClick(item: any) {
        switch (item.id) {
            case 0:
            case 1:
                router.push(item.path);
                break;
            case 2:
                LoginEnter(page_mine.show);
                break;
            case 3:
                LoginEnter(page_extension.show);
                break;
        }
    }
}
