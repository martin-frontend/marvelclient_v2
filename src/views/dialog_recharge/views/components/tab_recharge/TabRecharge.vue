<template src="./TabRecharge.vue.html" lang="html"></template>
<style src="./TabRecharge.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomSelect from "@/views/widget/custom_select/CustomSelect.vue";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import TabRecharge from "./TabRecharge";

@Component({
    components: {
        CustomSelect,
        Overlay,
    },
})
export default class extends TabRecharge {}
</script>
