<template src="./DialogBetRecord.vue.html" lang="html"></template>
<style src="./DialogBetRecord.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogBetRecord from "./DialogBetRecord";
import CustomSelect from "@/_skin005/views/widget/custom_select/CustomSelect.vue";
import CustomDatePick from "@/_skin005/views/widget/custom_date_pick/CustomDatePick.vue";

@Component({
    components: {
        CustomSelect,
        CustomDatePick,
    },
})
export default class extends DialogBetRecord {}
</script>
