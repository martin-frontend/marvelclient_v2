import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPromotionStatisticsProxy from "./proxy/DialogPromotionStatisticsProxy";
import DialogPromotionStatistics from "./views/DialogPromotionStatistics.vue";

function show() {
    DialogMount(DialogPromotionStatistics);
    const proxy: DialogPromotionStatisticsProxy = getProxy(DialogPromotionStatisticsProxy);
    proxy.pageData.bShow = true;
}

export default { show };
