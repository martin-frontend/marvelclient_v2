import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import Assets from "@/_skin005/assets/Assets";
import { getVersion } from "@/core/global/Functions";
import PanelUtil from "@/_skin005/core/PanelUtil";
import SkinVariable from "@/_skin005/core/SkinVariable";
import FooterMediator from "./FooterMediator";
import OpenLink from "@/core/global/OpenLink";

@Component
export default class Footer extends AbstractView {
    LangUtil = LangUtil;
    getVersion = getVersion;
    SkinVariable = SkinVariable;
    commonIcon = Assets.commonIcon;
    noticeProxy = PanelUtil.getProxy_noticeProxy;
    gameProxy = PanelUtil.getProxy_gameproxy;
    getChannelID() {
        return core.channel_id;
    }
    panel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    panel_1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    constructor() {
        super(FooterMediator);
    }
    //所有厂商的数据
    public get tableMenu(): any {
        return this.gameProxy.lobbyMenuIndex;
    }

    //所有 图片的数据
    public get imgData(): any {
        const data = [];
        const keys = Object.keys(this.tableMenu);
        for (let index = 0; index < keys.length; index++) {
            //@ts-ignore
            const element = this.tableMenu[keys[index]];

            for (let n = 0; n < element.list.length; n++) {
                const ele = element.list[n];
                if (ele.vendor_icon && ele.vendor_icon != "" && ele.vendor_icon != "-") {
                    let ishave = false;
                    for (let p = 0; p < data.length; p++) {
                        if (data[p].vendor_id === ele.vendor_id) {
                            ishave = true;
                            break;
                        }
                    }
                    if (!ishave) {
                        data.push(ele);
                    }
                }
            }
        }
        return data;
    }

    getIcon(item: any) {
        if (!item || !item.vendor_icon) {
            return "";
        }
        this.noticeProxy.data.listType11;
        return item.vendor_icon;
    }
    item_scale = 0; //手机版 item 的高度
    load(item: any) {
        //加载结束之后获取 这个对象
        const baseHeight = this.$mobile ? 30 : 40;
        const img: any = document.getElementById(item.id);
        if (!img) return;
        this.$nextTick(() => {
            const imgL = new Image();
            imgL.src = img.src;
            const imgW = imgL.naturalWidth;
            const imgH = imgL.naturalHeight;
            if (this.$mobile) {
                //如果已经计算过图片缩放的比例了 就不需要再计算
                if (this.item_scale) {
                    img.style.height = this.item_scale * imgH + "px";
                    return;
                }
                //计算手机缩放的尺寸
                const offset = 70;
                const boxWidth = document.documentElement.clientWidth - offset;
                const bodyH = (imgH / 160) * baseHeight;
                const baseWidth = (bodyH * imgW) / imgH;
                const count = Math.round(boxWidth / baseWidth);
                //重新计算的长度
                const resWidth = boxWidth / count - 10;

                //新的最终的尺寸高度为
                const new_height = (resWidth * imgH) / imgW;
                this.item_scale = new_height / imgH;

                const temp_height = imgH * this.item_scale;
                //console.log("重新计算高度为", temp_height);

                img.style.height = temp_height + "px";
                return;
            }

            const bodyH = (imgH / 160) * baseHeight;
            img.style.height = bodyH + "px";
            //console.log("重新设置 高度为", bodyH);
        });
    }
    loadstart(item: any) {
        console.log("--开始加载->>", item);
    }
    /**将list对象中的数据 按照 category字段 分类 返回  数组 对象 */
    private _setCategoryData(data: core.PlatNoticeVO[]) {
        //将 底部说明的对象  按照标签 分类
        if (!data || data.length < 1) return <any>[];

        const category_logo_data = <any>[];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];

            if (!element.category || !element.category.trim()) {
                element.category = "-";
            }
            let addObj;
            for (let n = 0; n < category_logo_data.length; n++) {
                if (category_logo_data[n].title == element.category) {
                    addObj = category_logo_data[n];
                    break;
                }
            }
            if (!addObj) {
                addObj = {
                    title: element.category,
                    data: <core.PlatNoticeVO[]>[],
                };
                category_logo_data.push(addObj);
            }

            addObj.data.push(element);
        }
        //console.log(" 计算出来的  分类列表为 ", category_logo_data);
        return category_logo_data;
    }

    //将底部说明 按照 标签分类
    public get logo_list(): any {
        return this._setCategoryData(this.footerNoticeData_logo);
    }

    public get isHaveShouming_list(): boolean {
        if (!this.shouming_list) return false;

        return this.shouming_list.length > 0;
    }

    //将底部说明 按照 标签分类
    public get shouming_list(): any {
        //console.log("--- 底部 分类 数据---", this.footerNoticeData);
        return this._setCategoryData(this.footerNoticeData);
    }
    /**底部logo */
    public get footerNoticeData_logo(): core.PlatNoticeVO[] {
        return this.noticeProxy.data.listType12;
    }
    /**底部说明 */
    public get footerNoticeData(): core.PlatNoticeVO[] {
        //return this.noticeProxy.getListTypeDataFromType(12);
        return this.noticeProxy.data.listType11;
    }

    public img_url(item: any): string {
        if (this.$mobile) {
            return item.img_url_phone;
        } else {
            return item.img_url;
        }
    }
    /**判断是否能被点击 */
    isCanClick(item: any): boolean {
        //如果是图片类型才进行下面的判断，否则都默认为 可以点击
        if (this.isShowImg(item)) {
            return PanelUtil.isCanJump(item);
        }
        return true;
    }
    //是否显示图片
    public isShowImg(item: any): boolean {
        if (!item) {
            return false;
        }

        if (this.$mobile) {
            if (item.img_url_phone && item.img_url_phone != "") {
                return true;
            }
        } else {
            if (item.img_url && item.img_url != "") {
                return true;
            }
        }

        return false;
    }

    isShowTooltip(item: any) {
        if (!item || !item.name || !item.name.trim()) return "";
        const strArr = item.name.split("##");
        if (strArr && strArr.length > 1) {
            return strArr[1];
        }
        return "";
    }
    onFooterClick(item: any) {
        console.log("---收到点击 对象", item);
        if (!PanelUtil.jumpTo(item)) {
            console.log("不能跳转");
            if (!this.isShowImg(item)) this.onInRuleClick(item);
        }
    }
    onFooterImgClick(item: any) {
        console.log("收到点击", item);
        if (item.open_mode == 1 && item.open_mode_url) {
            OpenLink(item.open_mode_url);
        }
    }
    goService() {
        PanelUtil.openpanel_service();
    }
    goContact() {
        PanelUtil.openpanel_contract();
    }
    goMail() {
        PanelUtil.openpanel_official_mail();
    }

    onInRuleClick(item: any) {
        console.log("收到点击 ", item);
        const data = this.noticeProxy.get_detail_notice(item.id);
        if (!data) {
            this.noticeProxy.api_plat_var_notice_show(item.id);
            PanelUtil.appproxy.setLoading(true);
        } else {
            const obj = {
                activity_name: data.name,
                link_url: data.content,
            };
            PanelUtil.openpanel_notice_detail(obj);
        }
    }
}
