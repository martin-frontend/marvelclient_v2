import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import NoticeProxy from "@/proxy/NoticeProxy";
import { Prop, Watch, Component } from "vue-property-decorator";
import gsap, { Linear } from "gsap";

@Component
export default class Advertise extends AbstractView {
    noticeProxy: NoticeProxy = getProxy(NoticeProxy);
    selectIndex = 0;
    progressObj = {
        value: 0,
    };

    get height(): number {
        if (this.$vuetify.breakpoint.width <= 390) return 150;
        switch (this.$vuetify.breakpoint.name) {
            case "xs":
                return 200;
            case "sm":
                return 300;
            case "md":
                return 350;
            default:
                return 450;
        }
    }

    onItemClick(item: any) {
        this.selectIndex = this.noticeProxy.data.listType1.indexOf(item);
        this.onChange();
    }

    onBigItemClick(item: any) {
        this.noticeProxy.jump(item);
    }

    onChange() {
        this.progressObj.value = 0;
        gsap.to(this.progressObj, {
            duration: 5,
            value: 100,
            ease: Linear.easeNone,
        });
    }
}
