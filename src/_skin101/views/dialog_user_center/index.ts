import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogUserCenterProxy from "./proxy/DialogUserCenterProxy";
import DialogUserCenter from "./views/DialogUserCenter.vue";

function show() {
    DialogMount(DialogUserCenter);
    const proxy: DialogUserCenterProxy = getProxy(DialogUserCenterProxy);
    proxy.pageData.bShow = true;
}

export default { show };
