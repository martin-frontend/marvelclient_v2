<template src="./DialogWallet.vue.html" lang="html"></template>
<style src="./DialogWallet.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogWallet from "./DialogWallet";
import TabMyAssets from "../widget/tab_my_assets/TabMyAssets.vue";
import TabVendorAssets from "../widget/tab_vendor_assets/TabVendorAssets.vue";
import TabAccountDetail from "../widget/tab_account_detail/TabAccountDetail.vue";
import CustomSelect from "@/_skin005/views/widget/custom_select/CustomSelect.vue";
@Component({
    components: {
        TabMyAssets,
        TabVendorAssets,
        TabAccountDetail,
        CustomSelect,
    },
})
export default class extends DialogWallet {}
</script>
