import AbstractView from "@/core/abstract/AbstractView";
import router from "@/router";
import dialog_message from "@/views/dialog_message";
import { Watch, Component } from "vue-property-decorator";
import PageGamePlayMediator from "../mediator/PageGamePlayMediator";
import PageGamePlayProxy from "../proxy/PageGamePlayProxy";

@Component
export default class PageGamePlay extends AbstractView {
    myProxy: PageGamePlayProxy = this.getProxy(PageGamePlayProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(PageGamePlayMediator);
    }

    onFullScreen() {
        const gameFrame = document.getElementById("gameFrame");
        if (gameFrame) {
            gameFrame.requestFullscreen().catch(() => {
                dialog_message.warn("Fullscreen not supported");
            });
        }
    }

    onBack(){
        router.back();
    }
}
