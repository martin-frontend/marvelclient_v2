import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogBindInviteProxy extends puremvc.Proxy {
    static NAME = "DialogBindInviteProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        inviteId: "",
    };

    setData(data: any) {
        this.pageData.loading = false;
    }

    hide() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }
    /**--会员资料--修改用户基本信息*/
    api_user_update_var(data: any) {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_update_var, {
            ...data,
            user_id: core.user_id,
        });
    }
    api_user_var_invite_user_info(data: any) {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_invite_user_info, {
            ...data,
            user_id: core.user_id,
        });
    }
    api_user_var_invite_user_info_callback(msg: any = null) {
        if (msg && msg.is_credit_user == 1) {
            PanelUtil.message_confirm({
                message: LangUtil("您绑定的上级是信用代理，绑定后不能充值和提现，确定绑定吗？"),
                okFun: () => {
                    this.api_user_update_var({ invite_user_id: this.pageData.inviteId });
                },
            });
        } else {
            this.api_user_update_var({ invite_user_id: this.pageData.inviteId });
        }
    }
}
