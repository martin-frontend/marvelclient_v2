import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogActivityPointSpinProxy from "../proxy/DialogActivityPointSpinProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogActivityPointSpinMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_activity_var,
            net.EventType.api_plat_activity_every_point_lottery_var,
            net.EventType.api_plat_activity_every_point_lottery_rank_list,
            net.EventType.api_user_var_short_chain,
            net.EventType.api_plat_activity_ball_rewards_var_receive,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogActivityPointSpinProxy = getProxy(DialogActivityPointSpinProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_activity_var:
                // PanelUtil.showAppLoading(false);
                myProxy.pageData.loading = false;
                myProxy.setData(body);
                break;
            case net.EventType.api_plat_activity_every_point_lottery_var:
                // PanelUtil.showAppLoading(false);
                myProxy.pageData.loading = false;
                myProxy.pointLotteryCallback(body);
                break;
            case net.EventType.api_plat_activity_every_point_lottery_rank_list:
                // PanelUtil.showAppLoading(false);
                myProxy.pageData.loading = false;
                myProxy.setRankListData(body);
                break;
            case net.EventType.api_user_var_short_chain:
                myProxy.setLink(body.url);
                break;
            case net.EventType.api_plat_activity_ball_rewards_var_receive:
                myProxy.onRewardReceive(body);
                break;
        }
    }
}
