import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import PageGameListProxy from "../../proxy/PageGameListProxy";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_message from "@/views/dialog_message";

@Component
export default class GameListSearch extends AbstractView {
    private selfProxy: SelfProxy = this.getProxy(SelfProxy);
    myProxy: PageGameListProxy = this.getProxy(PageGameListProxy);
    navigationData = this.myProxy.navigationData;

    showGameSearch() {
        if (this.selfProxy.userInfo.user_id) {
            this.navigationData.bShow = true;
        } else {
            dialog_message.warn("还没有登录");
        }
    }
}
