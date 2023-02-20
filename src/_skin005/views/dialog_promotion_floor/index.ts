import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPromotionFloorProxy from "./proxy/DialogPromotionFloorProxy";
import DialogPromotionFloor from "./views/DialogPromotionFloor.vue";
const proxy: DialogPromotionFloorProxy = getProxy(DialogPromotionFloorProxy);

function show() {
    DialogMount(DialogPromotionFloor);
    hidden(false);
    proxy.pageData.bShow = true;
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
