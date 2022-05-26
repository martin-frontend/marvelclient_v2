import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageExtensionMediator from "../mediator/PageExtensionMediator";
import PageExtensionProxy from "../proxy/PageExtensionProxy";
import dialog_bind_invite from "@/views/dialog_bind_invite";
import dialog_directly from "@/views/dialog_directly";
import dialog_performance from "@/views/dialog_performance";

@Component
export default class PageExtension extends AbstractView {
    myProxy: PageExtensionProxy = this.getProxy(PageExtensionProxy);
    pageData = this.myProxy.pageData;
    promotionData = this.myProxy.promotionData;
    statistics_data = this.myProxy.statistics_data;

    constructor() {
        super(PageExtensionMediator);
    }

    handlerBind() {
        dialog_bind_invite.show();
    }

    handlerDirectly() {
        dialog_directly.show();
    }

    handlerPerformance() {
        dialog_performance.show();
    }

    /**领取奖励 */
    handlerAward() {
        this.myProxy.api_user_var_commission_receive();
    }
}
