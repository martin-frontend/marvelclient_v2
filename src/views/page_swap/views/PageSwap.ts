import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageSwapMediator from "../mediator/PageSwapMediator";
import PageSwapProxy from "../proxy/PageSwapProxy";
import LangUtil from "@/core/global/LangUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import FagProxy from "@/proxy/FagProxy";
import dialog_swap_record from "@/views/dialog_swap_record";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_message_box from "@/views/dialog_message_box";

@Component
export default class PageSwap extends AbstractView {
    LangUtil = LangUtil;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    myProxy: PageSwapProxy = this.getProxy(PageSwapProxy);
    pageData = this.myProxy.pageData;
    fagProxy: FagProxy = this.getProxy(FagProxy);
    trial = this.myProxy.pageData.trial;
    parameter = this.myProxy.parameter;
    GamePlatConfig = GamePlatConfig;
    listOptions = this.myProxy.listOptions;

    mounted() {
        setInterval(
            () => {
                if (this.myProxy.pageData.inputChangeFlag == true) {
                    this.myProxy.api_user_var_swap_trial();
                    this.myProxy.pageData.inputChangeFlag = false;
                }
            }
            , 3000);
    }

    constructor() {
        super(PageSwapMediator);
    }

    get questionData() {
        return this.fagProxy.qData.type3;
    }

    get tolerance() {
        return this.myProxy.pageData.swap_setting_info.tolerance_params;
    }

    // @Watch("pageData.amount_a")
    // onWatchAmount_A() {
    //     if (this.myProxy.pageData.amount_a == "") {
    //         this.myProxy.pageData.amount_b = "";
    //         this.myProxy.resetTrial();
    //         return;
    //     }

    //     this.parameter.from_coin = this.myProxy.pageData.swap_setting_info.coin_a;
    //     this.parameter.from_coin_number = this.myProxy.pageData.amount_a;
    //     if (this.myProxy.pageData.inputFlag == "") {
    //         this.myProxy.pageData.inputFlag = "A";
    //         this.myProxy.api_user_var_swap_trial();
    //     } else if (this.myProxy.pageData.inputFlag == "B" && this.myProxy.pageData.amount_a == "") {
    //         this.myProxy.pageData.inputFlag = "A";
    //         this.myProxy.api_user_var_swap_trial();
    //     } else if (this.myProxy.pageData.inputFlag == "B") {
    //         return;
    //     } else {
    //         this.myProxy.pageData.inputFlag = "A";
    //         this.myProxy.api_user_var_swap_trial();
    //     }
    // }

    // @Watch("pageData.amount_b")
    // onWatchAmount_B() {
    //     if (this.myProxy.pageData.amount_b == "") {
    //         this.myProxy.pageData.amount_a = "";
    //         this.myProxy.resetTrial();
    //         return;
    //     }
    //     this.parameter.from_coin = this.myProxy.pageData.swap_setting_info.coin_b;
    //     this.parameter.from_coin_number = this.myProxy.pageData.amount_b;
    //     if (this.myProxy.pageData.inputFlag == "") {
    //         this.myProxy.pageData.inputFlag = "B";
    //         this.myProxy.api_user_var_swap_trial();
    //     } else if (this.myProxy.pageData.inputFlag == "A" && this.myProxy.pageData.amount_a == "") {
    //         this.myProxy.pageData.inputFlag = "B";
    //         this.myProxy.api_user_var_swap_trial();
    //     } else if (this.myProxy.pageData.inputFlag == "A") {
    //         return;
    //     } else {
    //         this.myProxy.pageData.inputFlag = "B";
    //         this.myProxy.api_user_var_swap_trial();
    //     }
    // }

    mouseover() {
        this.pageData.icon = "mdi-swap-vertical";
    }

    mouseleave() {
        this.pageData.icon = "mdi-arrow-down";
    }

    amount_a() {
        this.myProxy.pageData.amount_b = "";
        if (this.myProxy.pageData.amount_a == "") {
            this.myProxy.pageData.amount_b = "";
            this.myProxy.resetTrial();
            return;
        }
        this.myProxy.pageData.inputChangeFlag = true;

        this.parameter.from_coin = this.myProxy.pageData.swap_setting_info.coin_a;
        this.parameter.from_coin_number = this.myProxy.pageData.amount_a;
        this.myProxy.pageData.inputType = "A";
        // if (this.myProxy.pageData.inputFlag == "") {
        //     this.myProxy.pageData.inputFlag = "A";
        //     this.myProxy.api_user_var_swap_trial();
        // } else if (this.myProxy.pageData.inputFlag == "B" && this.myProxy.pageData.amount_a == "") {
        //     this.myProxy.pageData.inputFlag = "A";
        //     this.myProxy.api_user_var_swap_trial();
        // } else if (this.myProxy.pageData.inputFlag == "B") {
        //     return;
        // } else {
        //     this.myProxy.pageData.inputFlag = "A";
        //     this.myProxy.api_user_var_swap_trial();
        // }
    }

    amount_b() {
        this.myProxy.pageData.amount_a = "";
        if (this.myProxy.pageData.amount_b == "") {
            this.myProxy.pageData.amount_a = "";
            this.myProxy.resetTrial();
            return;
        }
        this.parameter.from_coin = this.myProxy.pageData.swap_setting_info.coin_b;
        this.parameter.from_coin_number = this.myProxy.pageData.amount_b;
        this.myProxy.pageData.inputType = "B";

        this.myProxy.pageData.inputChangeFlag = true;
        // if (this.myProxy.pageData.inputFlag == "") {
        //     this.myProxy.pageData.inputFlag = "B";
        //     this.myProxy.api_user_var_swap_trial();
        // } else if (this.myProxy.pageData.inputFlag == "A" && this.myProxy.pageData.amount_a == "") {
        //     this.myProxy.pageData.inputFlag = "B";
        //     this.myProxy.api_user_var_swap_trial();
        // } else if (this.myProxy.pageData.inputFlag == "A") {
        //     return;
        // } else {
        //     this.myProxy.pageData.inputFlag = "B";
        //     this.myProxy.api_user_var_swap_trial();
        // }
    }

    /**交易对调 */
    private tradeSwap() {
        this.myProxy.pageData.tradeFlag = 1;
        this.myProxy.tradeReverse();
        this.myProxy.resetTrial();
        this.parameter.from_coin = this.pageData.swap_setting_info.coin_a;
        this.parameter.from_coin_number = 1;
        this.myProxy.api_user_var_swap_trial()
    }

    /**交易对调 */
    private chartSwap() {
        this.myProxy.chartReverse();
    }

    onTimeChange() {
        this.myProxy.api_plat_var_swap_k();
    }

    onChange() {
        if (this.myProxy.pageData.inputType == "A") {
            this.parameter.from_coin = this.myProxy.pageData.swap_setting_info.coin_a;
            this.parameter.from_coin_number = this.myProxy.pageData.amount_a;
            this.myProxy.api_user_var_swap_trial();
        } else {
            this.parameter.from_coin = this.myProxy.pageData.swap_setting_info.coin_b;
            this.parameter.from_coin_number = this.myProxy.pageData.amount_b;
            this.myProxy.api_user_var_swap_trial();
        }
    }

    handlerAll() {
        this.myProxy.pageData.inputType = "A";
        //@ts-ignore
        this.myProxy.pageData.amount_a = this.selfProxy.userInfo.gold_info[this.pageData.swap_setting_info.coin_a].plat_money;
        this.parameter.from_coin = this.myProxy.pageData.swap_setting_info.coin_a;
        this.parameter.from_coin_number = this.myProxy.pageData.amount_a;
        this.myProxy.api_user_var_swap_trial();
    }

    handlerRecord() {
        dialog_swap_record.show();
    }

    handlerRefresh() {
        this.myProxy.pageData.changedFlag = false;
        this.myProxy.pageData.inputChangeFlag = false
        this.myProxy.resetParameter();
        this.myProxy.resetTrial();
        this.myProxy.api_plat_var_swap_setting_info();
        this.myProxy.api_user_var_swap_trial();
        this.myProxy.api_plat_var_swap_k();
    }

    handlerTrade() {
        dialog_message_box.confirm({
            message: LangUtil("确定要交换?"),
            okFun: () => {
                this.myProxy.api_user_var_swap_create_order();
            },
        });
    }
}
