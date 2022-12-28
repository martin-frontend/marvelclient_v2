<template src="./Header.vue.html" lang="html"></template>
<style src="./Header.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Header from "./Header";
import Wallet from "../widget/wallet/Wallet.vue";
import User from "../widget/user/User.vue";
import CustomSelect from "@/views/widget/custom_select/CustomSelect.vue";
import GameMenu from "../widget/game_menu/GameMenu.vue";

@Component({
    components: {
        CustomSelect,
        Wallet,
        User,
        GameMenu,
    },
})
export default class extends Header {}
</script>
