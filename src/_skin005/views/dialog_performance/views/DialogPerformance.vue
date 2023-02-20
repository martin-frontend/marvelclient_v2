<template src="./DialogPerformance.vue.html" lang="html"></template>
<style src="./DialogPerformance.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogPerformance from "./DialogPerformance";
import CustomSelect from "@/_skin005/views/widget/custom_select/CustomSelect.vue";

@Component({
    components: {
        CustomSelect,
    },
})
export default class extends DialogPerformance {}
</script>
