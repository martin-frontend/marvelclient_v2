import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogUserCenterProxy from "./proxy/DialogUserCenterProxy";
import DialogUserCenter from "./views/DialogUserCenter.vue";

const proxy: DialogUserCenterProxy = getProxy(DialogUserCenterProxy);
function show() {
    DialogMount(DialogUserCenter);
    hidden(false);

    proxy.pageData.bShow = true;
}
function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
