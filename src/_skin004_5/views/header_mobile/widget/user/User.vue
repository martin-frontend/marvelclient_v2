<template src="./User.vue.html" lang="html"></template>
<style src="./User.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import User from "@/_skin004/views/header/widget/user/User";
import UserPanel from "@/_skin004/views/header/widget/user_panel/UserPanel.vue";

@Component({
    components: {
        UserPanel,
    },
})
export default class extends User {}
</script>
