import GlobalVar from "@/core/global/GlobalVar";
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
        listType11: <core.PlatNoticeVO[]>[] /**底部说明 */,
        listType12: <core.PlatNoticeVO[]>[] /**底部logo */,
        listType13: <core.PlatNoticeVO[]>[] /**游戏加载图片 */,
        listType14: <core.PlatNoticeVO[]>[] /**首页固定游戏 */,
        listType15: <core.PlatNoticeVO[]>[] /**充值弹窗 */,
        listType16: <core.PlatNoticeVO[]>[] /**足球弹窗 */,
        listType17: <core.PlatNoticeVO[]>[] /**板球弹窗 */,
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
                case 15:
                    this.data.listType15.push(item);
                    break;
                case 16:
                    this.data.listType16.push(item);
                    break;
                case 17:
                    this.data.listType17.push(item);
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
        this.sendNotification(net.HttpType.api_plat_var_notice_index, { plat_id: core.plat_id, custom_host: GlobalVar.host_urls });
    }
}

/**
 * type_position
// 公告位置类型:1-首页Banner|2-弹窗Banner|3-弹窗公告
//|4-棋牌Banner|5-捕鱼Banner|6-电子Banner|7-真人Banner|8-体育Banner|9-彩票Banner|10-链游Banner
const TYPE_POSITION_INDEX = 1;
const TYPE_POSITION_LOGIN = 2;
const TYPE_POSITION_POP = 3;
const TYPE_POSITION_CHESS = 4;
const TYPE_POSITION_CATCH_FISH = 5;
const TYPE_POSITION_ELECTRONIC = 6;
const TYPE_POSITION_GAMER = 7;
const TYPE_POSITION_SPORTS = 8;
const TYPE_POSITION_LOTTERY = 9;
const TYPE_POSITION_ARCADE = 10;
const TYPE_POSITION_BOTTOM = 11;
const TYPE_POSITION_BOTTOM_LOGO = 12;
const TYPE_POSITION_GAME_LOADING = 13;
const TYPE_POSITION_INDEX_FIX_GAME = 14;
const TYPE_POSITION_POPUP_RECHARGE = 15;
const TYPE_POSITION_FOOTBALL = 16;
const TYPE_POSITION_CRICKET = 17;
const TYPE_POSITION_PROMOTION = 18;
const TYPE_POSITION_VENDOR_LOGO = 19;

const TYPE_POSITION = [
    self::TYPE_POSITION_INDEX => '首页Banner',
    self::TYPE_POSITION_LOGIN => '弹窗Banner',
    self::TYPE_POSITION_POP => '弹窗公告',
    self::TYPE_POSITION_CHESS => '棋牌Banner',
    self::TYPE_POSITION_CATCH_FISH => '捕鱼Banner',
    self::TYPE_POSITION_ELECTRONIC => '电子Banner',
    self::TYPE_POSITION_GAMER => '真人Banner',
    self::TYPE_POSITION_SPORTS => '体育Banner',
    self::TYPE_POSITION_LOTTERY => '彩票Banner',
    self::TYPE_POSITION_ARCADE => '链游Banner',
    self::TYPE_POSITION_BOTTOM => '底部说明',
    self::TYPE_POSITION_BOTTOM_LOGO => '底部LOGO',
    self::TYPE_POSITION_GAME_LOADING => '游戏加载Banner',
    self::TYPE_POSITION_INDEX_FIX_GAME => '首页固定游戏',
    self::TYPE_POSITION_POPUP_RECHARGE => '弹窗充值',
    self::TYPE_POSITION_FOOTBALL => '足球Banner',
    self::TYPE_POSITION_CRICKET => '板球Banner',
    self::TYPE_POSITION_PROMOTION => '推广赚钱Banner',
    self::TYPE_POSITION_VENDOR_LOGO => '厂商LOGO'
];

 */
