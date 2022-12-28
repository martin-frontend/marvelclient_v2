import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import SelfProxy from "@/proxy/SelfProxy";
import { Prop, Watch, Component } from "vue-property-decorator";
import HeaderProxy from "../../proxy/HeaderProxy";

@Component
export default class User extends AbstractView {
    myProxy: HeaderProxy = getProxy(HeaderProxy);
    pageData = this.myProxy.pageData;
    selfProxy: SelfProxy = getProxy(SelfProxy);
    red_dot_tips = this.selfProxy.red_dot_tips;
}
