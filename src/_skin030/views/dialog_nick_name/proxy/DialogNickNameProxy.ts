import MultDialogManager from "@/_skin030/core/MultDialogManager";

export default class DialogNickNameProxy extends puremvc.Proxy {
    static NAME = "DialogNickNameProxy";

    pageData = {
        loading: false,
        bShow: false,
        bHidden: false, //暂时隐藏
        nickname: "",
    };

    setData(data: any) {
        this.pageData.loading = false;
    }

    hide() {
        this.pageData.bShow = false;
        MultDialogManager.onClosePanel();
    }
}
