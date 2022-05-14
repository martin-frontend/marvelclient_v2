<template src="./DialogRecordExchange.vue.html" lang="html"></template>
<style src="./DialogRecordExchange.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Overlay from "@/views/widget/overlay/Overlay.vue";
import Component from "vue-class-component";
import DialogRecordExchange from "./DialogRecordExchange";

@Component({
    components:{
        Overlay
    }
})
export default class extends DialogRecordExchange {}
</script>
