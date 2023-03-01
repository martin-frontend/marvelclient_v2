import AbstractView from "@/core/abstract/AbstractView";
import NoticeProxy from "@/proxy/NoticeProxy";
import { Prop, Watch, Component } from "vue-property-decorator";

@Component
export default class AdvertiseInLogin extends AbstractView {
    @Prop({ default: 654 }) height!: number;
    @Prop({ default: 366 }) width!: number;

    noticeProxy: NoticeProxy = this.getProxy(NoticeProxy);
}
