import MessageVO from "@/vo/MessageVO";
export default class DialogMessageBoxProxy extends puremvc.Proxy {
    static NAME = "DialogMessageBoxProxy";

    pageData = {
        bShow: false,
        data: <MessageVO>{},
        timeHeadle: 0,//自动关闭的句柄
    };

    handlerOK() {
        const { okFun, thisObj } = this.pageData.data;
        if (okFun) okFun.apply(thisObj);
        this.pageData.bShow = false;
    }

    handlerCancel() {
        const { cancelFun, thisObj } = this.pageData.data;
        if (cancelFun) cancelFun.apply(thisObj);
        this.pageData.bShow = false;
    }
}
