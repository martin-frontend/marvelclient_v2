import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";

import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyAgentsetMediator from "../mediator/DialogDirectlyAgentsetMediator";
import DialogDirectlyAgentsetProxy from "../proxy/DialogDirectlyAgentsetProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogDirectlyAgentset extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlyAgentsetProxy = this.getProxy(DialogDirectlyAgentsetProxy);
    pageData = this.myProxy.pageData;
    formData = this.myProxy.formData;
    playerInfo = this.myProxy.playerInfo;
    form= this.myProxy.pageData.form;

    curUserinfo =PanelUtil.getProxy_selfproxy.userInfo;
    constructor() {
        super(DialogDirectlyAgentsetMediator);
    }

    public get isDisable(): boolean {

        if (!this.formData.inputrate) {
            return true;
        }
        const res = parseFloat(this.formData.inputrate);
        //console.log("当前输入值" ,res)
        if (res < 0)
            return true

        console.log(typeof res, typeof this.playerInfo.parent_credit_rate)
        if (res > parseFloat(this.playerInfo.parent_credit_rate)) {
            //console.log("比自己的 大" ,this.playerInfo.parent_credit_rate)
            return true;
        }
        return false
    }

    onClickSure() {

        //const res = ((this.formData.inputrate *100)>>0) / 10000 
        const res = this.formData.inputrate;
        if (this.chackCreditRate())
        {
            this.myProxy.agent_direct_user_update(<any>res);
        }
        

    }
    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {

        console.log("  关闭 s------");
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.initCreditData(this.curUserinfo.credit_rate_min , this.curUserinfo.credit_rate_max)
        }

        console.log("当前 用户数据--- ", this.curUserinfo);
    }


    public get tempTotle(): number {
        return this.form.credit_rate + this.form.credit_rate_invited;
    }
    chackCreditRate_new() {
        const maxValue = this.curUserinfo.credit_rate_max;
        const minValue = this.curUserinfo.credit_rate_min;
        if (!maxValue || !minValue ) return -1;
        if (this.tempTotle > maxValue) {
            return 1;
        }
        else if (this.tempTotle < minValue) {
            return -1
        }
        else {
            return 0;
        }
    }

    
    public get tempClassStr() : string {
        if (this.chackCreditRate_new() != 0)
        {
             return "red--text";
        }
        return "textGreen--text";
    }
    
    chackCreditRate() {

        if (this.chackCreditRate_new() > 0) {
            PanelUtil.message_warn(LangUtil("我的占成+代理占成必须<=最高设置占成"));
        }
        else if (this.chackCreditRate_new() < 0) {
            PanelUtil.message_warn(LangUtil("我的占成+代理占成必须>=最低设置占成"));
        }
        else {
            return true;
        }
        return false;
    }


    initCreditData(min: any, max: any) {
        if (typeof (min) != "number") {
            this.save_credit_min = parseInt(min);
        }
        else {
            this.save_credit_min = min;
        }
        if (typeof (max) != "number") {
            this.save_credit_max = parseInt(max);
        }
        else {
            this.save_credit_max = max;
        }

        //给两个滑块 最大最小 设置 初始值
        this.range_my_min = 0;
        this.range_daili_min = 0;

        //设置 两个 滑块的 中间值 
        this.myProxy.pageData.form.credit_rate = this.playerInfo.credit_rate;
        this.myProxy.pageData.form.credit_rate_invited= this.playerInfo.credit_rate_invited;

        this.range_my_max = this.save_credit_max;
        this.range_daili_max = this.save_credit_max;

    }


    save_credit_min = 0;
    save_credit_max = 0;

    range_min = 0;
    range_my_min = 0;
    range_my_max = 0;
    range_daili_min = 0;
    range_daili_max = 0;
    range_max = 0;
}
