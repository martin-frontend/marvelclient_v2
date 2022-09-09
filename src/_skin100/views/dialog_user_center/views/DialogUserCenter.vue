<template src="./DialogUserCenter.vue.html" lang="html"></template>
<style src="./DialogUserCenter.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/_skin100/views/widget/overlay/Overlay.vue";
import DialogUserCenter from "./DialogUserCenter";
import AdvertiseInLogin from "@/_skin100/views/widget/advertise_in_login/AdvertiseInLogin.vue";

@Component({
    components: {
        AdvertiseInLogin,
        Overlay,
    },
})
export default class extends DialogUserCenter {}
</script>
