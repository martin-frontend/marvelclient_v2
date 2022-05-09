<template>
    <v-sheet class="rounded-lg mt-3 pa-0 box" :max-height="bShow ? '1000' : '38'" color="#24314A">
        <div class="d-flex align-center ml-2 item-group-title" @click="bShow = !bShow">
            <v-img v-if="icon" :src="icon" max-width="15" max-height="15"></v-img>
            <div class="ml-2">{{ title }}</div>
            <v-spacer />
            <div class="icon-box iconfont mx-4 mr-5 text-14" :class="bShow ? 'arrow-show' : 'arrow'"></div>
        </div>
        <div v-if="$slots.default">
            <slot></slot>
        </div>
    </v-sheet>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
@Component
export default class MenuGroup extends AbstractView {
    @Prop() icon!: string;
    @Prop() title!: string;
    bShow = false;
}
</script>

<style lang="scss" scoped>
@import "@/style/params.scss";
.item-group-title {
    cursor: pointer;
    height: 38px;
    width: 100%;
    color: $colorBlue;
}
.box {
    overflow: hidden;
    transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
.arrow {
    transform: rotate(0deg);
    font-weight: 600;
    transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
.arrow-show {
    transform: rotate(180deg);
    font-weight: 600;
    transition: all 280ms cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
