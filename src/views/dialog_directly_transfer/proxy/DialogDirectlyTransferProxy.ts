import dialog_message_box from "@/views/dialog_message_box";
import { objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";

export default class DialogDirectlyTransferProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyTransferProxy";
    isOpenWalletMenu: boolean = false;

    playerInfo = {
        user_id: 0,
        nick_name: "",
        gold_info:<any>{},
        
        state: "98"
    }
    
    formData= {
        user_id: core.user_id,
        direct_user_id:0,
        gold:"",
        coin_name_unique:"",
    }

    pageData = {
        loading: false,
        bShow: false,
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

        Object.assign(this.formData, {
            direct_user_id:0,
            gold:"",
            coin_name_unique:"",
        });

        const coinKeys = Object.keys(this.playerInfo.gold_info);
        this.formData.coin_name_unique = coinKeys[0];
        this.formData.direct_user_id = this.playerInfo.user_id;
    }
    /**离开页面时调用 */
    leave() { 
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });

    }
    // 直属扣款 信息
    api_user_var_agent_direct_deduction()
    {
        this.pageData.loading = true;
        this.sendNotification(net.HttpType.api_user_var_agent_direct_deduction, objectRemoveNull(this.formData));
    }

    //扣款的回调
    agent_direct_deduction_call_back(msg:any)
    {
        const str = LangUtil("扣款成功！金额：{0} {1}！",msg.actual_deduction_gold,msg.coin_name_unique )
        dialog_message_box.alert({message: str, okFun: ()=>{
            this.pageData.bShow = false;
        }});
    }
}
