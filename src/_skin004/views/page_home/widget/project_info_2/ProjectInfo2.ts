import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Utils from "@/core/global/Utils";
import SkinVariable from "@/_skin004/core/SkinVariable";
@Component
export default class ProjectInfo2 extends AbstractView {
    LangUtil = LangUtil;
    SkinVariable = SkinVariable;
    mounted() {
        this.setLink(document.documentURI);
    }

    qrCode = null;

    async setLink(url: string) {
        const imgBase64 = await Utils.generateQrcode(url);
        this.qrCode = imgBase64;
    }
}
