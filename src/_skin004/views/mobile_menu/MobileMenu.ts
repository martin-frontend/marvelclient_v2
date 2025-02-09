import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import LoginEnter from "@/_skin004/core/global/LoginEnter";
import router from "@/router";
import { Prop, Watch, Component } from "vue-property-decorator";
import page_bonus from "@/views/page_bonus";
import page_extension from "@/_skin004/views/page_extension";
import page_mine from "@/views/page_mine";
import page_game_list from "@/_skin004/views/page_game_list";
import PageGameListProxy from "@/_skin004/views/page_game_list/proxy/PageGameListProxy";
import getProxy from "@/core/global/getProxy";
// import page_game_list_chess from "../page_game_list_chess";
import GameProxy from "@/proxy/GameProxy";
import PageHomeProxy from "../page_home/proxy/PageHomeProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_agent_manager from "@/_skin001/views/dialog_agent_manager";
import dialog_activity from "@/views/dialog_activity";
import ServiceUtil from "@/_skin004/core/global/ServiceUtil";
import GameConfig from "@/core/config/GameConfig";
import OpenLink from "@/core/global/OpenLink";
import YellowWeb from "@/_skin004/core/global/YellowWeb";
import page_activity from "@/_skin004/views/page_activity";
import SkinVariable from "@/_skin004/core/SkinVariable";

@Component
export default class MobileMenu extends AbstractView {
    LangUtil = LangUtil;
    homeProxy: PageHomeProxy = getProxy(PageHomeProxy);
    pageGameListProxy: PageGameListProxy = getProxy(PageGameListProxy);
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    get menuList() {
        let list = [
            // {
            //     id: 0,
            //     name: LangUtil("首页"),
            //     icon: require(`@/_skin001/assets/icon/icon_home.png`),
            //     icon1: require(`@/_skin001/assets/icon/icon_home1.png`),
            //     path: "/",
            // },
            {
                id: 4,
                name: LangUtil("优惠活动"),
                icon: require(`@/_skin001/assets/icon/icon_mine.png`),
                icon1: require(`@/_skin001/assets/icon/icon_mine1.png`),
                path: "/page_activity",
            },
            // {
            //     id: 1,
            //     name: LangUtil("足球"),
            //     icon: require(`@/_skin001/assets/icon/icon_soccer.png`),
            //     icon1: require(`@/_skin001/assets/icon/icon_soccer1.png`),
            //     path: "/page_game_soccer",
            // },
            {
                id: 2,
                name: LangUtil("娱乐城"),
                icon: SkinVariable.icon_play,
                icon1: SkinVariable.icon_play1,
                path: "/page_game_list",
            },

            {
                id: 0,
                name: LangUtil("首页"),
                icon: SkinVariable.icon_home,
                icon1: SkinVariable.icon_home1,
                path: "/",
            },
            // {
            //     id: 3,
            //     name: LangUtil("棋牌"),
            //     icon: require(`@/_skin001/assets/icon/icon_chess.png`),
            //     icon1: require(`@/_skin001/assets/icon/icon_chess1.png`),
            //     path: "/page_game_list_chess",
            // },
            // {
            //     id: 4,
            //     name: LangUtil("返水"),
            //     icon: require(`@/_skin001/assets/icon/icon_mine.png`),
            //     icon1: require(`@/_skin001/assets/icon/icon_mine1.png`),
            //     path: "/page_mine",
            // },
            {
                id: 6,
                name: LangUtil("客服"),
                icon: require(`@/_skin001/assets/icon/icon_mine.png`),
                icon1: require(`@/_skin001/assets/icon/icon_mine1.png`),
                path: "/xxx",
            },
            {
                id: 5,
                name: LangUtil("推广"),
                icon: SkinVariable.icon_extension,
                icon1: SkinVariable.icon_extension1,
                path: "/page_extension",
            },
        ];

        if (!SkinVariable.isShowGameList) {
            list = list.filter(({ id }) => id != 2);
        }

        //@ts-ignore
        if (GameConfig.config.pornWebsite) {
            list.push({
                id: 99,
                name: LangUtil("成人影院"),
                icon: "",
                icon1: "",
                path: "/xxx",
            });
        }

        // if (GamePlatConfig.config.is_show_commission.is_open == 0 || this.isShowDirectly ==0 ) {
        //     list.pop();
        // };

        // if (this.isShowDirectly == 2) {
        //     list.push({
        //         id: 5,
        //         name: LangUtil("代理管理"),
        //         icon: require(`@/_skin001/assets/icon/icon_extension.png`),
        //         icon1: require(`@/_skin001/assets/icon/icon_extension1.png`),
        //         path: "/page_extension",
        //     });
        // }

        return list;
    }

    //手动调用，进入直接进 游戏列表
    // mounted(){
    //     setTimeout(() => {
    //         console.log("开始跳转 游戏列表");
    //        this.onItemClick( {id:2})
    //     }, 200);

    // }

    public get isShowDirectly(): number {
        if (!(this.selfProxy && this.selfProxy.userInfo && this.selfProxy.userInfo.user_id != 0)) {
            return 0;
        }
        if (this.selfProxy.userInfo.show_promote == 1) {
            return 1;
        }
        if (this.selfProxy.userInfo.show_promote == 2) {
            return 2;
        }

        return 0;
    }

    routerPath = this.$router.app.$route.path;
    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
    }
    /**打开活动页面 */
    goActivity() {
        page_activity.show();
    }

    onItemClick(item: any) {
        switch (item.id) {
            case 0:
                this.$router.push(item.path);
                break;
            case 1:
                // this.$router.push(item.path);
                this.homeProxy.pageData.event_id = 0;
                LoginEnter(() => {
                    const gameProxy: GameProxy = this.getProxy(GameProxy);
                    gameProxy.go_soccer();
                });
                break;
            case 2:
                page_game_list.show(0);
                break;
            // case 3:
            // page_game_list_chess.show(2);
            // break;
            case 4:
                //LoginEnter(page_mine.show);
                this.goActivity();
                break;
            case 5:
                // if (this.isShowDirectly == 2) {
                //     LoginEnter(dialog_agent_manager.show);
                // } else if (this.isShowDirectly == 1)
                LoginEnter(page_extension.show);
                break;
            case 6:
                // if (this.isShowDirectly == 2) {
                //     LoginEnter(dialog_agent_manager.show);
                // } else if (this.isShowDirectly == 1)
                this.onService();
                break;
            case 99:
                //@ts-ignore
                YellowWeb(GameConfig.config.pornWebsite);
                break;
        }
    }

    onService() {
        ServiceUtil();
    }
}
