<template src="./Advertise.vue.html" lang="html"></template>
<style src="./Advertise.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Advertise from "./Advertise";

@Component
export default class extends Advertise {
    mounted(){
        this.onChange();
    }
}
</script>
