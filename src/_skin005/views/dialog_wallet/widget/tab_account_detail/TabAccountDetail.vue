<template src="./TabAccountDetail.vue.html" lang="html"></template>
<style src="./TabAccountDetail.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import CustomSelect from "@/_skin005/views/widget/custom_select/CustomSelect.vue";
import Component from "vue-class-component";
import TabAccountDetail from "./TabAccountDetail";


@Component({
    components: {
        CustomSelect,
    },
})
export default class extends TabAccountDetail {}
</script>
