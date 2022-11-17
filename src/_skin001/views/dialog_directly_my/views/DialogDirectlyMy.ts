import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogDirectlyMyMediator from "../mediator/DialogDirectlyMyMediator";
import DialogDirectlyMyProxy from "../proxy/DialogDirectlyMyProxy";
import LangUtil from "@/core/global/LangUtil";
import dialog_preview from "@/views/dialog_preview";
import MyCanvas from "@/core/ui/MyCanvas";
import dialog_message from "@/views/dialog_message";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_personal_card from "@/views/dialog_personal_card";

@Component
export default class DialogDirectlyMy extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogDirectlyMyProxy = this.getProxy(DialogDirectlyMyProxy);
    pageData = this.myProxy.pageData;
    promotionData = this.myProxy.pageData.promotionData;
    selfProxy: SelfProxy = this.getProxy(SelfProxy);
    constructor() {
        super(DialogDirectlyMyMediator);
    }
    
    public get pretty_user_id() : any {

        //console.log("---->>>" , this.myProxy.pageData.promotionData.pretty_user_id)
        if (this.myProxy.pageData.promotionData.pretty_user_id == "")
        {
            return this.myProxy.pageData.promotionData.user_id;
        }

        return this.myProxy.pageData.promotionData.pretty_user_id
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
            dialog_preview.show(imgData);
            // }
        }
    }

    reget() {
        this.myProxy.api_user_var_short_chain(1);
    }

    private copy() {
        this.myProxy.copy();
        dialog_message.warn(LangUtil("复制成功"));
    }

    private copyMyId() {
        this.myProxy.copyId();
        dialog_message.warn(LangUtil("复制成功"));
    }

    handlerViewCard() {
        const { invite_user_business_card } = this.selfProxy.userInfo;
        dialog_personal_card.show(invite_user_business_card, false);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            this.myProxy.resetQuery();
            this.myProxy.api_user_var_commission_commissiondetail();
        }
    }
}
