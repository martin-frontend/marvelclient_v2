<template src="./MobileMenu.vue.html" lang="html"></template>
<style src="./MobileMenu.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import MobileMenu from "./MobileMenu";
import UserPanel from "@/_skin100/views/header/widget/user_panel/UserPanel.vue";

@Component({
    components: {
        UserPanel,
    },
})
export default class extends MobileMenu {}
</script>
