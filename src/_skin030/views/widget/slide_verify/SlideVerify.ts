import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component, Ref } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";

const PI: number = Math.PI;

function sum(x: number, y: number): number {
    return x + y;
}

function square(x: number): number {
    return x * x;
}

@Component
export default class SlideVerify extends AbstractView {
    LangUtil = LangUtil;
    @Prop({ type: Number, default: 42 }) l!: number;
    @Prop({ type: Number, default: 10 }) r!: number;
    @Prop({ type: Number, default: 310 }) w!: number;
    @Prop({ type: Number, default: 155 }) h!: number;
    @Prop({ type: String, default: "Slide filled right" }) sliderText!: string;
    @Prop({ type: Number, default: 5 }) accuracy!: number;
    @Prop({ type: Boolean, default: true }) show!: boolean;
    @Prop({ type: Array, default: () => [] }) imgs!: string[];
    /**0-100的范围 如果<0 为随机 */
    @Prop({ type: Number, default: -1 }) positionX!: number;

    containerActive: boolean = false;
    containerSuccess: boolean = false;
    containerFail: boolean = false;
    canvasCtx: CanvasRenderingContext2D | null = null;
    blockCtx: CanvasRenderingContext2D | null = null;
    @Ref("canvas") canvas!: HTMLCanvasElement;
    // @Ref("block") block!: HTMLCanvasElement;
    // @Ref() readonly block!: HTMLCanvasElement;
    @Ref("block") readonly blockRef!: HTMLCanvasElement;
    private block: HTMLCanvasElement | null = null;

    block_x: number | undefined; // container random position
    block_y: number | undefined;
    L: number = this.l + this.r * 2 + 3; // block real length
    img: HTMLImageElement | undefined;
    originX: number | undefined;
    originY: number | undefined;
    isMouseDown: boolean = false;
    trail: number[] = [];
    sliderLeft: string = "0"; // block right offset
    sliderMaskWidth: string = "0"; // mask width
    success: boolean = false; // Bug Fixes 修复了验证成功后还能滑动
    loadBlock: boolean = true; // Features 图片加载提示，防止图片没加载完就开始验证
    timestamp: number | null = null;

    mounted() {
        this.$nextTick(() => {
            //@ts-ignore
            this.block = this.$refs.block;
            this.init();
        });
    }

    init() {
        this.initDom();
        this.initImg();
        this.bindEvents();
    }

    initDom() {
        if (!this.block) return;
        this.canvasCtx = this.canvas.getContext("2d");
        this.blockCtx = this.block.getContext("2d");
    }

    initImg() {
        const img = this.createImg(() => {
            // 图片加载完关闭遮蔽罩
            this.loadBlock = false;
            this.drawBlock();
            this.canvasCtx?.drawImage(img, 0, 0, this.w, this.h);
            this.blockCtx?.drawImage(img, 0, 0, this.w, this.h);
            const { block_x: x, block_y: y, r, L } = this;
            //@ts-ignore
            const _y = y - r * 2 - 1;
            //@ts-ignore
            const imageData = this.blockCtx?.getImageData(x, _y, L, L);
            if (imageData) {
                //@ts-ignore
                this.block.width = L;
                this.blockCtx?.putImageData(imageData, 0, _y);
            }
        });
        this.img = img;
    }
    //按照0-100来设置 目标块在的位置
    get resetBlock_X() {
        const min_x = this.L + 10;
        const max_x = this.w - (this.L + 10);
        // if (this.positionX < 0) {
        //     return this.getRandomNumberByRange(min_x, max_x);
        // } else {
        return ((max_x - min_x) * this.positionX) / 100 + min_x;
        // }
    }
    // 按照0-100 计算当前滑块 所在的位置
    curblock_X(value: any) {
        const min_x = this.L + 10;
        const max_x = this.w - (this.L + 10);
        return (((value - min_x) / (max_x - min_x)) * 100).toFixed(2);
    }

    drawBlock() {
        // this.block_x = this.getRandomNumberByRange(this.L + 10, this.w - (this.L + 10));
        if (this.positionX < 0) {
            this.block_x = this.getRandomNumberByRange(this.L + 10, this.w - (this.L + 10));
        } else {
            this.block_x = this.resetBlock_X;
        }
        this.block_y = this.getRandomNumberByRange(10 + this.r * 2, this.h - (this.L + 10));
        //@ts-ignore
        this.draw(this.canvasCtx, this.block_x, this.block_y, "fill");
        //@ts-ignore
        this.draw(this.blockCtx, this.block_x, this.block_y, "clip");
    }
    draw(ctx: CanvasRenderingContext2D, x: number, y: number, operation: any) {
        const { l, r } = this;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
        ctx.lineTo(x + l, y);
        ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
        ctx.lineTo(x + l, y + l);
        ctx.lineTo(x, y + l);
        ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
        ctx.lineTo(x, y);
        ctx.lineWidth = 2;
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.stroke();
        //@ts-ignore
        ctx[operation]();
        // Bug Fixes 修复了火狐和ie显示问题
        if (ctx.globalCompositeOperation) {
            ctx.globalCompositeOperation = "destination-over";
        }
    }

    createImg(onload: () => void): HTMLImageElement {
        const img = document.createElement("img");
        img.crossOrigin = "Anonymous";
        img.onload = onload;
        img.onerror = () => {
            img.src = this.getRandomImg();
        };
        img.src = this.getRandomImg();
        return img;
    }

    getRandomImg(): string {
        const len = this.imgs.length;
        return len > 0
            ? this.imgs[this.getRandomNumberByRange(0, len - 1)]
            : // "https://bing.ioliu.cn/v1/rand?w=300&h=150";
              "https://source.unsplash.com/300x150/?book,library";
        // "https://api.dujin.org/pic/fengjing";
    }

    getRandomNumberByRange(start: number, end: number): number {
        return Math.round(Math.random() * (end - start) + start);
    }

    refresh() {
        this.reset();
        this.$emit("refresh");
    }

    sliderDown(event: MouseEvent) {
        if (this.success) return;
        this.originX = event.clientX;
        this.originY = event.clientY;
        this.isMouseDown = true;
        this.timestamp = +new Date();
    }

    touchStartEvent(e: TouchEvent) {
        if (this.success) return;
        this.originX = e.changedTouches[0].pageX;
        this.originY = e.changedTouches[0].pageY;
        this.isMouseDown = true;
        this.timestamp = +new Date();
    }

    bindEvents() {
        document.addEventListener("mousemove", this.handleMoveEvent);
        document.addEventListener("mouseup", this.handleMoveEndEvent);
    }

    handleMoveEvent(e: MouseEvent | TouchEvent, type: string = "mouse") {
        if (!this.isMouseDown) return false;
        const moveX =
            //@ts-ignore
            type === "mouse" ? (e as MouseEvent).clientX - this.originX : (e as TouchEvent).changedTouches[0].pageX - this.originX;

        const moveY =
            //@ts-ignore
            type === "mouse" ? (e as MouseEvent).clientY - this.originY : (e as TouchEvent).changedTouches[0].pageY - this.originY;
        if (moveX < 0 || moveX + 38 >= this.w) return false;
        this.sliderLeft = moveX + "px";
        const blockLeft = ((this.w - 40 - 20) / (this.w - 40)) * moveX;
        //@ts-ignore
        this.block.style.left = blockLeft + "px";

        this.containerActive = true; // add active
        this.sliderMaskWidth = moveX + "px";
        this.trail.push(moveY);
    }

    handleMoveEndEvent(e: MouseEvent | TouchEvent, type: "mouse" | "touch" = "mouse") {
        if (!this.isMouseDown) return false;
        this.isMouseDown = false;
        if (
            (type === "mouse" && (e as MouseEvent).clientX === this.originX) ||
            (type === "touch" && (e as TouchEvent).changedTouches[0].pageX === this.originX)
        )
            return false;
        this.containerActive = false; // remove active
        this.timestamp = +new Date() - (this.timestamp as number);
        //const left = parseFloat(this.block.style.left as string).toFixed(2);
        const { spliced, TuringTest } = this.verify();
        //@ts-ignore
        const curLeft = this.curblock_X(parseFloat(this.block.style.left as string));
        // console.log("位置----", curLeft);
        if (spliced) {
            if (this.accuracy === -1) {
                this.containerSuccess = true;
                this.success = true;
                // this.$emit("success", this.timestamp, left);
                this.$emit("success", curLeft);
                return;
            }
            if (TuringTest) {
                // succ
                this.containerSuccess = true;
                this.success = true;
                // this.$emit("success", this.timestamp, left);
                this.$emit("success", curLeft);
            } else {
                this.containerFail = true;
                this.$emit("again");
            }
        } else {
            this.containerFail = true;
            this.$emit("fail");
            setTimeout(() => {
                this.reset();
            }, 1000);
        }
    }

    verify(): { spliced: boolean; TuringTest: boolean } {
        const arr = this.trail; // drag y move distance
        if (arr.length === 0) {
            return { spliced: false, TuringTest: false };
        }
        const average = arr.reduce(sum) / arr.length; // average
        const deviations = arr.map((x) => x - average); // deviation array
        const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length); // standard deviation
        //@ts-ignore
        const left = parseInt(this.block.style.left as string);
        const accuracy = this.accuracy <= 1 ? 1 : this.accuracy > 10 ? 10 : this.accuracy;
        return {
            spliced: Math.abs(left - (this.block_x as number)) <= accuracy,
            TuringTest: average !== stddev, // equal => not person operate
        };
    }

    reset() {
        //console.warn("重置----");
        if (!this.block) return;
        this.success = false;
        this.containerActive = false;
        this.containerSuccess = false;
        this.containerFail = false;
        this.sliderLeft = "0";
        this.block.style.left = "0";
        this.sliderMaskWidth = "0";
        // canvas
        const { w, h } = this;
        this.canvasCtx?.clearRect(0, 0, w, h);
        this.blockCtx?.clearRect(0, 0, w, h);
        this.block.width = w;

        // generate img
        //@ts-ignore
        this.img.src = this.getRandomImg();
        this.$emit("fulfilled");
    }

    destroyed() {
        document.removeEventListener("mousemove", this.handleMoveEvent);
        document.removeEventListener("mouseup", this.handleMoveEndEvent);
    }
}
function throttle(
    fn: Function,
    interval: number = 50,
    options: { leading?: boolean; trailing?: boolean; resultCallback?: (result: any) => void } = {}
) {
    const { leading, trailing, resultCallback } = options;
    let lastTime = 0;
    let timer: number | null = null;

    const _throttle = function (...args: any[]) {
        return new Promise((resolve, reject) => {
            const nowTime = new Date().getTime();
            if (!lastTime && !leading) lastTime = nowTime;

            const remainTime = interval - (nowTime - lastTime);
            if (remainTime <= 0) {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                //@ts-ignore
                const result = fn.apply(this, args);
                if (resultCallback) resultCallback(result);
                resolve(result);
                lastTime = nowTime;
                return;
            }

            if (trailing && !timer) {
                timer = setTimeout(() => {
                    timer = null;
                    lastTime = !leading ? 0 : new Date().getTime();
                    //@ts-ignore
                    const result = fn.apply(this, args);
                    if (resultCallback) resultCallback(result);
                    resolve(result);
                }, remainTime);
            }
        });
    };

    _throttle.cancel = function () {
        if (timer) clearTimeout(timer);
        timer = null;
        lastTime = 0;
    };

    return _throttle;
}
