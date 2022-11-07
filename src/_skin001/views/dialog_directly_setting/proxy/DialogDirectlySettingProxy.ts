import { objectRemoveNull } from "@/core/global/Functions";
export default class DialogDirectlySettingProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlySettingProxy";
    playerInfo = {
        user_id:0,
        nick_name:"",
        plat_id:"",
        status:"98"
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
    }

    //查询 当前直属用户的 信息
    api_user_var_fetch_direct_user_info(direct_user_id:any) {
        this.pageData.loading = true;
        const data = {
            user_id: core.user_id,
            direct_user_id:direct_user_id,
        };
        this.sendNotification(net.HttpType.api_user_var_fetch_direct_user_info, objectRemoveNull(data));
    }

    agent_direct_user_update() {
        this.pageData.loading = true;
        const formData= {
            user_id: core.user_id,
            direct_user_id:this.playerInfo.user_id,
            account_status:this.playerInfo.status,
        }
        this.sendNotification(net.HttpType.api_user_var_agent_direct_user_update, objectRemoveNull(formData));
    }
}
