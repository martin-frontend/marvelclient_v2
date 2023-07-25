import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageActivityProxy from "../proxy/PageActivityProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class PageActivityMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_activity,
            net.EventType.api_plat_activity_var,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageActivityProxy = getProxy(PageActivityProxy);
        const promotionRewardProxy = PanelUtil.getProxy_promotion_reward;
        switch (notification.getName()) {
            case net.EventType.api_plat_activity:
                console.log("--关闭 加载");
                PanelUtil.showAppLoading(false);
                myProxy.setData(body);
                break;
            case net.EventType.api_plat_activity_var:
                console.log("--收到详情----", body);
                PanelUtil.showAppLoading(false);
                if (!myProxy.activityDetailData) {
                    myProxy.activityDetailData = <any>{};
                }
                myProxy.activityDetailData[body.id] = body;
                if (promotionRewardProxy.pageData.bShow) {
                    return;
                }
                PanelUtil.openpanel_activity_detail(body);
                break;
        }
    }
}
