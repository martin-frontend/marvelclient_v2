import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class DialogOfficialMailProxy extends puremvc.Proxy {
    static NAME = "DialogOfficialMailProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
    };

    copyMail() {
        CopyUtil(LangUtil("官方邮箱地址"));
        PanelUtil.message_info(LangUtil("复制成功"));
    }
}
