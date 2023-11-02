import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin030/core/PageBlur";
import getProxy from "@/core/global/getProxy";
import LangUtil from "@/core/global/LangUtil";

import PanelUtil from "@/_skin030/core/PanelUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogEmailMediator from "../mediator/DialogEmailMediator";
import DialogEmailProxy from "../proxy/DialogEmailProxy";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import { changeDateShow } from "@/core/global/Functions";
import SkinVariable from "@/_skin030/core/SkinVariable";

@Component
export default class DialogEmail extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogEmailProxy = getProxy(DialogEmailProxy);
    pageData = this.myProxy.pageData;
    listQuery = this.pageData.listQuery;
    core = core;
    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogEmailMediator);
    }
    typechange = 0;

    /**图标时间选择 */
    onTimeChange(val: any) {
        this.listQuery.cate = parseInt(val);
        this.onTabClick(this.listQuery.cate);
    }

    onTabClick(cate: number) {
        this.listQuery.cate = cate;
        this.listQuery.page_count = 1;
        this.myProxy.api_user_var_mail();
    }

    onClose() {
        this.pageData.bShow = false;
        this.typechange = 0;
        MultDialogManager.onClosePanel();
        PanelUtil.getProxy_selfproxy.api_user_var_red_dot_tips();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_mail();

            console.log("ssss----", this);
        }
    }

    @Watch("$mobile")
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
        if (SkinVariable.mail_get_gift_config) {
            PanelUtil.message_confirm({
                message: LangUtil("是否领取所有奖励"),
                okFun: () => {
                    this.myProxy.api_user_var_receiveQuick();
                },
            });
        } else this.myProxy.api_user_var_receiveQuick();
    }

    onDestroyQuick() {
        PanelUtil.message_confirm({
            message: LangUtil("是否删除已读消息?"),
            okFun: () => {
                this.myProxy.api_user_var_destroy_quick();
            },
        });
    }

    goMail() {
        //dialog_official_mail.show();
        PanelUtil.openpanel_official_mail();
    }
    getDate(str: string) {
        return changeDateShow(str);
    }
    /**如果有邮件已经读取了这个 这个按钮才能被点亮 */
    get isCheckDelete() {
        if (!this.pageData.list || this.pageData.list.length < 1) {
            return false;
        }

        const isHave = this.pageData.list.some((e: any, index: any, array: any) => e.is_read);

        return isHave;
    }
    /**检查 是否可以一键领取 */
    get isCheckGet() {
        if (!this.pageData.list || this.pageData.list.length < 1) {
            return false;
        }

        const isHave = this.pageData.list.some(
            (e: any, index: any, array: any) => e.attachment_status == 11 || e.attachment_status == "11"
        );

        return isHave;
    }
}
