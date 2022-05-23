<template>
    <v-container>
        1111111111111
        <!-- <v-row no-gutters>
            <v-col cols="auto">
                <v-sheet width="527" height="357" color="colorTitleBg"></v-sheet>
            </v-col>
            <v-col cols="auto">
                <v-sheet width="866" height="357"></v-sheet>
            </v-col>
        </v-row> -->
    </v-container>
</template>
<style src="./PageMine.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import PageMine from "./PageMine";
import Overlay from "@/views/widget/overlay/Overlay.vue";

@Component({
    components: {
        Overlay,
    },
})
export default class extends PageMine {
    mounted() {
        window.scrollTo(0, 0);
    }
}
</script>
