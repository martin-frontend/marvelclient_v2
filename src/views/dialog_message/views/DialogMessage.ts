import AbstractView from "@/core/abstract/AbstractView";
import DialogMessageMediator from "../mediator/DialogMessageMediator";
import DialogMessageProxy from "../proxy/DialogMessageProxy";

export default class DialogMessage extends AbstractView {
    myProxy: DialogMessageProxy = this.getProxy(DialogMessageProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogMessageMediator);
    }

    animation = {
        enter: {
            opacity: [1, 0],
            translateX: [0, 300],
            scale: [1, 0.2],
        },
        leave: {
            opacity: 0,
            height: 0,
        },
    };
}
