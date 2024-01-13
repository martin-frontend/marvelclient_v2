import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogAwardProxy from "./proxy/DialogAwardProxy";
import DialogAward from "./views/DialogAward.vue";
const proxy: DialogAwardProxy = getProxy(DialogAwardProxy);

function show(data: any) {
    DialogMount(DialogAward);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.pageData.data = data;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
