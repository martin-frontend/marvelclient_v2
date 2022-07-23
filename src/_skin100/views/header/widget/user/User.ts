import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import SelfProxy from "@/proxy/SelfProxy";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class User extends AbstractView {
    drawer = false;
    selfProxy: SelfProxy = getProxy(SelfProxy);
    red_dot_tips = this.selfProxy.red_dot_tips;

    closeDrawer(isClose: boolean) {
        this.drawer = false;
    }
}
