import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class RankCategoryItem extends AbstractView {
    @Prop({ default: 1 }) categoryType!: number; //1:进行中 2:往期

    @Prop() item!: any;
    LangUtil = LangUtil;

    @Prop({ default: false }) isDisable!: boolean;

    get imgPath() {
        let lang = core.lang;

        const inc: any = ["zh_CN", "en_EN", "pt_PT", "vi_VN"];
        if (!inc.includes(lang)) {
            lang = "en_EN";
        }
        return require(`@/_skin005/assets/activity_rank_list/tag_running/${lang}.png`);
        // if (this.categoryType == 1) {
        //     return require(`@/_skin005/assets/activity_rank_list/tag_running.png`);
        // }
        // return require(`@/_skin005/assets/activity_rank_list/tag_running.png`);
    }

    onItemClick() {
        if (this.isDisable) return;
        this.$emit("onItemClick", this.item);
    }
}
