<template src="./Header.vue.html" lang="html"></template>
<style src="./Header.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Header from "@/_skin001/views/header/views/Header";
import Wallet from "@/_skin001/views/header/widget/wallet/Wallet.vue";
import User from "@/_skin002/views/header/widget/user/User.vue";
import CustomSelect from "@/views/widget/custom_select/CustomSelect.vue";

@Component({
    components: {
        CustomSelect,
        Wallet,
        User,
    },
})
export default class extends Header {}
</script>
