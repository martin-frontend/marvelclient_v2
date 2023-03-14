import AbstractView from "@/core/abstract/AbstractView";
import DialogMessageMediator from "../mediator/DialogMessageMediator";
import DialogMessageProxy from "../proxy/DialogMessageProxy";

export default class DialogMessage extends AbstractView {
    myProxy: DialogMessageProxy = this.getProxy(DialogMessageProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogMessageMediator);
    }
}
