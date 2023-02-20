import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogBonusRankingProxy from "./proxy/DialogBonusRankingProxy";
import DialogBonusRanking from "./views/DialogBonusRanking.vue";
const proxy: DialogBonusRankingProxy = getProxy(DialogBonusRankingProxy);

function show() {
    DialogMount(DialogBonusRanking);
    hidden(false);
    proxy.pageData.bShow = true;
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
