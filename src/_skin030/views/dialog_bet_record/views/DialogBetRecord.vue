<template src="./DialogBetRecord.vue.html" lang="html"></template>
<style src="./DialogBetRecord.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogBetRecord from "./DialogBetRecord";
import CustomSelect from "@/_skin030/views/widget/custom_select/CustomSelect.vue";
import CustomDatePick from "@/_skin030/views/widget/custom_date_pick/CustomDatePick.vue";
import CustomMobileDatePicker from "@/_skin030/views/widget/custom_mobile_date_picker/CustomMobileDatePicker.vue";

@Component({
    components: {
        CustomSelect,
        CustomDatePick,
        CustomMobileDatePicker,
    },
})
export default class extends DialogBetRecord {}
</script>
