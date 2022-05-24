import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import router from "@/router";
import SelfProxy from "@/proxy/SelfProxy";
@Component
export default class Activity extends AbstractView {
    //proxy
    private selfProxy: SelfProxy = this.getProxy(SelfProxy);

    /**判断登入 */
    get isUserLogin() {
        return this.selfProxy.userInfo.user_id ? true : false;
    }

    goExtension() {
        router.push("/page_extension");
    }

    /**游戏挖矿 */
    goMine() {
        this.isUserLogin && router.push("/page_mine");
    }
}
