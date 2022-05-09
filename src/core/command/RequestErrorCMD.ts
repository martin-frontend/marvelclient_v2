import SelfProxy from "@/proxy/SelfProxy";
import GameProxy from "@/proxy/GameProxy";
// import LobbyProxy from "@/views/Main/game/proxy/LobbyProxy";
import router from "@/router";
import Message from "@/views/common/proxy/MessageProxy";
import GlobalVar from "../global/GlobalVar";

export default class RequestErrorCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        const body = notification.getBody();
        const { result } = body;
        // const net_status = GlobalVar.net_status;

        // console.warn(">>>>>>>>>>>>", body);

        if (result) {
            // 错误码：http://18.166.154.73:8090/pages/viewpage.action?pageId=66089
            // 账号异常
            const ERROR_CODE_ACCOUNT = [10102, 10103, 10104, 10123, 10124, 10125, 10126, 10127, 10128, 10129, 10130, 10129, 1100143];
            // 需要绑定手机
            const ERROR_CODE_PHONE = [11002126, 1100139];
            //设置真实姓名
            const ERROR_CODE_REAL_NAME = [1106014];
            //游戏进入失败
            const ERROR_CODE_PLAY_GAME = [1102136, 1102128];
            //注册失败
            const ERROR_CODE_REGISTER_FAIL = [1100114, 1100119, 1100117];

            const selfProxy: SelfProxy = <any>this.facade.retrieveProxy(SelfProxy.NAME);
            const gameProxy: GameProxy = <any>this.facade.retrieveProxy(GameProxy.NAME);
            // const lobbyProxy: LobbyProxy = <any>this.facade.retrieveProxy(LobbyProxy.NAME);

            //

            if (ERROR_CODE_ACCOUNT.includes(result.status)) {
                if (core.user_id) {
                    selfProxy.loginout();
                    // lobbyProxy.loginDialog.bShow = true;
                    Message.show(body.result.msg);
                    router.push("/").catch((err: any) => err);
                } else {
                    // net_status.headerLoading = false;
                    Message.show(body.result.msg);
                }
            } else if (ERROR_CODE_REGISTER_FAIL.includes(result.status)) {
                Message.show(body.result.msg);
                // selfProxy.api_user_register_auth_code();
            } else if (ERROR_CODE_PHONE.includes(result.status)) {
                // headerProxy.confirmBind.bShow = true;
            } else if (ERROR_CODE_REAL_NAME.includes(result.status)) {
                Message.show(body.result.msg);
                // lobbyProxy.loginDialog.bShow = false;
            } else if (ERROR_CODE_PLAY_GAME.includes(result.status)) {
                Message.show(body.result.msg);
            } else {
                // net_status.headerLoading = false;
                Message.show(body.result.msg);
            }
        } else {
            Message.show(body.result.msg);
        }
    }
}
