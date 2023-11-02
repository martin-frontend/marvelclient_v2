export default class DialogManuallyUnstakingProxy extends puremvc.Proxy {
    static NAME = "DialogManuallyUnstakingProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        amount: 0,
    };

    resetForm() {
        this.pageData.amount = 0;
    }

    /**--分红--用户手动解质押*/
    api_user_var_withdraw_stake() {
        this.sendNotification(net.HttpType.api_user_var_withdraw_stake, { amount: this.pageData.amount, user_id: core.user_id });
    }
}
