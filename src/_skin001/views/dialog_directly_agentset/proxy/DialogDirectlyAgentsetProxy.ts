import dialog_message_box from "@/views/dialog_message_box";
import { objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
export default class DialogDirectlyAgentsetProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyAgentsetProxy";

    pageData = {
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
    };
    playerInfo = {
        user_id: 0,
        nick_name: "",
        credit_rate: 0, //当前占比
        parent_credit_rate: "", //当前直属上级信用占比
    };

    formData = {
        user_id: core.user_id,
        direct_user_id: 0,
        inputrate: "",
    };
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
        Object.assign(this.playerInfo, {
            user_id: 0,
            nick_name: "",
            credit_rate: 0, //当前占比
            parent_credit_rate: 0, //当前直属上级信用占比
        });
        Object.assign(this.formData, {
            direct_user_id: 0,
            inputrate: "",
        });
    }

    setData(data: any) {
        this.pageData.loading = false;
        this.resetQuery();
        Object.assign(this.playerInfo, data);

        //this.formData.inputrate = this.playerInfo.agent_rate *10000 /100;
    }

    agent_direct_user_update(_credit_rate: number) {
        this.pageData.loading = true;
        const formData = {
            user_id: core.user_id,
            direct_user_id: this.playerInfo.user_id,
            credit_rate: _credit_rate,
        };
        this.sendNotification(net.HttpType.api_user_var_agent_direct_user_update, objectRemoveNull(formData));
    }
    //回调
    agent_direct_user_update_callback(msg: any = null) {
        const str = LangUtil("设置成功");
        dialog_message_box.alert({
            message: str,
            okFun: () => {
                this.pageData.bShow = false;
            },
        });
    }
}
