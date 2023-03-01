<template src="./Fanyong.vue.html" lang="html"></template>
<style src="./Fanyong.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Fanyong from "./Fanyong";
import MaskTool from "@/_skin005/views/widget/mask_tool/MaskTool.vue";

@Component({
    components: {
        MaskTool,
    },
})
export default class extends Fanyong {}
</script>
