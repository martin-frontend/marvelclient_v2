import PanelUtil from "@/_skin005/core/PanelUtil";
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
        rule_nums: <any>[],
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
        this.pageData.rule_nums.length = 0;
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
            if (item.complete == 0 && item.match_info != undefined) {
                this.pageData.rule_nums.push(item.rule_num);
            }
        });
    }

    setReward(msg: any) {
        const key = Object.keys(msg.list[0].params)[0];
        this.pageData.rewards.push(msg.list[0].params[key]);
        if (this.pageData.rule_nums.length == 0) {
            let nums = 0;
            // @ts-ignore
            this.pageData.rewards.map((num) => {
                nums += num;
            });
            this.showAwardDialog({ [key]: nums });
            this.api_plat_activity_var();
        }
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
