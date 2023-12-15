import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import getProxy from "@/core/global/getProxy";
import GlobalVar from "@/core/global/GlobalVar";
import LotteryListMediator from "./LotteryListMediator";
import LotteryListProxy from "./LotteryListProxy";

@Component
export default class LotteryList extends AbstractView {
    LangUtil = LangUtil;
    myProxy: LotteryListProxy = getProxy(LotteryListProxy);
    pageData = this.myProxy.pageData;

    constructor(){
        super(LotteryListMediator);
    }
}
