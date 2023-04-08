import { objectRemoveNull } from "@/core/global/Functions";
import PanelUtil from "@/_skin005/core/PanelUtil";

import Vue from "vue";
export default class DialogAgentManagerProxy extends puremvc.Proxy {
    static NAME = "DialogAgentManagerProxy";

    dialogPromotionFloorProxy = PanelUtil.getProxy_promotion_floor;
    /**参数 */
    parameter: any = {
        user_id: 0,
        status: "",
        agent_user_id: 0,
        direct_info: 0,
        page_size: 20,
        page_count: 1,
    };
    checkboxValue = ["1"]; //用户筛选的值，

    limitinfo = {
        enable_all: 0, // 是否显示注册直属、设置信用占比、加款、扣款、设置流水、设置盘口 0-不能|1-能
        enable_credit_rate: 0, // 是否显示设置信用占比 0-不能|1-能
        is_credit_user: 0,
    };
    pageData = {
        enable_set_promotion_floor: 0, // 是否可以为直属设置保底 0-否|1-是
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
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
    enter() {
        this.resetQuery();
        this.api_user_var_agent_direct_list();
    }

    /**离开页面时调用 */
    leave() {}

    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            page_count: 1,
            page_size: 20,
        });
        Object.assign(this.limitinfo, {
            enable_all: 0, // 是否显示注册直属、设置信用占比、加款、扣款、设置流水、设置盘口 0-不能|1-能
            enable_credit_rate: 0, // 是否显示设置信用占比 0-不能|1-能
        });
        this.pageData.search = "";
        this.parameter.direct_info = "";
    }

    setData(data: any) {
        this.pageData.enable_set_promotion_floor = data.enable_set_promotion_floor;
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        Object.assign(this.limitinfo, data.limit);

        if (window.$mobile) {
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
        this.api_user_var_agent_var_floor_range();
        this.dialogPromotionFloorProxy.setSelectedFloorData(this.parameter.agent_user_id, val);
        PanelUtil.openpanel_promotion_floor();
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
        this.parameter.status = JSON.stringify(this.checkboxValue);
        this.sendNotification(net.HttpType.api_user_var_agent_direct_list, objectRemoveNull({ ...this.parameter }));
    }

    /**--代理推广--直属保底范围查询*/
    api_user_var_agent_var_floor_range() {
        this.sendNotification(net.HttpType.api_user_var_agent_var_floor_range, this.parameter);
    }

    //查询 当前直属用户的 信息
    api_user_var_fetch_direct_user_info(direct_user_id: any = null) {
        this.pageData.loading = true;
        if (!direct_user_id) {
            direct_user_id = core.user_id;
        }
        const data = {
            user_id: core.user_id,
            direct_user_id: direct_user_id,
        };
        this.sendNotification(net.HttpType.api_user_var_fetch_direct_user_info, objectRemoveNull(data));
    }

    search(info: string) {
        this.pageData.loading = true;
        this.pageData.list = [];
        this.parameter.direct_info = info;
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_agent_direct_list();
    }
}
