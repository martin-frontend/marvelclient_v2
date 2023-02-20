import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogServiceProxy from "./proxy/DialogServiceProxy";
import DialogService from "./views/DialogService.vue";
const proxy: DialogServiceProxy = getProxy(DialogServiceProxy);

function show() {
    DialogMount(DialogService);
    proxy.pageData.bShow = true;
    hidden(false);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
