<template>
    <v-snackbar v-model="dialogData.bShow" :value="true" centered timeout="3000">
        {{ dialogData.message }}
    </v-snackbar>
</template>

<script lang="ts">
import AbstractView from "@/core/abstract/AbstractView";
import { Component } from "vue-property-decorator";
import { MessageProxy } from "@/views/common/proxy/MessageProxy";

@Component
export default class DialogMessage extends AbstractView {
    private myProxy: MessageProxy = this.getProxy(MessageProxy);
    private dialogData = this.myProxy.dialogData;
}
</script>
<style lang="scss" scoped>
::v-deep .v-snack__content {
    text-align: center;
}
</style>
