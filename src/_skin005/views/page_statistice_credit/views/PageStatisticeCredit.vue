<template src="./PageStatisticeCredit.vue.html" lang="html"></template>
<style src="./PageStatisticeCredit.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageStatisticeCredit from "./PageStatisticeCredit";
//import Overlay from "@/views/widget/overlay/Overlay.vue";
import HomePage from "../widget/home_page/HomePage.vue";
import Agents from "../widget/agents/Agents.vue";
import Statistice from "../widget/statistice/Statistice.vue";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";

@Component({
    components: {
        // Overlay,
        HomePage,
        Agents,
        Statistice,
        CustomInput,
    },
})
export default class extends PageStatisticeCredit {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
