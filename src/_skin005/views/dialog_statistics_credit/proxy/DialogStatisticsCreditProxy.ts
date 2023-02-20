import { dateFormat, getTodayOffset, objectRemoveNull } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
import Vue from "vue";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class DialogStatisticsCreditProxy extends puremvc.Proxy {
    static NAME = "DialogStatisticsCreditProxy";
    gameProxy = PanelUtil.getProxy_gameproxy;
    isOpenWalletMenu = false;
    userList = <any>[]; //用于存储所有当前查询代理链的信息
    pageData = {
        loading: false,
        bShow: false,
        bHidden:false, //暂时隐藏
        //如果是列表，使用以下数据，否则删除
        listQuery: {
            user_id: 0,
            start_date: "",
            end_date: "",
            coin_name_unique: "", //币种
            page_count: 1,
            page_size: 20,
            target_user_id: 0,
        },
        list: <any>[],
        bind_relation: "",
        summary: {
            record_count: 0,
            bet_gold: "",
            win_gold: "",
            water: "",
            back_water: "",
            agent_amount: "", //代理商金额
            credit_rate: "",
            user_id: "-",
            plat_amount: "", //上交金额
            group_users: "", //团队成员
            directly_users: "", //直属成员
        },
        agent: {
            record_count: 0,
            bet_gold: "",
            win_gold: "",
            water: "",
            back_water: "",
            agent_amount: "", //代理商金额
            credit_rate: "",
            user_id: "-",
            plat_amount: "", //上交金额
            group_users: "", //团队成员
            directly_users: "", //直属成员
        },
        pageInfo: {
            pageCurrent: 1,
            pageCount: 1,
            pageSize: 20,
            pageTotal: 9,
        },
        //加载完毕后调用，手机模式专用
        done: <any>null,
        finished: false,
    };

    coin_name_unique = "";

     /**进入页面时调用 */
     enter() { 
        console.log(" 进入 ---");
        //this.onInit();
    }

    /**离开页面时调用 */
    leave() { 

        console.log("离开页面----");
    }

    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        Object.assign(this.pageData.listQuery, {
            start_date: "",
            end_date: "",
            coin_name_unique: "", //币种
            page_count: 1,
            page_size: 20,
            target_user_id: 0,
        });
    }
    setcoin_name_unique() {
        this.coin_name_unique = this.gameProxy.coin_name_unique;
    }
    reseData() {
        console.log("重置数据");
        this.coin_name_unique = "";
        this.pageData.list = [];
        this.clearUserList();
    }

    public get userListInfo(): any {
        // if(this.userList.length > 0)
        //     return this.userList;
        // this.userList.push(core.user_id);
        return this.userList;
    }

    addUserList(userid: any) {
        // if(this.userList.length <= 0)
        // {
        //     this.userList.push(core.user_id);
        // }
        //检查 当前id是否 包含在 数组中
        if (this.userList.indexOf(userid) != -1) {
            return;
        }

        this.userList.push(userid);
    }
    removeUserList(userid: any) {
        const res = this.userList.indexOf(userid);
        if (res == -1) {
            return;
        }

        this.userList = this.userList.slice(0, res);
    }
    clearUserList() {
        this.userList = [];
    }
    //设置当前账号的数据
    addAgentData(data: any) {
        const agentdata = JSON.parse(JSON.stringify(data.agent));
        this.pageData.list.unshift(agentdata);
    }

    setData(data: any) {
        this.pageData.loading = false;
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.pageInfo, data.pageInfo);
        Object.assign(this.pageData.summary, data.summary);
        Object.assign(this.pageData.agent, data.agent);
        this.pageData.bind_relation = data.bind_relation;

        const vuetify = Vue.vuetify;
        if (vuetify.framework.breakpoint.mobile) {
            const { pageCount, pageCurrent } = this.pageData.pageInfo;
            if (pageCurrent == 1) {
                this.pageData.list = data.list;
                this.addAgentData(data);
            } else {
                this.pageData.list.push(...data.list);
            }
            this.pageData.finished = pageCurrent >= pageCount;
            this.pageData.done && this.pageData.done();
        } else {
            this.pageData.list = JSON.parse(JSON.stringify(data.list));
            //this.pageData.list = data.list;
            // if (this.pageData.pageInfo.pageCurrent == 1) {
            //     this.addAgentData(data);
            // }
        }

        this.removeUserList(this.pageData.agent.user_id);
        this.addUserList(this.pageData.agent.user_id);
    }

    /**手机下拉刷新 */
    listRefrush(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_credit_statistic();
    }
    /**手机上拉加载更多 */
    listMore(done: any) {
        this.pageData.done = done;
        this.pageData.listQuery.page_count++;
        this.api_user_var_credit_statistic();
    }

    api_user_var_credit_statistic(userid: any = null) {
        this.pageData.loading = true;
        if (userid) {
            this.pageData.listQuery.target_user_id = userid;
        } else {
            this.pageData.listQuery.target_user_id = core.user_id;
        }
        this.pageData.listQuery.user_id = core.user_id;
        this.pageData.listQuery.coin_name_unique = this.coin_name_unique;
        this.sendNotification(net.HttpType.api_user_var_credit_statistic, objectRemoveNull(this.pageData.listQuery));
    }

    //错误的回调
    showErrorMsg(msg: any = null) {
        if (!msg) {
            msg = LangUtil("您无权查看该用户的信用统计！");
        }
        PanelUtil.message_alert({ message: msg, okFun: () => { } });
    }

    onInit() {
        console.log("初始化------1")
        const start = getTodayOffset(-6);
        const end = getTodayOffset(1, 1);
        this.setcoin_name_unique();

        const startDate: any = start;
        const endDate: any = end;
        if (startDate) {
            this.pageData.listQuery.start_date = dateFormat(startDate, "yyyy-MM-dd hh:mm:ss");
        } else {
            this.pageData.listQuery.start_date = "";
        }
        if (endDate) {
            this.pageData.listQuery.end_date = dateFormat(endDate, "yyyy-MM-dd hh:mm:ss");
        } else {
            this.pageData.listQuery.end_date = "";
        }
        this.pageData.listQuery.page_count = 1;
        this.api_user_var_credit_statistic();
    }
}
