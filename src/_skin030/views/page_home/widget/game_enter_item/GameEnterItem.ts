import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";

@Component
export default class GameEnterItem extends AbstractView {
    LangUtil = LangUtil;
    @Prop() item!: any;

    public get itemImg() {
        // return require(`@/_skin030/assets/pagehome/game_lotto.png`);
        return require(`@/_skin030/assets/pagehome/${this.item.bg_name}.png`);
    }

    /**查询条件 */
    listQuery = {
        plat_id: core.plat_id,
        vendor_type: 0,
        vendor_id: 0,
        page_count: 1,
        page_size: 30,
    };

    clearListQuery() {
        Object.assign(this.listQuery, {
            plat_id: core.plat_id,
            vendor_type: 0,
            vendor_id: 0,
            page_count: 1,
            page_size: 30,
        });
    }

    setQueryData(vendor_type: number, vendor_id: number = 0) {
        this.clearListQuery();
        this.listQuery.vendor_type = vendor_type;
        this.listQuery.vendor_id = vendor_id;
    }

    get tableMenu(): any {
        return PanelUtil.getProxy_gameproxy.lobbyMenuIndex;
    }

    get getCurMenuData() {
        if (!this.tableMenu) return [];
        if (!this.listQuery.vendor_type) {
            return [];
        }
        const keys = Object.keys(this.tableMenu);
        for (let index = 0; index < keys.length; index++) {
            //@ts-ignore
            const element = this.tableMenu[keys[index]];
            if (element.vendor_type == this.listQuery.vendor_type) {
                return element.list;
            }
        }
        return [];
    }

    onBtnClick() {
        console.log("收到点击", this.item);
        if (this.item.category == 16) {
            PanelUtil.openpage_casino_lobby();
        } else if (this.item.category == 64) {
            this.setQueryData(64);
            PanelUtil.openpage_soccer(this.getCurMenuData[0]);
        } else {
            PanelUtil.openpanel_gamelist(this.item.category);

        }
    }
}
