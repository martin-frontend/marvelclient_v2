import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogEmailMediator from "../mediator/DialogEmailMediator";
import DialogEmailProxy from "../proxy/DialogEmailProxy";

@Component
export default class DialogEmail extends AbstractView {
    myProxy: DialogEmailProxy = this.getProxy(DialogEmailProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogEmailMediator);
    }

    get listHeight() {
        if (this.$vuetify.breakpoint.xsOnly) {
            return this.$vuetify.breakpoint.height - 190;
        } else {
            return 450;
        }
    }

    onTabClick(cate: number) {
        this.listQuery.cate = cate;
        this.listQuery.page_count = 1;
        this.myProxy.api_user_var_mail();
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_mail();
        }
    }

    onPageChange(val: any) {
        this.listQuery.page_count = val;
        this.myProxy.api_user_var_mail();
    }

    onDetail(item: any) {
        this.myProxy.api_user_var_mail_var(item.id);
    }

    onReceiveQuick() {
        this.myProxy.api_user_var_receiveQuick();
    }

    onDestroyQuick() {
        this.myProxy.api_user_var_destroy_quick();
    }
}
