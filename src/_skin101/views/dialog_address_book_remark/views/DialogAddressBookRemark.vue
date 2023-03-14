<template src="./DialogAddressBookRemark.vue.html" lang="html"></template>
<style src="./DialogAddressBookRemark.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin101/views/widget/overlay/Overlay.vue";
import DialogAddressBookRemark from "./DialogAddressBookRemark";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogAddressBookRemark {}
</script>
