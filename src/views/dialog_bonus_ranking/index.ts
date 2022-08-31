import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBonusRankingProxy from "./proxy/DialogBonusRankingProxy";
import DialogBonusRanking from "./views/DialogBonusRanking.vue";

function show() {
    DialogMount(DialogBonusRanking);
    const proxy: DialogBonusRankingProxy = getProxy(DialogBonusRankingProxy);
    proxy.pageData.bShow = true;
}

export default { show };
