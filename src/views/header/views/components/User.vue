<template>
    <v-menu offset-y nudge-bottom="20" nudge-left="190" :close-on-content-click="false" content-class="content-style">
        <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
                <v-sheet class="d-none d-md-flex align-center rounded-pill ml-4" color="rgba(255, 255, 255, 0.08)" height="46">
                    <img class="ml-2" src="@/assets/header/avatar.gif" width="38" height="38" alt="" />
                    <div class="icon-box iconfont mx-3 text-10 colorBlue--text" style="transform: rotate(00deg)"></div>
                </v-sheet>
                <v-sheet class="d-flex d-md-none align-center rounded-pill mx-3" color="rgba(255, 255, 255, 0.08)" height="46">
                    <img class="mx-1" src="@/assets/header/avatar.gif" width="38" height="38" alt="" />
                </v-sheet>
            </div>
        </template>
        <UserPanel/>
    </v-menu>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
import UserPanel from "./UserPanel.vue";
@Component({
    components: {
        UserPanel,
    },
})
export default class User extends AbstractView {}
</script>

<style lang="scss" scoped>
@import "@/style/fontsize.scss";
.content-style{
    box-shadow: none;;
}
</style>
