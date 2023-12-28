<template>
    <v-sheet
        v-if="!myProxy.isminiMenu"
        @click="goCheckin()"
        color="transparent"
        width="100%"
        min-height="54px"
        class="d-flex justify-center align-center rounded10 mt-2 cursor-pointer"
        :style="`background-image: url(${checkinImg});
        background-position: center bottom 0px;
        background-size: contain;
        background-repeat: no-repeat;`"
    >
        <div class="font-weight-bold text-20">{{ LangUtil("每日签到") }}</div>
    </v-sheet>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import getProxy from "@/core/global/getProxy";
import NavigationProxy from "@/_skin030/views/navigation/NavigationProxy";

@Component
export default class DailyCheckin extends AbstractView {
    myProxy: NavigationProxy = getProxy(NavigationProxy);
    LangUtil = LangUtil;
    get checkinImg() {
        return require("@/_skin030/assets/pagehome/daily_checkin.png");
    }
    goCheckin() {
        this.$emit("goCheckin");
    }
}
</script>
