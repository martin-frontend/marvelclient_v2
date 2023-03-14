<template src="./PageQrcode.vue.html" lang="html"></template>
<style src="./PageQrcode.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageQrcode from "./PageQrcode";

@Component({
    components: {},
})
export default class extends PageQrcode {
    mounted() {
        // window.scrollTo(0, 0);
        // this.setLink_android();
        // this.setLink_ios();
        this.getVersion();
    }
}
</script>
