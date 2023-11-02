import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageCasinoSportMediator from "../mediator/PageCasinoSportMediator";
import PageCasinoSportProxy from "../proxy/PageCasinoSportProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";

@Component
export default class PageCasinoSport extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageCasinoSportProxy = this.getProxy(PageCasinoSportProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(PageCasinoSportMediator);
    }
    destroyed() {
        super.destroyed();
    }
    mounted() {
        this.$nextTick(() => {
            this.myProxy.init();
        });
    }
    getGameIcon(item: any) {
        if (!item || !item.entrance_icon) {
            return "";
        }
        return item.entrance_icon;
    }
    onClick(item: any) {
        if (item) {
            PanelUtil.openpage_soccer(item);
        }
    }
}
