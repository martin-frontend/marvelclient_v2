import LangUtil from "@/core/global/LangUtil";
import * as echarts from "echarts";
export default class PageSwapProxy extends puremvc.Proxy {
    static NAME = "PageSwapProxy";

    /**参数 */
    parameter: any = {
        from_coin: "",
        from_coin_number: 1,
        tolerance: 0,
        user_id: 0,
        plat_id: core.plat_id,
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
            tolerance_params: [], // 容差
        },
        trial: {
            to_coin_number: "", // 获取量
            price: "", // 兑换价格
            min_to_coin_number: "", // 最小获取量
            affect_price: "", // 影响价格
            swap_fee: "", // 手续费
        },
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
        changedFlag: false, // Chart互换
        price: "",
        chartTime: "",
        coin_a_b_price: [],
        coin_b_a_price: [],
        created_time: [],
        swap_price_log: <any>[],
        tradeFlag: 1, // 上下对调
        inputChangeFlag: false, // 判断是否有输入
        inputType: "", // 判断输入匡
    };

    /**曲线图数据 */
    chartData = {
        option: {
            tooltip: {
                trigger: "axis",
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: [],
                offset: 10,
            },
            yAxis: {
                show: false, // 隐藏y轴坐标
                type: "value",
            },
            series: [
                {
                    name: "Chart",
                    data: [],
                    type: "line",
                    areaStyle: {
                        opacity: 0.1,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [ //这里是渐变的角度，上下左右四个方向
                            {
                                offset: 0,
                                color: "rgb(205, 104, 104)"//这里是渐变色的起始颜色
                            },
                            {
                                offset: 1,
                                color: "#1a273f"// 这里是渐变色的结束颜色
                            }
                        ])
                    },
                    showSymbol: false,
                    // symbol: "none", // 去掉小圆点
                    lineStyle: {
                        color: "rgba(205, 104, 104, 0.9)", //red
                        width: 1,
                    }
                },
            ],
            grid: {
                x: 20, // 左侧距离
                y: 80, // 顶部距离
                x2: 20, //右侧距离
                y2: 35 //底部距离
            },
        },
    }

    //选择器
    listOptions = {
        timeOptions: () => {
            return {
                0: LangUtil("24小时"),
                1: LangUtil("一周"),
                2: LangUtil("一月"),
                3: LangUtil("一年"),
            }
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
        this.chartData.option.series[0].name = this.pageData.chart_a + "/" + this.pageData.chart_b;
        this.pageData.swap_setting_info.tolerance_params = data.tolerance_params;
    }

    /** 试算*/
    setTrial(data: any) {
        // 上下对调
        if (this.pageData.tradeFlag == 1) {
            this.pageData.trial.price = data.price;
            this.pageData.trial.min_to_coin_number = "0";
            this.pageData.trial.affect_price = "0";
            this.pageData.trial.swap_fee = "0";
            this.pageData.tradeFlag = 0;
            return;
        }

        Object.assign(this.pageData.trial, data);
        if (this.pageData.inputType == "A") {
            this.pageData.amount_b = data.to_coin_number;
        } else if (this.pageData.inputType == "B") {
            this.pageData.trial.price = (1 / data.price).toString();
            this.pageData.amount_a = data.to_coin_number;
        }
        else {
            this.pageData.amount_a = "";
            this.pageData.amount_b = "";
            this.pageData.trial.min_to_coin_number = "0";
            this.pageData.trial.affect_price = "0";
            this.pageData.trial.swap_fee = "0";
        }
    }

    /** 价格图*/
    setSwapK(data: any) {
        // to do 判断处理 changedFlag
        this.chartData.option.series[0].data = [];
        this.chartData.option.xAxis.data = [];
        Object.assign(this.pageData.swap_k, data);

        this.pageData.changed = this.pageData.swap_k.coin_a_b_changed;
        this.changeChartColor();

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

    setChart_k(index: any) {
        const length = this.pageData.swap_k.swap_price_log.length - 1;
        if (this.pageData.changedFlag == false) {
            //@ts-ignore
            this.pageData.price = this.pageData.swap_k.swap_price_log[length - index].coin_a_b_price;
        } else {
            //@ts-ignore
            this.pageData.price = this.pageData.swap_k.swap_price_log[length - index].coin_b_a_price;
        }
        //@ts-ignore
        this.pageData.chartTime = this.pageData.swap_k.swap_price_log[length - index].created_time;
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
        this.changeChartColor();
        this.chartData.option.series[0].name = this.pageData.chart_a + "/" + this.pageData.chart_b;
    }

    changeChartColor() {
        if (this.pageData.changed.substring(0, 1) == '-') {
            // red
            this.chartData.option.series[0].lineStyle.color = "rgba(205, 104, 104, 0.9)"
            this.chartData.option.series[0].areaStyle.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [ //这里是渐变的角度，上下左右四个方向
                {
                    offset: 0,
                    color: "rgb(205, 104, 104)"//这里是渐变色的起始颜色
                },
                {
                    offset: 1,
                    color: "#1a273f"// 这里是渐变色的结束颜色
                }
            ])
        } else {
            // green
            this.chartData.option.series[0].lineStyle.color = "rgba(104, 199, 205, 0.9)"
            this.chartData.option.series[0].areaStyle.color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [ //这里是渐变的角度，上下左右四个方向
                {
                    offset: 0,
                    color: "rgb(104, 199, 205)"//这里是渐变色的起始颜色
                },
                {
                    offset: 1,
                    color: "#1a273f"// 这里是渐变色的结束颜色
                }
            ])
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
    api_plat_var_swap_trial() {
        this.parameter.plat_id = core.plat_id;
        this.sendNotification(net.HttpType.api_plat_var_swap_trial, this.parameter);
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
