import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import LoginEnter from "@/core/global/LoginEnter";
import router from "@/router";
import { Prop, Watch, Component } from "vue-property-decorator";
import page_bonus from "@/views/page_bonus";
import page_extension from "@/views/page_extension";
import page_mine from "@/views/page_mine";
import page_game_list from "@/views/page_game_list";
import PageGameListProxy from "@/views/page_game_list/proxy/PageGameListProxy";
import getProxy from "@/core/global/getProxy";
// import page_game_list_chess from "../page_game_list_chess";
import GameProxy from "@/proxy/GameProxy";
import PageHomeProxy from "../page_home/proxy/PageHomeProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_agent_manager from "@/_skin001/views/dialog_agent_manager";

@Component
export default class MobileMenu extends AbstractView {
    LangUtil = LangUtil;
    homeProxy:PageHomeProxy = getProxy(PageHomeProxy);
    pageGameListProxy: PageGameListProxy = getProxy(PageGameListProxy);
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    get menuList() {
        const list = [
            {
                id: 0,
                name: LangUtil("首页"),
                icon: require(`@/_skin001/assets/icon/icon_home.png`),
                icon1: require(`@/_skin001/assets/icon/icon_home1.png`),
                path: "/",
            },
            {
                id: 1,
                name: LangUtil("足球"),
                icon: require(`@/_skin001/assets/icon/icon_soccer.png`),
                icon1: require(`@/_skin001/assets/icon/icon_soccer1.png`),
                path: "/page_game_soccer",
            },
            {
                id: 2,
                name: LangUtil("娱乐城"),
                icon: require(`@/_skin001/assets/icon/icon_play.png`),
                icon1: require(`@/_skin001/assets/icon/icon_play1.png`),
                path: "/page_game_list",
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
            // {
            //     id: 5,
            //     name: LangUtil("推广"),
            //     icon: require(`@/_skin001/assets/icon/icon_extension.png`),
            //     icon1: require(`@/_skin001/assets/icon/icon_extension1.png`),
            //     path: "/page_extension",
            // },
        ];

        // if (GamePlatConfig.config.is_show_commission.is_open == 0 || this.isShowDirectly ==0 ) {
        //     list.pop();
        // };

        if ( this.isShowDirectly == 2 )
        {
            list.push( {
                    id: 5,
                    name: LangUtil("代理管理"),
                    icon: require(`@/_skin001/assets/icon/icon_extension.png`),
                    icon1: require(`@/_skin001/assets/icon/icon_extension1.png`),
                    path: "/page_extension",
                },)
        }
 
        return list;
    }

    public get isShowDirectly() : number {
        if (!(this.selfProxy && this.selfProxy.userInfo && this.selfProxy.userInfo.user_id != 0 ))
        {
            return 0;
        }
        if (this.selfProxy.userInfo.show_promote == 1 )
        {
            return 1;
        }
        if (this.selfProxy.userInfo.show_promote == 2)
        {
            return 2;
        }

        return 0;
    }
    
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
                LoginEnter(page_mine.show);
                break;
            case 5:
                if(this.isShowDirectly == 2)
                {
                    LoginEnter(dialog_agent_manager.show);
                }
                else if(this.isShowDirectly == 1)
                LoginEnter(page_extension.show);
                break;
        }
    }
}
