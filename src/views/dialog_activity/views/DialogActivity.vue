<template src="./DialogActivity.vue.html" lang="html"></template>
<style src="./DialogActivity.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogActivity from "./DialogActivity";
import AdvertiseInLogin from "@/views/widget/advertise_in_login/AdvertiseInLogin.vue";

@Component({
    components: {
        AdvertiseInLogin,
        Overlay
    }
})
export default class extends DialogActivity {}
</script>
