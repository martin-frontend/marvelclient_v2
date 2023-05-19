import LangUtil from "@/core/global/LangUtil";
import LoginEnter from "@/core/global/LoginEnter";
import OpenLink from "@/core/global/OpenLink";
import dialog_activity from "@/views/dialog_activity";
import dialog_message_box from "@/views/dialog_message_box";
import page_bonus from "@/views/page_bonus";
import page_extension from "@/views/page_extension";
import page_introduce from "@/views/page_introduce";
import page_mine from "@/views/page_mine";
import page_swap from "@/views/page_swap";

export default class NoticeProxy extends puremvc.Proxy {
    static NAME = "NoticeProxy";

    public onRegister(): void {
        this.api_plat_var_notice_index();
    }

    allData = <core.PlatNoticeVO[][]>[];
    data = {
        listAll: <core.PlatNoticeVO[]>[],
        listType1: <core.PlatNoticeVO[]>[],
        listType2: <core.PlatNoticeVO[]>[],
        listType3: <core.PlatNoticeVO[]>[],
        listType4: <core.PlatNoticeVO[]>[],
        listType5: <core.PlatNoticeVO[]>[],
        listType6: <core.PlatNoticeVO[]>[],
        listType7: <core.PlatNoticeVO[]>[],
        listType8: <core.PlatNoticeVO[]>[],
        listType9: <core.PlatNoticeVO[]>[],
        listType10: <core.PlatNoticeVO[]>[],
        listType11: <core.PlatNoticeVO[]>[],/**底部说明 */
        listType12: <core.PlatNoticeVO[]>[],/**底部logo */
        listType13: <core.PlatNoticeVO[]>[],/**游戏加载图片 */
        listType14: <core.PlatNoticeVO[]>[],/**首页固定游戏 */
    };

    setData(data: core.PlatNoticeVO[]) {
        for (const item of data) {
            this.data.listAll.push(item);
            switch (item.type_position) {
                case 1:
                    this.data.listType1.push(item);
                    break;
                case 2:
                    this.data.listType2.push(item);
                    break;
                case 3:
                    this.data.listType3.push(item);
                    break;
                case 4:
                    this.data.listType4.push(item);
                    break;
                case 5:
                    this.data.listType5.push(item);
                    break;
                case 6:
                    this.data.listType6.push(item);
                    break;
                case 7:
                    this.data.listType7.push(item);
                    break;
                case 8:
                    this.data.listType8.push(item);
                    break;
                case 9:
                    this.data.listType9.push(item);
                    break;
                case 10:
                    this.data.listType10.push(item);
                    break;
                case 11:
                    this.data.listType11.push(item);
                    break;
                case 12:
                    this.data.listType12.push(item);
                    break;
                case 13:
                    this.data.listType13.push(item);
                    break;
                case 14:
                    this.data.listType14.push(item);
                    break;
                default:
                    break;
            }
            if (!this.allData[item.type_position]) {
                this.allData[item.type_position] = <core.PlatNoticeVO[]>[];
            }
            this.allData[item.type_position].push(item);
        }
        this.data = Object.freeze(this.data);
    }

    public getListTypeDataFromType(type: number): core.PlatNoticeVO[] {
        if (!this.allData[type]) {
            this.allData[type] = <core.PlatNoticeVO[]>[];
        }
        return this.allData[type];
    }

    jump(item: core.PlatNoticeVO) {
        //跳转模块:1-不跳转|2-奖励币介绍|3-质押分红|4-游戏挖矿|5-精彩活动|6-推广赚钱|7-币币交易|8-Swap
        console.log(">>>>>", item.open_mode);
        if (item.open_mode != 1) {
            switch (item.open_mode) {
                case 2:
                    page_introduce.show();
                    break;
                case 3:
                    LoginEnter(page_bonus.show);
                    break;
                case 4:
                    LoginEnter(page_mine.show);
                    break;
                case 5:
                    dialog_activity.show();
                    break;
                case 6:
                    LoginEnter(page_extension.show);
                    break;
                case 7:
                    dialog_message_box.alert(LangUtil("敬请期待"));
                    break;
                case 8:
                    page_swap.show();
                    break;
            }
        } else if (item.open_mode_url && item.open_mode_url != "") {
            OpenLink(item.open_mode_url);
        }
    }

    /**用来保存 通知详情的 */
    noticedata_detail = <any>{};
    /**设置通知详情 */
    public set_detail_notice(data: any) {
        if (!data) return;
        this.noticedata_detail[data.id] = data;
    }
    public get_detail_notice(noticeid: any): any {
        return this.noticedata_detail[noticeid];
    }
    api_plat_var_notice_show(noticeid: any) {
        if (!noticeid) return;
        this.sendNotification(net.HttpType.api_plat_var_notice_show_var, { plat_id: core.plat_id, id: noticeid });
    }

    api_plat_var_notice_index() {
        this.sendNotification(net.HttpType.api_plat_var_notice_index, { plat_id: core.plat_id });
    }
}
