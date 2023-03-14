<template src="./Advertise.vue.html" lang="html"></template>
<style src="./Advertise.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Advertise from "./Advertise";
import Money from "../money/Money.vue";

@Component({
    components: {
        Money,
    },
})
export default class extends Advertise {
    mounted() {
        this.onChange();
        // this.onTimeChange();
        console.log("this.pageData.swap_k", this.pageData.swap_k);
    }
}
</script>
