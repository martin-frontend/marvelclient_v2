import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import GameSearchMediator from "../mediator/GameSearchMediator";
import GameSearchProxy from "../proxy/GameSearchProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class GameSearch extends AbstractView {
    LangUtil = LangUtil;
    myProxy: GameSearchProxy = this.getProxy(GameSearchProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(GameSearchMediator);
        this.myProxy.api_user_var_game_index();
    }

    onTabClick(val: any) {
        this.pageData.tabIndex = val;
    }

    onClose() {
        this.pageData.bShow = false;
    }

    onSearch() {
        this.myProxy.api_user_var_game_search();
    }
}
