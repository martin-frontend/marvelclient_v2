<template>
    <v-dialog v-model="dialogData.bShow" max-width="500">
        <v-card class="rounded-xl" color="colorPanelBg" width="500" height="300">
            <v-card-title class="mb-8">
                <div class="mt-3 ml-2 font-weight-medium colorBlue--text text-16">获取邮箱验证码</div>
                <v-spacer />
                <v-btn icon @click="onClose"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text class="d-flex align-center">
                <CustomInput type="tel" v-model="dialogData.auth_code" style="width: 300px" />
                <v-img class="ml-3 rounded" :src="myProxy.auth_image" max-width="140" @click="getVerity"></v-img>
            </v-card-text>
            <v-card-actions class="mt-5 mx-2">
                <v-btn class="rounded-lg" color="#6fa9fa" height="48" block @click="onSend">确定发送</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import CustomInput from "@/components/CustomInput.vue";
import AbstractView from "@/core/abstract/AbstractView";
import Component from "vue-class-component";
import { GetVerityProxy } from "../proxy/GetVerityProxy";
@Component({
    components: {
        CustomInput,
    },
})
export default class DialogGetVerity extends AbstractView {
    private myProxy: GetVerityProxy = this.getProxy(GetVerityProxy);
    private dialogData = this.myProxy.dialogData;

    private onClose() {
        this.dialogData.bShow = false;
    }

    private getVerity(){
        this.myProxy.api_public_auth_code();
    }

    private onSend(){
        this.myProxy.api_public_email_send();
    }
}
</script>

<style lang="scss" scoped></style>
