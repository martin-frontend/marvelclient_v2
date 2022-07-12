import LangUtil from "@/core/global/LangUtil";
import { resetAutoDestroyState } from "@vue/test-utils";
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
        //基础信息
        swap_setting_info: {
            coin_a: "", // 币A
            coin_b: "", // 币B
            tolerance_params: [], // 容差
        },
        form: {
            type: 0, // 0:CF->USDT 1:USDT->CF
            inputType: 0, // 0:a->b 1:b->a
            tolerance: 0, //容差
            inputA: "",
            inputB: "",
            coinA: "",
            coinB: "",
            timestamp: 1,
            price: "",

            min_to_coin_number: "", // 最小获取量(用于显示可以兑换出的数量)
            affect_price: "", // 影响价格
            swap_fee: "", // 手续费
        },
        chartQuary: {
            type: 0,
        },
        chartData: {
            coinA: "",
            coinB: "",
            coin_a_b_changed: "", // 币种A兑币种B变化
            coin_b_a_changed: "", // 币种B兑币种A变化
            coin_a_b_price: "", // 币种A兑币种B最新价格
            coin_b_a_price: "", // 币种B兑币种A最新价格
            created_time: "", //当前时间
            formatData: <any>{},
            number: 0,
            options: {
                tooltip: {
                    trigger: "axis",
                },
                xAxis: {
                    boundaryGap: false,
                    data: [],
                },
                yAxis: {
                    show: false, // 隐藏y轴坐标
                    type: "value",
                    scale: true,
                },
                series: [
                    {
                        name: "Chart",
                        data: [],
                        type: "line",
                        areaStyle: {
                            opacity: 0.1,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                //这里是渐变的角度，上下左右四个方向
                                {
                                    offset: 0,
                                    color: "rgb(205, 104, 104)", //这里是渐变色的起始颜色
                                },
                                {
                                    offset: 1,
                                    color: "#1a273f", // 这里是渐变色的结束颜色
                                },
                            ]),
                        },
                        showSymbol: false,
                        // symbol: "none", // 去掉小圆点
                        lineStyle: {
                            color: "rgba(205, 104, 104, 0.9)", //red
                            width: 1,
                        },
                    },
                ],
                grid: {
                    x: 20, // 左侧距离
                    y: 80, // 顶部距离
                    x2: 20, //右侧距离
                    y2: 35, //底部距离
                },
            },
        },
    };

    //选择器
    listOptions = {
        timeOptions: () => {
            return {
                0: LangUtil("24小时"),
                1: LangUtil("一周"),
                2: LangUtil("一月"),
                3: LangUtil("一年"),
            };
        },
    };

    /** 基础信息*/
    setData(data: any) {
        Object.assign(this.pageData.swap_setting_info, data);
        const { form, chartData } = this.pageData;
        // form.tolerance = data.tolerance_params[0];
        form.coinA = data.coin_a;
        form.coinB = data.coin_b;
        form.type = 0;
        form.inputType = 0;
        form.inputA = form.inputB = "";

        chartData.options.series[0].name = form.coinA + "/" + form.coinB;
        chartData.coinA = data.coin_a;
        chartData.coinB = data.coin_b;
    }

    /** 试算*/
    setTrial(data: any) {
        const { form } = this.pageData;
        const { timestamp, inputType } = form;

        if (data.timestamp == timestamp) {
            //第一次试算不填值
            if (Number(timestamp) > 1) {
                if (inputType == 0) {
                    form.inputB = data.to_coin_number;
                } else {
                    form.inputA = data.to_coin_number;
                }
            }
            form.price = data.price;
            form.affect_price = data.affect_price;
            form.min_to_coin_number = data.min_to_coin_number;
            form.swap_fee = data.swap_fee;
        }
        this.pageData.form.timestamp++;
    }

    /** 价格图*/
    setSwapK(data: any) {
        const { chartData, chartQuary } = this.pageData;
        chartData.coin_a_b_changed = data.coin_a_b_changed;
        chartData.coin_a_b_price = data.coin_a_b_price;
        chartData.coin_b_a_changed = data.coin_b_a_changed;
        chartData.coin_b_a_price = data.coin_b_a_price;
        chartData.created_time = data.swap_price_log[0].created_time;

        const formatData: any = (chartData.formatData = this.getObject(data.swap_price_log.reverse()));
        const { coin_a_b_price, coin_b_a_price, created_time } = formatData;
        const created_time_format = created_time.map((item: string) => chartQuary.type == 0 ? item.substring(11, 16) : item.substring(5, 10));
        chartData.options.xAxis.data = created_time_format;
        chartData.options.series[0].data = chartData.coinA == data.coin_a ? coin_a_b_price : coin_b_a_price;
        this.changeChartColor();
        this.pageData.chartData.number++;
    }

    /**chart highlight事件 */
    setChart_k(index: any) {
        const { chartData } = this.pageData;
        chartData.created_time = chartData.formatData.created_time[index];
        chartData.coin_a_b_price = chartData.formatData.coin_a_b_price[index];
        chartData.coin_b_a_price = chartData.formatData.coin_b_a_price[index];
    }

    /**chart globalout事件 */
    setChart_init() {
        const { chartData } = this.pageData;
        const index = chartData.formatData.created_time.length - 1;
        chartData.created_time = chartData.formatData.created_time[index];
        chartData.coin_a_b_price = chartData.formatData.coin_a_b_price[index];
        chartData.coin_b_a_price = chartData.formatData.coin_b_a_price[index];
    }

    /** 交换互换*/
    tradeReverse() {
        const { swap_setting_info, form, chartData } = this.pageData;
        const { formatData } = chartData;
        form.type = form.type == 0 ? 1 : 0;
        if (form.type == 0) {
            form.coinA = swap_setting_info.coin_a;
            form.coinB = swap_setting_info.coin_b;
        } else {
            form.coinA = swap_setting_info.coin_b;
            form.coinB = swap_setting_info.coin_a;
        }
        if (form.inputB) {
            form.inputA = form.inputB;
            form.inputB = "";
        }
        form.inputType = 0;

        chartData.coinA = form.coinA;
        chartData.coinB = form.coinB;
        chartData.options.series[0].data =
            chartData.coinA == swap_setting_info.coin_a ? formatData.coin_a_b_price : formatData.coin_b_a_price;
        this.changeChartColor();
        this.pageData.chartData.number++;
    }

    /** Chart互换*/
    chartReverse() {
        const { chartData, swap_setting_info } = this.pageData;
        const { formatData } = chartData;
        const lin = chartData.coinA;
        chartData.coinA = chartData.coinB;
        chartData.coinB = lin;
        chartData.options.series[0].data =
            chartData.coinA == swap_setting_info.coin_a ? formatData.coin_a_b_price : formatData.coin_b_a_price;
        this.changeChartColor();
        this.pageData.chartData.number++;
    }
    /**确定图表的颜色 */
    changeChartColor() {
        const { chartData, swap_setting_info } = this.pageData;
        const coin_changed = chartData.coinA == swap_setting_info.coin_a ? chartData.coin_a_b_changed : chartData.coin_b_a_changed;
        let lineColor: any, areaColor: any;
        if (parseFloat(coin_changed) < 0) {
            lineColor = "rgba(205, 104, 104, 0.9)";
            areaColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //这里是渐变的角度，上下左右四个方向
                {
                    offset: 0,
                    color: "rgb(205, 104, 104)", //这里是渐变色的起始颜色
                },
                {
                    offset: 1,
                    color: "#1a273f", // 这里是渐变色的结束颜色
                },
            ]);
        } else {
            lineColor = "rgba(104, 199, 205, 0.9)";
            areaColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //这里是渐变的角度，上下左右四个方向
                {
                    offset: 0,
                    color: "rgb(104, 199, 205)", //这里是渐变色的起始颜色
                },
                {
                    offset: 1,
                    color: "#1a273f", // 这里是渐变色的结束颜色
                },
            ]);
        }

        chartData.options.series[0].lineStyle.color = lineColor;
        chartData.options.series[0].areaStyle.color = areaColor;
    }
    /**格式化图表数据 */
    getObject(array: any) {
        return array.reduce(function (r: { [x: string]: { [x: string]: any } }, o: { [x: string]: any }, i: string | number) {
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


        const { inputType, inputA, inputB, coinA, coinB, tolerance, timestamp } = this.pageData.form;
        let coin_number = "0";
        if (timestamp != 1) {
            if (inputType == 0) {
                coin_number = inputA
            } else {
                coin_number = inputB
            }
        } else {
            coin_number = "1";
        }
        const data = {
            plat_id: core.plat_id,
            from_coin: inputType == 0 ? coinA : coinB,
            from_coin_number: coin_number,
            tolerance,
            timestamp,
        };
        this.sendNotification(net.HttpType.api_plat_var_swap_trial, data);
    }

    /**Swap--Swap价格图*/
    api_plat_var_swap_k() {
        this.sendNotification(net.HttpType.api_plat_var_swap_k, {
            plat_id: core.plat_id,
            type: this.pageData.chartQuary.type + 1,
        });
    }

    /**Swap--Swap创建订单*/
    api_user_var_swap_create_order() {
        const { coinA, inputA, tolerance } = this.pageData.form;
        const data = {
            user_id: core.user_id,
            from_coin: coinA,
            from_coin_number: inputA,
            tolerance,
        };
        this.sendNotification(net.HttpType.api_user_var_swap_create_order, data);
    }
}
