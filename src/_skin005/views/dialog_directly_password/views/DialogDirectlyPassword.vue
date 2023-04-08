<template src="./DialogDirectlyPassword.vue.html" lang="html"></template>
<style src="./DialogDirectlyPassword.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogDirectlyPassword from "./DialogDirectlyPassword";
import CustomPassword from "@/_skin005/views/widget/custom_password_nomal/CustomPasswordNomal.vue";
@Component({
    components: {
        CustomPassword,
    },
})
export default class extends DialogDirectlyPassword {}
</script>
