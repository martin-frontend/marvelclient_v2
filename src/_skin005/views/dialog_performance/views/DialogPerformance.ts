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
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import GameConfig from "@/core/config/GameConfig";
import { changeDateShow, dateFormat, getDateOffset, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
@Component
export default class DialogPerformance extends AbstractView {
    //dialogPerformanceDetailProxy: DialogPerformanceDetailProxy = this.getProxy(DialogPerformanceDetailProxy);
    dialogPerformanceDetailProxy = PanelUtil.getProxy_performance_detail;
    myProxy: DialogPerformanceProxy = this.getProxy(DialogPerformanceProxy);
    pageData = this.myProxy.pageData;
    listOptions = this.myProxy.listOptions;
    core = core;
    listQuery = this.pageData.listQuery;
    summary = this.pageData.summary;
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;

    commonIcon = Assets.commonIcon;

    constructor() {
        super(DialogPerformanceMediator);
    }

    _curMainCoinName = "";

    public get coinName(): string {
        if (!this._curMainCoinName || this._curMainCoinName == "") {
            const plat_coins = <any>GamePlatConfig.config.plat_coins;
            const coinsKey = Object.keys(plat_coins);
            coinsKey.forEach((key: any) => {
                if (plat_coins[key].type === 2) {
                    this._curMainCoinName = key;
                }
            });

            if (!this._curMainCoinName || this._curMainCoinName == "") {
                this._curMainCoinName = "USDT";
            }
        }

        return this._curMainCoinName;
    }

    transformMoney(val: any) {
        return CoinTransformHelper.TransformMoney(val, 2, GameConfig.config.SettlementCurrency, "USDT", true, true, false, false);
    }
    getDate(str: string) {
        return changeDateShow(str);
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
                this.listQuery.start_date = dateFormat(getTodayOffset(-6), "yyyy-MM-dd hh:mm:ss");
                this.listQuery.end_date = dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss");
                break;
            case 1:
                this.listQuery.start_date = dateFormat(getTodayOffset(-29), "yyyy-MM-dd hh:mm:ss");
                this.listQuery.end_date = dateFormat(getTodayOffset(1, 1), "yyyy-MM-dd hh:mm:ss");
                break;
        }
        //PanelUtil.message_alert("timechange" + JSON.stringify(this.listQuery));
        this.myProxy.api_user_var_commission_commissionlist();
    }

    get_commission_num(item: any) {
        const keys = Object.keys(item);
        const coinname = keys[0];
        return CoinTransformHelper.TransformMoney(item[coinname], 2, coinname, coinname);
    }
    /**将一个日期时间转为 时间段 例如  "2023-05-15"  转为 "2023-05-15 00：00:00 - "2023-05-15 23:59:59""*/
    getCommissionDate(date: string): string {
        const { startTime, endTime } = getDateOffset(date);

        const showTime_start = changeDateShow(startTime);
        const showTime_end = changeDateShow(endTime);

        return showTime_start + LangUtil(" - ") + showTime_end;
    }
}
