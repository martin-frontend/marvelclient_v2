import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class Category extends AbstractView {
    LangUtil = LangUtil;
    gameProxy = PanelUtil.getProxy_gameproxy;

    get itemWidth(): number {
        return this.$mobile ? 132 : 181;
    }

    public get categoryData(): any {
        const { lobbyCategory } = this.gameProxy;
        if (!lobbyCategory || lobbyCategory.length < 1) return null;

        const dataList = <any>{};
        //现将数据排序
        const sort_category = lobbyCategory.sort((a: core.PlatLobbyCategoryIndexVO, b: core.PlatLobbyCategoryIndexVO) => {
            return a.index_no - b.index_no;
        });
        //将数据分组
        for (let index = 0; index < sort_category.length; index++) {
            const element = sort_category[index];

            if (!dataList[element.category]) {
                dataList[element.category] = <any>[];
            }
            dataList[element.category].push(element);
        }

        // 将数据 排序
        const keys = Object.keys(dataList);
        for (let index = 0; index < keys.length; index++) {
            const element = dataList[keys[index]];
            element.sort((a: core.PlatLobbyCategoryIndexVO, b: core.PlatLobbyCategoryIndexVO) => {
                return a.index_no - b.index_no;
            });
        }
        console.log("重新分组的数据为", dataList);
        return dataList;
    }
}
