import LangConfig from "@/core/config/LangConfig";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import { CompetitionVO } from "@/_skin005/vo/CompetitionVO";
import Vue from "vue";
import GameConfig from "@/core/config/GameConfig";
import { getVersion } from "@/core/global/Functions";

export default class PageHomeProxy extends puremvc.Proxy {
    static NAME = "PageHomeProxy";

    public onRegister(): void {
        if (ModulesHelper.IsShow_FootBallHot()) {
            setInterval(() => {
                if (Vue.router.currentRoute.path == Vue.prePath || Vue.router.currentRoute.path == Vue.prePath + "/") {
                    this.api_vendor_var_products();
                }
            }, 5000);
            if (Vue.router.currentRoute.path == Vue.prePath || Vue.router.currentRoute.path == Vue.prePath + "/") {
                this.api_vendor_var_products();
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

    setStakeInfo(data: any) {
        Object.assign(this.pageData.stakeInfo, data);
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
    // api_vendor_96_products() {
    api_vendor_var_products() {
        let market_type = "";
        if (window.$mobile) {
            market_type = "ASIAN_OVER_UNDER,ASIAN_HANDICAP";
        } else {
            market_type =
                "MATCH_ODDS,MATCH_ODDS_HALF_TIME,ASIAN_HANDICAP,ASIAN_HANDICAP_HALF_TIME,ASIAN_OVER_UNDER,ASIAN_OVER_UNDER_HALF_TIME";
        }

        // if (window.$mobile && GameConfig.config.home_sport_option && GameConfig.config.home_sport_option.mobile) {
        //     this.sendNotification(net.HttpType.api_vendor_96_products, GameConfig.config.home_sport_option.mobile);
        // } else if (GameConfig.config.home_sport_option && GameConfig.config.home_sport_option.pc) {
        //     this.sendNotification(net.HttpType.api_vendor_96_products, GameConfig.config.home_sport_option.pc);
        // } else {
        //     this.sendNotification(net.HttpType.api_vendor_96_products, { market_type, page_size: 3 });
        // }

        let obj: any;
        if (window.$mobile && GameConfig.config.home_sport_option && GameConfig.config.home_sport_option.mobile) {
            obj = GameConfig.config.home_sport_option.mobile;
        } else if (GameConfig.config.home_sport_option && GameConfig.config.home_sport_option.pc) {
            obj = GameConfig.config.home_sport_option.pc;
        } else {
            obj = { market_type, page_size: 3 };
        }

        obj.vendor_id = GameConfig.config.SportVendorId;
        const url = net.getUrl(net.HttpType.api_vendor_var_products, obj);
        net.Http.request(obj, url).then((result: any) => {
            const { status, data } = result;
            if (status === 0) {
                if (Object.keys(data).length > 0) {
                    this.pageData.compData = data;
                }
            }
        });
    }
    /**获取平台配置信息 */
    api_plat_var_client_config() {
        this.sendNotification(net.HttpType.api_plat_var_client_config, { plat_id: core.plat_id });
    }

    checkClientVersion(data: any) {
        if (data && data.client_version && data.client_version.trim()) {
            const client_version = data.client_version;
            try {
                const timeData = new Date(client_version).getTime();
                const localTimeData = new Date(getVersion()).getTime();
                if (timeData > localTimeData) {
                    window.location.reload();
                }
            } catch {
                console.log("---转换失败----");
            }
        }
    }
}
