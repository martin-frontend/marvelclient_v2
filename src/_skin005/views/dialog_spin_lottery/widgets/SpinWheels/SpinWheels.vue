<template src="./SpinWheels.vue.html" lang="html"></template>
<style src="./SpinWheels.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import SpinWheels from "./SpinWheels";
import PointedSector from "../PointedSector/PointedSector.vue"

@Component({
    components: {
        PointedSector
    }
})
export default class extends SpinWheels {}
</script>