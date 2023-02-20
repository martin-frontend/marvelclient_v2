import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/assets/Assets";
import PageHomeProxy from "../../proxy/PageHomeProxy";
import getProxy from "@/core/global/getProxy";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class SoccerMatche extends AbstractView {
    LangUtil = LangUtil;
    CategoryIcon = Assets.CategoryIcon;
    myProxy: PageHomeProxy = getProxy(PageHomeProxy);
    pageData = this.myProxy.pageData;

    get matches() {
        const arr = [];
        for (const comp of this.pageData.compData) {
            for (const matche of comp.matches) {
                arr.push(matche);
            }
        }
        return arr;
    }

    openSport()
    {
        PanelUtil.openpage_soccer();
    }
}
