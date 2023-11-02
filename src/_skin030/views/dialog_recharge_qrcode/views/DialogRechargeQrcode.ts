import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogRechargeQrcodeMediator from "../mediator/DialogRechargeQrcodeMediator";
import DialogRechargeQrcodeProxy from "../proxy/DialogRechargeQrcodeProxy";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import PageBlur from "@/_skin030/core/PageBlur";
import CopyUtil from "@/core/global/CopyUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import MyCanvas from "@/core/ui/MyCanvas";

@Component
export default class DialogRechargeQrcode extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogRechargeQrcodeProxy = this.getProxy(DialogRechargeQrcodeProxy);
    pageData = this.myProxy.pageData;
    infodata = this.myProxy.pageData.data;
    GamePlatConfig = GamePlatConfig;
    constructor() {
        super(DialogRechargeQrcodeMediator);
    }

    onClose() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        PageBlur.blur_page(this.pageData.bShow);
    }
    copyQRcore() {
        CopyUtil(this.pageData.data.qrcode);
        PanelUtil.message_info(LangUtil("复制成功"));
    }
    copyOrder() {
        console.log("订单复制成功");
        CopyUtil(this.pageData.data.order_info.third_order_no);
        PanelUtil.message_info(LangUtil("复制成功"));
    }

    async showPreview() {
        if (this.pageData.img_url) {
            const myCanvas = new MyCanvas(288, 288);
            await myCanvas.drawQrCode(this.pageData.data.qrcode, 16, 16, 256, 256);
            //dialog_preview.show(myCanvas.getData());
            PanelUtil.openpanel_preview(myCanvas.getData());
        }
    }
}
