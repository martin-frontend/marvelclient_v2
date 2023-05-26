import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogStatisticsCreditMediator from "../mediator/DialogStatisticsCreditMediator";
import DialogStatisticsCreditProxy from "../proxy/DialogStatisticsCreditProxy";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/assets/Assets";
import { dateFormat, getTodayOffset } from "@/core/global/Functions";
import dialog_bet_record from "@/_skin001/views/dialog_bet_record";
import GamePlatConfig from "@/core/config/GamePlatConfig";

@Component
export default class DialogStatisticsCredit extends AbstractView {
    LangUtil = LangUtil;
    commonIcon = Assets.commonIcon;
    myProxy: DialogStatisticsCreditProxy = this.getProxy(DialogStatisticsCreditProxy);
    GamePlatConfig = GamePlatConfig;
    gameProxy = this.myProxy.gameProxy;

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
                    const start = getTodayOffset(-30);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
            {
                text: LangUtil("最近两个月"),
                onClick(picker: any) {
                    const start = getTodayOffset(-60);
                    const end = getTodayOffset(1, 1);
                    picker.$emit("pick", [start, end]);
                },
            },
        ],
    };

    constructor() {
        super(DialogStatisticsCreditMediator);
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
                this.pageData.listQuery.start_date = dateFormat(startDate, "yyyy-MM-dd hh:mm:ss");
            } else {
                this.pageData.listQuery.start_date = "";
            }
            if (endDate) {
                this.pageData.listQuery.end_date = dateFormat(endDate, "yyyy-MM-dd hh:mm:ss");
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
        BlurUtil(this.pageData.bShow);
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
        dialog_bet_record.show(user_id, this.timeRange[0], this.timeRange[1], false, {
            coin_name_unique: this.myProxy.coin_name_unique,
            bShowMoneyType: true,
            bShowUserId: true,
            bShowTimeText: true,
            bShowOptions: false,
            filterBtnInfo: filterInfo,
        });
    }

    getMoneyColor(str: string): string {
        if (!str) return "";
        let amount = 0;
        if (typeof str == "string") {
            const newstr = str.replace("$", "");
            amount = Number(newstr);
        } else {
            amount = str;
        }
        if (amount == 0) {
            return "";
        }
        return !!str && str.search("-") == -1 ? "colorGreen--text" : "colorRed2--text";
    }
    getMoneyValue(str: string): string {
        if (!str) return "";
        let amount = 0;
        if (typeof str == "string") {
            const newstr = str.replace("$", "");
            amount = Number(newstr);
        } else {
            amount = str;
        }
        // const newstr = str.replace("$", "");
        // const amount = Number(newstr);
        if (amount == 0) {
            return str;
        }
        if (!!str && str.search("-") == -1) return "+" + str;
        return str;
    }

    onItemClick(item: any) {
        //console.log("点击 item",item);
        this.myProxy.coin_name_unique = item;
        this.onTimeChange();
    }
}
