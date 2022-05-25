import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import PageGameListProxy from "../../proxy/PageGameListProxy";

@Component
export default class GameListSearch extends AbstractView {
    myProxy: PageGameListProxy = this.getProxy(PageGameListProxy);
    navigationData = this.myProxy.navigationData;
}
