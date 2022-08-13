import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogServiceProxy from "./proxy/DialogServiceProxy";
import DialogService from "./views/DialogService.vue";

function show() {
    DialogMount(DialogService);
    const proxy: DialogServiceProxy = getProxy(DialogServiceProxy);
    proxy.pageData.bShow = true;
}

export default { show };
