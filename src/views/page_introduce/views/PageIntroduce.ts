import AbstractView from "@/core/abstract/AbstractView";
import OpenLink from "@/core/global/OpenLink";
import { Watch, Component } from "vue-property-decorator";
import PageIntroduceMediator from "../mediator/PageIntroduceMediator";
import PageIntroduceProxy from "../proxy/PageIntroduceProxy";

@Component
export default class PageIntroduce extends AbstractView {
    myProxy: PageIntroduceProxy = this.getProxy(PageIntroduceProxy);
    pageData = this.myProxy.pageData;
    reward_coin_info = this.pageData.reward_coin_info;
    pageImage = this.myProxy.pageImage;

    constructor() {
        super(PageIntroduceMediator);
    }

    getTextWrapClass(): string {
        if (this.$vuetify.breakpoint.width > 1264 && this.$vuetify.breakpoint.width < 1460) {
            return "textWrap-ctDown";
        }
        if (this.$vuetify.breakpoint.md) {
            return "textWrap-md";
        }
        if (this.$vuetify.breakpoint.sm) {
            return "textWrap-md";
        }
        if (this.$vuetify.breakpoint.xs) {
            return "textWrap-xs";
        }
        return "textWarp-ct";
    }

    goContractInfo() {
        OpenLink(this.reward_coin_info.contract_address);
    }
}
