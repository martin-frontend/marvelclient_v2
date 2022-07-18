/* eslint-disable */
export default class MyCanvas {
    private _canvas: HTMLCanvasElement;
    private _ctx: CanvasRenderingContext2D;

    constructor(ww: number, hh: number) {
        this._canvas = document.createElement("canvas");
        this._canvas.width = ww;
        this._canvas.height = hh;
        //@ts-ignore
        this._ctx = this._canvas.getContext("2d");
        this._ctx.strokeStyle = "#c3c3c3";
        this._ctx.fillStyle = "#ffffff";
        this._ctx.strokeRect(0, 0, ww, hh);
        this._ctx.fillRect(0, 0, ww, hh);
    }
    /**
     * 将文字绘制到canvas
     * @param {string} text
     * @param {string} front
     * @param {number} xx
     * @param {number} yy
     */
    drawText(
        text: string,
        xx: number = 0,
        yy: number = 0,
        color: string = "#000000",
        frontSize: number = 30,
        frontFaimily: string = "Arial"
    ) {
        this._ctx.fillStyle = color;
        this._ctx.font = frontSize + "px " + frontFaimily;
        this._ctx.textAlign = "center";
        this._ctx.fillText(text, xx, yy);
    }

    /**
     * 将图片绘制到canvas
     * @param image  图像源base64
     * @param dx  image的左上角在目标canvas上 X 轴坐标。
     * @param dy  image的左上角在目标canvas上 Y 轴坐标。
     * @param sx  需要绘制到目标上下文中的，image的矩形（裁剪）选择框的左上角 X 轴坐标。
     * @param sy  需要绘制到目标上下文中的，image的矩形（裁剪）选择框的左上角 Y 轴坐标。
     * @param sWidth  需要绘制到目标上下文中的，image的矩形（裁剪）选择框的宽度。如果不说明，整个矩形（裁剪）从坐标的sx和sy开始，到image的右下角结束。
     * @param sHeight  需要绘制到目标上下文中的，image的矩形（裁剪）选择框的高度。
     * @param dWidth  image在目标canvas上绘制的宽度。 允许对绘制的image进行缩放。 如果不说明， 在绘制时image宽度不会缩放。
     * @param dHeight  image在目标canvas上绘制的高度。 允许对绘制的image进行缩放。 如果不说明， 在绘制时image高度不会缩放。
     */
    //@ts-ignore
    drawImage1(texture, dx, dy): Promise<any> {
        let that = this;
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            // img.src = texture.toDataURL("image/png");
            img.src = texture;
            img.onload = function () {
                that._ctx.drawImage(img, dx, dy);
                //@ts-ignore
                resolve();
            };
        });
    }
    //@ts-ignore
    drawImage2(texture, dx, dy, dWidth, dHeight): Promise<any> {
        let that = this;
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            // img.src = texture.toDataURL("image/png");
            img.src = texture;
            img.onload = function () {
                that._ctx.drawImage(img, dx, dy, dWidth, dHeight);
                //@ts-ignore
                resolve();
            };
        });
    }
    //@ts-ignore
    drawImage3(texture, dx, dy, sx, sy, sWidth, sHeight, dWidth, dHeight): Promise<any> {
        let that = this;
        return new Promise((resolve, reject) => {
            let img = document.createElement("img");
            img.src = texture.toDataURL("image/png");
            img.onload = function () {
                that._ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                //@ts-ignore
                resolve();
            };
        });
    }
    /**绘制一个二维码 */
    //@ts-ignore
    drawQrCode(str, dx, dy, dWidth, dHeight): Promise<any> {
        let that = this;
        return new Promise((resolve, reject) => {
            const div = document.createElement("div");
            const qr: any = new QRCode(div, {
                text: str,
                width: dWidth,
                height: dHeight,
                // colorDark : "#000000",
                // colorLight : "#ffffff",
                // correctLevel : QRCode.CorrectLevel.H
            });
            setTimeout(() => {
                let img = document.createElement("img");
                img.src = qr._oDrawing._elImage.currentSrc;
                img.onload = function () {
                    that._ctx.drawImage(img, dx, dy);
                    //@ts-ignore
                    resolve();
                };
            }, 500);
        });
    }

    /**
     * @returns {string} 返回图片数据base64
     */
    getData(): string {
        return this._canvas.toDataURL();
    }
}
