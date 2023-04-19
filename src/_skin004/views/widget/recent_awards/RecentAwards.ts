import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import RecentAwardsMediator from "./RecentAwardsMediator";
import RecentAwardsProxy from "./RecentAwardsProxy";
import getProxy from "@/core/global/getProxy";
import dialog_preview from "@/views/dialog_preview";
import MyCanvas from "@/core/ui/MyCanvas";
@Component
export default class RecentAwards extends AbstractView {
    LangUtil = LangUtil;
    myProxy: RecentAwardsProxy = getProxy(RecentAwardsProxy);
    pageData = this.myProxy.pageData;
    titles = [
        LangUtil("大额爆奖图"),
        LangUtil("大额提现图"),
        LangUtil("爆奖厂商"),
        LangUtil("大额爆奖游戏"),
        LangUtil("爆奖玩家昵称"),
        LangUtil("时间"),
    ];
    //titles = ["Bảng xếp hạng giải thưởng lớn", "Bảng xếp hạng giải thưởng lớn", "Bảng xếp hạng giải thưởng lớn", "Bảng xếp hạng giải thưởng lớn", "Bảng xếp hạng giải thưởng lớn","Bảng xếp hạng giải thưởng lớn"];
    constructor() {
        super(RecentAwardsMediator);
        console.log("RecentAwards_TSconstructor>>");
    }
    /**显示大图 */
    showPreview(imgurl: any) {
        dialog_preview.show(imgurl);
    }
}
