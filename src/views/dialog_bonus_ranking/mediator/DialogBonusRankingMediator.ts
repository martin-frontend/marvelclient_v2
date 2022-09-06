import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogBonusRankingProxy from "../proxy/DialogBonusRankingProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogBonusRankingMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogBonusRankingProxy = getProxy(DialogBonusRankingProxy);
    }
}
