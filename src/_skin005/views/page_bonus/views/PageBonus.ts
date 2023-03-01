import Assets from "@/assets/Assets";
import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageBonusMediator from "../mediator/PageBonusMediator";
import PageBonusProxy from "../proxy/PageBonusProxy";
import GamePlatConfig from "@/core/config/GamePlatConfig";
import LangUtil from "@/core/global/LangUtil";
import FagProxy from "@/proxy/FagProxy";
import { getTodayGMT } from "@/core/global/Functions";
import PanelUtil from "@/_skin005/core/PanelUtil";

@Component
export default class PageBonus extends AbstractView {
    myProxy: PageBonusProxy = this.getProxy(PageBonusProxy);
    fagProxy: FagProxy = this.getProxy(FagProxy);
    pageData = this.myProxy.pageData;
    plat_stake_info = this.myProxy.pageData.plat_stake_info;
    user_stake_info = this.myProxy.pageData.user_stake_info;
    listQuery = this.pageData.listQuery;

    private text_font(size:number,offset:number=2)
    {
        if (this.$vuetify.breakpoint.mdAndDown) //手机
        {
            return "text-" + (size-offset);
        }   
        return "text-" + size;
    }
    
    public get text_20() : string {
        return this.text_font(20,4);
    }
    public get text_18() : string {
        return this.text_font(18);
    }
    public get text_16() : string {
        return this.text_font(16);
    }
    public get text_14() : string {
        return this.text_font(14);
    }

    typechange = 0;

    /**图标时间选择 */
    onTimeChange(val: any) {
        this.listQuery.cate = parseInt(val);
        this.onTabClick(this.listQuery.cate);
    }

    GamePlatConfig = GamePlatConfig;
    LangUtil = LangUtil;

    commonIcon = Assets.commonIcon;

    private hr: any = "00";
    private min: any = "00";
    private sec: any = "00";

    private timer: any = null;

    get bonus_rank() {
        return this.myProxy.pageData.bonus_rank.slice(0, 5);
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

        PanelUtil.showAppLoading(false);
    }

    destroyed() {
        super.destroyed();
        clearInterval(this.timer);
    }

    handlerPledge() {
        PanelUtil.openpanel_pledge();
    }

    handlerUnpledge() {
        PanelUtil.openpanel_pledge_unstaking();
    }

    handlerRecords() {
        PanelUtil.openpanel_pledge_records();
    }

    handleRecords() {
        PanelUtil.openpanel_wallet(2, 51);
    }

    handleMore() {
        PanelUtil.openpanel_bonus_ranking();

    }

    jumpTo(target: string) {
        window.scrollTo({
            //@ts-ignore
            top: document.querySelector(target).offsetTop,
            behavior: "smooth",
        });
        this.typechange=1;
        this.onTabClick(1);
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
        //return 220;
        const height = this.$vuetify.breakpoint.xsOnly ? 110 : 220;
        return Math.ceil(this.bonus_recently.slice().reverse()[index].bar * height);

    }

    private iconsPrize: any = {
        0: require(`@/_skin005/assets/bonus/gold.png`),
        1: require(`@/_skin005/assets/bonus/silver.png`),
        2: require(`@/_skin005/assets/bonus/bronze.png`),
    };

    
    public get bg_img_path() : any {
        if (this.$vuetify.theme.dark == false)
        {
            return require(`@/_skin005/assets/bonus/bg.png`)
        }
        return require(`@/_skin005/assets/bonus/bg_dark.png`)
    }
    

    stakeDraw() {
        PanelUtil.message_confirm({
            message: LangUtil("确定要领取?"),
            okFun: () => {
                this.myProxy.api_user_var_stake_draw();
            },
        });
    }

    countdown() {
        //@ts-ignore
        const end = Date.parse(new Date(this.myProxy.pageData.plat_stake_info.bonus_time.replace(/-/g, "/")));
        const today = getTodayGMT();

        const now = today.getTime();
        const msec = end - now;

        if (msec < 0) {
            this.myProxy.api_plat_var_stake_info();
            this.myProxy.api_user_var_stake_info();
        }

        this.hr = Math.floor(msec / 1000 / 60 / 60);
        this.min = Math.floor((msec / 1000 / 60) % 60);
        this.sec = Math.floor((msec / 1000) % 60);
        this.hr = this.hr > 9 ? this.hr : "0" + this.hr;
        this.min = this.min > 9 ? this.min : "0" + this.min;
        this.sec = this.sec > 9 ? this.sec : "0" + this.sec;
    }
}
