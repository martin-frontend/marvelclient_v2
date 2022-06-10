import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageHomeMediator from "../mediator/PageHomeMediator";
import PageHomeProxy from "../proxy/PageHomeProxy";
import GameProxy from "@/proxy/GameProxy";

@Component
export default class PageHome extends AbstractView {
    myProxy: PageHomeProxy = this.getProxy(PageHomeProxy);
    gameProxy: GameProxy = this.getProxy(GameProxy);
    pageData = this.myProxy.pageData;
    private marqueeHtml: any = null;

    constructor() {
        super(PageHomeMediator);
    }

    mounted() {
        this.marqueeHtml = this.$refs.marquee_content;
    }

    get marqueeTxt() {
        const arrMsg = this.gameProxy.marqueeIndex;
        let result = "<div>";
        if (arrMsg.length != 0) {
            if (this.marqueeHtml) {
                for (const msg of arrMsg) {
                    result += `<span style="margin-right:${this.marqueeHtml.clientWidth}px">${msg.content}</span>`;
                }
            }
        }
        return `${result}</div>`;
    }
}
