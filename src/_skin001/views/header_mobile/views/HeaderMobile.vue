<template src="./HeaderMobile.vue.html" lang="html"></template>
<style src="./HeaderMobile.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import HeaderMobile from "./HeaderMobile";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import CustomSelect from "@/views/widget/custom_select/CustomSelect.vue";
import User from "../../header/widget/user/User.vue";
import Wallet from "../../header/widget/wallet/Wallet.vue";

@Component({
    components: {
        Overlay,
        CustomSelect,
        User,
        Wallet,
    },
})
export default class extends HeaderMobile {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
