import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogLimitedBonusProxy from "./proxy/DialogLimitedBonusProxy";
import DialogLimitedBonus from "./views/DialogLimitedBonus.vue";

const proxy: DialogLimitedBonusProxy = getProxy(DialogLimitedBonusProxy);
function show(data: any) {
    DialogMount(DialogLimitedBonus);
    hidden(false);
    proxy.pageData.bShow = true;
    if (data) {
        proxy.setData(data);
    }
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
