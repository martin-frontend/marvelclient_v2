import { amountFormat, dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import Utils from "@/core/global/Utils";

import CopyUtil from "@/core/global/CopyUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import CoinTransformHelper from "@/_skin030/core/CoinTransformHelper";
import GameConfig from "@/core/config/GameConfig";
import ModulesHelper from "@/_skin030/core/ModulesHelper";
import Timezone from "@/core/Timezone";

export default class PageExtensionProxy extends puremvc.Proxy {
    static NAME = "PageExtensionProxy";
    LangUtil = LangUtil;

    public onRegister(): void {
        this.pageData.loading = true;
    }

    pageData = {
        loading: false,
        // 当前的主币 奖励币
        platCoins: <any>{
            mainCoin: {},
            rewardCoin: {},
        },
        /**我的推广 数据 */
        promotionData: <any>{
            commission_awaiting_num: {},
            commission_received_num: {},
            date: "",
            directly_users: 0,
            group_users: 0,
            invite_user_id: 0,
            is_agent_bonus: 0,
            is_promotion_statistics_display: 0,
            plat_id: 0,
            promotion_floor_unit: "",
            promotion_status: 1,
            promotion_tutorial_url: "",
            promotion_url: "",
            today_directly_users: 0,
            today_group_users: 0,
            user_id: 0,
            total_water: 0,
            commission_info: {},
            commission_num: 0,
            pretty_user_id: 0,
            directly_first_recharge_num: -1,
        },
        statistics_data: <any>{
            total_commission: {}, // 预计今日总佣金
            total_water_summary: 0, // 今日总业绩
            self_water_summary: 0, // 自营业绩
            group_water_summary: 0, // 今日团队业绩
            direct_water_summary: 0, // 今日直属业绩
        },
        link: "",
        btnBind: false,
        qrCode: "",
        /**表单 数据 */
        tableData: <any>{
            myCommissionNum: {
                0: {},
                2: {},
                4: {},
                8: {},
                16: {},
                32: {},
                64: {},
                128: {},
            },
            promotionConfig: {},
            defaultPromotionConfig: {},
            is_promotion_num_added: 0,
            type: 0,
        },
        firstChargeCount: -1,
    };

    async setLink(url: string) {
        this.pageData.link = url;
        const imgBase64 = await Utils.generateQrcode(url);
        this.pageData.qrCode = imgBase64;
    }

    clearData() {
        Object.assign(this.pageData.promotionData, {
            commission_awaiting_num: {},
            commission_received_num: {},
            date: "",
            directly_users: 0,
            group_users: 0,
            invite_user_id: 0,
            is_agent_bonus: 0,
            is_promotion_statistics_display: 0,
            plat_id: 0,
            promotion_floor_unit: "",
            promotion_status: 1,
            promotion_tutorial_url: "",
            promotion_url: "",
            today_directly_users: 0,
            today_group_users: 0,
            user_id: 0,
            total_water: 0,
            commission_info: {},
            commission_num: 0,
            pretty_user_id: 0,
            directly_first_recharge_num: -1,
        });

        Object.assign(this.pageData.statistics_data, {
            total_commission: {}, // 预计今日总佣金
            total_water_summary: 0, // 今日总业绩
            self_water_summary: 0, // 自营业绩
            group_water_summary: 0, // 今日团队业绩
            direct_water_summary: 0, // 今日直属业绩
        });
        Object.assign(this.pageData.tableData, {
            myCommissionNum: {
                0: {},
                2: {},
                4: {},
                8: {},
                16: {},
                32: {},
                64: {},
                128: {},
            },
            promotionConfig: {},
            defaultPromotionConfig: {},
            is_promotion_num_added: 0,
            type: 0,
        });
        this.pageData.firstChargeCount = -1;
    }
    _transformMoney(val: any, target_coin_name: string, src_coin_name: string, isFanyong: boolean = false) {
        return CoinTransformHelper.TransformMoney(val, 2, target_coin_name, src_coin_name, true, !isFanyong, false, false);
    }
    transformMoney(val: any) {
        return this._transformMoney(val, GameConfig.config.SettlementCurrency, "USDT");
    }

    setData(data: any) {
        Object.assign(this.pageData.statistics_data, data.statistics_data);
        Object.assign(this.pageData.promotionData, data);
        this.getCurrentCoin();
        this.pageData.btnBind = !data.invite_user_id;

        this.pageData.promotionData.commission_num = data.commission_info[2].commission_num[this.pageData.platCoins.mainCoin.name] || 0;

        if (!ModulesHelper.RebateDisplayType()) {
            const sss = parseFloat(this.pageData.promotionData.commission_num);
            this.pageData.promotionData.commission_num = this.transformMoney_commission(sss / 100) + this.LangUtil("%");
        } else {
            this.pageData.promotionData.commission_num = this.transformMoney_commission(this.pageData.promotionData.commission_num);
        }
    }
    transformMoney_commission(val: any) {
        const sss = val * CoinTransformHelper.GetMainCoinScale;
        return CoinTransformHelper.GetMainCoinSymbol + amountFormat(sss, true);
    }
    /** 写入 返佣等级 */
    setCommissionCommissionnum(body: any) {
        const data: any = JSON.parse(JSON.stringify(body));
        this.pageData.tableData.myCommissionNum = data.my_commission_num;
        this.pageData.tableData.is_promotion_num_added = data.is_promotion_num_added;
        this.pageData.tableData.promotionConfig = JSON.parse(JSON.stringify(data.promotion_config));
        this.pageData.tableData.defaultPromotionConfig = JSON.parse(JSON.stringify(data.promotion_config));
        this.pageData.tableData.type = data.type;
        Object.keys(data.promotion_config).forEach((key: any) => {
            this.pageData.tableData.promotionConfig[key].forEach((config: any, idx: any) => {
                config["level"] = idx + 1;
            });

            this.pageData.tableData.defaultPromotionConfig[key].forEach((config: any, idx: any, arr: any) => {
                config["level"] = idx + 1;
            });
        });
    }

    setPromotionConfig(data: any) {
        this.getCurrentCoin();
        this.pageData.tableData.promotionConfig = JSON.parse(JSON.stringify(data));
        this.pageData.tableData.defaultPromotionConfig = JSON.parse(JSON.stringify(data));

        Object.keys(data).forEach((key: any) => {
            this.pageData.tableData.promotionConfig[key].forEach((config: any, idx: any) => {
                config["level"] = idx + 1;
            });

            this.pageData.tableData.defaultPromotionConfig[key].forEach((config: any, idx: any, arr: any) => {
                config["level"] = idx + 1;
            });
        });
    }
    /**取目前的主币 奖励币 */
    getCurrentCoin() {
        const plat_coins = <any>GamePlatConfig.config.plat_coins;
        const coinsKey = Object.keys(plat_coins);
        coinsKey.forEach((key: any) => {
            if (plat_coins[key].type === 2) {
                this.pageData.platCoins.mainCoin = plat_coins[key];
                this.pageData.platCoins.mainCoin.name = key;
                // this.pageData.platCoins.mainCoin[key].name = key;
            }
            if (plat_coins[key].type === 3) {
                this.pageData.platCoins.rewardCoin = plat_coins[key];
                this.pageData.platCoins.rewardCoin.name = key;
                // this.pageData.platCoins.rewardCoin[key].name = key;
            }
        });
    }
    /**查询数据 */
    listQuery = {
        user_id: core.user_id,
        agent_user_id: core.user_id,
        from_date: dateFormat(getTodayOffset(-1), "yyyy-MM-dd"),
        to_date: dateFormat(getTodayOffset(-1), "yyyy-MM-dd"),
    };

    copy() {
        CopyUtil(this.pageData.link);
        PanelUtil.message_info(LangUtil("复制成功"));
    }

    copyId() {
        const { pretty_user_id, user_id } = this.pageData.promotionData;
        CopyUtil(pretty_user_id || user_id);
        PanelUtil.message_info(LangUtil("复制成功"));
    }

    /**领取佣金 */
    api_user_var_commission_receive() {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_var_commission_receive, {
                user_id: core.user_id,
            });
        }
    }

    /**业绩查询--按日期获取佣金详情*/
    api_user_var_commission_commissiondetail() {
        if (core.user_id) {
            const obj = <any>{
                user_id: core.user_id,
            };
            if (GameConfig.timezoneChange) {
                obj.start_date = Timezone.Instance.convertTime_to_Beijing(
                    core.dateFormat(core.getTodayOffset(), "yyyy-MM-dd") + ` 00:00:00`
                );
                obj.end_date = Timezone.Instance.convertTime_to_Beijing(
                    core.dateFormat(core.getTodayOffset(1, 1), "yyyy-MM-dd") + ` 23:59:59`
                );
            }
            this.sendNotification(net.HttpType.api_user_var_commission_commissiondetail, obj);
        }
    }

    /**业绩查询--返佣等级*/
    api_user_var_commission_commissionnum() {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_var_commission_commissionnum, { user_id: core.user_id });
        } else {
            this.sendNotification(net.HttpType.api_plat_var_promotion_config, { plat_id: core.plat_id }); /**没有登录时候 获取 返佣数据 */
        }
    }

    /**业绩查询--获取推广链接*/
    api_user_var_short_chain(force: number = 0) {
        if (core.user_id) {
            this.sendNotification(net.HttpType.api_user_var_short_chain, { user_id: core.user_id, host: location.origin, force });
        }
    }

    // api_plat_activity_var_rule_id_var() {
    //     let promotion_reward_model_id = {
    //         id: 0,
    //         rule_id: 0,
    //     };
    //     promotion_reward_model_id = GameConfig.config.promotion_reward_model_id;

    //     if (!promotion_reward_model_id || !promotion_reward_model_id.id || !promotion_reward_model_id.rule_id) {
    //         return;
    //     }
    //     this.sendNotification(net.HttpType.api_plat_activity_var_rule_id_var, promotion_reward_model_id);
    // }
}
