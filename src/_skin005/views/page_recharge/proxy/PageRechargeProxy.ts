import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { ExchangeProxy, RechargeProxy, TransferProxy } from "@/_skin005/views/dialog_recharge/proxy/DialogRechargeProxy";
import MyCanvas from "@/core/ui/MyCanvas";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import WebViewBridge from "@/core/native/WebViewBridge";

export interface inputErrorObj {
    title: string;
    errorinfo: string;
}

export default class PageRechargeProxy extends puremvc.Proxy {
    static NAME = "PageRechargeProxy";

    rechargeProxy: RechargeProxy = getProxy(RechargeProxy);
    exchangeProxy: ExchangeProxy = getProxy(ExchangeProxy);
    transferProxy: TransferProxy = getProxy(TransferProxy);

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        tabIndex: "0", // 0充值 1兑换 2划转
    };

    show() {
        this.pageData.bShow = true;
    }
    init() {
        console.log("初始化----");
        this.exchangeProxy.api_user_var_exchange_method_list();
        this.rechargeProxy.api_user_var_recharge_method_list();
        this.exchangeProxy.api_user_var_exchange_extend_info();
    }

    testShow() {
        const str =
            "00020101021226910014br.gov.bcb.pix2569api.developer.btgpactual.com/v1/p/v2/490708d7c31d4c93bd25e235f578261b5204000053039865802BR5925ATOM CAPITAL INSTITUIAO D6012SAO PAULO SP62070503***63044B00";
        this.showPreview(str);
    }
    /**显示大图 */
    async showPreview(image: any) {
        const myCanvas = new MyCanvas(288, 288);
        await myCanvas.drawQrCode(image, 16, 16, 256, 256);
        //dialog_preview.show(myCanvas.getData());
        PanelUtil.openpanel_preview(myCanvas.getData());
    }
    /**充值的回调 */
    api_user_var_recharge_create_callback(data: any) {
        //加了个 type: 0-无需处理|1-跳转URL|2-二维码
        if (data.type == 1) {
            this.openUrl(data.url);
        } else if (data.type == 2) {
            PanelUtil.openpanel_recharge_qrcode(data);
        } else if (data.type == 3) {
            PanelUtil.openpanel_recharge_qrcode(data, true);
        }
    }
    /**打开跳转链接 */
    openUrl(url: string) {
        PanelUtil.message_alert({
            message: LangUtil("点击进入充值通道"),
            okFun: () => {
                if (core.app_type == core.EnumAppType.WEB) {
                    OpenLink(url);
                } else {
                    WebViewBridge.getInstance().openStstemBrowser(url);
                }
            },
        });
    }
    onCreateOrder(data: any) {
        console.log("收到 body", data);
        if (data.paymethod_id && (data.paymethod_id == 10 || data.paymethod_id == 12 || data.paymethod_id == 13)) {
            //console.log("打开 二维码");
            //myProxy.showPreview(body.qrcode);
            this.api_user_var_recharge_create_callback(data);
            return;
        }

        this.openUrl(data);
    }
}
