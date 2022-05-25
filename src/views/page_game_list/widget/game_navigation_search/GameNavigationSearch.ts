import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import PageGameListProxy from "../../proxy/PageGameListProxy";

@Component
export default class GameNavigationSearch extends AbstractView {
    myProxy: PageGameListProxy = this.getProxy(PageGameListProxy);
    navigationData = this.myProxy.navigationData;
    tabs: number = 1;
    searchString: string = "";

    @Watch("navigationData.bShow")
    onWatchShow() {
        console.log("navigationData.bShow");
    }

    handleTest(): void {
        console.log("navigationData.bShow", this.navigationData.bShow);
        // console.log(this.navigationData.collection[0].vendor_product_name);
    }

    onTabsChange(index: number | string): void {
        if (index === 2) {
            this.navigationData.searchList = [];
        } else {
            // get api
        }
    }

    // 收藏
    onCollect(item: any) {
        // this.myProxy.api_user_var_game_update_var(item);
    }

    // 搜尋
    onSearchGame() {
        console.log("searchString:", this.searchString);
        // this.myProxy.api_user_var_game_search();
    }

    // 玩遊戲
    private onEnterGame(item: any) {
        // if (this.selfProxy.userInfo.user_id) {
        //     this.gameProxy.api_vendor_var_ori_product_show_var(item);
        // } else {
        //     Message.show("还没有登录");
        // }
    }
}
