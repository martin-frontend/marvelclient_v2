import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import NoticeProxy from "@/proxy/NoticeProxy";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class Advertise extends AbstractView {
    noticeProxy: NoticeProxy = getProxy(NoticeProxy);
    selectIndex = 0;

    get height(): number {
        switch (this.$vuetify.breakpoint.name) {
            case "xs":
                return 145;
            case "sm":
            case "md":
                return 350;
            default:
                return 450;
        }
    }

    onItemClick(item: any) {
        this.selectIndex = this.noticeProxy.data.listType1.indexOf(item);
    }
}
