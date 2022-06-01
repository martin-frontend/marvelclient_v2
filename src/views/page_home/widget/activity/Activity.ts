import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import router from "@/router";
import SelfProxy from "@/proxy/SelfProxy";
import page_mine from "@/views/page_mine";
import page_extension from "@/views/page_extension";
import dialog_activity from "@/views/dialog_activity";
import LoginEnter from "@/core/global/LoginEnter";

@Component
export default class Activity extends AbstractView {
    //proxy
    private selfProxy: SelfProxy = this.getProxy(SelfProxy);

    /**判断登入 */
    get isUserLogin() {
        return this.selfProxy.userInfo.user_id ? true : false;
    }

    goExtension() {
        // this.isUserLogin && page_extension.show();
        LoginEnter(page_extension.show);
    }

    /**游戏挖矿 */
    goMine() {
        LoginEnter(page_mine.show);
        // this.isUserLogin && page_mine.show();
    }

    goActivity() {
        dialog_activity.show();
    }
}
