import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRecordMineProxy from "./proxy/DialogRecordMineProxy";
import DialogRecordMine from "./views/DialogRecordMine.vue";

function show() {
    DialogMount(DialogRecordMine);
    const proxy: DialogRecordMineProxy = getProxy(DialogRecordMineProxy);
    proxy.pageData.bShow = true;
}

export default { show };
