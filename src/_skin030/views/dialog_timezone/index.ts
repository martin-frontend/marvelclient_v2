import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogTimezoneProxy from "./proxy/DialogTimezoneProxy";
import DialogTimezone from "./views/DialogTimezone.vue";

const proxy: DialogTimezoneProxy = getProxy(DialogTimezoneProxy);
function show() {
    DialogMount(DialogTimezone);
    hidden(false);
    proxy.pageData.bShow = true;
}
function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}
export default { show, hidden };
