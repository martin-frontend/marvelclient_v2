import AbstractMediator from "@/core/abstract/AbstractMediator";
import PageRulesHiddenProxy from "../proxy/PageRulesHiddenProxy";
import getProxy from "@/core/global/getProxy";

export default class PageRulesHiddenMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: PageRulesHiddenProxy = getProxy(PageRulesHiddenProxy);
        //switch(notification.getName()){}
    }
}
