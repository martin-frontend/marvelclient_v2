import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogEmailProxy from "./proxy/DialogEmailProxy";
import DialogEmail from "./views/DialogEmail.vue";

const proxy: DialogEmailProxy = getProxy(DialogEmailProxy);

function show() {
    DialogMount(DialogEmail);
    proxy.pageData.bShow = true;
    hidden(false);
}
function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
