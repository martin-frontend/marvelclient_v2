import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogActivityRankProxy from "./proxy/DialogActivityRankProxy";
import DialogActivityRank from "./views/DialogActivityRank.vue";

const proxy: DialogActivityRankProxy = getProxy(DialogActivityRankProxy);
function show(activity_id: number = 0) {
    DialogMount(DialogActivityRank);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.pageData.cur_rank_id = activity_id;
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
