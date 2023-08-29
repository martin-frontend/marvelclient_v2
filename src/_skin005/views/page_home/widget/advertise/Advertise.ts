import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import gsap, { Linear } from "gsap";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class Advertise extends AbstractView {
    @Prop({ default: 0 }) showDataType!: number;
    @Prop({ default: false }) isFootball!: boolean;

    noticeProxy = PanelUtil.getProxy_noticeProxy;
    selectIndex = 0;
    progressObj = {
        value: 0,
    };

    get height(): number {
        if (this.isFootball) {
            return 100;
            // if (this.$vuetify.breakpoint.width <= 390) return 70;
            // switch (this.$vuetify.breakpoint.name) {
            //     case "xs":
            //         return 90;
            //     case "sm":
            //         return 90;
            //     case "md":
            //         return 90;
            //     default:
            //         return 90;
            // }
        }

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

    public get getShowData(): any {
        if (!this.showDataType || this.showDataType == 0) return this.noticeProxy.data.listType1;

        switch (this.showDataType) {
            case 2:
                return this.noticeProxy.data.listType4;
            case 8:
                return this.noticeProxy.data.listType5;
            case 16:
                return this.noticeProxy.data.listType6;
            case 32:
                return this.noticeProxy.data.listType7;
            case 64:
                return this.noticeProxy.data.listType8;
            case 4:
                return this.noticeProxy.data.listType9;
            case 128:
                return this.noticeProxy.data.listType10;
            case 216:
                return this.noticeProxy.data.listType16;
            case 217:
                return this.noticeProxy.data.listType17;
            default:
                break;
        }

        return [];
    }

    onItemClick(item: any) {
        this.selectIndex = this.noticeProxy.data.listType1.indexOf(item);
        this.onChange();
    }

    onBigItemClick(item: any) {
        // this.noticeProxy.jump(item);
        PanelUtil.jumpTo(item);
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
