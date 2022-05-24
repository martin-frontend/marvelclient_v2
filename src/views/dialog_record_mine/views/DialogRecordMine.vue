<template>
    <v-dialog width="730" v-model="pageData.bShow" :retain-focus="false" :fullscreen="$vuetify.breakpoint.xsOnly" persistent>
        <v-card class="rounded-lg" color="colorPanelBg">
            <v-card-title class="gradient-bg">
                <div class="text-18">dialog_record_mine</div>
                <v-spacer />
                <v-btn icon @click="onClose">
                    <v-icon large>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
        </v-card>
        <Overlay v-model="pageData.loading" />
    </v-dialog>
</template>
<style src="./DialogRecordMine.vue.scss" lang="scss" scoped></style>

<script lang="ts">
import Component from "vue-class-component";
import Overlay from "@/views/widget/overlay/Overlay.vue";
import DialogRecordMine from "./DialogRecordMine";

@Component({
    components: {
        Overlay,
    },
})
export default class extends DialogRecordMine {}
</script>
