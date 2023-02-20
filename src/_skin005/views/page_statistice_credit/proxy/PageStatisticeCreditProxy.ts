import CopyUtil from "@/core/global/CopyUtil";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";

export default class PageStatisticeCreditProxy extends puremvc.Proxy {
    static NAME = "PageStatisticeCreditProxy";

    public onRegister(): void {
        this.pageData.loading = true;
        // TODO 请求初始数据
    }

    pageData = {
        loading: false,
        tabIndex:0,
        search:"",
    };


    setShowType(type:number)
    {
        this.pageData.tabIndex = type;
        console.log("设置 开始的值 为 " + this.pageData.tabIndex);
    }
}
