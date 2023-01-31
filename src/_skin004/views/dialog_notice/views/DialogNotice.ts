import AbstractView from "@/core/abstract/AbstractView";
import BlurUtil from "@/core/global/BlurUtil";
import CopyUtil from "@/core/global/CopyUtil";
import { Watch, Component } from "vue-property-decorator";
import DialogNoticeMediator from "../mediator/DialogNoticeMediator";
import DialogNoticeProxy from "../proxy/DialogNoticeProxy";
import LangUtil from "@/core/global/LangUtil";

@Component
export default class DialogNotice extends AbstractView {
    LangUtil = LangUtil;
    myProxy: DialogNoticeProxy = this.getProxy(DialogNoticeProxy);
    pageData = this.myProxy.pageData;

    constructor() {
        super(DialogNoticeMediator);
    }
    curindex = 0;

    onClose() {
        this.pageData.bShow = false;
    }


    // public get videoObj() : any {
    //     this.$refs.videoFrame.style.display

    //     return this.$refs.videoFrame 
    // }

    //是否显示图片
    public get isShowImg(): boolean {
        if (!this.curShowData) {
            return false;
        }

        if (this.$vuetify.breakpoint.mobile) {
            if (this.curShowData.img_url_phone && this.curShowData.img_url_phone != "") {
                return true;
            }
        }
        else {
            if (this.curShowData.img_url && this.curShowData.img_url != "") {
                return true;
            }
        }

        return false;
    }


    public get img_url(): string {
        if (this.$vuetify.breakpoint.mobile) {
            return this.curShowData.img_url_phone;
        }
        else {
            return this.curShowData.img_url;
        }
    }


    isYoutubeVideo(url: string): string {
        const sreachRes = url.indexOf("youtube");
        if (sreachRes != -1) {
            // 继续搜索  v= 
            const res_id = url.indexOf("v=");
            if (res_id != -1) {
                let end_index = url.indexOf("&");
                if (end_index == -1) {
                    end_index = url.length;
                }
                const id = url.substring(res_id + 2, end_index);
                console.log(" URL地址 = ", url);
                console.log(" 当前查找到的ID = ", id);
                return id;
            }
        }
        return "";
    }

    get videoUrl(): string {
        if (!this.curShowData) {
            return "";
        }
        //console.log("dangqian " ,this.curShowData);
        if (this.curShowData.video_uris) {
            //const keys = Object.keys(this.curShowData.video_uris)
            //console.log("  地址 " ,this.curShowData.video_uris[2]);

            if (this.curShowData.video_uris[2]) {
                const videoId = this.isYoutubeVideo(this.curShowData.video_uris[2]);
                //const videoId = "0mXy1Ni2Fx4";
                if (videoId != "") {
                    //如果是youtube的视频 则将 视频编号提出来 
                    const path = "https://www.youtube.com/embed/" + videoId + "?enablejsapi=1&autoplay=1&loop=1&playlist=" + videoId;
                    return path;
                }
                else {
                    return this.curShowData.video_uris[2];
                }

            }
        }
        return "";
    }
    get isShowVideo(): boolean {
        if (this.curShowData.video_uris) {
            const keys = Object.keys(this.curShowData.video_uris)

            if (this.curShowData.video_uris[2]) {
                return true;
            }
        }
        return false;
    }

    //是否需要显示 翻页 按钮 
    public get isShowPageBtn(): boolean {
        if (!this.myProxy.noticeData) {
            return false;
        }
        const keys = Object.keys(this.myProxy.noticeData);

        if (keys.length < 2) {
            return false;
        }
        return true;

    }


    public dataInfo(offset: number = 0): any {
        if (!this.myProxy.noticeData || this.myProxy.noticeData.length < 1) {
            return null;
        }
        const keys = Object.keys(this.myProxy.noticeData);
        for (let index = 0; index < keys.length; index++) {
            const element = this.myProxy.noticeData[keys[index]];
            if (element.id == this.curindex) {
                if ((index + offset) >= keys.length || (index + offset) < 0) {
                    return null;
                }
                else {
                    return this.myProxy.noticeData[keys[index + offset]];
                }
            }
        }
        return null;
    }
    // 当前 显示的 数据
    public get curShowData(): any {
        return this.dataInfo();
    }

    //获取下一页的 id 
    public get nextPageInfo(): any {
        return this.dataInfo(1);
    }
    //获取上一页的 id 
    public get lastPageInfo(): any {
        return this.dataInfo(-1);
    }

    onNextPageBtnClick() {
        //console.log("下一页呗点击");
        if (this.nextPageInfo) {
            this.curindex = this.nextPageInfo.id;
        }
    }
    onLastPageBtnClick() {
        //console.log("上一页呗点击");
        if (this.lastPageInfo) {
            this.curindex = this.lastPageInfo.id;
        }
    }

    onBtnClick(item: any) {
        this.curindex = item.id;
    }

    public get noticeDetialInfo(): any {
        //console.log("------das---,", this.myProxy.getNoticeInfo(this.curindex));
        return this.myProxy.getNoticeInfo(this.curindex)
    }


    @Watch("curindex")
    onWatchChange() {

        //console.log("值变化了", this.curindex);
        if (!this.myProxy.getNoticeInfo(this.curindex)) {
            this.myProxy.api_plat_var_notice_show(this.curindex);
        }

        //window.close();

    }

    @Watch("pageData.bShow")
    onWatchShow() {
        BlurUtil(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            // this.myProxy.resetQuery();
            // this.myProxy.api_xxx();
            if (this.myProxy.noticeData && this.myProxy.noticeData.length > 0) {

                this.curindex = this.myProxy.noticeData[0].id;
                //console.log("----asdasda" , this.curindex);
            }
        }
    }


    playerOptions = {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
            type: "", // 类型
            src: 'https://www.youtu.com/embed/paK6SoPjFs' // url地址
        }],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true // 是否显示全屏按钮
        }
    }
}
