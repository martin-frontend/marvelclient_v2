import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class GameType extends AbstractView {
    LangUtil = LangUtil;

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
