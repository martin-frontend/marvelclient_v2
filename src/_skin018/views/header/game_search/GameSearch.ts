import AbstractView from "@/core/abstract/AbstractView";
import { Prop, Watch, Component } from "vue-property-decorator";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import PageBlur from "@/_skin005/core/PageBlur";
import GlobalVar from "@/core/global/GlobalVar";

@Component
export default class GameSearch extends AbstractView {
    LangUtil = LangUtil;
    isShowSearch = false;
    selfProxy = PanelUtil.getProxy_selfproxy;
    gameProxy = PanelUtil.getProxy_gameproxy;
    bshow = false;
    mounted() {
        this.readSearchHistory();
        // this.resetItemWidth();
    }
    // itemWidth = 181;
    // @Watch("$vuetify.breakpoint.width")
    // resetItemWidth() {
    //     const baseWidth = this.$mobile ? 110 : 181;
    //     const boxWidth = document.documentElement.clientWidth - 65;
    //     const aaa = Math.round(boxWidth / baseWidth);
    //     console.log("计算出来的结果 应该有的元素 个数 为", aaa);
    //     console.log("计算出来的结果 宽度为document.documentElement.clientWidth ", document.documentElement.clientWidth);
    //     console.log("计算出来的结果 宽度为boxWidth", boxWidth);
    //     this.itemWidth = boxWidth / Math.round(boxWidth / baseWidth);
    // }
    curItemCount = 0;
    get relWidth() {
        const baseWidth = this.$mobile ? 110 : 181;
        let offset = 15;
        if (!this.$mobile) {
            if (PanelUtil.getProxy_novigation.isminiMenu) {
                offset = 186;
            } else {
                offset = 261;
            }
        }
        const boxWidth = document.documentElement.clientWidth - offset;
        const aaa = Math.round(boxWidth / baseWidth);
        // console.log("计算出来的结果 应该有的元素 个数 为", aaa);
        // console.log("计算出来的结果 宽度为document.documentElement.clientWidth ", document.documentElement.clientWidth);
        // console.log("计算出来的结果 宽度为boxWidth", boxWidth);
        const itemWidth = boxWidth / aaa;
        this.curItemCount = aaa;
        // console.log("计算出来的 每个对象的宽度为", itemWidth);
        return itemWidth;
    }
    saveSearchHistory() {
        //  如果有数据  则需要保存数据
        window.localStorage.setItem("serarchGameItem", JSON.stringify(this.listSearchHistery));
    }
    readSearchHistory() {
        const sss = window.localStorage.getItem("serarchGameItem") || "";
        if (sss) {
            this.listSearchHistery = JSON.parse(sss);
        }
    }

    isFilterChange = false;
    @Watch("isFilterChange")
    filterChange(val: boolean) {
        PageBlur.blur_mainpage(this.isFilterChange, false);
        this.isShowSearch = !this.isFilterChange;
        this.$emit("gameSearchChange", this.isFilterChange);
        if (this.isFilterChange) {
            this.clearData();
            setTimeout(() => {
                const searchInput = document.getElementById("searchInput");
                if (searchInput) {
                    //console.log(" 已经找到输入框---");
                    searchInput.focus();
                }
            }, 200);
        }
    }

    public get animMove(): string {
        if (this.$mobile) {
            return "mainPanel";
        }

        return this.isFilterChange ? "mainPanel_pc " : "mainPanel_pc anim_show";
    }

    setIsFilter(val: boolean) {
        this.isFilterChange = val;
    }
    /**清除 数据 */
    clearData() {
        this.searchInput = "";
        this.gameProxy.clearSearchResult();
        this.sendSearchList = <string[]>[];
    }
    searchInput = ""; //
    onBlurInput() {
        console.log("---- 搜索游戏 失去焦点  ---", this.searchInput);

        setTimeout(() => {
            if (this.sendSearchList.length > 0 && this.sendSearchList[0] == this.searchInput) {
                console.log("与上次 发送的 结果一样 不需要发送了");
                return;
            }
            if (!this.searchInput || !this.searchInput.trim()) {
                return;
            }
            const indexof = this.listSearchHistery.indexOf(this.searchInput);
            if (indexof != -1) {
                this.listSearchHistery.splice(indexof, 1);
            }
            this.listSearchHistery.unshift(this.searchInput);
            //如果超过 5个清楚前面的
            if (this.listSearchHistery.length > 5) {
                this.listSearchHistery.pop();
            }
            this.saveSearchHistory();
            this.onSend();
        }, 200);
    }
    inputTimeheadle = 0;
    onInput(val: any) {
        if (this.inputTimeheadle) {
            clearTimeout(this.inputTimeheadle);
        }
        if (!this.searchInput) {
            console.log("---- 输入框为空-----");
            this.gameProxy.clearSearchResult();
        }
        if (this.searchInput) {
            this.inputTimeheadle = setTimeout(this.onBlurInput, 2000);
        }
    }

    //获取搜索记录
    listSearchHistery: string[] = [];

    sendSearchList: string[] = [];
    onSend() {
        if (this.inputTimeheadle) {
            clearTimeout(this.inputTimeheadle);
        }
        this.sendSearchList.unshift(this.searchInput);
        this.gameProxy.api_plat_var_game_search(this.searchInput);
    }
    onDeleteItem(index: number) {
        this.listSearchHistery.splice(index, 1);
        this.saveSearchHistory();
    }
    onDeltetAll() {
        this.listSearchHistery = <string[]>[];
        this.saveSearchHistory();
    }
    // get itemWidth(): number {
    //     return this.$mobile ? 102 : 181;
    // }

    public get content_class(): string {
        if (this.$mobile) {
            return "menu ";
        } else {
            if (PanelUtil.getProxy_novigation.isminiMenu) {
                if (
                    GlobalVar.skin == "skin008" ||
                    GlobalVar.skin == "skin010" ||
                    GlobalVar.skin == "skin012" ||
                    GlobalVar.skin == "skin017"
                ) {
                    return "menu_pc menu_pc_width_mini_008";
                }
                return "menu_pc menu_pc_width_mini";
            }
            return "menu_pc menu_pc_width";
        }
    }

    public get searchInputClass(): string {
        if (this.$mobile) {
            if (GlobalVar.skin == "skin008" || GlobalVar.skin == "skin010" || GlobalVar.skin == "skin012" || GlobalVar.skin == "skin017") {
                return "searchInput_008";
            }
            return "searchInput ";
        } else {
            return "searchInput_pc";
        }
    }
    get icon_color() {
        if (this.$mobile) {
            return "";
        }
        if (core.user_id) {
            return "navIcon--text";
        }

        return "";
    }
    get searchpanel_class() {
        if (this.isHaveData > this.curItemCount) {
            return "searchpanel scroll-y";
        }
        return "";
    }
    onSearchClick() {
        console.log("收到 点击 查询");
        this.endInput();
    }
    onHisteryClick(item: any) {
        this.searchInput = item;
        this.onBlurInput();
    }
    endInput() {
        console.log("----结束输入---");
        this.onBlurInput();
    }
    oncloce() {
        this.bshow = false;
    }
    get isHaveData() {
        const keys = Object.keys(this.gameProxy.searchList.list);
        if (keys.length > 0) {
            return keys.length;
        }
        return 0;
    }
}
