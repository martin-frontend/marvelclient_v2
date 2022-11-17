<template src="./UserPanel.vue.html" lang="html"></template>
<style src="./UserPanel.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import MenuGroup from "@/_skin001/views/header/widget/menu_group/MenuGroup.vue";
import UserPanel from "./UserPanel";

@Component({
    components: {
        MenuGroup,
    },
})
export default class extends UserPanel {}
</script>
