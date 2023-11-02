import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRechargeQrcodeProxy from "./proxy/DialogRechargeQrcodeProxy";
import DialogRechargeQrcode from "./views/DialogRechargeQrcode.vue";

const proxy: DialogRechargeQrcodeProxy = getProxy(DialogRechargeQrcodeProxy);

function show(data: any, isImg: boolean = false) {
    DialogMount(DialogRechargeQrcode);
    proxy.pageData.bShow = true;
    hidden(false);
    proxy.setData(data, isImg);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}
export default { show, hidden };
