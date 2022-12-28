import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageMineProxy from "../proxy/PageMineProxy";
import getProxy from "@/core/global/getProxy";
import SelfProxy from "@/proxy/SelfProxy";
import dialog_message from "@/views/dialog_message";

export default class PageMineMediator extends AbstractMediator {
    private pageMineProxy: PageMineProxy = this.getProxy(PageMineProxy);

    protected initViewData(): void {
        this.pageMineProxy.api_user_var_backwater_trial();
        const selfProxy: SelfProxy = getProxy(SelfProxy);
        selfProxy.api_user_show_var([3, 4, 5, 6]);
    }

    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_user_show_var,
            net.EventType.api_user_var_backwater_trial,
            net.EventType.api_user_var_backwater_trial_receive,
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
                dialog_message.success("领取成功");
                myProxy.api_user_var_backwater_trial();
                break;
            case core.EventType.REQUEST_END:
                myProxy.getTrialTime(body);
                break;
        }
    }
}
