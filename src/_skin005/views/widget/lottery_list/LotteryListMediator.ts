import getProxy from "@/core/global/getProxy";
import LotteryListProxy from "./LotteryListProxy";

export default class LotteryListMediator extends puremvc.Mediator {
    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {}
}
