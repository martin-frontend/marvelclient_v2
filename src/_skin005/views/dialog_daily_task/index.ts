import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDailyTaskProxy from "./proxy/DialogDailyTaskProxy";
import DialogDailyTask from "./views/DialogDailyTask.vue";

const proxy: DialogDailyTaskProxy = getProxy(DialogDailyTaskProxy);
function show() {
    DialogMount(DialogDailyTask);
    hidden(false);
    proxy.pageData.bShow = true;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
