export default class PageSwapProxy extends puremvc.Proxy {
    static NAME = "PageSwapProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
        cf: "",
        usdt: "",
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

    setData(data: any) {
        Object.assign(this.pageData.swap_setting_info, data);
        this.pageData.chart_a = data.coin_a;
        this.pageData.chart_b = data.coin_b;
        this.pageData.swap_setting_info.tolerance_params = data.tolerance_params;
        console.log(this.pageData.swap_setting_info);
    }

    setTrial(data: any) {
        Object.assign(this.pageData.trial, data);
        console.log(this.pageData.trial);
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
        this.sendNotification(net.HttpType.api_user_var_swap_trial, { user_id: core.user_id, });
    }
}
