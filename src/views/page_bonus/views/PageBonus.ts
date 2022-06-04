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

    get plat_bonus() {
        return this.myProxy.plat_bonus;
    }

    get user_bonus() {
        return this.myProxy.user_bonus;
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
        dialog_wallet.show(2, 51);
    }

    onTabClick(cate: number) {
        this.listQuery.cate = cate;
        this.listQuery.page_count = 1;
        if (cate == 0) {
            this.myProxy.api_plat_var_bonus_log();
        } else {
            this.myProxy.api_user_var_bonus_log();
        }
    }

    getDateTime(data: any) {
        // 2022-05-25 18:51:10
        const md = `${data.split(" ")[0].split("-")[1]}-${data.split(" ")[0].split("-")[2]}`;
        return `${md}`;
    }

    getHeight(index: any) {
        const height = this.$vuetify.breakpoint.xsOnly ? 140 : 280
        return Math.ceil(this.bonus_recently.slice().reverse()[index].bar * height);
    }

    private iconsPrize: any = {
        0: require(`@/assets/bonus/gold@2x.png`),
        1: require(`@/assets/bonus/silver@2x.png`),
        2: require(`@/assets/bonus/bronze@2x.png`),
    }

    stakeDraw() {
        this.myProxy.api_user_var_stake_draw();
    }
}
