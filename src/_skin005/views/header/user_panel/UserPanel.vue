<template src="./UserPanel.vue.html" lang="html"></template>
<style src="./UserPanel.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import MenuGroup from "../menu_group/MenuGroup.vue";
import UserPanel from "./UserPanel";
import LightDark from "../../novigation/light_dark/LightDark.vue";
@Component({
    components: {
        MenuGroup,
        LightDark,
    },
})
export default class extends UserPanel {}
</script>
