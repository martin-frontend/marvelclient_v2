import DialogMount from "@/core/global/DialogMount";
import getProxy from "@/core/global/getProxy";
import DialogSpinLotteryProxy from "./proxy/DialogSpinLotteryProxy";
import DialogSpinLottery from "./views/DialogSpinLottery.vue";
import PanelUtil from "@/_skin005/core/PanelUtil";
import PageActivityProxy from "../page_activity/proxy/PageActivityProxy";

const proxy: DialogSpinLotteryProxy = getProxy(DialogSpinLotteryProxy);
const activityProxy: PageActivityProxy = getProxy(PageActivityProxy);
function show() {
    DialogMount(DialogSpinLottery);
    hidden(false);
    const activityList = activityProxy.pageData.list as { model_type: number }[];
    const hasSpinActivity = activityList.some((i) => i.model_type == 13);
    if (activityList.length && !hasSpinActivity) {
        return;
    }
    proxy.pageData.bShow = true;
    const selfProxy = PanelUtil.getProxy_selfproxy;
    proxy.setData(selfProxy.userInfo);
}

function hidden(bhidden: boolean = true) {
    proxy.pageData.bHidden = bhidden;
}

export default { show, hidden };
