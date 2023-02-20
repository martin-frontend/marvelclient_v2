import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageSwapMediator from "../mediator/PageSwapMediator";
import PageSwapProxy from "../proxy/PageSwapProxy";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import FagProxy from "@/proxy/FagProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class PageSwap extends AbstractView {
    LangUtil = LangUtil;
    plat_coins = GamePlatConfig.config.plat_coins;
    selfProxy = PanelUtil.getProxy_selfproxy;
    fagProxy: FagProxy = this.getProxy(FagProxy);
    myProxy: PageSwapProxy = this.getProxy(PageSwapProxy);
    pageData = this.myProxy.pageData;
    form = this.pageData.form;
    chartData = this.pageData.chartData;
    swap_setting_info = this.pageData.swap_setting_info;
    userInfo = this.selfProxy.userInfo;
    parameter = this.myProxy.parameter;

    constructor() {
        super(PageSwapMediator);
    }

    // mounted() {
    //     /**更新折线图 */
    //     setInterval(
    //         () => {
    //             this.myProxy.api_plat_var_swap_k();
    //         }
    //         , 30000);
    //     /**更新试算 */
    //     setInterval(
    //         () => {
    //             if (this.form.inputA) {
    //                 this.myProxy.api_plat_var_swap_trial();
    //             }
    //         }
    //         , 5000);
    // }

    onInputA() {
        this.pageData.form.inputType = 0;
        this.pageData.form.inputB = "";
        if (this.pageData.form.inputA) {
            this.myProxy.api_plat_var_swap_trial();
        } else {
            this.pageData.form.timestamp = 1;
        }
    }

    onInputB() {
        this.pageData.form.inputType = 1;
        this.pageData.form.inputA = "";
        if (this.pageData.form.inputB) {
            this.myProxy.api_plat_var_swap_trial();
        } else {
            this.pageData.form.timestamp = 1;
        }
    }

    handlerAll() {
        const { form } = this.pageData;
        form.inputType = 0;
        const gold_info: any = this.userInfo.gold_info;
        if (gold_info) {
            form.inputA = gold_info[form.coinA].plat_money;
        }
        this.onInputA();
    }
    /**交易对调 */
    private tradeSwap() {
        this.myProxy.tradeReverse();
        this.myProxy.api_plat_var_swap_trial();
    }
    /**交易对调 */
    private chartSwap() {
        this.myProxy.chartReverse();
    }
    /**图标时间选择 */
    onTimeChange(val: any) {
        this.pageData.chartQuary.type = parseInt(val);
        this.myProxy.api_plat_var_swap_k();
    }
    /**滑点容差选择 */
    onChange() {
        this.myProxy.api_plat_var_swap_trial();
    }

    handlerRecord() {
        PanelUtil.openpanel_swap_record();
    }

    handlerRefresh() {
        if (this.form.inputA) {
            this.myProxy.api_plat_var_swap_trial();
        }
    }

    handlerTrade() {
        PanelUtil.message_confirm({
            message: LangUtil("确定要交换?"),
            okFun: () => {
                const gameProxy = PanelUtil.getProxy_gameproxy;
                gameProxy.loading = true;
                this.myProxy.api_user_var_swap_create_order();
            },
        });
    }

    get isCheck(): boolean {
        return !!this.form.inputA && !!this.form.inputB;
    }

    get chartChangedData() {
        if (this.chartData.coinA == this.swap_setting_info.coin_a) {
            return this.chartData.coin_a_b_changed;
        } else {
            return this.chartData.coin_b_a_changed;
        }
    }

    destroyed() {
        this.parameter.from_coin_number = 1;
        this.pageData.chartQuary.type = 0;
        this.form.timestamp = 0;
        this.form.tolerance = 0;
        super.destroyed();
    }
}
