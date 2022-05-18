import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageGameListMediator from "../mediator/PageGameListMediator";
import PageGameListProxy from "../proxy/PageGameListProxy";

@Component
export default class PageGameList extends AbstractView {
    myProxy: PageGameListProxy = this.getProxy(PageGameListProxy);
    pageData = this.myProxy.pageData;
    hotGame = this.myProxy.hotGame;
    listQuery = this.myProxy.listQuery;

    constructor() {
        super(PageGameListMediator);
    }

    @Watch("listQuery.vendor_type")
    onWatchVendorType(){
        this.listQuery.vendor_id = 0;
        this.listQuery.page_count = 1;
        this.myProxy.api_plat_var_game_all_index();
    }

    @Watch("listQuery.vendor_id")
    onWatchVendorId(){
        this.listQuery.page_count = 1;
        this.myProxy.api_plat_var_game_all_index();
    }

    getMore() {
        this.listQuery.page_count++;
        this.myProxy.api_plat_var_game_all_index();
    }
}
