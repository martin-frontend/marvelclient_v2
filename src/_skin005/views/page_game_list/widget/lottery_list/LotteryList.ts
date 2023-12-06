import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PageGameListProxy from "../../proxy/PageGameListProxy";
import getProxy from "@/core/global/getProxy";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class LotteryList extends AbstractView {
    LangUtil = LangUtil;
    myProxy: PageGameListProxy = getProxy(PageGameListProxy);
    pageData = this.myProxy.pageData;

    get lotterys() {
        return [{ icon: "https://sftpuser.j8jj8.com/resource2/images/vendor/icon/b5/16/b5168bd936936a103f6c1aa06c243b41.png" }];
    }

    openLottery() {}
}
