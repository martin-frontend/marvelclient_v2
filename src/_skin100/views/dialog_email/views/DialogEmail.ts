import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import { number } from "echarts";
import { Watch, Component } from "vue-property-decorator";
import DialogEmailMediator from "../mediator/DialogEmailMediator";
import DialogEmailProxy from "../proxy/DialogEmailProxy";

@Component
export default class DialogEmail extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogEmailProxy = getProxy(DialogEmailProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;

    curValue = 0;
    selectArr = {
        0: { value: 0, name: "全部消息" },
        1: { value: 1, name: "平台消息" },
        11: { value: 11, name: "活动消息" },
    };

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogEmailMediator);
    }

    onTabClick(cate: number) {
        this.listQuery.cate = cate;
        this.listQuery.page_count = 1;
        this.myProxy.api_user_var_mail();
    }

    onClose() {
        this.pageData.bShow = false;
        const selfProxy: SelfProxy = getProxy(SelfProxy);
        selfProxy.api_user_var_red_dot_tips();
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

    @Watch("$vuetify.breakpoint.xsOnly")
    onWatchXS() {
        if (this.pageData.bShow) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.api_user_var_mail();
        }
    }

    onPageChange(val: any) {
        this.listQuery.page_count = val;
        this.myProxy.api_user_var_mail();
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
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
