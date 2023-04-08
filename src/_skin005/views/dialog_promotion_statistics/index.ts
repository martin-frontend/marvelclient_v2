import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPromotionStatisticsProxy from "./proxy/DialogPromotionStatisticsProxy";
import DialogPromotionStatistics from "./views/DialogPromotionStatistics.vue";
const proxy: DialogPromotionStatisticsProxy = getProxy(DialogPromotionStatisticsProxy);

function show() {
    DialogMount(DialogPromotionStatistics);
    hidden(false);
    proxy.pageData.bShow = true;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
