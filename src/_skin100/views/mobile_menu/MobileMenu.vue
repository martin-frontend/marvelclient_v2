<template src="./MobileMenu.vue.html" lang="html"></template>
<style src="./MobileMenu.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import MobileMenu from "./MobileMenu";
import UserPanel from "@/_skin100/views/header/widget/user_panel/UserPanel.vue";

@Component({
    components: {
        UserPanel,
    },
})
export default class extends MobileMenu {
    mounted() {
        switch (this.routerPath) {
            case "/":
                this.active = 0;
                break;
            case "/page_mine":
                this.active = 1;
                break;
            case "/page_bonus":
                this.active = 2;
                break;
            case "/page_extension":
                this.active = 3;
                break;
        }
    }
}
</script>
