import MultDialogManager from "@/_skin005/core/MultDialogManager";

export default class DialogPersonalCardProxy extends puremvc.Proxy {
    static NAME = "DialogPersonalCardProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        personalCard: "",
        canEdit: true,
    };

    setData(data: any) {
        this.pageData.loading = false;
    }

    hide() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }
}
