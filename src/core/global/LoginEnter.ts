import dialog_login from "@/_skin100/views/dialog_login";
import dialog_message_box from "@/_skin100/views/dialog_message_box";
import LangUtil from "@/core/global/LangUtil";

export default function LoginEnter(fun: any) {
    if (core.user_id) {
        fun();
    } else {
        dialog_message_box.confirm({
            message: LangUtil("请您登录游戏"),
            okFun: dialog_login.show,
        });
    }
}
