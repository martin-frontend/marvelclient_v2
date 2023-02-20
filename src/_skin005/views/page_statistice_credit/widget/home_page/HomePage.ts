import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import Constant from "@/core/global/Constant";
import PageStatisticeCreditProxy from "../../proxy/PageStatisticeCreditProxy";
import MyCanvas from "@/core/ui/MyCanvas";
import DialogDirectlyMyMediator from "@/_skin005/views/dialog_directly_my/mediator/DialogDirectlyMyMediator";
import SelfProxy from "@/proxy/SelfProxy";


@Component
export default class HomePage extends AbstractView {
    LangUtil = LangUtil;
    playerInfo = PanelUtil.getProxy_selfproxy;
    //playerInfo:SelfProxy = this.getProxy(SelfProxy);
    //myProxy: PageStatisticeCreditProxy = this.getProxy(PageStatisticeCreditProxy);
    myProxy = PanelUtil.getProxy_directly_my;
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogDirectlyMyMediator);
    }

    getConfigName(type: any) {
        return Constant.GameTypeText(type);
    }

    public get pretty_user_id(): any {
        if (this.myProxy.pageData.promotionData.pretty_user_id == "") {
            return this.myProxy.pageData.promotionData.user_id;
        }

        return this.myProxy.pageData.promotionData.pretty_user_id;
    }

    async showPreview() {
        if (this.pageData.qrCode) {
            const myCanvas = new MyCanvas(288, 288);
            await myCanvas.drawQrCode(this.pageData.link, 16, 16, 256, 256);
            //dialog_preview.show(myCanvas.getData());
            PanelUtil.openpanel_preview(myCanvas.getData());
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
            PanelUtil.openpanel_preview(imgData);
            // }
        }
    }

    reget() {
        this.myProxy.api_user_var_short_chain(1);
    }
    private copy() {
        this.myProxy.copy();
    }
    handlerDirectly() {
        PanelUtil.openpanel_directly();
    }
}
