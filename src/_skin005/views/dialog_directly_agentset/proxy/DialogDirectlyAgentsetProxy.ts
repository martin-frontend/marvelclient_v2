/*
 * @Author: custer
 * @Date: 2023-04-12 09:57:51
 * @LastEditors: custer
 * @LastEditTime: 2023-10-02 21:17:39
 */
import { objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import MultDialogManager from "@/_skin005/core/MultDialogManager";
import PanelUtil from "@/_skin005/core/PanelUtil";
export default class DialogDirectlyAgentsetProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyAgentsetProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },

        form: {
            credit_rate: 0,
            credit_rate_invited: 0,
        },
    };
    playerInfo = {
        user_id: 0,
        nick_name: "",
        credit_rate: 0, //当前占比
        parent_credit_rate: "", //当前直属上级信用占比

        credit_rate_min: 0, // 信用占比-最小
        credit_rate_max: 0, // 信用占比-最大
        credit_rate_invited: 0, // 上级占比
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

        // this.playerInfo.credit_rate_min = 50;
        // this.playerInfo.credit_rate_max = 80;
        //this.formData.inputrate = this.playerInfo.agent_rate *10000 /100;
    }

    agent_direct_user_update(_credit_rate: number) {
        this.pageData.loading = true;
        const formData = {
            user_id: core.user_id,
            direct_user_id: this.playerInfo.user_id,
            //credit_rate: _credit_rate,
            credit_rate: this.pageData.form.credit_rate,
            credit_rate_invited: this.pageData.form.credit_rate_invited.toString(),
        };
        console.log("发送的信息为", formData);
        this.sendNotification(net.HttpType.api_user_var_agent_direct_user_update, objectRemoveNull(formData));
    }
    //回调
    agent_direct_user_update_callback(msg: any = null) {
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
