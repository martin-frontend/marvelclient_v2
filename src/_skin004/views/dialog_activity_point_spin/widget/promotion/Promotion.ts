import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogActivityPointSpinProxy from "../../proxy/DialogActivityPointSpinProxy";
import CopyUtil from "@/core/global/CopyUtil";
import MyCanvas from "@/core/ui/MyCanvas";
import dialog_preview from "@/views/dialog_preview";
import dialog_message from "@/views/dialog_message";

@Component
export default class Promotion extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogActivityPointSpinProxy = this.getProxy(DialogActivityPointSpinProxy);
    pageData = this.myProxy.pageData;

    async showPreview() {
        // console.warn("--->>.sdasd");
        if (this.pageData.qrCode) {
            const myCanvas = new MyCanvas(288, 288);
            await myCanvas.drawQrCode(this.pageData.link, 16, 16, 256, 256);
            // PanelUtil.openpanel_preview(myCanvas.getData());
            dialog_preview.show(myCanvas.getData())
        }
    }
    onCopy() {
        CopyUtil(this.myProxy.pageData.link);
        // PanelUtil.message_info(LangUtil("复制成功"));
        dialog_message.info(LangUtil("复制成功"));
        this.showTip = true;
    }
    showTip = true;
}
