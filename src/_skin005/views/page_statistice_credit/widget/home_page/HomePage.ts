import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import Constant from "@/core/global/Constant";
import PageStatisticeCreditProxy from "../../proxy/PageStatisticeCreditProxy";
import MyCanvas from "@/core/ui/MyCanvas";

import CopyUtil from "@/core/global/CopyUtil";
import { amountFormat, changeDateShow } from "@/core/global/Functions";
import { getMoneyColor, getMoneyValue } from "@/_skin005/core/ColorfullText";

@Component
export default class HomePage extends AbstractView {
    LangUtil = LangUtil;
    //amountFormat = amountFormat;
    playerInfo = PanelUtil.getProxy_selfproxy;
    myProxy: PageStatisticeCreditProxy = this.getProxy(PageStatisticeCreditProxy);
    pageData = this.myProxy.pageData;
    getMoneyColor = getMoneyColor;
    getMoneyValue = getMoneyValue;
    amountFormat(val: any) {
        return amountFormat(val, true);
    }
    // constructor() {
    //     super(DialogDirectlyMyMediator);
    // }
    mounted() {
        console.log("创建发送请求");
        this.myProxy.api_user_var_commission_commissiondetail();
        this.myProxy.api_user_var_credit_dividend_period();
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
    copy(msg: any) {
        CopyUtil(msg);
        PanelUtil.message_info(LangUtil("复制成功"));

        //this.myProxy.copy();
    }
    handlerDirectly() {
        PanelUtil.openpanel_directly();
    }
    onTimeChange(key: any) {
        this.myProxy.pageData.credit_tab = key;
        console.log("收到点击 标题  ", key);
        this.myProxy.pageData.curCreditData = this.myProxy.pageData.credit_dividend_period[this.myProxy.pageData.credit_tab];
    }
    getDate(str: string) {
        return changeDateShow(str);
    }
}
