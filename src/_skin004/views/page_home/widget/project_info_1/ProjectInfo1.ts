import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Utils from "@/core/global/Utils";
import GameConfig from "@/core/config/GameConfig";

@Component
export default class ProjectInfo1 extends AbstractView {
    LangUtil = LangUtil;

    
    mounted() {
        this.setLink_android();
        this.setLink_ios();
    }

    qrCode_android = null;
    qrCode_ios = null;

    public get androidUrl() : string {
        return GameConfig.config.android_download_link;
    }
    public get iosUrl() : string {
        return GameConfig.config.ios_download_link;
    }
    
    async setLink_android() {
        const imgBase64 = await Utils.generateQrcode(this.androidUrl);
        this.qrCode_android = imgBase64;
    }
    async setLink_ios() {
        const imgBase64 = await Utils.generateQrcode(this.iosUrl);
        this.qrCode_ios = imgBase64;
    }

}
