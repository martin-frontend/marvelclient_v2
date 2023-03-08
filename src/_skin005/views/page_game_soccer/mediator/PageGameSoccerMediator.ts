import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageGameSoccerProxy from "../proxy/PageGameSoccerProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class PageGameSoccerMediator extends AbstractMediator{

    onRegister(){
        PanelUtil.showAppLoading(false);
    }

    onRemove(){
        this.facade.removeProxy(PageGameSoccerProxy.NAME);
    }

    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:PageGameSoccerProxy = getProxy(PageGameSoccerProxy);
        // switch(notification.getName()){}
    }
}