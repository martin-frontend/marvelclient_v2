import SelfProxy from "@/proxy/SelfProxy";
import router from "@/router";
import dialog_message_box from "@/_skin101/views/dialog_message_box";
import LangUtil from "@/core/global/LangUtil";

import dialog_real_name from "@/_skin101/views/dialog_real_name";
import dialog_safety_center from "@/_skin101/views/dialog_safety_center";

export default class RequestErrorCMD extends puremvc.SimpleCommand {
    execute(notification: puremvc.INotification) {
        const body = notification.getBody();
        const { result } = body;
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

            if (ERROR_CODE_ACCOUNT.includes(result.status)) {
                if (core.user_id) {
                    selfProxy.loginout();
                    router.push("/").catch((err: any) => err);
                }
                dialog_message_box.alert({
                    message: body.result.msg,
                    okFun: () => {
                        if (result.status != 1100143) location.reload();
                    },
                });
            } else if (ERROR_CODE_REGISTER_FAIL.includes(result.status)) {
                dialog_message_box.alert(body.result.msg);
            } else if (ERROR_CODE_PHONE.includes(result.status)) {
                // TODO 绑定手机
                dialog_message_box.alert(body.result.msg);
            } else if (ERROR_CODE_REAL_NAME.includes(result.status)) {
                // dialog_message_box.alert(body.result.msg);
                dialog_message_box.confirm({ message: body.result.msg, okFun: dialog_real_name.show });
            } else if (ERROR_CODE_PLAY_GAME.includes(result.status)) {
                dialog_message_box.alert(body.result.msg);
            } else {
                dialog_message_box.alert(body.result.msg);
            }
        } else {
            dialog_message_box.alert(LangUtil("未知错误"));
        }
    }
}
