<template>
    <v-menu offset-y nudge-bottom="30" attach="#gamelist" left>
        <template v-slot:activator="{ on, attrs }">
            <v-sheet class="rounded-pill d-flex align-center px-5 ml-5" color="colorSelectBg" height="48" width="340" v-bind="attrs" v-on="on">
                <div class="icon-box iconfont icon-Magnifier icon__icon text-20 icon-color"></div>
                <input class="ml-3" type="text" placeholder="搜索你喜欢的游戏" />
            </v-sheet>
        </template>
        <v-sheet color="#24314a" max-width="1424">
            xxxxx
        </v-sheet>
    </v-menu>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
@Component
export default class GameSearch extends AbstractView {}
</script>

<style lang="scss" scoped>
.icon-color {
    color: #9db1d8;
}
input::placeholder {
    color: #9db1d8;
    font-size: 14px;
    font-weight: 400;
}
input {
    vertical-align: middle;
    height: 54px;
    width: 100%;
    color: rgba(157, 177, 216, 0.7);
    font-weight: bold;
}
</style>
