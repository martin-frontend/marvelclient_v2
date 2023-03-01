<template src="./DialogUserCenter.vue.html" lang="html"></template>
<style src="./DialogUserCenter.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import DialogUserCenter from "./DialogUserCenter";
import AdvertiseInLogin from "@/_skin005/views/widget/advertise_in_login/AdvertiseInLogin.vue";

@Component({
    components: {
        AdvertiseInLogin,
    },
})
export default class extends DialogUserCenter {}
</script>
