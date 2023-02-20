import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageExtensionMediator from "../mediator/PageExtensionMediator";
import PageExtensionProxy from "../proxy/PageExtensionProxy";
import LangUtil from "@/core/global/LangUtil";
import FagProxy from "@/proxy/FagProxy";
import MyCanvas from "@/core/ui/MyCanvas";
import PanelUtil from "@/_skin005/core/PanelUtil";
@Component
export default class PageExtension extends AbstractView {
    myProxy: PageExtensionProxy = this.getProxy(PageExtensionProxy);
    fagProxy: FagProxy = this.getProxy(FagProxy);
    pageData = this.myProxy.pageData;
    promotionData = this.myProxy.pageData.promotionData;
    statistics_data = this.myProxy.pageData.statistics_data;
    tableData = this.myProxy.pageData.tableData;
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;
    core = core;

    constructor() {
        super(PageExtensionMediator);
    }

    destroyed() {
        super.destroyed();
        this.pageData.link = "";
        this.pageData.qrCode = "";
    }

    handlerBind() {
        //dialog_bind_invite.show();
        PanelUtil.openpanel_bind_invite();
    }

    handlerDirectly() {
        PanelUtil.openpanel_directly();
    }

    handlerPerformance() {
        PanelUtil.openpanel_performance();
    }

    handleRecords() {
        // 开启弹窗: 平台钱包/账户明细/推广返佣
        PanelUtil.openpanel_wallet(2,15);
    }

    handlerPromotion() {
        PanelUtil.openpanel_promotion_statistics();
    }

    handlerCredit() {
        PanelUtil.openpanel_statistics_credit();
    }

    /**领取奖励 */
    handlerAward() {
        PanelUtil.message_confirm({
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

            PanelUtil.openpanel_preview( myCanvas.getData());
        }
    }

    async savePhoto() {
        if (this.pageData.qrCode) {
            const bg = require(`@/assets/extension/poster.jpg`);
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
            //     WebViewBridge.getInstance().savePhoto(imgData, () => {
            //         dialog_message.success(LangUtil("保存成功"));
            //     });
            // } else {
            PanelUtil.openpanel_preview( imgData);
            // }
        }
    }

    reget() {
        this.myProxy.api_user_var_short_chain(1);
    }

    private copy() {
        this.myProxy.copy();
    }

    private copyMyId() {
        this.myProxy.copyId();
    }

    handlerViewCard() {
        const { invite_user_business_card } = this.selfProxy.userInfo;
        PanelUtil.openpanel_personal_card(invite_user_business_card, false );
    }
}
