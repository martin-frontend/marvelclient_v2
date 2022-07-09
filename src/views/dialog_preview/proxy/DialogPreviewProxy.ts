import Utils from "@/core/global/Utils";
export default class DialogPreviewProxy extends puremvc.Proxy {
    static NAME = "DialogPreviewProxy";

    pageData = {
        loading: false,
        bShow: false,
        link: "",
        qrCode: "",
        qrLink: "",
    };

    async setLink(url: string) {
        this.pageData.link = url;
        const imgBase64 = await Utils.generateQrcode(url);
        this.pageData.qrCode = imgBase64;
    }
}
