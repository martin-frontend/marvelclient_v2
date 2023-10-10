import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageGamePlayProxy from "../proxy/PageGamePlayProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class PageGamePlayMediator extends AbstractMediator {
    onRegister() {
        PanelUtil.showAppLoading(false);
    }

    onRemove() {
        this.facade.removeProxy(PageGamePlayProxy.NAME);
    }

    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageGamePlayProxy = getProxy(PageGamePlayProxy);
        // switch(notification.getName()){}
    }
}
