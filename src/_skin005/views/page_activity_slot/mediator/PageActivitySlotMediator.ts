import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageActivitySlotProxy from "../proxy/PageActivitySlotProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class PageActivitySlotMediator extends AbstractMediator {
    myProxy: PageActivitySlotProxy = getProxy(PageActivitySlotProxy);
    onRegister() {
        PanelUtil.showAppLoading(false);
    }

    onRemove() {
        this.facade.removeProxy(PageActivitySlotProxy.NAME);
    }
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_activity_ball_lottery_award_var,
            net.EventType.api_plat_activity_ball_lottery_init_var,
            net.EventType.api_plat_activity_ball_rewards_var_receive,
            net.EventType.api_plat_activity_ball_info_var,
            net.EventType.api_plat_activity_var,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        switch (notification.getName()) {
            case net.EventType.api_plat_activity_ball_lottery_award_var: // 用户抽奖
                this.myProxy.setAwardData(body);
                break;
            case net.EventType.api_plat_activity_ball_lottery_init_var:
                {
                    PanelUtil.showAppLoading(false);
                    this.myProxy.refreshAllData();
                }
                break;
            case net.EventType.api_plat_activity_ball_rewards_var_receive: //领取奖励
                {
                    if (body && body.award_info) {
                        PanelUtil.openpanel_award(body.award_info);
                    } else {
                        console.error("领取奖励为空", body);
                    }
                    this.myProxy.refreshAllData();
                }
                break;
            case net.EventType.api_plat_activity_ball_info_var:
                console.log("--api_plat_activity_ball_info_var--", body);
                this.myProxy.setBallInfoData(body);
                break;
            case net.EventType.api_plat_activity_var:
                this.myProxy.setBallAwardDetail(body);
                break;
            default:
                break;
        }
    }
}
