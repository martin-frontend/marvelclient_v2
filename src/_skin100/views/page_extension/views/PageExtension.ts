import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageExtensionMediator from "../mediator/PageExtensionMediator";
import PageExtensionProxy from "../proxy/PageExtensionProxy";
import dialog_bind_invite from "@/_skin100/views/dialog_bind_invite";
import dialog_directly from "@/_skin100/views/dialog_directly";
import dialog_performance from "@/_skin100/views/dialog_performance";
import dialog_message from "@/_skin100/views/dialog_message";
import dialog_wallet from "@/_skin100/views/dialog_wallet";
import dialog_message_box from "@/_skin100/views/dialog_message_box";
import LangUtil from "@/core/global/LangUtil";
import FagProxy from "@/proxy/FagProxy";
import dialog_preview from "@/views/dialog_preview";
import MyCanvas from "@/core/ui/MyCanvas";
import WebViewBridge from "@/core/native/WebViewBridge";
@Component
export default class PageExtension extends AbstractView {
    myProxy: PageExtensionProxy = this.getProxy(PageExtensionProxy);
    fagProxy: FagProxy = this.getProxy(FagProxy);
    pageData = this.myProxy.pageData;
    promotionData = this.myProxy.pageData.promotionData;
    statistics_data = this.myProxy.pageData.statistics_data;
    tableData = this.myProxy.pageData.tableData;
    LangUtil = LangUtil;

    constructor() {
        super(PageExtensionMediator);
    }

    destroyed() {
        super.destroyed();
        this.pageData.link = "";
        this.pageData.qrCode = "";
    }

    handlerBind() {
        dialog_bind_invite.show();
    }

    handlerDirectly() {
        dialog_directly.show();
    }

    handlerPerformance() {
        dialog_performance.show();
    }

    handleRecords() {
        // 开启弹窗: 平台钱包/账户明细/推广返佣
        dialog_wallet.show(2, 15);
    }

    /**领取奖励 */
    handlerAward() {
        dialog_message_box.confirm({
            message: LangUtil("确定要领取?"),
            okFun: () => {
                this.myProxy.api_user_var_commission_receive();
            },
        });
    }

    async showPreview() {
        if (this.pageData.qrCode) {
            const myCanvas = new MyCanvas(288, 288);
            await myCanvas.drawQrCode(this.pageData.link, 16, 16, 256, 256);
            dialog_preview.show(myCanvas.getData());
        }
    }

    async savePhoto() {
        if (this.pageData.qrCode) {
            // const bg = require(`@/assets/extension/poster.jpg`);
            const bg = "";
            let imgData: any;
            if (bg) {
                const myCanvas = new MyCanvas(750, 1334);
                await myCanvas.drawImage1(bg, 0, 0);
                await myCanvas.drawQrCode(this.pageData.link, 250, 990, 250, 250);
                //推荐人
                const { pretty_user_id, user_id } = this.pageData.promotionData;
                myCanvas.drawText(pretty_user_id || user_id, 390, 940, "#ffffff", 26);
                imgData = myCanvas.getData();
            } else {
                const myCanvas = new MyCanvas(288, 288);
                await myCanvas.drawQrCode(this.pageData.link, 16, 16, 256, 256);
                imgData = myCanvas.getData();
            }

            // if (core.app_type == core.EnumAppType.APP) {
            // WebViewBridge.getInstance().savePhoto(imgData, () => {
            //     dialog_message.success(LangUtil("保存成功"));
            // });
            // } else {
            // dialog_preview.show(imgData); //可恢复为原流程
            // }
            const a = document.createElement("a");
            a.href = imgData;
            a.setAttribute("download", "invite_link");
            a.click();
        }
    }

    reget() {
        this.pageData.qrCode = "";
        this.myProxy.api_user_var_short_chain();
    }

    private copy() {
        this.myProxy.copy();
        dialog_message.warn(LangUtil("复制成功"));
    }

    private copyMyId() {
        this.myProxy.copyId();
        dialog_message.warn(LangUtil("复制成功"));
    }
}
