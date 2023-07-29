import CoinTransformHelper from "@/_skin005/core/CoinTransformHelper";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogActivity7daysProxy extends puremvc.Proxy {
    static NAME = "DialogActivity7daysProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        data: <core.ActivityDetailVO>{},
        rechargeActiveData: <any>[],
        are_you_eligible: true, //true 充值后可以领奖  false 充值后不能领奖，没资格

        rechargeItem: <any>{}, //将要充值的信息
    };

    /** 是否为充值活动奖励 */
    get isRechargeActivity() {
        if (this.pageData.data && this.pageData.data.active_model_tag && this.pageData.data.active_model_tag == "16") {
            return true;
        }
        return false;
    }

    testData() {
        for (let index = 0; index < 6; index++) {
            const obj = {
                award_id: 1851,
                reward_status: 1, // 奖励状态 1:不能领奖 2:可以领奖 3:已经领奖 4:已过期
                award_info: {
                    BRL: 358 + index * 20, //奖励信息
                },
                last_receive_time: 1689970591,
            };
            this.pageData.rechargeActiveData.push(obj);
        }
        this.pageData.rechargeActiveData[0].reward_status = 4;
        this.pageData.rechargeActiveData[1].reward_status = 4;
        this.pageData.rechargeActiveData[2].reward_status = 3;
        this.pageData.rechargeActiveData[3].reward_status = 1;
        this.pageData.rechargeActiveData[4].reward_status = 1;
    }
    resetRechargeActivityData() {
        this.pageData.rechargeActiveData = <any>[];
    }

    setFirstChargeCount(data: any) {
        PanelUtil.showAppLoading(false);
        // this.pageData.firstChargeCount = Number(Object.entries(data)[0][1]);
    }
    setRechargeActiveData(data: any) {
        this.pageData.are_you_eligible = data.are_you_eligible;
        this.pageData.rechargeActiveData = JSON.parse(JSON.stringify(data.awards_list));
        // this.testData();
    }
    /**充值奖励 活动 的详情 */
    api_plat_activity_daily_rewards_var() {
        PanelUtil.showAppLoading(true);
        this.sendNotification(net.HttpType.api_plat_activity_daily_rewards_var, { id: this.pageData.data.id });
    }

    //奖励领取
    api_plat_activity_daily_rewards_var_receive(award_id: any) {
        if (!award_id) return;

        PanelUtil.showAppLoading(true);
        this.sendNotification(net.HttpType.api_plat_activity_daily_rewards_var_receive, { id: this.pageData.data.id, award_id: award_id });
    }
    receive_callback(msg: any) {
        // const obj = {
        //     award_info: {
        //         BRL: 50.125313283000004,
        //     },
        //     award_status: 21,
        // };
        // console.log("领取奖励的返回");
        // PanelUtil.openpanel_award(obj.award_info);
        PanelUtil.openpanel_award(msg.award_info);
        this.api_plat_activity_daily_rewards_var();
    }

    onRecharge(data: any) {
        PanelUtil.showAppLoading(false);
        const recharge_proxy = PanelUtil.getProxy_recharge.rechargeProxy;
        recharge_proxy.setData(data,this.pageData.rechargeItem.coin_name_unique);
        // recharge_proxy.pageData.form.coin_name_unique = this.pageData.rechargeItem.coin_name_unique;
        const res = CoinTransformHelper.TransformMoney(this.pageData.rechargeItem.params, 2, this.pageData.rechargeItem.coin_name_unique, "USDT", false, false, false, false);
        recharge_proxy.pageData.form.amount = res;
        recharge_proxy.api_user_var_recharge_create();
    }
    onCreateOrder(data: any) {
        PanelUtil.showAppLoading(false);
        PanelUtil.getProxy_page_recharge.onCreateOrder(data);
    }
}
