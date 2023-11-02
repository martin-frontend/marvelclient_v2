import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogGoldWaterProxy from "./proxy/DialogGoldWaterProxy";
import DialogGoldWater from "./views/DialogGoldWater.vue";
const proxy: DialogGoldWaterProxy = getProxy(DialogGoldWaterProxy);
function show() {
    DialogMount(DialogGoldWater);

    proxy.pageData.bShow = true;
    hidden(false);
}
function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
