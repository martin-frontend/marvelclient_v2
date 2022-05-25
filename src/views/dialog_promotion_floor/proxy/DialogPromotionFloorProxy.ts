export default class DialogPromotionFloorProxy extends puremvc.Proxy {
    static NAME = "DialogPromotionFloorProxy";

    pageData = {
        loading: false,
        bShow: false,
        amount: 0,
    };

    setData(data: any) {
        this.pageData.loading = false;
    }
}
