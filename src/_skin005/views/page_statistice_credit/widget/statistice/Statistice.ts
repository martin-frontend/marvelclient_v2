import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import { amountFormat, dateFormat, getTodayOffset } from "@/core/global/Functions";
import DialogStatisticsCreditMediator from "@/_skin005/views/dialog_statistics_credit/mediator/DialogStatisticsCreditMediator";
import PageBlur from "@/_skin005/core/PageBlur";
import { getMoneyColor, getMoneyValue } from "@/_skin005/core/ColorfullText";
import { scrollUtil_div } from "@/core/global/ScrollUtil";
import Timezone from "@/core/Timezone";

@Component
export default class Statistice extends AbstractView {
    LangUtil = LangUtil;
    //commonIcon = Assets.commonIcon;
    myProxy = PanelUtil.getProxy_statistics_credit;
    GamePlatConfig = GamePlatConfig;
    gameProxy = this.myProxy.gameProxy;

    getMoneyColor = getMoneyColor;
    getMoneyValue = getMoneyValue;
    amountFormat(val: any, isb = true) {
        return amountFormat(val, isb);
    }
    isOpenWalletMenu = this.myProxy.isOpenWalletMenu;
    pageData = this.myProxy.pageData;

    userlist = this.myProxy.userListInfo;

    coin_name_unique = this.myProxy.coin_name_unique;

    timeRange: any = ["", ""];
    pickerOptions = {
        shortcuts: [
            {
                text: LangUtil("最近一周"),
                onClick(picker: any) {
                    const start = getTodayOffset(-6);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近一个月"),
                onClick(picker: any) {
                    const start = getTodayOffset(-29);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近两个月"),
                onClick(picker: any) {
                    const start = getTodayOffset(-59);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
        ],
    };

    constructor() {
        super(DialogStatisticsCreditMediator);
    }
    created() {
        // this.setDatePiker();
        //console.log("    创建 ---  创建");
        const start = getTodayOffset(-6);
        const end = getTodayOffset(1, 1);
        this.timeRange = [start, end];
        this.myProxy.setcoin_name_unique();
        this.onTimeChange();
    }

    setDatePiker() {
        // const keyNode = document.querySelectorAll(".el-date-editor");
        // if (!keyNode || keyNode.length < 1) return;
        // for (let index = 0; index < keyNode.length; index++) {
        //     const element = keyNode[index];
        //     const iNode = document.createElement("i");
        //     iNode.setAttribute("class", "el-icon-date"); // el-icon-bottom
        //     element.appendChild(iNode);
        //     iNode.style.position = "absolute";
        //     iNode.style.top = "13px";
        //     iNode.style.right = "12px";
        //     iNode.style.color = "#8E8F91";
        //     iNode.style.pointerEvents = "none";
        // }
    }
    destroyed() {
        console.log(" ---销毁 ----");
        super.destroyed();
        this.myProxy.reseData();
    }
    onBtnClickNextPage(item: any) {
        if (item.directly_users <= 0) {
            return;
        }
        this.pageData.listQuery.page_count = 1;
        this.myProxy.api_user_var_credit_statistic(item.user_id);
        //将点击到的 对象的 id 添加进去
        //this.myProxy.addUserList(item.user_id);
    }
    //点击上面显示的 用户代理链上的 其他用户
    onBtnClickUserInfo(item: any) {
        //对应的 请求
        this.pageData.listQuery.page_count = 1;
        this.myProxy.api_user_var_credit_statistic(item);
        //将代理链条后面的全部删除掉
        //this.myProxy.removeUserList(item);
    }

    onTimeChange() {
        if (this.timeRange) {
            const startDate: any = this.timeRange[0];
            const endDate: any = this.timeRange[1];
            if (startDate) {
                // this.pageData.listQuery.start_date = dateFormat(startDate, "yyyy-MM-dd hh:mm:ss");
                this.pageData.listQuery.start_date = Timezone.Instance.convertTime_to_Beijing(dateFormat(startDate, "yyyy-MM-dd hh:mm:ss"));
            } else {
                this.pageData.listQuery.start_date = "";
            }
            if (endDate) {
                // this.pageData.listQuery.end_date = dateFormat(endDate, "yyyy-MM-dd hh:mm:ss");
                this.pageData.listQuery.end_date = Timezone.Instance.convertTime_to_Beijing(dateFormat(endDate, "yyyy-MM-dd hh:mm:ss"));
            } else {
                this.pageData.listQuery.end_date = "";
            }
        } else {
            this.pageData.listQuery.start_date = "";
            this.pageData.listQuery.end_date = "";
        }

        this.pageData.listQuery.page_count = 1;
        this.myProxy.api_user_var_credit_statistic();
    }

    get isMine(): boolean {
        if (this.myProxy.userListInfo.length > 1) {
            return false;
        }
        return true;
    }

    onQuery() {
        console.log("---onQuery--");
        this.myProxy.api_user_var_credit_statistic();
    }

    onPageChange(val: any) {
        this.pageData.listQuery.page_count = val;
        this.myProxy.api_user_var_credit_statistic();
    }

    onRefresh(done: any) {
        this.myProxy.listRefrush(done);
    }

    onLoad(done: any) {
        this.myProxy.listMore(done);
    }

    onClose() {
        this.pageData.bShow = false;
    }

    @Watch("pageData.bShow")
    onWatchShow() {
        console.log("----1231231");
        //PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            const start = getTodayOffset(-6);
            const end = getTodayOffset(1, 1);
            this.timeRange = [start, end];
            this.myProxy.setcoin_name_unique();
            this.onTimeChange();
        } else {
            this.myProxy.reseData();
        }
    }

    onUserIdClick(user_id: number) {
        const listQuery = this.pageData.listQuery;
        const userlist = JSON.parse(JSON.stringify(this.myProxy.userListInfo));
        //console.log("点击的代理链为userlist" , userlist);
        //判断当前点击的对象是否 包含在 其中
        userlist.push(user_id + "");
        const filterInfo = {
            bind_relation: this.pageData.bind_relation,
            parents: userlist,
            target_user_id: user_id,
        };
        PanelUtil.openpanel_bet_record(user_id, this.timeRange[0], this.timeRange[1], false, {
            coin_name_unique: this.myProxy.coin_name_unique,
            bShowMoneyType: false,
            bShowUserId: true,
            bShowTimeText: false,
            bShowOptions: false,
            filterBtnInfo: filterInfo,
        });
    }
    onItemClick(item: any) {
        console.log("点击 item", item);
        this.myProxy.coin_name_unique = item;
        this.onTimeChange();
    }
}
