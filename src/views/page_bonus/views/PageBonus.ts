import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageBonusMediator from "../mediator/PageBonusMediator";
import PageBonusProxy from "../proxy/PageBonusProxy";
import dialog_pledge from "@/views/dialog_pledge";
import dialog_manually_unstaking from "@/views/dialog_manually_unstaking";
import dialog_pledge_records from "@/views/dialog_pledge_records";
import dialog_wallet from "@/views/dialog_wallet";

@Component
export default class PageBonus extends AbstractView {
    myProxy: PageBonusProxy = this.getProxy(PageBonusProxy);
    pageData = this.myProxy.pageData;
    plat_stake_info = this.myProxy.plat_stake_info;
    user_stake_info = this.myProxy.user_stake_info;
    listQuery = this.pageData.listQuery;
    get bonus_rank() {
        return this.myProxy.bonus_rank;
    }

    get bonus_recently() {
        return this.myProxy.bonus_recently;
    }

    constructor() {
        super(PageBonusMediator);
    }

    destroyed() {
        super.destroyed();
    }

    handlerPledge() {
        dialog_pledge.show();
    }

    handlerUnpledge() {
        dialog_manually_unstaking.show();
    }

    handlerRecords() {
        dialog_pledge_records.show();
    }

    jumpTo(target: string) {
        window.scrollTo({
            //@ts-ignore
            top: document.querySelector(target).offsetTop,
            behavior: "smooth",
        });
    }

    handleRecords() {
        dialog_wallet.show(2);
    }

    onTabClick(cate: number) {
        this.listQuery.cate = cate;
        this.listQuery.page_count = 1;
    }

    getDateTime(data: any) {
        // 2022-05-25 18:51:10
        const md = `${data.split(" ")[0].split("-")[1]}-${data.split(" ")[0].split("-")[2]}`;
        return `${md}`;
    }

    getHeight() {
        const maxBonus = Math.max(...this.bonus_recently.map((o: { y: any; }) => o.y))
        const height = "$vuetify.breakpoint.xsOnly? 140 : 280"
    }
}
