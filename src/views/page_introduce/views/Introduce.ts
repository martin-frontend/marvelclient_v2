import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import IntroduceMediator from "../mediator/IntroduceMediator";
import IntroduceProxy from "../proxy/IntroduceProxy";

@Component
export default class Introduce extends AbstractView {
    myProxy: IntroduceProxy = this.getProxy(IntroduceProxy);
    pageData = this.myProxy.pageData;
    pageImage = this.myProxy.pageImage;

    constructor() {
        super(IntroduceMediator);
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
}
