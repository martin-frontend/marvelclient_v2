import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogStatisticsCreditProxy from "./proxy/DialogStatisticsCreditProxy";
import DialogStatisticsCredit from "./views/DialogStatisticsCredit.vue";
const proxy: DialogStatisticsCreditProxy = getProxy(DialogStatisticsCreditProxy);

function show() {
    DialogMount(DialogStatisticsCredit);
    proxy.pageData.bShow = true;
    hidden(false);
}



function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
