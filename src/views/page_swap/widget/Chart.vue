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
import PageSwapProxy from "../proxy/PageSwapProxy";

@Component
export default class DashboardDialog extends AbstractView {
    private myProxy: PageSwapProxy = this.getProxy(PageSwapProxy);
    private echarts = echarts;

    @Watch("myProxy.pageData.swap_k.number")
    private onChartInit() {
        let chartDome = this.$refs.chart as HTMLElement;
        console.warn("echarts", this.echarts);
        let myChart = echarts.init(chartDome);
        myChart.clear();
        myChart.setOption(this.myProxy.chartData.option);
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
