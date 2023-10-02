/*
 * @Author: custer custer@xx.xx
 * @Date: 2023-09-18 10:38:30
 * @LastEditors: custer custer@xx.xx
 * @LastEditTime: 2023-09-25 17:59:28
 * @FilePath: /marvelclient_v2/src/_skin005/views/page_recharge/views/PageRecharge.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageRechargeMediator from "../mediator/PageRechargeMediator";
import PageRechargeProxy from "../proxy/PageRechargeProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GlobalVar from "@/core/global/GlobalVar";
import SkinVariable from "@/_skin005/core/SkinVariable";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class PageRecharge extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageRechargeProxy = this.getProxy(PageRechargeProxy);
    pageData = this.myProxy.pageData;
    selfProxy = PanelUtil.getProxy_selfproxy;
    platConfig = GamePlatConfig.config;
    core = core;
    GlobalVar = GlobalVar;
    constructor() {
        super(PageRechargeMediator);
    }
    destroyed() {
        this.myProxy.rechargeProxy.pageData.form.amount = "";
        this.myProxy.exchangeProxy.pageData.form.amount = "";
        super.destroyed();
    }
    mounted() {
        PanelUtil.showAppLoading(false);
    }
    typechange = 0;

    // /**图标时间选择 */
    // onTimeChange(val: any) {
    //     this.onTabClick(this.pageData.tabIndex);
    // }
    // onTabClick(idx: number) {

    //     this.pageData.tabIndex = idx;
    // }
    goRecord() {
        if (this.pageData.tabIndex == "0") {
            PanelUtil.openpanel_record_recharge();
        } else {
            PanelUtil.openpanel_record_exchange();
        }
        //this.pageData.bShow = false;
    }

    openGoldWater() {
        PanelUtil.openpanel_gold_waterl();
    }

    @Watch("myProxy.pageData.tabIndex")
    onTabChange() {
        window.scrollTo(0, 0);
        this.myProxy.rechargeProxy.pageData.form.amount = "";
        this.myProxy.exchangeProxy.pageData.form.amount = "";
    }

    public get isShowRecharge(): boolean {
        return (
            GlobalVar.instance.isShowRecharge ||
            (SkinVariable.isForeShowRecharge && this.selfProxy.userInfo.is_credit_user == 98) ||
            (this.selfProxy.userInfo.is_credit_user == 1 && this.selfProxy.userInfo.is_cash_agent == 1)
        );
    }

    public get isShowExchange(): boolean {
        return (
            GlobalVar.instance.isShowExchange ||
            (SkinVariable.isForeShowRecharge && this.selfProxy.userInfo.is_credit_user == 98) ||
            (this.selfProxy.userInfo.is_credit_user == 1 && this.selfProxy.userInfo.is_cash_agent == 1)
        );
    }

    get isSkin008() {
        return GlobalVar.skin == "skin008" || GlobalVar.skin == "skin010" || GlobalVar.skin == "skin012";
    }
}
