import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import DialogActivityRankProxy from "../../proxy/DialogActivityRankProxy";

@Component
export default class Category extends AbstractView {
    LangUtil = LangUtil;

    myProxy: DialogActivityRankProxy = this.getProxy(DialogActivityRankProxy);

    pageData = this.myProxy.pageData;
    rank_list = this.myProxy.pageData.rankList.list;

    get lastRankTxt() {
        return this.pageData.cur_rank_type == 1 ? LangUtil("往期排行") : LangUtil("进行中的排行榜");
    }
    onItemClick(item: any) {
        console.warn("当前选择的对象为", item);
        this.myProxy.resetQueryActivityData();
        this.myProxy.pageData.cur_rank_id = item.id;
        this.myProxy.reGetData();
    }
    onBtnClickLastRank() {
        this.pageData.cur_rank_type = (this.pageData.cur_rank_type % 2) + 1;
        this.pageData.cur_rank_id = 0;
        this.myProxy.resetQuery();
        this.myProxy.api_plat_activity_index_rank_list();
    }
    @Watch("pageData.rank_updata")
    onWatchCurRankChange() {
        setTimeout(() => {
            if (!this.$refs.scroll_item || !this.$refs[`category_item_${this.pageData.cur_rank_id}`]) return;
            //@ts-ignore
            this.$refs.scroll_item.scrollToItem(this.$refs[`category_item_${this.pageData.cur_rank_id}`][0].$el);
        }, 300);
    }
    mounted() {
        this.$nextTick(() => {
            this.onWatchCurRankChange();
        });
    }
}
