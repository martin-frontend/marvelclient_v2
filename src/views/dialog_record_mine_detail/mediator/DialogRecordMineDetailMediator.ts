import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogRecordMineDetailProxy from "../proxy/DialogRecordMineDetailProxy";
import getProxy from "@/core/global/getProxy";

export default class DialogRecordMineDetailMediator extends AbstractMediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy: DialogRecordMineDetailProxy = getProxy(DialogRecordMineDetailProxy);
        switch (notification.getName()) {
            case "test":
                break;
        }
    }
}
