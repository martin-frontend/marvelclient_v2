import AbstractView from "@/core/abstract/AbstractView";
import LangUtil from "@/core/global/LangUtil";
import PanelUtil from "@/_skin005/core/PanelUtil";
import { Prop, Watch, Component, Vue } from "vue-property-decorator";
import ModulesHelper from "@/_skin005/core/ModulesHelper";
import GameConfig from "@/core/config/GameConfig";
import Constant from "@/core/global/Constant";
import OpenLink from "@/core/global/OpenLink";
import ActivityConfig from "@/core/config/ActivityConfig";
@Component
export default class MobileMenu extends AbstractView {
    LangUtil = LangUtil;
    selfProxy = PanelUtil.getProxy_selfproxy;
    GameConfig = GameConfig;
    gameProxy = PanelUtil.getProxy_gameproxy;
    activityConfig = ActivityConfig.config;
    get menuList() {
        const newlist = [];
        const list = <any>{
            0: { id: 0, mob_type: "home", name: LangUtil("首页"), icon: "home", path: "/" },
            1: { id: 1, mob_type: "football", name: LangUtil("足球"), icon: "soccer", path: "/page_game_soccer" },
            2: { id: 2, mob_type: "casino", name: LangUtil("娱乐城"), icon: "c16", path: "/page_game_list" },
            3: { id: 3, mob_type: "promotion", name: LangUtil("推广"), icon: "extension", path: "/commissions" },
            4: { id: 4, mob_type: "pledgeDividend", name: LangUtil("分红"), icon: "bouns", path: "/page_bonus" },
            5: { id: 5, mob_type: "myInfo", name: LangUtil("我的"), icon: "my_info", path: "/page_my_info" },
            6: { id: 6, mob_type: "", name: LangUtil("代理管理"), icon: "agentmenger", path: "/page_statistice_credit" },
            7: { id: 7, mob_type: "gameWater", name: LangUtil("返水"), icon: "water", path: "/vip_rewards" },
            8: { id: 8, mob_type: "cricket", name: LangUtil("板球"), icon: "cricket", path: "/cricket" },
            // 9: { id: 9, mob_type: "charge", name: LangUtil("充值"), icon: "water", path: "/page_recharge" },
            9: {
                id: 9,
                mob_type: "charge",
                name: LangUtil("充值"),
                svga: {
                    light: "deposit-1",
                    dark: "deposit-4",
                    active_dark: "deposit-2",
                    active_light: "deposit-3",
                },
                path: "/page_recharge",
            },
            10: { id: 10, mob_type: "download", name: LangUtil("下载"), icon: "download", path: "" },
        };

        const phoneMenu = GameConfig.config.PhoneMenu || [];
        if (phoneMenu.length > 0) {
            //将 head_game 中的数据添加 到 列表中
            for (let index = 0; index < GameConfig.config.head_game_config.length; index++) {
                const element = GameConfig.config.head_game_config[index];
                if (!element.mob_type || !element.mob_type.trim()) continue;
                //检测 当前的手机类型是否已经包含在这个列表中了， 如果不包含则添加

                const isHave = Object.keys(list).some((e: any, idx: any, arr: any) => list[e].mob_type == element.mob_type);
                if (!isHave) {
                    //如果配置了 mob_type 则 生成 对应的 对象
                    const length = Object.keys(list).length;
                    const obj = JSON.parse(JSON.stringify(element));
                    obj.id = length;
                    obj.name = LangUtil(element.title);
                    obj.icon = element.icon_name;
                    obj.path = "/" + element.router_name;
                    list[length] = obj;
                }
            }

            //console.log("--- 当前对象为---", list);
            const keys = Object.keys(list);
            for (let index = 0; index < phoneMenu.length; index++) {
                const element = phoneMenu[index];
                if (element.trim()) {
                    for (let n = 0; n < keys.length; n++) {
                        const el = list[keys[n]];
                        if (element == el.mob_type) {
                            if (element == "download") {
                                //需要检测是否在app 和 是否已经 保存
                                if (this.isShowGuide) newlist.push(el);
                            } else newlist.push(el);
                        }
                    }
                }
            }
        } else {
            if (ModulesHelper.IsShow_FootBall()) {
                newlist.push(list[1]);
            }

            if (this.isShowCricket) {
                newlist.push(list[8]);
            }
            newlist.push(list[2]);

            //是否显示 游戏反水
            if (ModulesHelper.IsShow_GameWater()) {
                newlist.push(list[7]);
            }
            //是否显示 游戏反水
            if (ModulesHelper.IsShow_Promotion()) {
                newlist.push(list[3]);
            }
            //质押分红
            if (ModulesHelper.IsShow_PledgeDividend()) {
                newlist.push(list[4]);
            }
        }
        //代理管理
        if (ModulesHelper.IsShow_AgentManager()) {
            newlist.push(list[6]);
        }
        //我的
        if (!ModulesHelper.isHide_MyInfo() && !phoneMenu.includes("myInfo")) {
            newlist.push(list[5]);
        }
        //检测是否应该排除彩球
        if (!this.activityConfig.ball_rank.is_open) {
            const idx = newlist.findIndex((item) => item.mob_type == "activity_slot");
            if (idx >= 0) newlist.splice(idx, 1);
        }

        PanelUtil.appproxy.set_mobile_menu(newlist);
        return newlist;
    }

    routerPath = this.$router.app.$route.path;
    @Watch("$route")
    onWatchRouter() {
        this.routerPath = this.$router.app.$route.path;
    }

    get isShowGuide() {
        //@ts-ignore
        if (core.app_type == core.EnumAppType.APP || window.navigator.standalone === true) {
            return false;
        }
        return true;
    }

    onItemClick(item: any) {
        if (this.isActiveItem(item)) return;
        switch (item.id) {
            case 0:
                PanelUtil.openpage_home();
                return;

            case 1:
                PanelUtil.openpage_soccer();
                return;

            case 2:
                PanelUtil.openpage_gamelist();
                return;

            case 3:
                PanelUtil.openpage_extension();
                return;

            case 4:
                PanelUtil.openpage_bonus();
                return;

            case 5:
                PanelUtil.openpage_my_info();
                return;

            case 6:
                PanelUtil.openpage_statist_credit();
                return;

            case 7:
                PanelUtil.openpage_mine();
                return;

            case 8:
                PanelUtil.openpage_soccer_cricket();
                return;

            case 9:
                PanelUtil.openpage_recharge();
                return;
            case 10:
                PanelUtil.appproxy.onGuide();
                return;
        }

        //如果是打开跳转连接
        if (item.url && item.url.trim()) {
            OpenLink(item.url);
            return;
        }
        //需要跳转打开网页
        if (item.page && item.page.trim()) {
            PanelUtil.actionByName(item.page);
            return;
        }
        PanelUtil.openpage_soccer(item);
    }

    //是否显示 板球
    public get isShowCricket(): boolean {
        if (GameConfig.config.CricketVendorId && GameConfig.config.CricketVendorId != 0) {
            return true;
        }
        return false;
    }

    /**是否为板球 */
    public get isCricket(): boolean {
        console.log("---- 数据 变化------");
        return !!this.GameConfig.config.CricketVendorId && this.gameProxy.currGame.vendor_id == this.GameConfig.config.CricketVendorId;
    }

    isActiveItem(item: any) {
        if (!item) return false;
        //首先判断是否为 在head_game中的游戏
        if (item.id == 8) {
            //板球的判断
            return this.routerPath.includes(item.path) && this.isCricket;
        } else if (item.id == 0) {
            return this.routerPath == Vue.prePath || this.routerPath == Vue.prePath + "/";
        } else if (item.id == 1) {
            return this.routerPath.includes(item.path) && !this.isCricket;
        } else if (item.id == 2) {
            return Constant.isIncludeGameRouter(this.routerPath);
        } else {
            if (item.path && item.path != "/") {
                return this.routerPath.includes(item.path);
            }
        }
        return false;
    }

    curSvgaType(item: any) {
        if (this.$vuetify.theme.dark && this.isActiveItem(item)) {
            return "active_dark";
        } else if (this.$vuetify.theme.dark && !this.isActiveItem(item)) {
            return "dark";
        } else if (!this.$vuetify.theme.dark && this.isActiveItem(item)) {
            return "active_light";
        } else {
            return "light";
        }
    }

    resolveSvgaSrc(name: any) {
        return "svga/" + name + ".svga";
    }
    get guideText() {
        //@ts-ignore
        return LangUtil(window.navigator.standalone === undefined ? "下载" : "保存");
    }
}
