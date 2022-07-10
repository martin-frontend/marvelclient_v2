import Utils from "@/core/global/Utils";
import MyCanvas from "@/core/ui/MyCanvas";
export default class DialogPreviewProxy extends puremvc.Proxy {
    static NAME = "DialogPreviewProxy";

    pageData = {
        loading: false,
        bShow: false,
        link: "",
        qrCode: "",
        qrLink: "",
        type: 0,
        pretty_user_id: "",
        user_id: 0,
    };

    async setLink(url: string) {
        this.pageData.link = url;
        const imgBase64 = await Utils.generateQrcode(url);
        this.pageData.qrCode = imgBase64;
    }

    /**保存图片到相册 */
    async savePoster(url: any) {
        let poster: string;
        const id = this.pageData.pretty_user_id == "" ? this.pageData.user_id : this.pageData.pretty_user_id;
        //@ts-ignore
        /* eslint-disable */
        const bg = require(`@/assets/extension/poster.jpg`);
        if (bg) {
            const myCanvas = new MyCanvas(750, 1334);
            await myCanvas.drawImage1(bg, 0, 0);
            await myCanvas.drawQrCode(url, 250, 990, 250, 250);
            //推荐人
            myCanvas.drawText(id.toString(), 390, 940, "#ffffff", 26);
            poster = myCanvas.getData();
        } else {
            const qr = await Utils.generateQrcode(this.pageData.link);
            poster = qr;
        }

        const img = new Image();
        img.src = poster;

        const qrCode = document.getElementById("qrCode");
        if (qrCode) {
            qrCode.appendChild(img);
        }
    }
}
