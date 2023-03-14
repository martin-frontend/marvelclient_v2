import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogRechargeBankchargeMediator from "../mediator/DialogRechargeBankchargeMediator";
import DialogRechargeBankchargeProxy from "../proxy/DialogRechargeBankchargeProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/_skin101/views/dialog_message";
@Component
export default class DialogRechargeBankcharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRechargeBankchargeProxy = this.getProxy(DialogRechargeBankchargeProxy);
    pageData = this.myProxy.pageData;
    fixcontent = this.myProxy.pageData.fixcontent;
    constructor() {
        super(DialogRechargeBankchargeMediator);
    }
    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            // this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
        }
    }
    copytext(key: number) {
        let text = "";
        if (key == 0) {
            text = this.fixcontent[0];
        } else if (key == 1) {
            text = this.fixcontent[1];
        } else if (key == 2) {
            text = this.fixcontent[2];
        } else if (key == 3) {
            text = this.fixcontent[3];
        } else if (key == 4) {
            text = this.fixcontent[4];
        }
        CopyUtil(text);
        dialog_message.info(LangUtil("复制成功"));
    }
    onInput() {
        // 只保留输入的中文字符
        this.fixcontent[5] = this.fixcontent[5].replace(/[^\u4e00-\u9fa5]/g, "").slice(0, 12);
    }
    onSumbit() {
        this.myProxy.api_user_var_coin_recharge_confirm();
    }
}
