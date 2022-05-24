import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRecordMineDetailProxy from "./proxy/DialogRecordMineDetailProxy";
import DialogRecordMineDetail from "./views/DialogRecordMineDetail.vue";

function show() {
    DialogMount(DialogRecordMineDetail);
    const proxy: DialogRecordMineDetailProxy = getProxy(DialogRecordMineDetailProxy);
    proxy.pageData.bShow = true;
}

export default { show };
