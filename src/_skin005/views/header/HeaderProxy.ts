
export default class HeaderProxy extends puremvc.Proxy {
    static NAME = "HeaderProxy";

    tempTabIndex = "-1"
    resetTab(tab:number)
    {
        this.tempTabIndex = tab + "";
    }
}
