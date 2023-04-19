import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRechargeBankchargeProxy from "./proxy/DialogRechargeBankchargeProxy";
import DialogRechargeBankcharge from "./views/DialogRechargeBankcharge.vue";

function show(data: any) {
    DialogMount(DialogRechargeBankcharge);
    const proxy: DialogRechargeBankchargeProxy = getProxy(DialogRechargeBankchargeProxy);
    proxy.pageData.bankTransInfo = data;
    proxy.pageData.bShow = true;
    proxy.init();
}

export default { show };
