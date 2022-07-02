<template>
    <div>
        <div ref="chart" class="chart"></div>
    </div>
</template>

<script lang="ts">
// import CountTo from "vue-count-to";
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkUserName, checkUserPassword } from "@/core/global/Functions";
import GlobalVar from "@/core/global/GlobalVar";
import * as echarts from "echarts";

@Component
export default class DashboardDialog extends AbstractView {
    private option = {
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: "line",
                areaStyle: {},
            },
        ],
    };

    private echarts = echarts;

    // @Watch("myProxy.chartData.number")
    mounted() {
        this.onChartInit();
    }

    private onChartInit() {
        let chartDome = this.$refs.chart as HTMLElement;
        console.warn("echarts", this.echarts);
        let myChart = echarts.init(chartDome);
        myChart.clear();
        myChart.setOption(this.option);
        window.onresize = function () {
            myChart.resize();
        };
    }
}
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 300px;
}
</style>
