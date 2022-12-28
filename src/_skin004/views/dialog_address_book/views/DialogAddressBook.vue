<template src="./DialogAddressBook.vue.html" lang="html"></template>
<style src="./DialogAddressBook.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogAddressBook from "./DialogAddressBook";
import CustomSelect from "@/views/widget/custom_select/CustomSelect.vue";
import ListNodata from "@/views/widget/list_nodata/ListNodata.vue";
import LoadMore from "@/views/widget/loadMore/LoadMore.vue";

@Component({
    components: {
        CustomSelect,
        Overlay,
        ListNodata,
        LoadMore,
    },
})
export default class extends DialogAddressBook {}
</script>
