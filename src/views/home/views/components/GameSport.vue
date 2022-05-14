<template>
    <div class="mt-8">
        <div class="text-16 mb-1 ml-2 mr-4 d-flex">
            <div class="icon-box iconfont icon-slots icon__icon colorYellow--text text-22 mr-1"></div>
            <div class="text-title">{{ title }}</div>
        </div>
        <v-sheet max-width="1430" class="mx-auto d-flex" color="transparent">
            <v-card width="704" height="270" class="rounded-lg mr-4">
                <v-img class="cursor-pointer" src="@/assets/sport/saba.webp"> </v-img>
            </v-card>
            <v-card width="704" height="270" class="rounded-lg mr-4">
                <v-img class="cursor-pointer" src="@/assets/sport/fb.webp"> </v-img>
            </v-card>
        </v-sheet>
    </div>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component
export default class GameSport extends AbstractView {
    @Prop(String) title!: string;
}
</script>

<style lang="scss" scoped>
@import "@/style/fontsize.scss";
</style>
