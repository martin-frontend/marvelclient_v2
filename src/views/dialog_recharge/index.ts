import getProxy from "@/core/global/getProxy";
import DialogRechargeProxy from "./proxy/DialogRechargeProxy";
import DialogRecharge from "./views/DialogRecharge.vue";
import DialogMount from "@/core/global/DialogMount";

function show() {
    DialogMount(DialogRecharge);
    const proxy: DialogRechargeProxy = getProxy(DialogRechargeProxy);
    proxy.show();
}

export default { show };
