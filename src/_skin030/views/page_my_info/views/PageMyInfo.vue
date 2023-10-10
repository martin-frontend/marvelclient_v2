<template src="./PageMyInfo.vue.html" lang="html"></template>
<style src="./PageMyInfo.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageMyInfo from "./PageMyInfo";
import CoinTip from "../../widget/wallet/coin_tip/CoinTip.vue";
import User from "../../header/user/User.vue";
@Component({
    components: {
        User,
        CoinTip,
    },
})
export default class extends PageMyInfo {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
