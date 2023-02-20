import { objectRemoveNull } from "@/core/global/Functions";
import Vue from "vue";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogDirectlyProxy extends puremvc.Proxy {
    static NAME = "DialogDirectlyProxy";

    /**参数 */
    parameter: any = {
        user_id: 0,
        agent_user_id: 0,
        direct_user_id: 0,
        page_size: 20,
        page_count: 1,
    };

    limitinfo = {
        enable_all:0, // 是否显示注册直属、设置信用占比、加款、扣款、设置流水、设置盘口 0-不能|1-能
        enable_credit_rate:0, // 是否显示设置信用占比 0-不能|1-能
        is_credit_user:0,
    }
    pageData = {
        enable_set_promotion_floor: 0, // 是否可以为直属设置保底 0-否|1-是
        loading: false,
        bShow: false,
        bHidden:false, //暂时隐藏
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
        Object.assign(this.limitinfo, {
            enable_all:0, // 是否显示注册直属、设置信用占比、加款、扣款、设置流水、设置盘口 0-不能|1-能
            enable_credit_rate:0, // 是否显示设置信用占比 0-不能|1-能
        });
        this.pageData.search = "";
        this.parameter.direct_user_id = "";
    }

    setTestData()
    {
        const obj = {
            "user_id": 30000522,
        "invite_user_id": 30000336,
        "directly_users": 0,
        "group_users": 0,
        "binded_at": "2022-11-17 16:13:43",
        "remark": "是谁",
        "bind_phone": 0,
        "nick_name": "30000522",
        "status": 1,
        "username": "nicotest99",
        "credit_rate": "-",
        "show_credit_set": 98,
        "water_config": {
            "0": 0,
            "2": 0,
            "4": 0,
            "8": 0,
            "16": 0,
            "32": 0,
            "64": 0,
            "128": 0
        },
        "bet_gold": "$0",
        "win_gold": "$0",
        "is_promotion_floor": 0,
        "promotion_floor": [],
        enable_set_promotion_floor:1,
        "recharge_gold": "0.00"
        }

        const list = <any>[];
        for (let index = 0; index < 30; index++) {
            list.push(obj);
        }
        return list;
    }
    setData(data: any) {
        this.pageData.enable_set_promotion_floor = data.enable_set_promotion_floor;
        //this.pageData.enable_set_promotion_floor = 1;
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        Object.assign(this.limitinfo, data.limit);
        const vuetify = Vue.vuetify;
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

        //this.pageData.list =this.setTestData();
    }

    setFloorRangeData(agent_user_id: number, val: number) {
        this.parameter.agent_user_id = agent_user_id;
        this.api_user_var_agent_var_floor_range()
        PanelUtil.getProxy_promotion_floor.setSelectedFloorData(this.parameter.agent_user_id, val);
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

        this.sendNotification(net.HttpType.api_user_var_agent_direct_list, objectRemoveNull({ ...this.parameter }));
    }

    /**--代理推广--直属保底范围查询*/
    api_user_var_agent_var_floor_range() {
        this.sendNotification(net.HttpType.api_user_var_agent_var_floor_range, this.parameter);
    }
}
