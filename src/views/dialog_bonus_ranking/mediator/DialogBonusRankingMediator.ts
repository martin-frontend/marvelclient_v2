import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogBonusRankingProxy from "../proxy/DialogBonusRankingProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogBonusRankingMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_var_bonus_rank,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogBonusRankingProxy = getProxy(DialogBonusRankingProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_var_bonus_rank:
                myProxy.setData(body);
                break;
        }
    }
}