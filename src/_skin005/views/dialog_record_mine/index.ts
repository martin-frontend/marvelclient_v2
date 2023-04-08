import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRecordMineProxy from "./proxy/DialogRecordMineProxy";
import DialogRecordMine from "./views/DialogRecordMine.vue";
const proxy: DialogRecordMineProxy = getProxy(DialogRecordMineProxy);

function show() {
    DialogMount(DialogRecordMine);
    hidden(false);
    proxy.pageData.bShow = true;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
