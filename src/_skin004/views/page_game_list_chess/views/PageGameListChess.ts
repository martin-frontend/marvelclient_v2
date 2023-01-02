import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import LoginEnter from "@/_skin004/core/global/LoginEnter";
import GameProxy from "@/proxy/GameProxy";
import game_search from "@/views/game_search";
import { Watch, Component } from "vue-property-decorator";
import PageGameListChessMediator from "../mediator/PageGameListChessMediator";
import PageGameListChessProxy from "../proxy/PageGameListChessProxy";

@Component
export default class PageGameListChess extends AbstractView {
    LangUtil = LangUtil;
    CategoryIcon = Assets.CategoryIcon;
    gameProxy:GameProxy = getProxy(GameProxy);
    myProxy: PageGameListChessProxy = this.getProxy(PageGameListChessProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.myProxy.listQuery;

    constructor() {
        super(PageGameListChessMediator);
    }

    get hotGame(){
        for (const item of this.gameProxy.lobbyIndex) {
            if (item.category == 1) {
                return item;
            }
        }
        return {};
    }

    @Watch("listQuery.vendor_type")
    onWatchVendorType() {
        this.listQuery.vendor_id = 0;
        this.listQuery.page_count = 1;
        this.myProxy.api_plat_var_game_all_index();
    }

    @Watch("listQuery.vendor_id")
    onWatchVendorId() {
        this.listQuery.page_count = 1;
        this.myProxy.api_plat_var_game_all_index();
    }

    getMore() {
        this.listQuery.page_count++;
        this.myProxy.api_plat_var_game_all_index();
    }

    showGameSearch() {
        LoginEnter(game_search.show);
    }

    destroyed() {
        super.destroyed();
    }
}
