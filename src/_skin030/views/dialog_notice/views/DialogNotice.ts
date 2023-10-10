import AbstractView from "@/core/abstract/AbstractView";
import { Watch, Component } from "vue-property-decorator";
import DialogNoticeMediator from "../mediator/DialogNoticeMediator";
import DialogNoticeProxy from "../proxy/DialogNoticeProxy";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin030/core/PanelUtil";
import MultDialogManager from "@/_skin030/core/MultDialogManager";
import PageBlur from "@/_skin030/core/PageBlur";

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
        MultDialogManager.onClosePanel();
    }

    //是否显示图片
    public get isShowImg(): boolean {
        if (!this.curShowData) {
            return false;
        }

        if (this.$vuetify.breakpoint.mobile) {
            if (this.curShowData.img_url_phone && this.curShowData.img_url_phone != "") {
                return true;
            }
        } else {
            if (this.curShowData.img_url && this.curShowData.img_url != "") {
                return true;
            }
        }

        return false;
    }

    public get img_url(): string {
        if (this.$vuetify.breakpoint.mobile) {
            return this.curShowData.img_url_phone;
        } else {
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
                } else {
                    return this.curShowData.video_uris[2];
                }
            }
        }
        return "";
    }
    get isShowVideo(): boolean {
        if (this.curShowData.video_uris) {
            const keys = Object.keys(this.curShowData.video_uris);

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
                if (index + offset >= keys.length || index + offset < 0) {
                    return null;
                } else {
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
        return this.myProxy.getNoticeInfo(this.curindex);
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
        PageBlur.blur_page(this.pageData.bShow);
        if (this.pageData.bShow) {
            //如果是列表，使用以下数据，否则删除
            if (this.myProxy.noticeData && this.myProxy.noticeData.length > 0) {
                this.curindex = this.myProxy.noticeData[0].id;
            }
        }
    }

    onBigItemClick() {
        console.log("---点击对象---", this.curShowData);
        if (PanelUtil.jumpTo(this.curShowData)) {
            this.onClose();
        }
    }
}
