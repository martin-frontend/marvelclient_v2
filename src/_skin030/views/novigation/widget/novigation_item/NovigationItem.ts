import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import LangConfig from "@/core/config/LangConfig";
import Assets from "@/_skin030/assets/Assets";
import NovigationCommonData from "../../NovigationCommonData";
import Constant from "@/core/global/Constant";

@Component
export default class NovigationItem extends AbstractView {
    LangUtil = LangUtil;
    core = core;
    LangConfig = LangConfig;
    CategoryIcon = Assets.CategoryIcon;
    @Prop() itemData!: any; //数据
    @Prop({ default: false }) isMini!: Boolean; //只使用图标的条件
    @Prop({ default: false }) isExpansionPanel!: Boolean; //是否为展开面板
    @Prop() itemActiveFun!: Function; //展开面板单个对象 显示正在活动的判断
    @Prop() expansionData!: any; //展开面板的数据

    @Prop({ default: false }) isPromotions!: Boolean; //是否为活动
    @Prop({ default: false }) isLanguage!: Boolean; //是否为语言选择
    @Prop({ default: false }) isGameCategory!: Boolean; //是否为游戏分类

    //活动展开面板的
    activePanel = <any>[];
    get isActivePanel() {
        return this.activePanel.includes(0);
    }

    mounted() {
        this.$nextTick(() => {
            this.onWatchRouter();
        });
    }

    /**显示的面板的图标 */
    get itemSvgIcon() {
        if (this.itemData.icon && this.itemData.icon.trim()) return this.itemData.icon;
        //如果为游戏分类的图标
        return this.CategoryIcon[NovigationCommonData.getItemCategory(this.itemData)];
    }
    /**展示的名字 */
    get itemShowName() {
        if (this.itemData.name && this.itemData.name.trim()) return this.itemData.name;

        return NovigationCommonData.getItemCategoryName(this.itemData);
    }

    //对象被点击
    onItemClick(data: any) {
        this.$emit("onItemClick", data, this.itemData);
    }
    onChangePanel() {
        this.$nextTick(() => {
            if (!this.isMini) return;

            if (this.isActivePanel) {
                console.warn("---需要 变大 ");
                this.$emit("onChangePanel", this.itemData);
            }
        });
    }
    onTooltipClick() {
        this.activePanel.push(0);
        this.$emit("onChangePanel", this.itemData);
    }
    @Watch("isMini")
    onWatchMini() {
        if (!this.isMini) return;

        this.activePanel = <any>[];
    }

    activityArr = <any>{};
    isGameRouter = false;
    @Watch("$route")
    onWatchRouter() {
        const path = this.$router.app.$route.path;
        if (this.isExpansionPanel && !this.isLanguage) {
            for (let index = 0; index < this.expansionData.length; index++) {
                const element = this.expansionData[index];
                if (element.path && element.path.trim()) {
                    this.activityArr[element.id] = path.includes(element.path);
                }
            }
        } else if (this.isGameCategory) {
            const id = NovigationCommonData.getItemCategory(this.itemData);
            // this.activityArr[this.itemData.id] = path.includes(Constant.getRouterPathByVendor(id));
            this.isGameRouter =path.includes(Constant.getRouterPathByVendor(id));
            // console.warn("----当前对象-----", this.activityArr);
        } else {
            if (this.itemData && this.itemData.path && this.itemData.path.trim()) {
                this.isGameRouter =path.includes(this.itemData.path);
            }
        }
    }
}
