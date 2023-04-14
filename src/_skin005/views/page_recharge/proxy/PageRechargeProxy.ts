import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { ExchangeProxy, RechargeProxy, TransferProxy } from "@/_skin005/views/dialog_recharge/proxy/DialogRechargeProxy";
import MyCanvas from "@/core/ui/MyCanvas";
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
}
