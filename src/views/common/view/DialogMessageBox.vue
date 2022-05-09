<template>
    <v-dialog v-model="dialogData.bShow" persistent max-width="300">
        <v-card class="pa-6">
            <v-card-title class="pa-0 d-flex justify-center">
                <!-- {{ dialogData.title }}  -->
                <!-- <v-img max-width="50px" contain :src="require('@/assets/img/hint_icon.png')"></v-img> -->
            </v-card-title>
            <v-card-text class="text-subtitle-1 px-0 pt-10 pb-5 text-center">{{ dialogData.message }}</v-card-text>
            <v-card-actions class="d-flex justify-space-around pa-0 py-2">
                <v-btn large width="100" v-if="dialogData.bConfirm" plain color="primary" outlined @click="close"> 取消 </v-btn>
                <v-btn large width="100" color="primary" @click="submit"> 确定 </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { MessageBoxProxy } from "@/views/common/proxy/MessageBoxProxy";

@Component
export default class DialogMessageBox extends AbstractView {
    private myProxy: MessageBoxProxy = this.getProxy(MessageBoxProxy);
    private dialogData = this.myProxy.dialogData;

    private close() {
        this.dialogData.bShow = false;
        //@ts-ignore
        this.dialogData.cancelFun();
    }

    private submit() {
        this.dialogData.bShow = false;
        //@ts-ignore
        this.dialogData.okFun();
    }
}
</script>

<style lang="sass" scoped></style>
