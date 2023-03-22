
export default class HeaderProxy extends puremvc.Proxy {
    static NAME = "HeaderProxy";

    pagetab = "-1"
    resetTab(tab:number)
    {
        this.pagetab = tab + "";
    }
}
