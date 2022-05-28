import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import PageMineMediator from "../mediator/PageMineMediator";
import PageMineProxy from "../proxy/PageMineProxy";
import dialog_record_mine from "@/views/dialog_record_mine";
import dialog_bet_record from "@/views/dialog_bet_record";
import SelfProxy from "@/proxy/SelfProxy";
import page_game_list from "@/views/page_game_list";
import dialog_message_box from "@/views/dialog_message_box";

@Component
export default class PageMine extends AbstractView {
    myProxy: PageMineProxy = this.getProxy(PageMineProxy);
    pageData = this.myProxy.pageData;

    private selfProxy: SelfProxy = this.getProxy(SelfProxy);

    constructor() {
        super(PageMineMediator);
    }

    mounted() {
        console.log(this.$vuetify.breakpoint.xsOnly);
    }

    mobileChange(key: any) {
        const mapPC = <any>{
            coinIcon: 42,
            minRewardBtn: {
                w: 178,
                h: 42,
            },
            leftBgVipIcon: {
                w: 75,
                h: 75,
            },
            howIcon: 72,
            howBtn: {
                w: 126,
                h: 42,
            },
        };
        const mapMobile = <any>{
            coinIcon: 30,
            minRewardBtn: {
                w: 127,
                h: 30,
            },
            leftBgVipIcon: {
                w: 75,
                h: 75,
            },
            howIcon: 65,
            howBtn: {
                w: 90,
                h: 30,
            },
        };
        return this.$vuetify.breakpoint.xsOnly ? mapMobile[key] : mapPC[key];
    }

    /**奖励记录 */
    handlerMineRecord() {
        dialog_record_mine.show();
    }
    /**投注记录 */
    handlerBetRecord() {
        dialog_bet_record.show();
    }
    /**领取奖励 */
    handlerAward() {
        dialog_message_box.confirm({
            message: "确定要领取?",
            okFun: () => {
                this.myProxy.api_user_var_backwater_trial_receive();
            },
        });
    }

    jumpTo(target: string) {
        window.scrollTo({
            //@ts-ignore
            top: document.querySelector(target).offsetTop,
            behavior: "smooth",
        });
    }

    onGoBet() {
        page_game_list.show();
    }
}
