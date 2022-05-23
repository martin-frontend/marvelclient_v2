import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageExtensionMediator from "../mediator/PageExtensionMediator";
import PageExtensionProxy from "../proxy/PageExtensionProxy";
import dialog_bind_invite from "@/views/dialog_bind_invite";

@Component
export default class PageExtension extends AbstractView {
    myProxy: PageExtensionProxy = this.getProxy(PageExtensionProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(PageExtensionMediator);
    }

    handlerBind() {
        dialog_bind_invite.show();
    }
}
