import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPromotionFloorProxy from "./proxy/DialogPromotionFloorProxy";
import DialogPromotionFloor from "./views/DialogPromotionFloor.vue";

function show() {
    DialogMount(DialogPromotionFloor);
    const proxy: DialogPromotionFloorProxy = getProxy(DialogPromotionFloorProxy);
    proxy.pageData.bShow = true;
}

export default { show };
