<template src="./DialogAgentManager.vue.html" lang="html"></template>
<style src="./DialogAgentManager.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";

import DialogAgentManager from "./DialogAgentManager";
import CustomInput from "@/_skin005/views/widget/custom_input_nomal/CustomInputNomal.vue";

@Component({
    components: {
        CustomInput,
    },
})
export default class extends DialogAgentManager {}
</script>
