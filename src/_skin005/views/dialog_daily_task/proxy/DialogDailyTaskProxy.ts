import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogDailyTaskProxy extends puremvc.Proxy {
    static NAME = "DialogDailyTaskProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
    };
    dailyTaskData = <any>{
        unread_num: 0, //用户未领取的数量
        list: <any>[],
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {}
    //设置数据
    setData(data: any) {
        PanelUtil.showAppLoading(false);
        Object.assign(this.dailyTaskData, data);
        this.dailyTaskData.list = [...data.list];
    }
    setReward(data: any) {
        PanelUtil.showAppLoading(false);
        PanelUtil.openpanel_award(data.list[0].params);
        this.api_plat_activity_index_everyday();
    }
    api_plat_activity_index_everyday() {
        PanelUtil.showAppLoading(true);
        this.sendNotification(net.HttpType.api_plat_activity_index_everyday, { user_id: core.user_id, is_show: 1 });
    }
    api_plat_activity_var_receive(rule_num: any) {
        PanelUtil.showAppLoading(true);
        const obj = {
            id: this.dailyTaskData.list[0].id,
            rule_num,
        };
        this.sendNotification(net.HttpType.api_plat_activity_var_receive, obj);
    }
    /**分享页面 */
    api_user_var_jump_store(type: any) {
        if (!core.user_id) return;
        //跳转类型 1:邀请分享页 2:TG群
        const obj = {
            user_id: core.user_id,
            type: type,
        };
        this.sendNotification(net.HttpType.api_user_var_jump_store, obj);
    }
    /**每日签到 */
    api_user_var_sign_store() {
        if (!core.user_id) return;
        PanelUtil.showAppLoading(true);
        this.sendNotification(net.HttpType.api_user_var_sign_store, { user_id: core.user_id, is_sign: true });
    }
}
