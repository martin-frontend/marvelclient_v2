import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import PageBlur from "@/_skin005/core/PageBlur";
import Constant from "@/core/global/Constant";
import { Watch, Component } from "vue-property-decorator";
import DialogPerformanceMediator from "../mediator/DialogPerformanceMediator";
import DialogPerformanceProxy from "../proxy/DialogPerformanceProxy";
import LangUtil from "@/core/global/LangUtil";

import GamePlatConfig from "@/core/config/GamePlatConfig";
import PanelUtil from "@/_skin005/core/PanelUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";

@Component
export default class DialogPerformance extends AbstractView {
    //dialogPerformanceDetailProxy: DialogPerformanceDetailProxy = this.getProxy(DialogPerformanceDetailProxy);
    dialogPerformanceDetailProxy = PanelUtil.getProxy_performance_detail;
    myProxy: DialogPerformanceProxy = this.getProxy(DialogPerformanceProxy);
    pageData = this.myProxy.pageData;
    listOptions = this.myProxy.listOptions;
    listQuery = this.pageData.listQuery;
    summary = this.pageData.summary;
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogPerformanceMediator);
    }

    _curMainCoinName = "";
    
    public get coinName() : string {
        if (!this._curMainCoinName || this._curMainCoinName == "") 
        {
            const plat_coins = <any>GamePlatConfig.config.plat_coins;
            const coinsKey = Object.keys(plat_coins);
            coinsKey.forEach((key: any) => {
                if (plat_coins[key].type === 2) {
                    this._curMainCoinName = key;
                }
            });

            if (!this._curMainCoinName || this._curMainCoinName == "")
            {
                this._curMainCoinName = "USDT";
            }
        }

        return this._curMainCoinName;
    }
    
    handlerDetail(date: string) {
        this.dialogPerformanceDetailProxy.parameter.date = date;
        PanelUtil.openpanel_performance_detail();
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.api_user_var_commission_commissionlist();
        }
    }

    onTimeChange() {
        switch (this.listOptions.timeSelect) {
            case 0:
                this.listQuery.start_date = core.dateFormat(core.getTodayOffset(-6), "yyyy-MM-dd");
                this.listQuery.end_date = core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd");
                break;
            case 1:
                this.listQuery.start_date = core.dateFormat(core.getTodayOffset(-29), "yyyy-MM-dd");
                this.listQuery.end_date = core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd");
                break;
        }
        this.myProxy.api_user_var_commission_commissionlist();
    }
}
