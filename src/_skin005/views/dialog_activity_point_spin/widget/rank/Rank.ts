import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogActivityPointSpinProxy from "../../proxy/DialogActivityPointSpinProxy";
import { changeDateShow } from "@/core/global/Functions";

@Component
export default class Rank extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogActivityPointSpinProxy = this.getProxy(DialogActivityPointSpinProxy);
    pageData = this.myProxy.pageData;
    rankList = this.pageData.rankData;

    get bg_node_size() {
        const size_data_pc = {
            tag_btn: {
                width: 167.5,
                height: 36,
            },
            list_node: {
                width: 60,
                height: 160,
            },
            award_item: {
                width: 22,
                height: 22,
            },
        };
        const size_data_mob = {
            tag_btn: {
                width: 104,
                height: 36,
            },
            list_node: {
                width: 60,
                height: 135,
            },
            award_item: {
                width: 16,
                height: 16,
            },
        };
        return this.$mobile ? size_data_mob : size_data_pc;
    }

    onRankTagChange(val: any) {
        console.log("排名标签被切换", val);
        this.myProxy.getRankListData();
    }
    getDate(str: string, isChange: boolean = true) {
        return changeDateShow(str, isChange);
    }
    getAwardSource(award_source: any): string {
        switch (award_source) {
            case 80:
                return LangUtil("玩家登陆");
            case 81:
                return LangUtil("推广");
            case 82:
                return LangUtil("抽奖");
            case 90:
                return this.pageData.rankTagIndex == 1 ? LangUtil("积分奖励") : LangUtil("完成活动");
            default:
                return award_source;
        }
    }
}
