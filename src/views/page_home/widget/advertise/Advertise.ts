import AbstractView from "@/core/abstract/AbstractView";
import getProxy from "@/core/global/getProxy";
import NoticeProxy from "@/proxy/NoticeProxy";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class Advertise extends AbstractView {
    noticeProxy: NoticeProxy = getProxy(NoticeProxy);
    selectIndex = 0;

    onItemClick(item: any) {
        this.selectIndex = this.noticeProxy.data.listType1.indexOf(item);
    }
}
