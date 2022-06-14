import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Marquee1Proxy from "./Marquee1Proxy";
import getProxy from "@/core/global/getProxy";
import Marquee1Mediator from "./Marquee1Mediator";
import gsap, { Linear, Elastic } from "gsap";

@Component
export default class Marquee1 extends AbstractView {
    LangUtil = LangUtil;
    myProxy: Marquee1Proxy = getProxy(Marquee1Proxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(Marquee1Mediator);
    }

    @Watch("pageData.text")
    onWatchText() {
        this.$nextTick(() => {
            const marqueeBox: any = this.$refs.marqueeBox;
            const marqueeText: any = this.$refs.marqueeText;
            const fromX = marqueeBox.clientWidth;
            const toX = -marqueeText.clientWidth;
            const time = (fromX - toX) / 50;
            gsap.fromTo(
                marqueeText,
                { x: fromX },
                {
                    x: toX,
                    duration: time,
                    ease: Linear.easeNone,
                    onComplete: () => {
                        this.myProxy.next();
                    },
                }
            );
        });
    }
}
