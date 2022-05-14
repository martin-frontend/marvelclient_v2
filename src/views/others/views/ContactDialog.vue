<template>
    <v-dialog v-model="dialogData.bShow" width="596">
        <v-card class="rounded-lg pb-5" color="colorPanelBg">
            <v-sheet class="d-flex text-18 font-weight-medium align-center px-4 mb-5" color="colorPanelTitleBg" height="60">
                <div>联系我们</div>
                <v-spacer />
                <v-btn icon @click="onClose">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-sheet>
            <v-sheet class="overflow-y-auto mx-4 text-wrapper" color="transparent" height="300">{{ dialogData.data }}</v-sheet>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import ContactProxy from "../proxy/ContactProxy";
@Component
export default class ContactDialog extends AbstractView {
    private myProxy: ContactProxy = this.getProxy(ContactProxy);
    private dialogData = this.myProxy.dialogData;

    private onClose() {
        this.dialogData.bShow = false;
    }

    @Watch("dialogData.bShow")
    private onWatchShow() {
        BlurUtil(this.dialogData.bShow);
    }
}
</script>

<style lang="scss" scoped>
@import "@/style/fontsize.scss";
.text-wrapper {
    white-space: pre-wrap;
    opacity: 0.8;
}
</style>
