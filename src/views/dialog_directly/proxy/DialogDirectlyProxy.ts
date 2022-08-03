import { objectRemoveNull } from "@/core/global/Functions";
import getProxy from "@/core/global/getProxy";
import DialogPromotionFloorProxy from "@/views/dialog_promotion_floor/proxy/DialogPromotionFloorProxy";
import dialog_promotion_floor from "@/views/dialog_promotion_floor";
import { getVuetify } from "@/plugins/vuetify";

export default class DialogDirectlyProxy extends puremvc.Proxy {
    dialogPromotionFloorProxy: DialogPromotionFloorProxy = getProxy(DialogPromotionFloorProxy);
    static NAME = "DialogDirectlyProxy";

    /**参数 */
    parameter: any = {
        user_id: 0,
        agent_user_id: 0,
        direct_user_id: 0,
        page_size: 20,
        page_count: 1,
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
        buttonActive: false,
        // 列表是否加载完成，手机模式专用
        finished: false,
        done: <any>null,
    };

    /**进入页面时调用 */
    enter() { }

    /**离开页面时调用 */
    leave() { }

    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
        this.pageData.search = "";
        this.parameter.direct_user_id = "";
    }

    setData(data: any) {
        this.pageData.enable_set_promotion_floor = data.enable_set_promotion_floor;
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        const vuetify = getVuetify();
        if (vuetify.framework.breakpoint.xsOnly) {
            const { pageCount, pageCurrent } = this.pageData.pageInfo;
            if (pageCurrent == 1) {
                this.pageData.list = data.list;
            } else {
                this.pageData.list.push(...data.list);
            }
            this.pageData.finished = pageCount == pageCurrent;
            this.pageData.done && this.pageData.done();
        } else {
            this.pageData.list = data.list;
        }
    }

    setFloorRangeData(agent_user_id: number, val: number) {
        this.parameter.agent_user_id = agent_user_id;
        this.api_user_var_agent_var_floor_range()
        this.dialogPromotionFloorProxy.setSelectedFloorData(this.parameter.agent_user_id, val);
        dialog_promotion_floor.show();
    }

    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_agent_direct_list();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_var_agent_direct_list();
    }

    /**--代理推广--直属成员*/
    api_user_var_agent_direct_list() {
        this.pageData.loading = true;
        this.parameter.user_id = core.user_id;
        this.parameter.page_count = this.pageData.listQuery.page_count;

        this.sendNotification(net.HttpType.api_user_var_agent_direct_list, objectRemoveNull({ ...this.parameter }));
    }

    /**--代理推广--直属保底范围查询*/
    api_user_var_agent_var_floor_range() {
        this.sendNotification(net.HttpType.api_user_var_agent_var_floor_range, this.parameter);
    }
}
