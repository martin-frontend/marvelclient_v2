export default class DialogCoinExchangeProxy extends puremvc.Proxy {
    static NAME = "DialogCoinExchangeProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        form: {
            from_coin_name_unique: "",
            to_coin_name_unique: "",
            amount: 0,
            timestamp: 0,
            API_USER_ID: 0,
        },
        exchangeData: {
            from_coin_name_unique_amount: "0", //待转换货币数量
            to_coin_name_unique_amount: "0", //可以转换到的货币数量
            scale: 0, //汇率 ("1:"6.40)
        },
    };
    //如果是列表，使用以下数据，否则删除
    resetForm() {
        Object.assign(this.pageData.form, {
            from_coin_name_unique: "",
            to_coin_name_unique: "",
            amount: 0,
            timestamp: 0,
        });
    }

    set_user_coin_exchange_scale_var(data: any) {
        if (data.timestamp == this.pageData.form.timestamp) {
            Object.assign(this.pageData.exchangeData, data);
        }
    }

    api_user_coin_exchange_scale_var() {
        this.pageData.form.timestamp++;
        this.pageData.form.API_USER_ID = core.user_id;
        const copyForm: any = JSON.parse(JSON.stringify(this.pageData.form));
        if (copyForm.amount == 0) copyForm.amount = 1;
        this.sendNotification(net.HttpType.api_user_coin_exchange_scale_var, copyForm);
    }

    api_user_coin_exchange_var() {
        if (this.pageData.form.amount > 0) {
            this.pageData.loading = true;
            this.pageData.form.API_USER_ID = core.user_id;
            this.sendNotification(net.HttpType.api_user_coin_exchange_var, this.pageData.form);
        }
    }
}
