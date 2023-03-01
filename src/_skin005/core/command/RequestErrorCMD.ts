import LangUtil from "@/core/global/LangUtil";
import SelfProxy from "@/proxy/SelfProxy";
import router from "@/router";
import PanelUtil from "../PanelUtil";

export default class RequestErrorCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        const body = notification.getBody();
        const { result } = body;
        // console.warn(">>>>>>>>>>>>", body);

        if (result) {
            // 错误码：http://18.166.154.73:8090/pages/viewpage.action?pageId=66089
            // 账号异常
            const ERROR_CODE_ACCOUNT = [10102, 10103, 10104, 10123, 10124, 10125, 10126, 10127, 10128, 10129, 10130, 10129, 1100143, 1100173];
            // 需要绑定手机
            const ERROR_CODE_PHONE = [11002126, 1100139];
            //设置真实姓名
            const ERROR_CODE_REAL_NAME = [1106014];
            //游戏进入失败
            const ERROR_CODE_PLAY_GAME = [1102136, 1102128];
            //注册失败
            const ERROR_CODE_REGISTER_FAIL = [1100114, 1100119, 1100117];
            //无权限查询
            const ERROR_CODE_NO_PERMISSION = [1103315];

            const selfProxy: SelfProxy = <any>this.facade.retrieveProxy(SelfProxy.NAME);

            console.log(" 错误 ");
            PanelUtil.showAppLoading(false);
            if (ERROR_CODE_ACCOUNT.includes(result.status)) {
                if (core.user_id) {
                    selfProxy.loginout();
                    router.push("/").catch((err: any) => err);
                }
                PanelUtil.message_alert({
                    message: body.result.msg,
                    okFun: () => {

                        if (result.status == 1100143)
                        {
                            return;
                        }

                        if (result.status != 1100143 || result.status != 1100173) 
                            PanelUtil.openpage_home();
                            location.reload();
                        
                    },
                });
            } else if (ERROR_CODE_REGISTER_FAIL.includes(result.status)) {
                PanelUtil.message_alert(body.result.msg);
            } else if (ERROR_CODE_PHONE.includes(result.status)) {
                // TODO 绑定手机
                PanelUtil.message_alert(body.result.msg);
            } else if (ERROR_CODE_REAL_NAME.includes(result.status)) {
                PanelUtil.message_confirm({ message: body.result.msg, okFun: PanelUtil.openpanel_real_name});
            } else if (ERROR_CODE_PLAY_GAME.includes(result.status)) {
                PanelUtil.message_alert(body.result.msg);
            } else if (ERROR_CODE_NO_PERMISSION.includes(result.status)) {
                PanelUtil.message_alert(LangUtil("该用户ID无权限查询"));
            } else {
                PanelUtil.message_alert(body.result.msg);
            }
        } else {
            PanelUtil.message_alert(LangUtil("未知错误"));
        }
    }
}
