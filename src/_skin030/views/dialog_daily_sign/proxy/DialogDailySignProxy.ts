import PanelUtil from "@/_skin030/core/PanelUtil";

export default class DialogDailySignProxy extends puremvc.Proxy {
    static NAME = "DialogDailySignProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
    };
    /**每日签到的总数据 */
    daily_data = <any>{
        rules: <any>[],
        today_sign: 0,
    };

    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        // Object.assign(this.pageData.listQuery, {
        //     page_count: 1,
        //     page_size: 20,
        // });
    }

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.daily_data, data);
        Object.assign(this.daily_data.rules, data.rules);
        console.log("对象为", this.daily_data.rules);
        // this.pageData.list = data.list;
    }
    /**--活动--每日签到*/
    api_user_var_sign_store() {
        if (!core.user_id) return;
        console.log(" 发送- 签到");
        this.sendNotification(net.HttpType.api_user_var_sign_store, { user_id: core.user_id });
    }

    /**--活动--获取用户签到信息*/
    //api_plat_sign_index: "api/plat/sign/index",
    api_plat_sign_index() {
        //console.log("签到信息");
        this.sendNotification(net.HttpType.api_plat_sign_index);
    }

    api_user_var_sign_store_callback(msg: any) {
        console.log("  领取签0到奖励---", msg);
        // msg = {
        //     complete: 1,
        //     receive: 1,
        //     list: [
        //         {
        //             params: {
        //                 USDT: 1,
        //             },
        //             params_name: "代币数量",
        //             award_type: 3,
        //             award_ids: [963],
        //         },
        //     ],
        // };
        PanelUtil.openpanel_award(msg.list[0].params);
    }
}
