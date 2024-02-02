import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogActivityRankProxy from "../proxy/DialogActivityRankProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogActivityRankMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [
            net.EventType.api_plat_activity_var,
            net.EventType.api_plat_activity_index_rank_list,
            net.EventType.api_plat_activity_index_rank_user_list,
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogActivityRankProxy = getProxy(DialogActivityRankProxy);
        switch (notification.getName()) {
            case net.EventType.api_plat_activity_var:
                myProxy.setData(body);
                break;
            case net.EventType.api_plat_activity_index_rank_list:
                myProxy.setRankListData(body);
                break;
            case net.EventType.api_plat_activity_index_rank_user_list:
                myProxy.setRankUserListData(body);
                break;
        }
    }
}
