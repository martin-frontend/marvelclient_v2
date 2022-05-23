import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogSafetyCenterProxy from "./proxy/DialogSafetyCenterProxy";
import DialogSafetyCenter from "./views/DialogSafetyCenter.vue";

function show() {
    DialogMount(DialogSafetyCenter);
    const proxy: DialogSafetyCenterProxy = getProxy(DialogSafetyCenterProxy);
    proxy.pageData.bShow = true;
    proxy.resetForm();
}

export default { show };
