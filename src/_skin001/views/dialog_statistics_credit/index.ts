import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogStatisticsCreditProxy from "./proxy/DialogStatisticsCreditProxy";
import DialogStatisticsCredit from "./views/DialogStatisticsCredit.vue";

function show() {
    DialogMount(DialogStatisticsCredit);
    const proxy: DialogStatisticsCreditProxy = getProxy(DialogStatisticsCreditProxy);
    proxy.pageData.bShow = true;
}

export default { show };
