import AbstractView from "@/core/abstract/AbstractView";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import { amountFormat } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
import LangUtil from "@/core/global/LangUtil";
import router from "@/router";
import PageBlur from "@/_skin005/core/PageBlur";
import PanelUtil from "@/_skin005/core/PanelUtil";
import SkinVariable from "@/_skin005/core/SkinVariable";
import { Prop, Watch, Component } from "vue-property-decorator";
import ModulesHelper from "@/_skin005/core/ModulesHelper";

@Component
export default class Wallet extends AbstractView {
    LangUtil = LangUtil;
    amountFormat = amountFormat;
    selfProxy = PanelUtil.getProxy_selfproxy;
    gameProxy = PanelUtil.getProxy_gameproxy;
    SkinVariable = SkinVariable;
    GlobalVar = GlobalVar;
    GamePlatConfig = GamePlatConfig;
    coinTaskProxy = PanelUtil.getProxy_get_pageCoinTaskProxy;
    tId = <any>null;

    waterOptions = ["water_2", "water_4", "water_8", "water_16", "water_32", "water_64", "water_128"];
    waterNeedOptions = [
        "water_need_2",
        "water_need_4",
        "water_need_8",
        "water_need_16",
        "water_need_32",
        "water_need_64",
        "water_need_128",
    ];

    onItemClick(key: string) {
        this.gameProxy.setCoin(key);
        //PanelUtil.openpage_game_play();
        if (this.$route.path.includes("page_game_play")) {
            this.gameProxy.api_vendor_var_ori_product_show_var(this.gameProxy.currGame);
        }
    }

    isFilterChange = false;
    @Watch("isFilterChange")
    filterChange(val: boolean) {
        //console.log("  user 修改值" ,this);
        // PageBlur.blur_mainpage(this.isFilterChange,false );
        PageBlur.blur_novigation(this.isFilterChange, false);
        if (val && ModulesHelper.IsShow_CoinTaskDisplay()) {
            this.coinTaskProxy.api_user_var_coin_task_index();
        }
    }
    setIsFilter(val: boolean) {
        this.isFilterChange = val;
    }

    onCoinIn() {
        PanelUtil.openpanel_recharge();
    }

    handlerGameRate() {
        PanelUtil.openpanel_game_rate();
    }

    public get content_class(): string {
        if (this.$mobile) {
            return "menu transform_mob";
        } else {
            return "menu";
        }
    }

    public get walletMaxwidth(): string {
        if (!this.$xsOnly) {
            return "";
        }
        if (GlobalVar.skin == "skin008" || GlobalVar.skin == "skin010" || GlobalVar.skin == "skin012") {
            if (!SkinVariable.systemKefuTop) {
                return "menu_width_mob_008_1";
            }
            return "menu_width_mob_008";
        }
        return "menu_width_mob";
    }
    public get isShowTips(): boolean {
        return true;
    }

    public get isShowRecharge(): boolean {
        return (
            GlobalVar.instance.isShowRecharge ||
            (SkinVariable.isForeShowRecharge && this.selfProxy.userInfo.is_credit_user == 98) ||
            (this.selfProxy.userInfo.is_credit_user == 1 && this.selfProxy.userInfo.is_cash_agent == 1)
        );
    }
    get isNeedRate(): boolean {
        return GlobalVar.skin != "skin005";
    }
    onClickRecharge() {
        //console.log("跳转充值");
        PanelUtil.openpage_recharge();
    }
    get isNeedText() {
        return GlobalVar.skin == "skin008";
    }

    get coinTask() {
        return this.selfProxy.coinTaskData.list.filter((item: any) => item.status == 2);
    }
    //过期或者取消的活动币
    get liveActivity() {
        return this.selfProxy.coinTaskData.list.filter((item: any) => item.status != 5 && item.status != 6);
    }

    //活动币是否显示
    isShowActivityCoin(key: string): boolean {
        //是否为活动币
        if (!this.isActivityCoin(key)) return false;

        //检查当前币种的活动是否在列表中
        const isActive = this.selfProxy.coinTaskData.list.some((ele: any, index: any, arr: any) => {
            return ele.task_coin_name_unique == key;
        });
        if (!isActive) return false;

        //判断需要展示的情况
        const isNeedShow = this.liveActivity.some((ele: any, index: any, arr: any) => {
            return ele.task_coin_name_unique == key;
        });
        if (isNeedShow) return true;

        return false;
    }

    calculateProgress(data: any) {
        const curVal = data.water;
        const endVal = data.water_need;
        return Math.min((curVal / endVal) * 100, 100);
    }

    showCoinTask() {
        PanelUtil.openpanel_coin_task();
    }

    setCoinTipPosition(val: any) {
        if (val) {
            const element: any = this.$refs[this.gameProxy.coin_name_unique];
            if (element && element.length > 0) {
                const rect = element[0].$el.getBoundingClientRect();
                Object.assign(this.selfProxy.coinTipData, {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    isShow: true,
                });
                // console.warn("this.selfProxy.coinTipData", this.selfProxy.coinTipData);
                // console.warn("this.tId", this.tId);
                if (!this.tId) {
                    this.tId = setInterval(() => {
                        this.setCoinTipPosition(this.selfProxy.coinTipData.isShow);
                    });
                }
            }
        } else {
            clearInterval(this.tId);
            this.tId = null;
            this.selfProxy.coinTipData.isShow = false;
        }
    }

    isActivityCoin(name: any) {
        const coin = GamePlatConfig.config.plat_coins[name];
        if (coin) {
            return coin.type == 4;
        }
        return false;
    }
}
