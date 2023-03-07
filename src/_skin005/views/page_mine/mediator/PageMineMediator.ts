import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageMineProxy from "../proxy/PageMineProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GlobalVar from "@/core/global/GlobalVar";

export default class PageMineMediator extends AbstractMediator {
    private pageMineProxy: PageMineProxy = this.getProxy(PageMineProxy);

    protected initViewData(): void {
        this.pageMineProxy.api_user_var_backwater_trial();
        PanelUtil.getProxy_selfproxy.api_user_show_var([3, 4, 5, 6]);
        if (GlobalVar.instance.isNullUser) {
            this.pageMineProxy.api_plat_var_vip_config();
        }
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_show_var,
            net.EventType.api_user_var_backwater_trial,
            net.EventType.api_user_var_backwater_trial_receive,
            net.EventType.api_plat_var_vip_config,
            core.EventType.REQUEST_END,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageMineProxy = getProxy(PageMineProxy);
        switch (notification.getName()) {
            case net.EventType.api_user_show_var:
                myProxy.pageInit(body);
                break;
            case net.EventType.api_user_var_backwater_trial:
                myProxy.setTrial(body);
                break;
            case net.EventType.api_user_var_backwater_trial_receive:
                console.warn(body);
                PanelUtil.message_success("领取成功");
                myProxy.api_user_var_backwater_trial();
                break;
            case core.EventType.REQUEST_END:
                myProxy.getTrialTime(body);
                break;
            case net.EventType.api_plat_var_vip_config:
                myProxy.setVipConfig(body);
                break;

        }
    }
}
