import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageBonusMediator from "../mediator/PageBonusMediator";
import PageBonusProxy from "../proxy/PageBonusProxy";
import dialog_pledge from "@/views/dialog_pledge";
import dialog_manually_unstaking from "@/views/dialog_manually_unstaking";
import dialog_pledge_records from "@/views/dialog_pledge_records";
import dialog_wallet from "@/views/dialog_wallet";
import dialog_message_box from "@/_skin100/views/dialog_message_box";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import FagProxy from "@/proxy/FagProxy";

@Component
export default class PageBonus extends AbstractView {
    myProxy: PageBonusProxy = this.getProxy(PageBonusProxy);
    fagProxy: FagProxy = this.getProxy(FagProxy);
    pageData = this.myProxy.pageData;
    plat_stake_info = this.myProxy.pageData.plat_stake_info;
    user_stake_info = this.myProxy.pageData.user_stake_info;
    listQuery = this.pageData.listQuery;

    GamePlatConfig = GamePlatConfig;
    LangUtil = LangUtil;

    commonIcon = Assets.commonIcon;

    private hr: any = "00";
    private min: any = "00";
    private sec: any = "00";

    private timer: any = null;

    get bonus_rank() {
        return this.myProxy.pageData.bonus_rank;
    }

    get bonus_recently() {
        return this.myProxy.pageData.bonus_recently;
    }

    get plat_bonus() {
        return this.myProxy.pageData.plat_bonus;
    }

    get user_bonus() {
        return this.myProxy.pageData.user_bonus;
    }

    constructor() {
        super(PageBonusMediator);
    }

    mounted() {
        this.timer = setInterval(() => {
            this.countdown();
        }, 1000);
    }

    destroyed() {
        super.destroyed();
        clearInterval(this.timer);
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
        this.onTabClick(1);
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
        const height = this.$vuetify.breakpoint.xsOnly ? 140 : 280;
        return Math.ceil(this.bonus_recently.slice().reverse()[index].bar * height);
    }

    private iconsPrize: any = {
        0: require(`@/assets/bonus/gold@2x.png`),
        1: require(`@/assets/bonus/silver@2x.png`),
        2: require(`@/assets/bonus/bronze@2x.png`),
    };

    stakeDraw() {
        dialog_message_box.confirm({
            message: LangUtil("确定要领取?"),
            okFun: () => {
                this.myProxy.api_user_var_stake_draw();
            },
        });
    }

    countdown() {
        //@ts-ignore
        const end = Date.parse(new Date(this.myProxy.pageData.plat_stake_info.bonus_time.replace(/-/g, "/")));

        //@ts-ignore
        const now = Date.parse(new Date());
        const msec = end - now;
        if (msec == 0) {
            this.myProxy.api_plat_var_stake_info();
            this.myProxy.api_user_var_stake_info();
        }

        this.hr = Math.floor(msec / 1000 / 60 / 60);
        this.min = Math.floor((msec / 1000 / 60) % 60);
        this.sec = (msec / 1000) % 60;
        this.hr = this.hr > 9 ? this.hr : "0" + this.hr;
        this.min = this.min > 9 ? this.min : "0" + this.min;
        this.sec = this.sec > 9 ? this.sec : "0" + this.sec;
    }
}
