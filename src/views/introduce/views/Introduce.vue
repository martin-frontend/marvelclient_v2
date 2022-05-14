<template>
    <v-container class="pa-0">
        <Infomation/>
        <ChartWrap/>
    </v-container>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
import ChartWrap from "./components/ChartWrap.vue";
import Infomation from "./components/Infomation.vue";
@Component({
    components: {
        Infomation,
        ChartWrap,
    }
})
export default class Introduce extends AbstractView {}
</script>

<style lang="scss" scoped>
@import "@/style/fontsize.scss";
</style>
