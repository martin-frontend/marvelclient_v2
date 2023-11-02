<template src="./Statistice.vue.html" lang="html"></template>
<style src="./Statistice.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Statistice from "./Statistice";
import CustomMobileDatePicker from "@/_skin030/views/widget/custom_mobile_date_picker/CustomMobileDatePicker.vue";

@Component({
    components: {
        CustomMobileDatePicker,
    },
})
export default class extends Statistice {}
</script>
