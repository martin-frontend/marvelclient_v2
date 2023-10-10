<template src="./DialogAddressBook.vue.html" lang="html"></template>
<style src="./DialogAddressBook.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogAddressBook from "./DialogAddressBook";
import CustomSelect from "@/_skin030/views/widget/custom_select/CustomSelect.vue";

@Component({
    components: {
        CustomSelect,
    },
})
export default class extends DialogAddressBook {}
</script>
