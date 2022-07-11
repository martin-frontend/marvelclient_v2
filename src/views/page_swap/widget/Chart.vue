<template>
    <div>
        <v-chart ref="chart" class="chart" :option="pageData.chartData.options" @highlight="onSelect" autoresize />
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component, Vue, Watch } from "vue-property-decorator";
import PageSwapProxy from "../proxy/PageSwapProxy";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent]);

@Component({
    components: {
        VChart,
    },
})
export default class DashboardDialog extends AbstractView {
    private myProxy: PageSwapProxy = this.getProxy(PageSwapProxy);
    pageData = this.myProxy.pageData;

    onSelect(val: any) {
        this.myProxy.setChart_k(val.batch[0].dataIndex);
    }

    @Watch("pageData.chartData.number")
    resizeTheChart() {
        let chartDome = this.$refs.chart;
        //@ts-ignore
        chartDome.clear();

        setTimeout(() => {
            //@ts-ignore
            chartDome.setOption(this.pageData.chartData.options);
            //@ts-ignore
            chartDome.resize();
        }, 200);
    }
}
</script>

<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 600px;
    @media (max-width: 600px) {
        height: 300px;
    }
}
</style>
