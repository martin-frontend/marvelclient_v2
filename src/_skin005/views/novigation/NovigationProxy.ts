import PanelUtil from "@/_skin005/core/PanelUtil";
import GameConfig from "@/core/config/GameConfig";

export default class NovigationProxy extends puremvc.Proxy {
    static NAME = "NovigationProxy";

    categoryActive = 0;
    isMenuOpen = <any>{};

    isminiMenu = false; //是否为小菜单
    activityData = <any>[];
    ballAwardData = null; //彩球活动的详细数据
    ballAwardId = 0; //彩球活动的详细数据

    dailyTaskData = <any>{
        unread_num: 0, //用户未领取的数量
        list: <any>[],
    };
    isfirst = true;
    setMiniMenu(isMini: boolean = false) {
        this.isminiMenu = isMini;
    }

    closeMenu() {
        const keys = Object.keys(this.isMenuOpen);
        for (let index = 0; index < keys.length; index++) {
            this.isMenuOpen[keys[index]] = false;
        }
    }

    setActivityData(data: any) {
        this.activityData = [...data.list];
        this.getBallAwardData();
    }
    /**获取彩球游戏的数据 */
    getBallAwardData() {
        //如果是在活动页面则不发送详情
        for (let index = 0; index < this.activityData.length; index++) {
            if (this.activityData[index] && this.activityData[index].model_type == 12) {
                this.ballAwardId = this.activityData[index].id;
                break;
            }
        }
        this.ballAwardData = null;
    }

    //每日任务的数据
    setDailyTaskData(data: any) {
        Object.assign(this.dailyTaskData, data);
        this.dailyTaskData.list = [...data.list];
        this.isHaveDailytask =
            this.dailyTaskData.list[0] && this.dailyTaskData.list[0].rules && this.dailyTaskData.list[0].rules.length > 0;

        if (this.isHaveDailytask && this.isfirst) {
            this.isfirst = false;
            this.openDialogArr("dialogdailytask");
        }
    }
    isHaveDailytask = false;
    /**活动相关的数据 */
    api_plat_activity() {
        // if (!core.user_id) return;
        this.sendNotification(net.HttpType.api_plat_activity, { user_id: core.user_id, have_content: "0" });
    }
    api_plat_activity_index_everyday() {
        // if (!core.user_id) return;
        this.sendNotification(net.HttpType.api_plat_activity_index_everyday, { user_id: core.user_id });
    }

    /** 获取每日任务 */
    timeHandle = 0;
    openList = <any>[];
    openDialogArr(dialogData: any = null) {
        if (!this.openList || this.openList.length < 1) {
            this.openList = <any>[];
            const dialog_manager = GameConfig.config.dialog_manager || [];
            const newArr = dialog_manager;
            for (let index = 0; index < newArr.length; index++) {
                this.openList.push({
                    name: newArr[index],
                    sort: 10 + index,
                });
            }
        }
        if (dialogData) this.openList.push(dialogData);
        if (this.timeHandle) {
            return;
        }
        this.timeHandle = setTimeout(() => {
            this.timeHandle = 0;
            this.openDialog();
        }, 3000);
    }

    openDialog() {
        const newArr = this.openList.sort((a: any, b: any) => b.sort - a.sort);
        // console.log("--->", newArr);
        for (let index = 0; index < newArr.length; index++) {
            const element = newArr[index];
            // setTimeout(() => {
            switch (element.name) {
                case "dailysign":
                    PanelUtil.openpanel_dailysign();
                    break;
                case "promotionreward":
                    {
                        if (core.user_id) PanelUtil.openpanel_promotionreward();
                    }
                    break;
                case "rechargeactivity":
                    {
                        const activelist = PanelUtil.getProxy_novigation.activityData;
                        for (let index = 0; index < activelist.length; index++) {
                            const element = activelist[index];
                            if (element.award_type && element.award_type == 16) {
                                PanelUtil.openpanel_activity_detail_recharge(element);
                                break;
                            }
                        }
                    }
                    break;
                case "limitedbonus":
                    PanelUtil.openpanel_limited_bonus();
                    break;
                case "rechargenotice":
                    PanelUtil.openpanel_notice_recharge(element.data); //充值弹窗
                    break;
                case "dialognotice":
                    PanelUtil.openpanel_notice();
                    break;
                case "dialogdailytask":
                    if (this.isHaveDailytask) PanelUtil.openpanel_dailytask();
                    break;
                default:
                    break;
            }
            // }, 100);
        }
    }
}
