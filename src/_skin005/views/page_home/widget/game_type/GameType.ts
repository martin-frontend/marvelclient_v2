import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class GameType extends AbstractView {
    LangUtil = LangUtil;
    noticeProxy = PanelUtil.getProxy_noticeProxy;
    /**底部logo */
    public get footerNoticeData_logo(): core.PlatNoticeVO[] {
        return this.noticeProxy.data.listType14;
    }
    /**将list对象中的数据 按照 category字段 分类 返回  数组 对象 */
    private _setCategoryData(data: core.PlatNoticeVO[]) {
        //将 底部说明的对象  按照标签 分类
        if (!data || data.length < 1) return <any>[];

        const category_logo_data = <any>[];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];

            if (!element.category || !element.category.trim()) {
                continue;
            }
            let addObj;
            for (let n = 0; n < category_logo_data.length; n++) {
                if (category_logo_data[n].title == element.category) {
                    addObj = category_logo_data[n];
                    break;
                }
            }
            if (!addObj) {
                addObj = {
                    title: element.category,
                    data: <core.PlatNoticeVO[]>[],
                };
                category_logo_data.push(addObj);
            }

            const newObj = JSON.parse(JSON.stringify(element));
            newObj.status = 1;
            newObj.icon = element.img_url;
            newObj.vendor_product_name = element.name;
            newObj.jumpType = 1;
            addObj.data.push(newObj);
        }
        //console.log(" 计算出来的  分类列表为 ", category_logo_data);
        return category_logo_data;
    }

    //将底部说明 按照 标签分类
    public get logo_list(): any {
        return this._setCategoryData(this.footerNoticeData_logo);
    }

    data = [
        {
            vendor_product_name: LangUtil("IPL 2023"),
            status: 1,
            path: "/cricket",
            icon: require(`@/_skin005/assets/gametype/Icons_Cricket.png`),
        },
        {
            vendor_product_name: LangUtil("赌场"),
            status: 1,
            path: "/live-casino-online",
            category: 32,
            icon: require(`@/_skin005/assets/gametype/Icons_Casino.png`),
        },
        {
            vendor_product_name: LangUtil("老虎机"),
            status: 1,
            path: "/slots-games",
            category: 16,
            icon: require(`@/_skin005/assets/gametype/Icons_Slots.png`),
        },
        {
            vendor_product_name: LangUtil("足球"),
            status: 1,
            path: "/page_game_soccer",
            icon: require(`@/_skin005/assets/gametype/Icons_Football.png`),
        },
    ];

    get itemWidth(): number {
        return this.$mobile ? 132 : 181;
    }
}
