import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "../PanelUtil";

export default function LoginEnter(fun: any) {
    if (core.user_id) {
        fun();
    } else {
        PanelUtil.message_confirm({
            message: LangUtil("请您登录游戏"),
            okFun: PanelUtil.openpanel_login,
        });
    }
}
