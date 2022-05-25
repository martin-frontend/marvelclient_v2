import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import PageGameListProxy from "../../proxy/PageGameListProxy";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_message from "@/views/dialog_message";

@Component
export default class GameNavigationSearch extends AbstractView {
    private selfProxy: SelfProxy = this.getProxy(SelfProxy);
    myProxy: PageGameListProxy = this.getProxy(PageGameListProxy);
    navigationData = this.myProxy.navigationData;
    searchString: string = "";

    @Watch("navigationData.bShow")
    onWatchShow() {
        if (this.navigationData.bShow) {
            this.myProxy.api_user_var_game_index();
        }
    }

    onTabsChange(index: number | string): void {
        if (index === 2) {
            this.navigationData.searchList = [];
        } else {
            this.myProxy.api_user_var_game_index();
        }
    }

    // 收藏
    onCollect(item: any) {
        this.myProxy.api_user_var_game_update_var(item);
    }

    // 搜尋
    onSearchGame() {
        this.myProxy.api_user_var_game_search(this.searchString);
    }

    // 玩遊戲
    private onEnterGame(item: any) {
        if (this.selfProxy.userInfo.user_id) {
            this.myProxy.api_vendor_var_ori_product_show_var(item);
        } else {
            dialog_message.warn("还没有登录");
        }
    }
}
