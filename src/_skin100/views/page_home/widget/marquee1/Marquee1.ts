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

    step = /(Android)/i.test(navigator.userAgent) ? 40 : 50;

    constructor() {
        super(Marquee1Mediator);
    }

    mounted() {
        this.onWatchText();
    }

    @Watch("pageData.text")
    onWatchText() {
        this.$nextTick(() => {
            const marqueeBox: any = this.$refs.marqueeBox;
            const marqueeText: any = this.$refs.marqueeText;
            if (marqueeBox && marqueeText) {
                // const fromY = marqueeBox.clientHeight;
                // const toY = -marqueeText.clientHeight;
                // const time = 7;
                // gsap.to(marqueeText, {
                //     y: 0,
                //     duration: 3,
                //     ease: Linear.easeInOut,
                //     onComplete: () => {
                //         this.myProxy.next();
                //     },
                // });
                // gsap.fromTo(
                //     marqueeText,
                //     { y: fromY },
                //     {
                //         y: toY,
                //         duration: time,
                //         ease: Linear.easeInOut,
                //         onComplete: () => {
                //             this.myProxy.next();
                //         },
                //     }
                // );
                const fromX = marqueeBox.clientWidth;
                const toX = -marqueeText.clientWidth;
                const time = (fromX - toX) / this.step;
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
            }
        });
    }

    beforeDestroy() {
        const marqueeText: any = this.$refs.marqueeText;
        if (marqueeText) {
            gsap.killTweensOf(marqueeText);
        }
    }
}
