<template>
    <v-sheet color="transparent" width="366">
        <v-carousel height="auto" cycle hide-delimiter-background show-arrows-on-hover :show-arrows="false">
            <v-carousel-item v-for="item of advertiseData" :key="item.name">
                <v-img :src="item.img" width="366" :height="height"></v-img>
            </v-carousel-item>
        </v-carousel>
    </v-sheet>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import LoginProxy from "../../proxy/LoginProxy";
@Component
export default class Advertise extends AbstractView {
    @Prop({ default: 654 }) height!: number;
    private myProxy: LoginProxy = this.getProxy(LoginProxy);
    private advertiseData = this.myProxy.advertiseData;
}
</script>

<style lang="scss" scoped></style>
