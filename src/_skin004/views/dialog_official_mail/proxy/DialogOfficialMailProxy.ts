import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import dialog_message from "@/views/dialog_message";

export default class DialogOfficialMailProxy extends puremvc.Proxy {
    static NAME = "DialogOfficialMailProxy";

    pageData = {
        loading: false,
        bShow: false,
    };

    copyMail() {
        CopyUtil(LangUtil("官方邮箱地址"));
        dialog_message.info(LangUtil("复制成功"));
    }
}
