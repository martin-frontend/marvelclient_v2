import AbstractMediator from "@/core/abstract/AbstractMediator";
import DialogDirectlyEasybetsetProxy from "../proxy/DialogDirectlyEasybetsetProxy";
import getProxy from "@/core/global/getProxy";
import SelfProxy from "@/proxy/SelfProxy";

export default class DialogDirectlyEasybetsetMediator extends AbstractMediator{

    onRegister(){
        const myPlayerProxy:SelfProxy = getProxy(SelfProxy);
        const myProxy:DialogDirectlyEasybetsetProxy = getProxy(DialogDirectlyEasybetsetProxy);
        myProxy.playerInfo.gold_info = myPlayerProxy.userInfo.gold_info;
        myProxy.playerInfo.user_id = <any>myPlayerProxy.userInfo.user_id;
        myProxy.playerInfo.nick_name = <any>myPlayerProxy.userInfo.nick_name;

    }    

    public listNotificationInterests(): string[] {
        return [];
    }

    public handleNotification(notification: puremvc.INotification): void {
        const body = notification.getBody();
        const myProxy:DialogDirectlyEasybetsetProxy = getProxy(DialogDirectlyEasybetsetProxy);

    }
}