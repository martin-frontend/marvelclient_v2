import Timezone from "@/core/Timezone";
import { timeText } from "@/core/global/Functions";
import LangUtil from "@/core/global/LangUtil";
export default class DialogActivityRankProxy extends puremvc.Proxy {
    static NAME = "DialogActivityRankProxy";
    refCount = 0;
    timeHandleLoading = 0;
    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        cur_rank_id: 0,
        cur_rank_type: 1, //1:进行中 2:往期
        isRankListLoading: true,
        rank_updata: 0,
        data: <any>{
            last_time_count: 0,
            last_time_txt: "",
            rank_type: 1, // 达成类型 1:有效投注 2:玩家盈利 3:玩家亏损 4:直属推广 5:直属推广(充值) 6:总充值
            activity_desc: "",
            activity_name: "",
            game_list: <any>[],
            start_time: "",
            end_time: "",
        },
        rankList: <any>{
            list: [],
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 20,
                pageTotal: 1,
            },
        },
        rankUserList: <any>{
            list: [],
            my_data: {
                rank: 11,
                reach_num: 1000,
                main_coin: "VNDK",
            },
            pageInfo: {
                pageCurrent: 1,
                pageCount: 1,
                pageSize: 20,
                pageTotal: 1,
            },
        },
    };
    rank_type_map = {
        "1": { title: "有效投注", user: "有效投注" },
        "2": { title: "玩家盈利", user: "盈利" },
        "3": { title: "玩家亏损", user: "亏损" },
        "4": { title: "直属推广", user: "直属推广人数" },
        "5": { title: "直属推广(充值)", user: "直属推广人数" },
        "6": { title: "总充值", user: "总充值" },
    };
    timeHandle = 0;

    onClose() {
        this.pageData.cur_rank_id = 0;
        this.pageData.cur_rank_type = 1;
        this.clearLastTimeTxtAndTimeHandle();
        this.pageData.bShow = false;
        // MultDialogManager.onClosePanel();
    }

    setLoading(isLoad: boolean = true) {
        if (isLoad) {
            this.refCount++;
        } else {
            this.refCount--;
        }
        if (this.refCount < 0) {
            this.refCount = 0;
        }
        if (this.refCount == 0 && isLoad == false) {
            clearTimeout(this.timeHandleLoading);
            this.pageData.loading = false;
        }

        if (isLoad) {
            this.pageData.loading = true;
            clearTimeout(this.timeHandleLoading);
            this.timeHandleLoading = setTimeout(() => {
                // console.log("自动关闭");
                this.refCount = 0;
                this.pageData.loading = false;
            }, 10000);
        }
    }

    setRankListData(data: any) {
        this.setLoading(false);
        this.pageData.loading = false;
        Object.assign(this.pageData.rankList.pageInfo, data.pageInfo);
        this.pageData.rankList.list.length = 0;
        this.pageData.rankList.list.push(...data.list);

        this.getActivityDataAndUserRankList();
        this.pageData.rank_updata++;
    }

    getActivityDataAndUserRankList() {
        //检查当前输入的排行榜活动id 是否在列表中，没有就取第一个
        const isHave = this.pageData.rankList.list.some((item: any) => {
            return item.id == this.pageData.cur_rank_id;
        });

        if ((!this.pageData.cur_rank_id || !isHave) && this.pageData.rankList.list.length > 0) {
            this.pageData.cur_rank_id = this.pageData.rankList.list[0].id;
        }
        this.reGetData();
    }

    setRankUserListData(data: any) {
        this.setLoading(false);
        this.pageData.isRankListLoading = false;

        Object.assign(this.pageData.rankUserList.pageInfo, data.pageInfo);
        Object.assign(this.pageData.rankUserList.my_data, data.my_data);

        this.pageData.rankUserList.list.length = 0;
        this.pageData.rankUserList.list.push(...data.list);
    }

    resetQueryActivityData() {
        Object.assign(this.pageData.data, {
            activity_desc: "",
            activity_name: "",
            start_time: "",
            end_time: "",
        });
        this.clearLastTimeTxtAndTimeHandle();
        this.pageData.data.game_list.length = 0;
    }
    //如果是列表，使用以下数据，否则删除
    resetQuery() {
        this.resetQueryActivityData();

        this.pageData.rankUserList.list.length = 0;
        this.pageData.rankList.list.length = 0;
        this.pageData.rankUserList.list.push(...[]);
    }

    setData(data: any) {
        this.setLoading(false);
        //如果是列表，使用以下数据，否则删除
        Object.assign(this.pageData.data, data);
        this.setLastTimeText();
    }
    setLastTimeText() {
        this.clearLastTimeTxtAndTimeHandle();
        if (this.pageData.cur_rank_type != 1) {
            return;
        }
        this.pageData.data.last_time_count = Timezone.getTimeCountFromEndDateToNow(this.pageData.data.end_time);
        this.formatLastTimeTxt();
        this.timeHandle = setInterval(() => {
            this.pageData.data.last_time_count--;
            if (this.pageData.data.last_time_count < 0) {
                this.pageData.data.last_time_txt = LangUtil("已结束");
                clearInterval(this.timeHandle);
                this.timeHandle = 0;
            }
            this.formatLastTimeTxt();
        }, 1000);
    }
    clearLastTimeTxtAndTimeHandle() {
        Object.assign(this.pageData.data, {
            last_time_count: 0,
            last_time_txt: "",
        });
        if (this.timeHandle) {
            clearInterval(this.timeHandle);
            this.timeHandle = 0;
        }
    }
    formatLastTimeTxt() {
        if (this.pageData.data.last_time_count <= 0) {
            this.pageData.data.last_time_txt = LangUtil("已结束");
            return;
        }
        const time_obj = timeText(this.pageData.data.last_time_count);

        if (time_obj.day) {
            if (time_obj.day >= 2) {
                this.pageData.data.last_time_txt = `${LangUtil("活动剩余")} ${time_obj.day}${LangUtil("天")}`;
                return;
            }
            const hours = Number(time_obj.day) * 24 + Number(time_obj.hours);
            this.pageData.data.last_time_txt = `${LangUtil("活动剩余")} ${hours}${LangUtil("小时")} ${time_obj.minutes}${LangUtil(
                "分钟"
            )} ${time_obj.seconds}${LangUtil("秒")}`;
        } else if (time_obj.hours) {
            this.pageData.data.last_time_txt = `${LangUtil("活动剩余")} ${time_obj.hours}${LangUtil("小时")} ${time_obj.minutes}${LangUtil(
                "分钟"
            )} ${time_obj.seconds}${LangUtil("秒")}`;
        } else {
            this.pageData.data.last_time_txt = `${LangUtil("活动剩余")} ${time_obj.minutes}${LangUtil("分钟")} ${
                time_obj.seconds
            }${LangUtil("秒")}`;
        }
    }
    reGetData() {
        this.api_plat_activity_var(this.pageData.cur_rank_id);
        this.api_plat_activity_index_rank_user_list();
    }
    /**排行榜-活动列表 */
    api_plat_activity_index_rank_list() {
        const obj = {
            page_size: 20,
            page_count: 1,
            type: this.pageData.cur_rank_type, //1:进行中 2:往期
        };
        this.sendNotification(net.HttpType.api_plat_activity_index_rank_list, obj);
    }
    /**排行榜-活动列表 */
    api_plat_activity_index_rank_user_list() {
        if (!this.pageData.cur_rank_id) return;
        this.pageData.isRankListLoading = true;
        const obj = {
            activity_id: this.pageData.cur_rank_id,
        };
        this.sendNotification(net.HttpType.api_plat_activity_index_rank_user_list, obj);
    }
    /**获取活动详情 */
    api_plat_activity_var(idx: any) {
        if (!idx) return;
        this.setLoading(true);
        this.sendNotification(net.HttpType.api_plat_activity_var, { id: idx });
    }
}
