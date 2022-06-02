export default class DialogManuallyUnstakingProxy extends puremvc.Proxy {
    static NAME = "DialogManuallyUnstakingProxy";

    pageData = {
        loading: false,
        bShow: false,
        amount: 0,
    };

    resetForm() {
        this.pageData.amount = 0;
    }

    /**--分红--用户质押*/
    api_user_var_withdraw_stake() {
        this.sendNotification(net.HttpType.api_user_var_withdraw_stake, { amount: this.pageData.amount });
    }
}
