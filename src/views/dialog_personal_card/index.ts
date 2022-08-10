import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPersonalCardProxy from "./proxy/DialogPersonalCardProxy";
import DialogPersonalCard from "./views/DialogPersonalCard.vue";

function show(card: string = "", canEdit: boolean = true) {
    DialogMount(DialogPersonalCard);
    const proxy: DialogPersonalCardProxy = getProxy(DialogPersonalCardProxy);
    proxy.pageData.bShow = true;
    proxy.pageData.personalCard = card;
    proxy.pageData.canEdit = canEdit;
}

export default { show };
