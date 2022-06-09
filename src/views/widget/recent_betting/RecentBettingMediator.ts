import AbstractMediator from "@/core/abstract/AbstractMediator";
import getProxy from "@/core/global/getProxy";
import RecentBettingProxy from "./RecentBettingProxy";

export default class RecentBettingMediator extends AbstractMediator{
    public listNotificationInterests(): string[] {
        return [net.EventType.api_plat_var_recently_bet_info]
    }
    
    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:RecentBettingProxy = getProxy(RecentBettingProxy);
        switch(notification.getName()){
            case net.EventType.api_plat_var_recently_bet_info:
                myProxy.setData(body);
                break;
        }
    }
}