import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogActivityProxy from "./proxy/DialogActivityProxy";
import DialogActivity from "./views/DialogActivity.vue";
const proxy: DialogActivityProxy = getProxy(DialogActivityProxy);
function show() {
    DialogMount(DialogActivity);

    hidden(false);
    proxy.pageData.bShow = true;
}
function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
