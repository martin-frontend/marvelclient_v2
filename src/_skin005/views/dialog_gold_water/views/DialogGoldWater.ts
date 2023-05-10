import AbstractView from "@/core/abstract/AbstractView";

import { Watch, Component } from "vue-property-decorator";
import DialogGoldWaterMediator from "../mediator/DialogGoldWaterMediator";
import DialogGoldWaterProxy from "../proxy/DialogGoldWaterProxy";
import LangUtil from "@/core/global/LangUtil";
import PageBlur from "@/_skin005/core/PageBlur";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import { changeDateShow } from "@/core/global/Functions";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class DialogGoldWater extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogGoldWaterProxy = this.getProxy(DialogGoldWaterProxy);
    pageData = this.myProxy.pageData;
    constructor() {
        super(DialogGoldWaterMediator);
    }

    transformMoney(val: any) {
        return CoinTransformHelper.TransformMoney(val, 2, GameConfig.config.SettlementCurrency, "USDT", true, true, false, false);
    }
    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_gold_water_index();
        }
    }
    @Watch("$mobile")
    onWatchXS() {
        if (this.pageData.bShow) {
            this.pageData.listQuery.page_count = 1;
            this.myProxy.api_user_var_gold_water_index();
        }
    }

    onPageChange(val: any) {
        this.pageData.listQuery.page_count = val;
        this.myProxy.api_user_var_gold_water_index();
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }
    getDate(str: string) {
        return changeDateShow(str);
    }
    getStateColor(state: number) {
        switch (state) {
            case 0:
                return "red--text";
            case 1:
            case 2:
            case 3:
                return "textGreen--text";
            default:
                return "";
        }
    }
    getStateText(state: number) {
        switch (state) {
            case 0:
                return LangUtil("未通过");
            case 1:
            case 2:
            case 3:
                return LangUtil("成功");
            default:
                return LangUtil("未知");
        }
    }
}
