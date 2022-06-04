import { objectRemoveNull } from "@/core/global/Functions";
import getProxy from "@/core/global/getProxy";
import DialogPromotionFloorProxy from "@/views/dialog_promotion_floor/proxy/DialogPromotionFloorProxy";
import dialog_promotion_floor from "@/views/dialog_promotion_floor";

export default class DialogDirectlyProxy extends puremvc.Proxy {
    dialogPromotionFloorProxy: DialogPromotionFloorProxy = getProxy(DialogPromotionFloorProxy);
    static NAME = "DialogDirectlyProxy";

    /**参数 */
    parameter: any = {
        user_id: 0,
        agent_user_id: 0,
        page_size: 20,
        page_count: 1,
        start_date: null,
        end_date: null,
    };

    pageData = {
        enable_set_promotion_floor: 0, // 是否可以为直属设置保底 0-否|1-是
        loading: false,
        bShow: false,
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            page_count: 1,
            page_size: 20,
        },
        list: <any>[],
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 0,
        },
        search: "",
    };

    /**进入页面时调用 */
    enter() {}

    /**离开页面时调用 */
    leave() {}

    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
    }

    setData(data: any) {
        this.pageData.enable_set_promotion_floor = data.enable_set_promotion_floor;
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        this.pageData.list = data.list;
    }

    setFloorRangeData(agent_user_id: number, val: number) {
        this.parameter.agent_user_id = agent_user_id;
        this.dialogPromotionFloorProxy.setSelectedFloorData(this.parameter.agent_user_id, val);
        dialog_promotion_floor.show();
    }

    /**--代理推广--直属成员*/
    api_user_var_agent_direct_list() {
        this.pageData.loading = true;
        this.parameter.user_id = core.user_id;
        this.sendNotification(net.HttpType.api_user_var_agent_direct_list, objectRemoveNull({ ...this.parameter }));
    }

    /**--代理推广--直属保底范围查询*/
    // api_user_var_agent_var_floor_range(agent_user_id: any) {
    //     this.parameter.agent_user_id = agent_user_id;
    //     this.dialogPromotionFloorProxy.parameter.agent_user_id = agent_user_id;
    //     this.sendNotification(net.HttpType.api_user_var_agent_var_floor_range, {
    //         user_id: core.user_id,
    //         agent_user_id: agent_user_id,
    //     });
    // }
}
