import { objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import PanelUtil from "@/_skin030/core/PanelUtil";

export default class DialogDirectlyPasswordProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyPasswordProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
    };
    playerInfo = {
        user_id: 0,
    };
    formData = {
        user_id: core.user_id,
        direct_user_id: 0,
        inputrate: "",
        password: "",
        password_confirm: "",
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.playerInfo, {
            user_id: 0,
            nick_name: "",
            credit_rate: 0, //当前占比
            parent_credit_rate: 0, //当前直属上级信用占比
        });
        Object.assign(this.formData, {
            direct_user_id: 0,
            inputrate: "",
            password: "",
            password_confirm: "",
        });
    }

    setData(data: any) {
        this.resetQuery();
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.playerInfo, data);
    }

    agent_direct_user_update() {
        PanelUtil.showAppLoading(true);
        const formData = {
            user_id: core.user_id,
            direct_user_id: this.playerInfo.user_id,
            password: core.MD5.createInstance().hex_md5(this.formData.password),
            password_confirm: core.MD5.createInstance().hex_md5(this.formData.password_confirm),
        };
        console.log("发送的信息为", formData);
        this.sendNotification(net.HttpType.api_user_var_agent_direct_user_update, objectRemoveNull(formData));
    }

    //回调
    agent_direct_user_update_callback(msg: any = null) {
        const str = LangUtil("设置成功");
        PanelUtil.showAppLoading(false);
        PanelUtil.message_alert({
            message: str,
            okFun: () => {
                this.pageData.bShow = false;
                MultDialogManager.onClosePanel();
            },
        });
    }
}
