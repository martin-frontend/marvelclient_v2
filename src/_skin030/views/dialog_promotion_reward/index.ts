import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPromotionRewardProxy from "./proxy/DialogPromotionRewardProxy";
import DialogPromotionReward from "./views/DialogPromotionReward.vue";
const proxy: DialogPromotionRewardProxy = getProxy(DialogPromotionRewardProxy);

function show() {
    DialogMount(DialogPromotionReward);
    hidden(false);
    proxy.pageData.bShow = true;
}
function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}
export default { show, hidden };
