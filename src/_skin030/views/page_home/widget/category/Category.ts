import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";

@Component
export default class Category extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ default: [] }) lobbyCategory!: core.PlatLobbyCategoryIndexVO[];

    get itemWidth(): number {
        //return this.$mobile ? 132 : 181;
        const baseWidth = this.$mobile ? 132 : 181;
        if (!this.$mobile) return baseWidth;

        const offset = -12;
        const boxWidth = document.documentElement.clientWidth - offset;
        const aaa = Math.round(boxWidth / baseWidth);
        const itemWidth = boxWidth / aaa;
        // console.log("计算出来的 每个对象的宽度为", itemWidth);
        return itemWidth;
    }

    public get categoryData(): any {
        if (!this.lobbyCategory || this.lobbyCategory.length < 1) return null;

        const dataList = <any>{};
        //现将数据排序
        const sort_category = this.lobbyCategory.sort((a: core.PlatLobbyCategoryIndexVO, b: core.PlatLobbyCategoryIndexVO) => {
            return b.tag_sort - a.tag_sort;
        });
        //将数据分组
        for (let index = 0; index < sort_category.length; index++) {
            const element = sort_category[index];

            if (!dataList[element.category]) {
                dataList[element.category] = <any>[];
                this.listAllBtn.push({
                    key: element.category,
                    value: false,
                });
            }
            dataList[element.category].push(element);
        }

        // 将数据 排序
        const keys = Object.keys(dataList);
        for (let index = 0; index < keys.length; index++) {
            const element = dataList[keys[index]];
            element.sort((a: core.PlatLobbyCategoryIndexVO, b: core.PlatLobbyCategoryIndexVO) => {
                return b.index_no - a.index_no;
            });
        }
        return dataList;
    }

    listAllBtn = <any>[];

    onShowAll(item: any) {
        //this.listAllBtn[item] = true;
        for (let index = 0; index < this.listAllBtn.length; index++) {
            const element = this.listAllBtn[index];
            if (element.key == item) {
                element.value = !element.value;
                return;
            }
        }
    }
    isAll(item: any): boolean {
        for (let index = 0; index < this.listAllBtn.length; index++) {
            const element = this.listAllBtn[index];
            if (element.key == item) {
                return element.value;
            }
        }
        return false;
    }
}
