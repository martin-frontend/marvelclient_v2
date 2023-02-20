import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PageExtensionProxy from "../../../proxy/PageExtensionProxy";

@Component
export default class Fanyong extends AbstractView {
    LangUtil = LangUtil;

    myProxy: PageExtensionProxy = this.getProxy(PageExtensionProxy);
    tableData = this.myProxy.pageData.tableData;
    pageData = this.myProxy.pageData;
}
