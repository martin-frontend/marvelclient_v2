<template>
    <div>
        <!-- <v-chart ref="chart" class="chart" :option="chartOptions" @highlight="onSelect"></v-chart> -->
        <v-chart ref="chart" class="chart" :option="myProxy.chart_option" @highlight="onSelect"></v-chart>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue, Watch } from "vue-property-decorator";
// import PageSwapProxy from "@/_skin005/views/page_swap/proxy/PageSwapProxy";
import PagePromotionStatisticsProxy from "../../proxy/PagePromotionStatisticsProxy";

import { BarChart, LineChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, TransformComponent } from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { use } from "echarts/core";
import VChart, { THEME_KEY } from "vue-echarts";
import * as echarts from "echarts/core";
use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    BarChart,
    LineChart,
    LabelLayout,
    UniversalTransition,

    CanvasRenderer,
    LegendComponent,
]);
@Component({
    components: {
        VChart,
    },
})
export default class DashboardDialog extends AbstractView {
    myProxy: PagePromotionStatisticsProxy = this.getProxy(PagePromotionStatisticsProxy);
    mounted() {
        let chartDome = this.$refs.chart;
        //@ts-ignore
        chartDome.chart.on("globalout", () => {
            // this.myProxy.setChart_init();
            console.log("-globalout---");
        });
        this.$nextTick(() => {
            const chartDome = this.$refs.chart;
            if (chartDome) {
                //@ts-ignore
                chartDome.setOption(this.myProxy.chart_option);
            }
        });
    }
    @Watch("$vuetify.breakpoint.width")
    onWatchScreen() {
        const chartDome = this.$refs.chart;
        if (chartDome) {
            //@ts-ignore
            chartDome.resize();
        }
    }
    @Watch("$vuetify.theme.dark")
    onChangeTheme() {
        this.$nextTick(() => {
            console.log("--切换颜色···");
            this.myProxy.setTableColor();
            const chartDome = this.$refs.chart;
            if (chartDome) {
                //@ts-ignore
                chartDome.setOption(this.myProxy.chart_option);
            }
        });
    }
    onSelect(val: any) {
        // this.myProxy.setChart_k(val.batch[0].dataIndex);
        console.log("---->>>");
    }

    // @Watch("pageData.chartData.number")
    // resizeTheChart() {
    //     let chartDome = this.$refs.chart;
    //     //@ts-ignore
    //     chartDome.clear();

    //     setTimeout(() => {
    //         //@ts-ignore
    //         chartDome.setOption(this.pageData.chartData.options);
    //         //@ts-ignore
    //         chartDome.resize();
    //     }, 200);
    // }
    chartOptions = {
        legend: {
            // Try 'horizontal'
            // orient: "vertical",
            orient: "vertical",
            left: "left",
            bottom: 20,
            icon: "rect",
            textStyle: {
                color: "#ccc",
            },
            itemWidth: 10,
        },
        grid: {
            left: 60,
            top: 20,
            right: 10,
            bottom: 0,
            containLabel: true,
            heigth: "auto",
            width: "90%",
        },
        dataset: {
            source: [
                ["product", "今天", "昨日"],
                ["Matcha Latte", 43.3, 85.8],
                ["Milk Tea", 83.1, 73.4],
                ["Cheese Cocoa", 86.4, 65.2],
                ["Walnut Brownie", 72.4, 53.9],
            ],
        },
        xAxis: {
            type: "category",
            axisTick: {
                show: false,
            },
        },
        yAxis: {
            axisLine: {
                show: true,
            },
            axisTick:{
                show: false,
            },
            position: "left",
            splitLine: {
                show: false,
            },
            axisLabel:{
                show:false,
            }
        },
        series: [
            {
                type: "bar",
                barWidth: "15%",
                itemStyle: {
                    barBorderRadius: 5,
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                        //这里是渐变的角度，上下左右四个方向
                        {
                            offset: 0,
                            color: "#249cd1", // 这里是渐变色的结束颜色
                        },
                        {
                            offset: 1,
                            color: "rgba(150, 197, 218,0.25)", //这里是渐变色的起始颜色
                        },
                    ]),
                },
                label: {
                    show: true,
                    position: "top",
                    valueAnimation: true,
                },
            },
            {
                type: "bar",
                barWidth: "15%",
                itemStyle: {
                    barBorderRadius: 5,
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                        //这里是渐变的角度，上下左右四个方向
                        {
                            offset: 0,
                            color: "#e7ab48", // 这里是渐变色的结束颜色
                        },
                        {
                            offset: 1,
                            color: "rgba(218, 193, 150,0.25)", //这里是渐变色的起始颜色
                        },
                    ]),
                },
            },
        ],
    };
}
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 200px;
}
</style>
