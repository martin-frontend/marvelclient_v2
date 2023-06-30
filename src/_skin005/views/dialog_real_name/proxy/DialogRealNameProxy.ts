import MultDialogManager from "@/_skin005/core/MultDialogManager";

export default class DialogRealNameProxy extends puremvc.Proxy {
    static NAME = "DialogRealNameProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        real_name: "",
        isCPF:false,
    };

    setData(data: any) {
        this.pageData.loading = false;
    }

    hide() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }
}
