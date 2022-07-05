export default class PageSwapProxy extends puremvc.Proxy {
    static NAME = "PageSwapProxy";

    /**参数 */
    parameter: any = {
        from_coin: "",
        from_coin_number: 1,
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
            coin_a: "CF", // 币A
            coin_b: "USDT", // 币B
            tolerance_params: [], // 容差,乘100显示,传值还是传这里的值
        },
        trial: {
            to_coin_number: "", // 获取量
            price: "", // 兑换价格
            min_to_coin_number: "", // 最小获取量
            affect_price: "", // 影响价格
            swap_fee: "", // 手续费
        },
        inputFlag: "",
        timeSelect: 0,
        swap_k: {
            coin_a: "",
            coin_a_b_changed: "", // 币A兑币B增幅价格
            coin_b: "",
            coin_b_a_changed: "", // 币B兑币A增幅价格
            swap_price_log: [],
            number: 0,
        },
        changed: "",
        changedFlag: false,
        price: "",
        chartTime: "",
        coin_a_b_price: [],
        coin_b_a_price: [],
        created_time: [],
        swap_price_log: <any>[],
        tradeFlag: 1,
    };

    /**曲线图数据 */
    chartData = {
        option: {
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: [],
            },
            yAxis: {
                type: "value",
            },
            series: [
                {
                    data: [],
                    type: "line",
                    areaStyle: {},
                },
            ],
        },
    }

    resetParameter() {
        Object.assign(this.parameter, {
            from_coin: "",
            from_coin_number: 0,
            tolerance: 0,
            user_id: 0,
        });
    }

    resetTrial() {
        this.pageData.amount_a = "";
        this.pageData.amount_b = "";
        Object.assign(this.pageData.trial, {
            to_coin_number: "0",
            price: "0",
            min_to_coin_number: "0",
            affect_price: "0",
            swap_fee: "0",
        });
    }

    /** 基础信息*/
    setData(data: any) {
        Object.assign(this.pageData.swap_setting_info, data);
        this.pageData.chart_a = data.coin_a;
        this.pageData.chart_b = data.coin_b;
        this.pageData.swap_setting_info.tolerance_params = data.tolerance_params;
    }

    /** 试算*/
    setTrial(data: any) {
        console.log(this.pageData.tradeFlag);
        if (this.pageData.tradeFlag == 1) {
            this.pageData.trial.price = data.price;
            this.pageData.trial.min_to_coin_number = "0";
            this.pageData.trial.affect_price = "0";
            this.pageData.trial.swap_fee = "0";
            this.pageData.tradeFlag = 0;
            return;
        }

        Object.assign(this.pageData.trial, data);
        if (this.pageData.inputFlag == "") {
            return;
        }
        if (this.pageData.inputFlag == "A") {
            this.pageData.amount_b = (Number(this.pageData.amount_a) * Number(this.pageData.trial.price)).toString();
        } else if (this.pageData.inputFlag == "B") {
            this.pageData.amount_a = (Number(this.pageData.amount_b) * Number(this.pageData.trial.price)).toString();
        }
    }

    /** 价格图*/
    setSwapK(data: any) {
        this.chartData.option.series[0].data = [];
        this.chartData.option.xAxis.data = [];
        Object.assign(this.pageData.swap_k, data);

        this.pageData.changed = this.pageData.swap_k.coin_a_b_changed;
        //@ts-ignore
        this.pageData.price = this.pageData.swap_k.swap_price_log[0].coin_a_b_price;
        //@ts-ignore
        this.pageData.chartTime = this.pageData.swap_k.swap_price_log[0].created_time;

        this.pageData.swap_price_log = this.getObject(data.swap_price_log);
        this.pageData.swap_price_log.coin_a_b_price = this.pageData.swap_price_log.coin_a_b_price.reverse();
        this.pageData.swap_price_log.coin_b_a_price = this.pageData.swap_price_log.coin_b_a_price.reverse();
        this.pageData.swap_price_log.created_time = this.pageData.swap_price_log.created_time.reverse();
        const swap_price_log = this.pageData.swap_price_log;
        if (this.pageData.timeSelect == 0) {
            for (let i = 0; i < swap_price_log.created_time.length; i++) {
                swap_price_log.created_time[i] = (swap_price_log.created_time[i].split(" ")[1]).substr(0, 5);
            }
        } else {
            for (let i = 0; i < swap_price_log.created_time.length; i++) {
                swap_price_log.created_time[i] = (swap_price_log.created_time[i].split(" ")[0]).substr(5);
            }
        }
        Object.assign(this.chartData.option.series[0].data, swap_price_log.coin_a_b_price);
        Object.assign(this.chartData.option.xAxis.data, swap_price_log.created_time); //时间轴
        this.pageData.swap_k.number++;
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
        this.pageData.changedFlag = !this.pageData.changedFlag;
        this.chartData.option.series[0].data = [];
        if (this.pageData.changedFlag) {
            this.pageData.changed = this.pageData.swap_k.coin_b_a_changed;
            //@ts-ignore
            this.pageData.price = this.pageData.swap_k.swap_price_log[0].coin_b_a_price;
            Object.assign(this.chartData.option.series[0].data, this.pageData.swap_price_log.coin_b_a_price);
            this.pageData.swap_k.number++;
        } else {
            this.pageData.changed = this.pageData.swap_k.coin_a_b_changed;
            //@ts-ignore
            this.pageData.price = this.pageData.swap_k.swap_price_log[0].coin_a_b_price;
            Object.assign(this.chartData.option.series[0].data, this.pageData.swap_price_log.coin_a_b_price);
            this.pageData.swap_k.number++;
        }
    }

    getObject(array: any) {
        return array.reduce(function (r: { [x: string]: { [x: string]: any; }; }, o: { [x: string]: any; }, i: string | number) {
            Object.keys(o).forEach(function (k) {
                r[k] = r[k] || [];
                r[k][i] = o[k];
            });
            return r;
        }, {});
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
        this.sendNotification(net.HttpType.api_plat_var_swap_k, {
            plat_id: core.plat_id,
            type: this.pageData.timeSelect,
        });
    }

    /**Swap--Swap创建订单*/
    api_user_var_swap_create_order() {
        this.parameter.user_id = core.user_id;
        this.sendNotification(net.HttpType.api_user_var_swap_create_order, this.parameter);
    }
}
