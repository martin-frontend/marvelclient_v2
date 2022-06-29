import LangUtil from "@/core/global/LangUtil";
import LoginEnter from "@/core/global/LoginEnter";
import OpenLink from "@/core/global/OpenLink";
import dialog_activity from "@/views/dialog_activity";
import dialog_message_box from "@/views/dialog_message_box";
import page_bonus from "@/views/page_bonus";
import page_extension from "@/views/page_extension";
import page_introduce from "@/views/page_introduce";
import page_mine from "@/views/page_mine";

export default class NoticeProxy extends puremvc.Proxy {
    static NAME = "NoticeProxy";

    public onRegister(): void {
        this.api_plat_var_notice_index();
    }

    data = {
        listAll: <core.PlatNoticeVO[]>[],
        listType1: <core.PlatNoticeVO[]>[],
        listType2: <core.PlatNoticeVO[]>[],
        listType3: <core.PlatNoticeVO[]>[],
    };

    setData(data: core.PlatNoticeVO[]) {
        for (const item of data) {
            this.data.listAll.push(item);
            if (item.type_position == 1) {
                this.data.listType1.push(item);
            }
            if (item.type_position == 2) {
                this.data.listType2.push(item);
            }
            if (item.type_position == 3) {
                this.data.listType3.push(item);
            }
        }
        this.data = Object.freeze(this.data);
    }

    jump(item: core.PlatNoticeVO) {
        //1-不跳转|2-奖励币介绍|3-质押分红|4-游戏挖矿|5-精彩活动|6-推广赚钱|7-币币交易
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
                    LoginEnter(dialog_activity.show);
                    break;
                case 6:
                    LoginEnter(page_extension.show);
                    break;
                case 7:
                    dialog_message_box.alert(LangUtil("敬请期待"));
                    break;
            }
        } else if (item.open_mode_url && item.open_mode_url != "") {
            OpenLink(item.open_mode_url);
        }
    }

    api_plat_var_notice_index() {
        this.sendNotification(net.HttpType.api_plat_var_notice_index, { plat_id: core.plat_id });
    }
}
