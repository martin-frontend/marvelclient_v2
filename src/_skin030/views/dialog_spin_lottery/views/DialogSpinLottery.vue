<template src="./DialogSpinLottery.vue.html" lang="html"></template>
<style src="./DialogSpinLottery.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogSpinLottery from "./DialogSpinLottery";
import DeductionLevels from "../widgets/DeductionLevels/DeductionLevels.vue";
import SpinWheels from "../widgets/SpinWheels/SpinWheels.vue";

@Component({
    components: {
        DeductionLevels,
        SpinWheels,
    },
})
export default class extends DialogSpinLottery {}
</script>
