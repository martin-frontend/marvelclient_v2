import LangConfig from "@/core/config/LangConfig";
import ModulesHelper from "@/_skin030/core/ModulesHelper";
import { CompetitionVO } from "@/_skin030/vo/CompetitionVO";
import Vue from "vue";
import GameConfig from "@/core/config/GameConfig";

export default class PageHomeProxy extends puremvc.Proxy {
    static NAME = "PageHomeProxy";

    public onRegister(): void {
        if (ModulesHelper.IsShow_FootBallHot()) {
            setInterval(() => {
                if (Vue.router.currentRoute.path == Vue.prePath || Vue.router.currentRoute.path == Vue.prePath + "/") {
                    this.api_vendor_96_products();
                }
            }, 5000);
            if (Vue.router.currentRoute.path == Vue.prePath || Vue.router.currentRoute.path == Vue.prePath + "/") {
                this.api_vendor_96_products();
            }
        }
    }

    pageData = {
        loading: false,
        stakeInfo: {
            bonus_pool_amount: "0", // 当前奖池金额
            total_stake_amount: "0", // 总质押数量
            total_bonus_amount: "0", // 总计已派发
            auto_withdraw_stake_time: "0", // 自动解质押时刻
            bonus_time: "0", // 下次分红时间
            coin_name_unique: "", // 质押币种
            apr: "",
        },
        swap_setting_info: {
            coin_a: "CF", // 币A
            coin_b: "USDT", // 币B
            coin_a_b_price: "",
            coin_b_a_price: "0", // USDT计价
        },
        swap_k: {
            coin_a_b_changed: "", // 币种A兑币种B变化
        },
        backwater_setting_info: {
            backwater_max_efficiency: "0", // 平台最大挖矿效率
        },
        // 赛事数据
        compData: <CompetitionVO[]>[],
        event_id: 0, //进入时直接进入内页
    };

    vip_info_custom = <any>{
        vipMaxLevel: 0,
        nextExp: 0,
        nextUSDT: 0,
        vipProgress: 0,
        vipLevel: 0,
        vipConfig: <any>{},
        vipNextLevel: 0,
    };
    setStakeInfo(data: any) {
        Object.assign(this.pageData.stakeInfo, data);
    }
    pageInit(data: any) {
        // Object.assign(this.userInfo, data);
        //console.warn("this.userInfo >>>", this.userInfo);
        const vip_progress = <any>data.vip_info?.vip_progress;
        const vip_info = data.vip_info;
        const vip_config_info = data.vip_config_info;
        const backwater_info = data.backwater_info;
        if (!vip_info) return;
        // 等级Max
        this.vip_info_custom.vipMaxLevel = vip_info.max_vip_level;
        //console.log("最大 等级", vip_info.max_vip_level);
        // 流水等级
        if (vip_progress[0]) {
            this.vip_info_custom.nextExp = <any>(
                (Number(vip_progress[0].next_vip_level_need_exp) - Number(vip_progress[0].user_exp)).toFixed(2)
            );
        }
        // USDT充值
        if (vip_progress[1]) {
            this.vip_info_custom.nextUSDT = <any>(
                (Number(vip_progress[1].next_vip_level_need_exp) - Number(vip_progress[1].user_exp)).toFixed(2)
            );
        }

        // 经验条
        this.vip_info_custom.vipProgress =
            ((vip_progress[0].user_exp - vip_progress[0].cur_vip_level_need_exp) /
                (vip_progress[0].next_vip_level_need_exp - vip_progress[0].cur_vip_level_need_exp)) *
            100;

        if (this.vip_info_custom.vipProgress > 100) {
            this.vip_info_custom.vipProgress = 100;
        }
        if (this.vip_info_custom.vip_progress < 0) {
            this.vip_info_custom.vip_progress = 0;
        }
        // this.vip_info_custom.vipProgress = 85;
        // 目前vip等级
        this.vip_info_custom.vipLevel = vip_info.vip_level;
        this.vip_info_custom.vipConfig = vip_config_info?.vip_config;
        this.vip_info_custom.vipNextLevel =
            this.vip_info_custom.vipLevel + 1 > vip_info.max_vip_level - 1 ? vip_info.max_vip_level - 1 : this.vip_info_custom.vipLevel + 1;
    }
    setInfo(data: any) {
        Object.assign(this.pageData.swap_setting_info, data);
    }

    setSwapK(data: any) {
        Object.assign(this.pageData.swap_k, data);
    }

    setbackwater(data: any) {
        Object.assign(this.pageData.backwater_setting_info, data);
    }

    set_vendor_96_products(data: any) {
        if (Object.keys(data).length > 0) {
            this.pageData.compData = data;
        }
    }

    api_plat_var_stake_info() {
        this.sendNotification(net.HttpType.api_plat_var_stake_info, { plat_id: core.plat_id });
    }

    /**Swap--Swap基础信息*/
    api_plat_var_swap_setting_info() {
        this.sendNotification(net.HttpType.api_plat_var_swap_setting_info, { plat_id: core.plat_id });
    }

    /**Swap--Swap价格图*/
    api_plat_var_swap_k() {
        this.sendNotification(net.HttpType.api_plat_var_swap_k, {
            plat_id: core.plat_id,
            type: 1,
        });
    }

    /**获取平台最大挖矿效率*/
    api_plat_var_backwater_setting_info() {
        this.sendNotification(net.HttpType.api_plat_var_backwater_setting_info, {
            plat_id: core.plat_id,
        });
    }
    /**获取赛事信息 */
    api_vendor_96_products() {
        let market_type = "";
        if (window.$mobile) {
            market_type = "ASIAN_OVER_UNDER,ASIAN_HANDICAP";
        } else {
            market_type =
                "MATCH_ODDS,MATCH_ODDS_HALF_TIME,ASIAN_HANDICAP,ASIAN_HANDICAP_HALF_TIME,ASIAN_OVER_UNDER,ASIAN_OVER_UNDER_HALF_TIME";
        }

        if (window.$mobile && GameConfig.config.home_sport_option && GameConfig.config.home_sport_option.mobile) {
            this.sendNotification(net.HttpType.api_vendor_96_products, GameConfig.config.home_sport_option.mobile);
        } else if (GameConfig.config.home_sport_option && GameConfig.config.home_sport_option.pc) {
            this.sendNotification(net.HttpType.api_vendor_96_products, GameConfig.config.home_sport_option.pc);
        } else {
            this.sendNotification(net.HttpType.api_vendor_96_products, { market_type, page_size: 3 });
        }
    }
}
