<template src="@/_skin004/views/header/widget/user_panel/UserPanel.vue.html" lang="html"></template>
<style src="@/_skin004_6/views/header/widget/user_panel/UserPanel.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import MenuGroup from "@/_skin004/views/header/widget/menu_group/MenuGroup.vue";
import UserPanel from "./UserPanel";

@Component({
    components: {
        MenuGroup,
    },
})
export default class extends UserPanel {}
</script>
