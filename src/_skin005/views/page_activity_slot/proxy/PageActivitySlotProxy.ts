import PanelUtil from "@/_skin005/core/PanelUtil";

export default class PageActivitySlotProxy extends puremvc.Proxy {
    static NAME = "PageActivitySlotProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
        /**彩球活动的详细数据 */
        ball_award_detail: <any>{
            prize_pool_amount: "0", //奖池金额
            lottery_award: <any>[],
            update_cycle_type: 0, //更新周期 1.每天 2，每周 3，每月
            current_cycle: 0, //当前周期
            current_ball_rank: <any>[], //当前球排名
            pre_ball_rank: <any>[], //上期球排名
            lottery_cons: <any>[], //抽奖消耗
            day_num_init_config: <any>[], //每日消耗
            cycle_end_time: 0, //结束时间
            pre_end_time: 0, //上一期结束时间
            coin_unique: "", // 奖池币种
            id: 0,
        },
        ball_info: <any>{
            award_record: <any>[], // 用户号码记录
            lottery_record: <any>[], // 抽奖记录
            lottery_code: "", // 抽奖号码
            lottery_location: 0, // 抽奖位置 底几轮
            lottery_total_num: 6, // 活动每期总抽奖次数
            surplus_lottery_num: 3, // 剩余抽奖次数
            user_lottery_num: 0, // 用户抽奖次数
            my_rank: -1, //我的排名
            user_init_num: -1, //用户已经重置的次数
        },
        /**抽奖的中奖信息 */
        award_data: <any>{
            award_index: -1, //奖品索引
            ball_code: -1, // 中奖号码
            award_status: 0,
            award: <any>{}, //奖励
        },
        dataSource: <any>{}, //原始数据,
    };

    is_ballinfo_return: Boolean = false; // 抽獎次數太頻繁 bug
    is_maindata_return: Boolean = false; // 抽獎次數太頻繁 bug

    get isCanClick() {
        return this.is_ballinfo_return && this.is_maindata_return;
    }
    refreshAllData() {
        const novigationProxy = PanelUtil.getProxy_novigation;
        if (novigationProxy.ballAwardId) {
            this.api_plat_activity_ball_info_var(novigationProxy.ballAwardId);
            this.api_plat_activity_var(novigationProxy.ballAwardId);
            // false 為還沒接收到資料
            this.is_ballinfo_return = false;
            this.is_maindata_return = false;
        }
    }
    setBallInfoData(data: any) {
        // this.pageData.ball_info = JSON.parse(JSON.stringify(data));
        Object.assign(this.pageData.ball_info, data);
        console.log("设置球的数据----", this.pageData.ball_info);
        // true 為接收到資料
        this.is_ballinfo_return = true;
    }
    /**设置彩球活动的详细数据 */
    setBallAwardDetail(data: any) {
        this.pageData.dataSource = JSON.parse(JSON.stringify(data));
        Object.assign(this.pageData.ball_award_detail, data);
        // true 為接收到資料
        this.is_maindata_return = true;
    }
    /**设置中奖信息 */
    setAwardData(data: any) {
        PanelUtil.showAppLoading(false);
        Object.assign(this.pageData.award_data, data);
        this.pageData.award_data.award = JSON.parse(JSON.stringify(data.award));
        console.log("--抽奖--", data);
    }
    /**重置中奖信息 */
    initAwardData() {
        console.log("chongzhi");
        Object.assign(this.pageData.award_data, {
            award_index: -1, //奖品索引
            ball_code: -1, // 中奖号码
            award_status: 0,
        });
    }
    api_plat_activity_ball_info_var(id: any) {
        if (!core.user_id) return;
        this.sendNotification(net.HttpType.api_plat_activity_ball_info_var, { id: id });
    }
    /**获取活动详情 */
    api_plat_activity_var(idx: any) {
        // PanelUtil.showAppLoading(true);
        this.sendNotification(net.HttpType.api_plat_activity_var, { id: idx });
    }
    /**抽奖 */
    api_plat_activity_ball_lottery_award_var(idx: any) {
        if (!core.user_id) return;
        PanelUtil.showAppLoading(true);
        const obj = {
            user_id: core.user_id,
            current_cycle: this.pageData.ball_award_detail.current_cycle,
            lottery_location: Number(this.pageData.ball_info.lottery_location) + 1,
            id: idx,
        };
        console.log("用户抽奖----");
        this.initAwardData();
        // PanelUtil.showAppLoading(true);
        this.sendNotification(net.HttpType.api_plat_activity_ball_lottery_award_var, obj);
    }

    api_plat_activity_ball_rewards_var_receive(idx: any, award_id: any) {
        if (!core.user_id) return;
        // 关闭 loading 动画
        // PanelUtil.showAppLoading(true);
        const obj = {
            user_id: core.user_id,
            award_id: award_id,
            id: idx,
        };

        this.sendNotification(net.HttpType.api_plat_activity_ball_rewards_var_receive, obj);
    }
    api_plat_activity_ball_lottery_init_var(idx: any) {
        if (!core.user_id) return;
        const obj = {
            user_id: core.user_id,
            current_cycle: this.pageData.ball_award_detail.current_cycle,
            id: idx,
        };
        PanelUtil.showAppLoading(true);
        this.sendNotification(net.HttpType.api_plat_activity_ball_lottery_init_var, obj);
    }
}
