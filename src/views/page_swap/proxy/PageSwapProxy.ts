export default class PageSwapProxy extends puremvc.Proxy {
    static NAME = "PageSwapProxy";

    /**参数 */
    parameter: any = {
        from_coin: "",
        from_coin_number: 0,
        tolerance: 0,
        user_id: 0,
    };

    pageData = {
        loading: false,
        amount_a: "",
        amount_b: "",
        icon: "mdi-arrow-down",
        chart_a: "CF",
        chart_b: "USDT",
        swap_setting_info: {
            coin_a: "CF",            // 币A
            coin_b: "USDT",          // 币B
            tolerance_params: [      // 容差,乘100显示,传值还是传这里的值
                "",
                "",
                "",
                ""
            ]
        },
        trial: {
            to_coin_number: "",         // 获取量
            price: "",                  // 兑换价格
            min_to_coin_number: "",     // 最小获取量
            affect_price: "",           // 影响价格
            swap_fee: ""                // 手续费
        }
    };

    resetParameter() {
        Object.assign(this.parameter, {
            from_coin: "",
            from_coin_number: 0,
            tolerance: 0,
            user_id: 0,
        });
    }

    resetTrial() {
        Object.assign(this.pageData.trial, {
            to_coin_number: "0",
            price: "0",
            min_to_coin_number: "0",
            affect_price: "0",
            swap_fee: "0"
        });
    }

    setData(data: any) {
        Object.assign(this.pageData.swap_setting_info, data);
        this.pageData.chart_a = data.coin_a;
        this.pageData.chart_b = data.coin_b;
        this.pageData.swap_setting_info.tolerance_params = data.tolerance_params;
    }

    setTrial(data: any) {
        Object.assign(this.pageData.trial, data);
        if (this.pageData.amount_a == "" && this.pageData.amount_b == "") {
            return
        }
        if (this.pageData.amount_b == "") {
            this.pageData.amount_b = (Number(this.pageData.amount_a) * Number(this.pageData.trial.price)).toString()
        } else if (this.pageData.amount_a == "") {
            this.pageData.amount_a = (Number(this.pageData.amount_b) / Number(this.pageData.trial.price)).toString()
        }
    }

    setSwapK(data: any) {

    }

    /** 交换互换*/
    tradeReverse() {
        const target = this.pageData.swap_setting_info.coin_b;
        this.pageData.swap_setting_info.coin_b = this.pageData.swap_setting_info.coin_a;
        this.pageData.swap_setting_info.coin_a = target;
        if (this.pageData.swap_setting_info.coin_b != this.pageData.chart_b) {
            this.chartReverse();
        }
    }

    /** Chart互换*/
    chartReverse() {
        const target = this.pageData.chart_b;
        this.pageData.chart_b = this.pageData.chart_a;
        this.pageData.chart_a = target;
    }

    /**Swap--Swap基础信息*/
    api_plat_var_swap_setting_info() {
        this.sendNotification(net.HttpType.api_plat_var_swap_setting_info, { plat_id: core.plat_id });
    }

    /**Swap--Swap试算*/
    api_user_var_swap_trial() {
        this.parameter.user_id = core.user_id;
        this.sendNotification(net.HttpType.api_user_var_swap_trial, this.parameter);
    }

    /**Swap--Swap价格图*/
    api_plat_var_swap_k() {
        this.sendNotification(net.HttpType.api_plat_var_swap_k, { plat_id: core.plat_id });
    }

    /**Swap--Swap创建订单*/
    api_user_var_swap_create_order() {
        this.parameter.user_id = core.user_id;
        this.sendNotification(net.HttpType.api_user_var_swap_create_order, this.parameter);
    }
}
