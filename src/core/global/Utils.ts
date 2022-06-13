import GlobalVar from "./GlobalVar";

export default class Utils {
    /**
     * 生成二维码图片  base64
     * @param str
     */
    public static generateQrcode(str: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const div = document.createElement("div");
            const qr: any = new QRCode(div, str);
            setTimeout(() => {
                resolve(qr._oDrawing._elImage.currentSrc);
            }, 500);
        });
    }
}
