<template src="./HeaderMobile.vue.html" lang="html"></template>
<style src="./HeaderMobile.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import HeaderMobile from "@/_skin004/views/header_mobile/views/HeaderMobile";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import CustomSelect from "@/views/widget/custom_select/CustomSelect.vue";
import User from "@/_skin004_5/views/header_mobile/widget/user/User.vue";
import Wallet from "@/_skin004_5/views/header_mobile/widget/wallet/Wallet.vue";

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
