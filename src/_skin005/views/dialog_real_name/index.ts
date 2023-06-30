import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRealNameProxy from "./proxy/DialogRealNameProxy";
import DialogRealName from "./views/DialogRealName.vue";
const proxy: DialogRealNameProxy = getProxy(DialogRealNameProxy);

function show(isCPF: boolean = false) {
    DialogMount(DialogRealName);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.pageData.isCPF = isCPF;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
