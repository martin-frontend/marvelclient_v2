import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import Constant from "@/core/global/Constant";
import { Watch, Component } from "vue-property-decorator";
import DialogPerformanceMediator from "@/views/dialog_performance/mediator/DialogPerformanceMediator";
import DialogPerformanceProxy from "@/views/dialog_performance/proxy/DialogPerformanceProxy";
import dialog_performance_detail from "../../dialog_performance_detail";
import DialogPerformanceDetailProxy from "@/_skin004/views/dialog_performance_detail/proxy/DialogPerformanceDetailProxy";
import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class DialogPerformance extends AbstractView {
    dialogPerformanceDetailProxy: DialogPerformanceDetailProxy = this.getProxy(DialogPerformanceDetailProxy);
    myProxy: DialogPerformanceProxy = this.getProxy(DialogPerformanceProxy);
    pageData = this.myProxy.pageData;
    listOptions = this.myProxy.listOptions;
    listQuery = this.pageData.listQuery;
    summary = this.pageData.summary;
    LangUtil = LangUtil;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);

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
    handlerDetail(date: string) {
        this.dialogPerformanceDetailProxy.parameter.date = date;
        dialog_performance_detail.show();
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
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
