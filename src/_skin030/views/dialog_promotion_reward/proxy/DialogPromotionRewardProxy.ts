import PanelUtil from "@/_skin030/core/PanelUtil";
export default class DialogPromotionRewardProxy extends puremvc.Proxy {
    static NAME = "DialogPromotionRewardProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        list: <any>{},
        promotion_reward_model_id: {
            id: 0,
            rule_id: 0,
        },
        myData: <any>[],
        firstChargeCount: 0,
        rule_nums: -1,
        rewards: <any>[],
    };

    setData(data: any) {
        this.pageData.loading = false;
        Object.assign(this.pageData.list, data);
        this.converList();
    }
    setFirstChargeCount(data: any) {
        this.pageData.loading = false;
        this.pageData.firstChargeCount = Number(Object.entries(data)[0][1]);
    }

    converList() {
        this.pageData.myData.length = 0;
        this.pageData.rule_nums = -1;
        this.pageData.rewards.length = 0;

        // @ts-ignore
        this.pageData.list.rules.forEach((item) => {
            this.pageData.myData.push({
                count: Number(item.list[0].list[0].params),
                coin_amount: item.list[0].list[1].coin_amount,
                coin_type: item.list[0].list[1].coin_type,
                receive: item.complete,
                match_info: item.match_info,
            });
            if (item.complete === 0 && item.match_info !== undefined) {
                // 可领取奖励的最後一筆rule_nums
                this.pageData.rule_nums = item.rule_num;
            }
        });
    }

    setReward(msg: any) {
        this.showAwardDialog(msg.list[0].params);
        this.api_plat_activity_var();
    }

    showAwardDialog(params: any) {
        PanelUtil.openpanel_award(params);
    }

    /**获取活动列表 */
    api_plat_activity_var() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_plat_activity_var, {
            user_id: core.user_id,
            id: this.pageData.promotion_reward_model_id.id,
        });
    }
    /**活动规则匹配详情 */
    api_plat_activity_var_rule_id_var() {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_plat_activity_var_rule_id_var, this.pageData.promotion_reward_model_id);
    }
    api_plat_activity_var_receive(rule_num: any) {
        const query = {
            id: this.pageData.promotion_reward_model_id.id,
            rule_num,
        };
        this.sendNotification(net.HttpType.api_plat_activity_var_receive, query);
    }
}
