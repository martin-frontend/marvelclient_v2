import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogEditRemarkProxy extends puremvc.Proxy {
    static NAME = "DialogEditRemarkProxy";
    playerInfo = {
        user_id: 0,
        nick_name: "",
        plat_id: "",
        remark: "",
    };
    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
        list: [],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        Object.assign(this.playerInfo, data);
    }
    //更新 备注的值
    agent_direct_user_update(msg: any) {
        this.pageData.loading = true;
        const formData = {
            user_id: core.user_id,
            agent_user_id: this.playerInfo.user_id,
            remark: msg,
        };
        this.sendNotification(net.HttpType.api_user_var_agent_var_update, formData);
        //this.pageData.bShow = false;
    }
    update_callback(data: any = null) {
        const str = LangUtil("设置成功");

        PanelUtil.message_alert({
            message: str,
            okFun: () => {
                this.pageData.bShow = false;
                MultDialogManager.onClosePanel();
            },
        });
    }
}
