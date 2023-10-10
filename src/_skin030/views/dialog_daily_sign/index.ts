import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogDailySignProxy from "./proxy/DialogDailySignProxy";
import DialogDailySign from "./views/DialogDailySign.vue";
const proxy: DialogDailySignProxy = getProxy(DialogDailySignProxy);
function show() {
    DialogMount(DialogDailySign);

    proxy.pageData.bShow = true;
}
function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}
export default { show, hidden };
