import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogRecordMineDetailProxy from "./proxy/DialogRecordMineDetailProxy";
import DialogRecordMineDetail from "./views/DialogRecordMineDetail.vue";
const proxy: DialogRecordMineDetailProxy = getProxy(DialogRecordMineDetailProxy);

function show(data: any) {
    DialogMount(DialogRecordMineDetail);
    hidden(false);

    proxy.pageData.bShow = true;
    proxy.setData(data);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
