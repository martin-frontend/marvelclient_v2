import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogPersonalCardProxy from "./proxy/DialogPersonalCardProxy";
import DialogPersonalCard from "./views/DialogPersonalCard.vue";
const proxy: DialogPersonalCardProxy = getProxy(DialogPersonalCardProxy);

function show(card: string = "", canEdit: boolean = true) {
    DialogMount(DialogPersonalCard);
    hidden(false);
    proxy.pageData.bShow = true;
    proxy.pageData.personalCard = card;
    proxy.pageData.canEdit = canEdit;
}


function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show ,hidden};
