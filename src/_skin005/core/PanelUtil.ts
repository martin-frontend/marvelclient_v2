import Vue from "vue";
import getProxy from "@/core/global/getProxy";

/** 主要相关 */
import SelfProxy from "@/proxy/SelfProxy";
import GameProxy from "@/proxy/GameProxy";
import AppProxy from "@/_skin005/AppProxy";
import LoginEnter from "@/_skin005/core/global/LoginEnter";

import NoticeProxy from "@/proxy/NoticeProxy";

/** 系统提示相关 */
import dialog_preview from "@/_skin005/views/dialog_preview";
import dialog_message_box from "@/_skin005/views/dialog_message_box";
import dialog_message from "@/_skin005/views/dialog_message";

import dialog_service from "@/_skin005/views/dialog_service";
import dialog_contract from "@/_skin005/views/dialog_contract";

/** 几个大的路由界面 以及 导航*/
import page_game_list from "@/_skin005/views/page_game_list";
import page_game_play from "@/_skin005/views/page_game_play";
import page_game_soccer from "@/_skin005/views/page_game_soccer";
import page_statistice_credit from "@/_skin005/views/page_statistice_credit";

import NovigationProxy from "@/_skin005/views/novigation/NovigationProxy";
import PageBonusProxy from "@/_skin005/views/page_bonus/proxy/PageBonusProxy";
import PageHomeProxy from "@/_skin005/views/page_home/proxy/PageHomeProxy";

/**登录 注册相关 */
import dialog_login from "@/_skin005/views/dialog_login";
import dialog_register from "@/_skin005/views/dialog_register";

import DialogLoginProxy from "@/_skin005/views/dialog_login/proxy/DialogLoginProxy";

/**邮件 公告 活动*/
import dialog_email from "@/_skin005/views/dialog_email";
import dialog_email_detail from "@/_skin005/views/dialog_email_detail";
import dialog_official_mail from "@/_skin005/views/dialog_official_mail";
//import dialog_activity from "@/_skin005/views/dialog_activity";
import dialog_activity_detail from "@/_skin005/views/dialog_activity_detail";
import dialog_notice_detail from "@/_skin005/views/dialog_notice_detail";
import dialog_notice from "@/_skin005/views/dialog_notice";

/**用户 信息 */
import dialog_user_center from "@/_skin005/views/dialog_user_center";
import dialog_plat_users_verification from "@/_skin005/views/dialog_plat_users_verification";
import dialog_real_name from "@/_skin005/views/dialog_real_name";
import dialog_nick_name from "@/_skin005/views/dialog_nick_name";
import dialog_safety_center from "@/_skin005/views/dialog_safety_center";
import dialog_google_settings from "@/_skin005/views/dialog_google_settings";
import dialog_bind_google from "@/_skin005/views/dialog_bind_google";
import dialog_google_verification from "@/_skin005/views/dialog_google_verification";
import dialog_personal_card from "@/_skin005/views/dialog_personal_card";

/**充值 提现 */
import dialog_recharge from "@/_skin005/views/dialog_recharge";
import dialog_wallet from "@/_skin005/views/dialog_wallet";
import dialog_game_rate from "@/_skin005/views/dialog_game_rate";
//import dialog_trade_password from "@/_skin005/views/dialog_trade_password";
import dialog_record_exchange from "@/_skin005/views/dialog_record_exchange";
import dialog_record_recharge from "@/_skin005/views/dialog_record_recharge";
import dialog_address_book from "@/_skin005/views/dialog_address_book";
import dialog_address_book_remark from "@/_skin005/views/dialog_address_book_remark";
import page_recharge from "@/_skin005/views/page_recharge";
import dialog_recharge_qrcode from "@/_skin005/views/dialog_recharge_qrcode";

import dialog_gold_water from "@/_skin005/views/dialog_gold_water";
import DialogRechargeProxy from "@/_skin005/views/dialog_recharge/proxy/DialogRechargeProxy";
import DialogAddressBookProxy from "@/_skin005/views/dialog_address_book/proxy/DialogAddressBookProxy";
import DialogAddressBookRemarkProxy from "@/_skin005/views/dialog_address_book_remark/proxy/DialogAddressBookRemarkProxy";

/**代理 */
import dialog_directly from "@/_skin005/views/dialog_directly";
import dialog_bind_invite from "@/_skin005/views/dialog_bind_invite";
import dialog_performance from "@/_skin005/views/dialog_performance";
import dialog_promotion_floor from "@/_skin005/views/dialog_promotion_floor";

import DialogDirectlyProxy from "@/_skin005/views/dialog_directly/proxy/DialogDirectlyProxy";
import DialogPromotionFloorProxy from "@/_skin005/views/dialog_promotion_floor/proxy/DialogPromotionFloorProxy";

/**投注记录 */
import dialog_bet_record from "@/_skin005/views/dialog_bet_record";
import dialog_bet_filter from "@/_skin005/views/dialog_bet_filter";
import dialog_order from "@/_skin005/views/dialog_order";

/**质押 */
import dialog_pledge from "@/_skin005/views/dialog_pledge";
import dialog_pledge_records from "@/_skin005/views/dialog_pledge_records";
import dialog_manually_unstaking from "@/_skin005/views/dialog_manually_unstaking";

/**挖矿 奖励 */
import dialog_award from "@/_skin005/views/dialog_award";
import dialog_record_mine from "@/_skin005/views/dialog_record_mine";
import dialog_record_mine_detail from "@/_skin005/views/dialog_record_mine_detail";
import DialogRecordMineDetailProxy from "@/_skin005/views/dialog_record_mine_detail/proxy/DialogRecordMineDetailProxy";

/** 信用 代理  信用统计 */
// import dialog_statistics_credit from "@/_skin005/views/dialog_statistics_credit";
// import dialog_agent_manager from "@/_skin005/views/dialog_agent_manager";
import dialog_directly_adduser from "@/_skin005/views/dialog_directly_adduser";
import dialog_directly_agentset from "@/_skin005/views/dialog_directly_agentset";
import dialog_directly_backwater from "@/_skin005/views/dialog_directly_backwater";
import dialog_directly_easybetset from "@/_skin005/views/dialog_directly_easybetset";
import dialog_directly_gameset from "@/_skin005/views/dialog_directly_gameset";
import dialog_directly_my from "@/_skin005/views/dialog_directly_my";
import dialog_directly_setting from "@/_skin005/views/dialog_directly_setting";
import dialog_directly_transfer from "@/_skin005/views/dialog_directly_transfer";
import dialog_directly_password from "@/_skin005/views/dialog_directly_password";
import dialog_edit_remark from "@/_skin005/views/dialog_edit_remark";
import dialog_promotion_statistics from "@/_skin005/views/dialog_promotion_statistics";

import DialogDirectlySettingProxy from "@/_skin005/views/dialog_directly_setting/proxy/DialogDirectlySettingProxy";
import DialogAgentManagerProxy from "@/_skin005/views/dialog_agent_manager/proxy/DialogAgentManagerProxy";
import DialogBetRecordProxy from "@/_skin005/views/dialog_bet_record/proxy/DialogBetRecordProxy";
import DialogStatisticsCreditProxy from "@/_skin005/views/dialog_statistics_credit/proxy/DialogStatisticsCreditProxy";
import DialogDirectlyMyProxy from "@/_skin005/views/dialog_directly_my/proxy/DialogDirectlyMyProxy";
import DialogPlatUsersVerificationProxy from "@/_skin005/views/dialog_plat_users_verification/proxy/DialogPlatUsersVerificationProxy";

import PageStatisticeCreditProxy from "@/_skin005/views/page_statistice_credit/proxy/PageStatisticeCreditProxy";

/** 其他  */
import dialog_swap_record from "@/_skin005/views/dialog_swap_record";
import dialog_bonus_ranking from "@/_skin005/views/dialog_bonus_ranking";
import dialog_performance_detail from "@/_skin005/views/dialog_performance_detail";
import dialog_timezone from "@/_skin005/views/dialog_timezone";

import dialog_get_verity from "@/_skin005/views/dialog_get_verity";
import DialogGetVerityProxy from "@/_skin005/views/dialog_get_verity/proxy/DialogGetVerityProxy";

import DialogPerformanceDetailProxy from "@/_skin005/views/dialog_performance_detail/proxy/DialogPerformanceDetailProxy";
import MultDialogManager from "./MultDialogManager";
import PageBlur from "./PageBlur";
import GameConfig from "@/core/config/GameConfig";
import SkinVariable from "./SkinVariable";
import LangUtil from "@/core/global/LangUtil";
import OpenLink from "@/core/global/OpenLink";
import dialog_daily_sign from "../views/dialog_daily_sign";
import dialog_promotion_reward from "../views/dialog_promotion_reward";
import DialogPromotionRewardProxy from "@/_skin005/views/dialog_promotion_reward/proxy/DialogPromotionRewardProxy";
import GlobalVar from "@/core/global/GlobalVar";
import PageActivityProxy from "@/_skin005/views/page_activity/proxy/PageActivityProxy";

import DialogSpeedVerification from "@/_skin005/views/dialog_speed_verification";
export default class PanelUtil {
    static get appproxy(): AppProxy {
        return getProxy(AppProxy);
    }
    /**设置 主节点的 loading 是否显示 */
    static showAppLoading(isshow: boolean = true) {
        PanelUtil.appproxy.setLoading(isshow);
    }

    static showNovigation(isshow: boolean = true) {
        PanelUtil.appproxy.setNovigationPanelShow(isshow);
    }

    private static _isSetThem = false;
    static getThemeDark() {
        if (!this._isSetThem) {
            this._isSetThem = true;
            if (SkinVariable.autoTheme) {
                //获取设备当前时间
                const timenow_hour = new Date().getHours();
                //白天
                if (timenow_hour > 5 && timenow_hour < 18) {
                    Vue.vuetify.framework.theme.dark = false;
                } else {
                    Vue.vuetify.framework.theme.dark = true;
                }
            }
        }
        return Vue.vuetify.framework.theme.dark;
    }
    static setThemeDark(isDark: boolean = true) {
        if (!this._isSetThem) {
            this._isSetThem = true;
        }
        Vue.vuetify.framework.theme.dark = isDark;
    }
    /**
     * 常规页面的打开，一般是路由
     */
    private static _openpRouter_base(pagename: string, isNeedLoading: boolean, isCleadPanel: boolean) {
        if (Vue.router.history.current.path.includes(pagename)) return;
        Vue.router.push("/" + pagename);
        if (isNeedLoading) PanelUtil.showAppLoading(true);
        if (isCleadPanel) {
            PageBlur.blur_force_close();
            MultDialogManager.forceClosePanel();
        }
    }

    /**
     * 常规页面的打开，一般是路由
     * @param pagename 路由的名字
     * @param isNeedLogin  是否需要验证登录
     * @param isNeedLoading  是否需要点击的时候打开显示加载
     * @param isCleadPanel 是否需要清理其他页面
     */
    private static _openpage_base(
        pagename: string,
        isNeedLogin: boolean = true,
        isNeedLoading: boolean = true,
        isCleadPanel: boolean = true
    ) {
        if (isNeedLogin) {
            LoginEnter(() => {
                this._openpRouter_base(pagename, isNeedLoading, isCleadPanel);
            });
        } else {
            this._openpRouter_base(pagename, isNeedLoading, isCleadPanel);
        }
    }
    /** 
        page路由 页面 
    */
    /**打开推广赚钱页面 */
    static openpage_extension() {
        this._openpage_base("commissions", false);
    }
    //币种介绍
    static openpage_introduce() {
        this._openpage_base("page_introduce");
    }

    //打开 主页
    static openpage_home() {
        if (Vue.router.app.$route.path != Vue.prePath) {
            Vue.router.push("/");
        }
        PanelUtil.getProxy_novigation.setMiniMenu(false);
        PageBlur.blur_force_close();
        MultDialogManager.forceClosePanel();
    }
    //打开游戏列表 界面
    static openpage_gamelist() {
        //Vue.router.push("/page_game_list");
        //LoginEnter(() => {
        PanelUtil.showAppLoading(true);
        page_game_list.show();
        PageBlur.blur_force_close();
        MultDialogManager.forceClosePanel();
        //PanelUtil.showAppLoading(true);
        //});
    }

    //打开游戏列表 界面
    static openpage_game_play(url: string) {
        PanelUtil.getProxy_novigation.setMiniMenu(true);
        PageBlur.blur_force_close();
        MultDialogManager.forceClosePanel();
        page_game_play.show(url);
    }

    //打开 质押分红 界面
    static openpage_bonus() {
        this._openpage_base("page_bonus");
    }

    //打开 信用统计 界面
    static openpage_statist_credit(nub: number = 0) {
        LoginEnter(() => {
            //Vue.router.push("/page_statistice_credit");
            if (Vue.router.history.current.path.includes("page_statistice_credit")) return;
            PanelUtil.showAppLoading(true);
            page_statistice_credit.show(nub);
            PageBlur.blur_force_close();
            MultDialogManager.forceClosePanel();
        });
    }

    //请求  体育的链接 界面
    static openpage_soccer(data: any = null) {
        //不需要登录限制 可以请求
        if (data && data.visitor_allowed && data.visitor_allowed == 1) {
            PanelUtil.showAppLoading(true);
            PanelUtil.getProxy_gameproxy.go_soccer(data);
        } else {
            // LoginEnter(() => {
            PanelUtil.showAppLoading(true);
            PanelUtil.getProxy_gameproxy.go_soccer(data);
            // });
        }
    }
    //请求  板球的链接 界面
    static openpage_soccer_cricket(data: any = null) {
        //LoginEnter(() => {
        PanelUtil.showAppLoading(true);
        if (!data) {
            data = {
                app_type: 2,
                category: 64,
                icon: "http://sftpuser.testjj9.com/resource/load_page_domain/d8/a7/d8a7883ef7beb56973362b0ab85b2402.jpg",
                index_no: 49,
                languages: ["zh_CN", "th_TH", "jp_JP", "es_ES", "ko_Kr", "vi_VN", "en_EN", "zh_TW"],
                list_type: 0,
                lobby_model_product_id: 369,
                lobby_product_id: 4857,
                open_mode: 1,
                ori_product_id: "Cricket",
                ori_vendor_extend: '{"iframe_bad":false}',
                orientation: 1,
                plat_id: 30017,
                status: 1,
                tags: [],
                vendor_id: GameConfig.config.CricketVendorId,
                vendor_name: "板球-测试",
                vendor_product_id: 8271,
                vendor_product_name: "板球",
                vendor_type: 64,
                visitor_allowed: 1,
                water_rate_accelerate: 0,
            };
        }
        //PanelUtil.getProxy_gameproxy.go_soccer(data);

        page_game_soccer.open_cricket();
        //});
    }
    //打开 游戏返水 界面
    static openpage_mine() {
        this._openpage_base("page_mine", false);
    }

    //打开 SWAP交易 界面
    static openpage_swap() {
        this._openpage_base("page_swap");
    }

    //打开 我的界面 界面
    static openpage_my_info() {
        this._openpage_base("page_my_info");
    }
    //打开 充值 界面
    static openpage_recharge(tabIdx: number = 0) {
        LoginEnter(() => {
            if (Vue.router.history.current.path.includes("page_recharge")) return;

            page_recharge.show(tabIdx);
            //Vue.router.push("/page_recharge");
            PageBlur.blur_force_close();
            MultDialogManager.forceClosePanel();
        });
    }

    /**打开 足球 界面  */
    static openpage_sport(url: string, isCricket: boolean = false) {
        //Vue.router.push("/page_game_soccer");
        PanelUtil.getProxy_novigation.setMiniMenu(true);
        console.log("  进入 体育", url);
        page_game_soccer.show(url, isCricket);
    }
    /**打开 首页头部的游戏 界面  */
    static openpage_headgame(url: string, item: any) {
        //Vue.router.push("/page_game_soccer");
        PanelUtil.getProxy_novigation.setMiniMenu(true);
        console.log("  进入 首页游戏", url);
        page_game_soccer.show_head_game(url, item);
    }

    /*
        弹框页面打开
    */
    //打开登录窗口
    static openpanel_login(options: any = null) {
        if (!GlobalVar.instance.isShowLogin) return;
        MultDialogManager.onOpenPanel(dialog_login);
        dialog_login.show();
    }

    //打开注册窗口
    static openpanel_register(options: any = null) {
        MultDialogManager.onOpenPanel(dialog_register);
        dialog_register.show();
    }

    //打开 邮件 窗口
    static openpanel_mail(options: any = null) {
        LoginEnter(() => {
            MultDialogManager.onOpenPanel(dialog_email);
            dialog_email.show();
        });

        //LoginEnter(dialog_email.show);
    }
    //打开 邮件详细 窗口
    static openpanel_mail_detail(data: any = null) {
        MultDialogManager.onOpenPanel(dialog_email_detail);
        dialog_email_detail.show(data);
    }
    //打开 邮件详细 窗口
    static openpanel_official_mail() {
        MultDialogManager.onOpenPanel(dialog_official_mail);
        dialog_official_mail.show();
    }

    //打开充值窗口
    static openpanel_recharge(options: any = null) {
        // if (SkinVariable.isUsedDialogRecharge) {
        //     MultDialogManager.onOpenPanel(dialog_recharge);
        //     dialog_recharge.show();
        // } else
        PanelUtil.openpage_recharge();
    }
    //打开提现窗口
    static openpanel_excharge(options: any = null) {
        if (SkinVariable.isUsedDialogRecharge) {
            MultDialogManager.onOpenPanel(dialog_recharge);
            dialog_recharge.show(1);
        } else PanelUtil.openpage_recharge(1);
    }
    //打开精彩活动窗口
    static openpanel_activity(options: any = null) {
        this._openpage_base("promotions", false);
    }

    //打开游戏列表窗口
    static openpanel_gamelist(category?: number, vendor_id?: number) {
        //MultDialogManager.onOpenPanel(dialog_recharge);
        page_game_list.show(category, vendor_id);
    }

    //打开 奖励记录 窗口
    static openpanel_record_mine() {
        MultDialogManager.onOpenPanel(dialog_record_mine);
        dialog_record_mine.show();
    }

    //打开 投注记录 窗口
    static openpanel_bet_record(
        agent_user_id: any = null,
        start_date: string = "",
        end_date: string = "",
        bShowOptions = true,
        msg: any = null
    ) {
        MultDialogManager.onOpenPanel(dialog_bet_record);
        dialog_bet_record.show(agent_user_id, start_date, end_date, bShowOptions, msg);
    }

    //打开 奖励详情 窗口
    static openpanel_record_mine_detail(data: any = null) {
        MultDialogManager.onOpenPanel(dialog_record_mine_detail);
        dialog_record_mine_detail.show(data);
    }

    //打开 我的直属 窗口
    static openpanel_directly() {
        MultDialogManager.onOpenPanel(dialog_directly);
        dialog_directly.show();
    }

    //打开 google验证 窗口
    static openpanel_google_verification(type: boolean = true) {
        MultDialogManager.onOpenPanel(dialog_google_verification);
        dialog_google_verification.show(type);
    }

    //打开 开启弹窗: 平台钱包/账户明细/推广返佣 窗口
    static openpanel_wallet(tabIdx: number = 0, type?: number, coinName?: string) {
        MultDialogManager.onOpenPanel(dialog_wallet);
        dialog_wallet.show(tabIdx, type, coinName);
    }
    //打开 业绩查询 窗口
    static openpanel_performance() {
        MultDialogManager.onOpenPanel(dialog_performance);
        dialog_performance.show();
    }
    //打开 设置保底 窗口
    static openpanel_promotion_floor() {
        MultDialogManager.onOpenPanel(dialog_promotion_floor);
        dialog_promotion_floor.show();
    }
    //打开 业绩查询 窗口
    static openpanel_personal_card(card: string = "", canEdit: boolean = true) {
        MultDialogManager.onOpenPanel(dialog_personal_card);
        dialog_personal_card.show(card, canEdit);
    }

    //打开 质押 窗口
    static openpanel_pledge() {
        MultDialogManager.onOpenPanel(dialog_pledge);
        dialog_pledge.show();
    }
    //打开 质押记录 窗口
    static openpanel_pledge_records() {
        MultDialogManager.onOpenPanel(dialog_pledge_records);
        dialog_pledge_records.show();
    }

    //打开 解除质押 窗口
    static openpanel_pledge_unstaking() {
        MultDialogManager.onOpenPanel(dialog_manually_unstaking);
        dialog_manually_unstaking.show();
    }

    //打开 交换记录 窗口
    static openpanel_swap_record() {
        LoginEnter(() => {
            MultDialogManager.onOpenPanel(dialog_swap_record);
            dialog_swap_record.show();
        });
    }

    //打开 奖励排行榜 窗口
    static openpanel_bonus_ranking() {
        MultDialogManager.onOpenPanel(dialog_bonus_ranking);
        dialog_bonus_ranking.show();
    }

    //打开 服务条款 窗口
    static openpanel_service() {
        MultDialogManager.onOpenPanel(dialog_service);
        dialog_service.show();
    }
    //打开 联系我们 窗口
    static openpanel_contract() {
        MultDialogManager.onOpenPanel(dialog_contract);
        dialog_contract.show();
    }
    //打开 用户中心 窗口
    static openpanel_user_center() {
        LoginEnter(() => {
            MultDialogManager.onOpenPanel(dialog_user_center);
            dialog_user_center.show();
        });
    }
    //打开 用户认证 窗口
    static openpanel_plat_users_verification() {
        LoginEnter(() => {
            MultDialogManager.onOpenPanel(dialog_plat_users_verification);
            dialog_plat_users_verification.show();
        });
    }
    //打开 真实姓名 窗口
    static openpanel_real_name(isCPF:boolean = false) {
        MultDialogManager.onOpenPanel(dialog_real_name);
        dialog_real_name.show(isCPF);
    }
    //打开 昵称修改 窗口
    static openpanel_nick_name() {
        MultDialogManager.onOpenPanel(dialog_nick_name);
        dialog_nick_name.show();
    }
    //打开 安全中心 窗口
    static openpanel_safety_center(index: number = 0) {
        MultDialogManager.onOpenPanel(dialog_safety_center);
        dialog_safety_center.show(index);
    }
    //打开 google设置 窗口
    static openpanel_google_settings() {
        MultDialogManager.onOpenPanel(dialog_google_settings);
        dialog_google_settings.show();
    }
    //打开 绑定google 窗口
    static openpanel_bind_google() {
        MultDialogManager.onOpenPanel(dialog_bind_google);
        dialog_bind_google.show();
    }
    //打开 交易密码 窗口
    static openpanel_trade_password() {
        //MultDialogManager.onOpenPanel(dialog_trade_password);
        //dialog_trade_password.show();
        this.openpanel_safety_center(3);
    }
    //打开 绑定邀请码 窗口
    static openpanel_bind_invite() {
        MultDialogManager.onOpenPanel(dialog_bind_invite);
        dialog_bind_invite.show();
    }
    //打开 游戏汇率 窗口
    static openpanel_game_rate() {
        MultDialogManager.onOpenPanel(dialog_game_rate);
        dialog_game_rate.show();
    }
    //打开 预览 窗口
    static openpanel_preview(url: string) {
        MultDialogManager.onOpenPanel(dialog_preview);
        dialog_preview.show(url);
    }

    //打开 提款记录 窗口
    static openpanel_record_exchange() {
        MultDialogManager.onOpenPanel(dialog_record_exchange);
        dialog_record_exchange.show();
    }
    //打开 充值记录 窗口
    static openpanel_record_recharge() {
        MultDialogManager.onOpenPanel(dialog_record_recharge);
        dialog_record_recharge.show();
    }

    //打开 地址本 窗口
    static openpanel_address_book() {
        MultDialogManager.onOpenPanel(dialog_address_book);
        dialog_address_book.show();
    }
    //打开 奖励 窗口
    static openpanel_award(data: any) {
        MultDialogManager.onOpenPanel(dialog_award);
        dialog_award.show(data);
    }

    //打开 地址 备注 修改 窗口
    static openpanel_address_book_remark() {
        MultDialogManager.onOpenPanel(dialog_address_book_remark);
        dialog_address_book_remark.show();
    }
    /** 获取验证码 */
    static openpanel_get_verity(data: any) {
        //MultDialogManager.onOpenPanel(dialog_get_verity);
        if (GameConfig.config.is_display_auth_code == 0) {
            dialog_get_verity.sendSMSVerith(data);
        } else dialog_get_verity.show(data);
    }

    /**
     * 筛选
     * @param data
     */
    static openpanel_bet_filter(data: any = null) {
        MultDialogManager.onOpenPanel(dialog_bet_filter);
        dialog_bet_filter.show(data);
    }
    /**
     * 订单
     * @param data
     */
    static openpanel_order(data: any = null) {
        MultDialogManager.onOpenPanel(dialog_order);
        dialog_order.show(data);
    }
    /**
     * 活动详情
     * @param data 数据
     */
    static openpanel_activity_detail(data: any) {
        MultDialogManager.onOpenPanel(dialog_activity_detail);
        dialog_activity_detail.show(data);
    }

    /**
     * 代理管理
     */
    static openpanel_agent_manager() {
        //dialog_agent_manager.show();

        PanelUtil.openpage_statist_credit(1);
    }
    /**
     * 添加用户
     */
    static openpanel_directly_adduser() {
        MultDialogManager.onOpenPanel(dialog_directly_adduser);
        dialog_directly_adduser.show();
    }
    /**
     * 代理占成
     * @param agent_user 需要查看的 用户名
     */
    static openpanel_directly_agentset(agent_user: any = null) {
        MultDialogManager.onOpenPanel(dialog_directly_agentset);
        dialog_directly_agentset.show(agent_user);
    }

    /**
     * 返水设置
     * @param agent_user 用户名
     * @param ismine 是否为我的反水
     */
    static openpanel_directly_backwater(agent_user: any = null, ismine: boolean = false) {
        MultDialogManager.onOpenPanel(dialog_directly_backwater);
        dialog_directly_backwater.show(agent_user, ismine);
    }
    /**
     * EasyBet设置
     * @param agent_user 需要查看的 用户名
     */
    static openpanel_directly_easybetset(agent_user: any = null) {
        MultDialogManager.onOpenPanel(dialog_directly_easybetset);
        dialog_directly_easybetset.show(agent_user);
    }

    /**
     * 游戏类型开关
     * @param data 需要显示的数据
     */
    static openpanel_directly_gameset(data: any = null) {
        MultDialogManager.onOpenPanel(dialog_directly_gameset);
        dialog_directly_gameset.show(data);
    }
    /**
     * 我的推广
     */
    static openpanel_directly_my() {
        MultDialogManager.onOpenPanel(dialog_directly_my);
        dialog_directly_my.show();
    }
    /**
     * 直属信息
     * @param agent_user 需要查看的 用户名
     */
    static openpanel_directly_setting(agent_user: any = null) {
        MultDialogManager.onOpenPanel(dialog_directly_setting);
        dialog_directly_setting.show(agent_user);
    }
    /**
     * 增加额度 减少额度
     * @param agent_user 目标用户
     * @param addModeData 是否为加钱模式
     */
    static openpanel_directly_transfer(agent_user: any = null, addModeData: boolean = false) {
        MultDialogManager.onOpenPanel(dialog_directly_transfer);
        dialog_directly_transfer.show(agent_user, addModeData);
    }
    /**
     * 修改备注
     * @param data 编辑数据
     */
    static openpanel_edit_remark(data: any) {
        MultDialogManager.onOpenPanel(dialog_edit_remark);
        dialog_edit_remark.show(data);
    }
    /**
     * 信用统计
     */
    static openpanel_statistics_credit() {
        PanelUtil.openpage_statist_credit(11);

        //dialog_statistics_credit.show();
    }
    /**
     * 代理统计
     */
    static openpanel_promotion_statistics() {
        MultDialogManager.onOpenPanel(dialog_promotion_statistics);
        dialog_promotion_statistics.show();
    }
    /**业绩详情 */
    static openpanel_performance_detail() {
        MultDialogManager.onOpenPanel(dialog_performance_detail);
        dialog_performance_detail.show();
    }
    /** 审核流水 页面 */
    static openpanel_gold_waterl() {
        MultDialogManager.onOpenPanel(dialog_gold_water);
        dialog_gold_water.show();
    }
    /** 修改直属密码 页面 */
    static openpanel_directly_password(data: any) {
        MultDialogManager.onOpenPanel(dialog_directly_password);
        dialog_directly_password.show(data);
    }

    /** 底部消息 详细公告 */
    static openpanel_notice_detail(data: any) {
        MultDialogManager.onOpenPanel(dialog_notice_detail);
        dialog_notice_detail.show(data);
    }
    /**  弹窗公告 */
    static openpanel_notice() {
        MultDialogManager.onOpenPanel(dialog_notice);
        dialog_notice.show();
    }
    /** 充值弹出的二维码的对话框 */
    static openpanel_recharge_qrcode(data: any, isImg: boolean = false) {
        MultDialogManager.onOpenPanel(dialog_recharge_qrcode);
        dialog_recharge_qrcode.show(data, isImg);
    }

    /**打开 时区选择界面 */
    static openpanel_timezone() {
        MultDialogManager.onOpenPanel(dialog_timezone);
        dialog_timezone.show();
    }
    /**打开 每日签到界面 */
    static openpanel_dailysign() {
        LoginEnter(() => {
            MultDialogManager.onOpenPanel(dialog_daily_sign);
            PanelUtil.showNovigation(false);
            dialog_daily_sign.show();
        });
    }
    /**打开 每日签到界面 */
    static openpanel_promotionreward() {
        LoginEnter(() => {
            MultDialogManager.onOpenPanel(dialog_promotion_reward);
            PanelUtil.showNovigation(false);
            dialog_promotion_reward.show();
        });
    }
    /**打开 验证界面 */
    static openpanel_speed_verification(successFun: Function | null, failFun: Function | null = null) {
        MultDialogManager.onOpenPanel(DialogSpeedVerification);
        DialogSpeedVerification.show(successFun, failFun);
    }

    public static get getProxy_performance_detail(): DialogPerformanceDetailProxy {
        return getProxy(DialogPerformanceDetailProxy);
    }

    public static get getProxy_statistics_credit(): DialogStatisticsCreditProxy {
        return getProxy(DialogStatisticsCreditProxy);
    }

    public static get getProxy_directly_my(): DialogDirectlyMyProxy {
        return getProxy(DialogDirectlyMyProxy);
    }

    public static get getProxy_page_statistice_credit(): PageStatisticeCreditProxy {
        return getProxy(PageStatisticeCreditProxy);
    }

    /**
     * 投注记录
     */
    public static get getProxy_betrecord(): DialogBetRecordProxy {
        return getProxy(DialogBetRecordProxy);
    }
    /**
     * 代理设置
     */
    public static get getProxy_agentmanager(): DialogAgentManagerProxy {
        return getProxy(DialogAgentManagerProxy);
    }

    /**
     * 直属设置
     */
    public static get getProxy_directly_setting(): DialogDirectlySettingProxy {
        return getProxy(DialogDirectlySettingProxy);
    }
    /**
     * 直属代理的数据
     */
    public static get getProxy_directly(): DialogDirectlyProxy {
        return getProxy(DialogDirectlyProxy);
    }
    /** */
    public static get getProxy_address_book_remark(): DialogAddressBookRemarkProxy {
        return getProxy(DialogAddressBookRemarkProxy);
    }
    /** */
    public static get getProxy_login(): DialogLoginProxy {
        return getProxy(DialogLoginProxy);
    }

    //导航的数据
    public static get getProxy_novigation(): NovigationProxy {
        return getProxy(NovigationProxy);
    }
    //奖励详情数据
    public static get getProxy_record_mine_detail(): DialogRecordMineDetailProxy {
        return getProxy(DialogRecordMineDetailProxy);
    }

    //奖励保底数据
    public static get getProxy_promotion_floor(): DialogPromotionFloorProxy {
        return getProxy(DialogPromotionFloorProxy);
    }

    //奖励详情数据
    public static get getProxy_page_bonus(): PageBonusProxy {
        return getProxy(PageBonusProxy);
    }

    //奖励详情数据
    public static get getProxy_page_home(): PageHomeProxy {
        return getProxy(PageHomeProxy);
    }
    //自己的数据
    public static get getProxy_selfproxy(): SelfProxy {
        return getProxy(SelfProxy);
    }
    //游戏的数据
    public static get getProxy_gameproxy(): GameProxy {
        return getProxy(GameProxy);
    }

    //充值的数据
    public static get getProxy_recharge(): DialogRechargeProxy {
        return getProxy(DialogRechargeProxy);
    }
    //地址的的数据
    public static get getProxy_addressBook(): DialogAddressBookProxy {
        return getProxy(DialogAddressBookProxy);
    }

    //通知的消息
    public static get getProxy_noticeProxy(): NoticeProxy {
        return getProxy(NoticeProxy);
    }
    /**获取验证码  */
    public static get getProxy_get_verityProxy(): DialogGetVerityProxy {
        return getProxy(DialogGetVerityProxy);
    }
    /**活动的数据  */
    public static get getProxy_promotion_reward(): DialogPromotionRewardProxy {
        return getProxy(DialogPromotionRewardProxy);
    }
    //用户验证数据
    public static get getProxy_get_platUsersVerificationProxy(): DialogPlatUsersVerificationProxy {
        return getProxy(DialogPlatUsersVerificationProxy);
    }
    //活动的数据
    public static get getProxy_get_pageActivityProxy(): PageActivityProxy {
        return getProxy(PageActivityProxy);
    }

    public static get message_confirm(): Function {
        return dialog_message_box.confirm;
    }
    public static get message_alert(): Function {
        return dialog_message_box.alert;
    }
    public static get message_alert_mult(): Function {
        return dialog_message_box.alert_mult;
    }

    public static get message_success(): Function {
        return dialog_message.success;
    }
    public static get message_info(): Function {
        return dialog_message.info;
    }
    public static get message_warn(): Function {
        return dialog_message.warn;
    }
    public static get message_error(): Function {
        return dialog_message.error;
    }

    private static _mapList = <any>[] || undefined;
    public static get funcMap(): any[] {
        if (!this._mapList || this._mapList.length < 1) {
            this._mapList = [
                {
                    key: "openpage_extension",
                    fun: () => {
                        PanelUtil.openpage_extension();
                    },
                },
                {
                    key: "openpage_introduce",
                    fun: () => {
                        PanelUtil.openpage_introduce();
                    },
                },
                {
                    key: "openpage_home",
                    fun: () => {
                        PanelUtil.openpage_home();
                    },
                },
                {
                    key: "openpage_gamelist",
                    fun: () => {
                        PanelUtil.openpage_gamelist();
                    },
                },
                {
                    key: "openpage_bonus",
                    fun: () => {
                        PanelUtil.openpage_bonus();
                    },
                },
                {
                    key: "openpage_statist_credit",
                    fun: () => {
                        PanelUtil.openpage_statist_credit();
                    },
                },
                {
                    key: "openpage_soccer",
                    fun: () => {
                        PanelUtil.openpage_soccer();
                    },
                },
                {
                    key: "openpage_soccer_cricket",
                    fun: () => {
                        PanelUtil.openpage_soccer_cricket();
                    },
                },
                {
                    key: "openpage_mine",
                    fun: () => {
                        PanelUtil.openpage_mine();
                    },
                },
                {
                    key: "openpage_swap",
                    fun: () => {
                        PanelUtil.openpage_swap();
                    },
                },
                {
                    key: "openpage_my_info",
                    fun: () => {
                        PanelUtil.openpage_my_info();
                    },
                },
                {
                    key: "openpage_recharge",
                    fun: () => {
                        PanelUtil.openpage_recharge();
                    },
                },
                {
                    key: "openpanel_login",
                    fun: () => {
                        PanelUtil.openpanel_login();
                    },
                },
                {
                    key: "openpanel_register",
                    fun: () => {
                        PanelUtil.openpanel_register();
                    },
                },
                {
                    key: "openpanel_mail",
                    fun: () => {
                        PanelUtil.openpanel_mail();
                    },
                },
                {
                    key: "openpanel_official_mail",
                    fun: () => {
                        PanelUtil.openpanel_official_mail();
                    },
                },
                {
                    key: "openpanel_recharge",
                    fun: () => {
                        PanelUtil.openpanel_recharge();
                    },
                },
                {
                    key: "openpanel_excharge",
                    fun: () => {
                        PanelUtil.openpanel_excharge();
                    },
                },
                {
                    key: "openpanel_activity",
                    fun: () => {
                        PanelUtil.openpanel_activity();
                    },
                },
                {
                    key: "openpanel_gamelist",
                    fun: () => {
                        PanelUtil.openpanel_gamelist();
                    },
                },
                {
                    key: "openpanel_record_mine",
                    fun: () => {
                        PanelUtil.openpanel_record_mine();
                    },
                },
                {
                    key: "openpanel_bet_record",
                    fun: () => {
                        PanelUtil.openpanel_bet_record();
                    },
                },
                {
                    key: "openpanel_record_mine_detail",
                    fun: () => {
                        PanelUtil.openpanel_record_mine_detail();
                    },
                },
                {
                    key: "openpanel_directly",
                    fun: () => {
                        PanelUtil.openpanel_directly();
                    },
                },
                {
                    key: "openpanel_google_verification",
                    fun: () => {
                        PanelUtil.openpanel_google_verification();
                    },
                },
                {
                    key: "openpanel_wallet",
                    fun: () => {
                        PanelUtil.openpanel_wallet();
                    },
                },
                {
                    key: "openpanel_performance",
                    fun: () => {
                        PanelUtil.openpanel_performance();
                    },
                },
                {
                    key: "openpanel_promotion_floor",
                    fun: () => {
                        PanelUtil.openpanel_promotion_floor();
                    },
                },
                {
                    key: "openpanel_pledge",
                    fun: () => {
                        PanelUtil.openpanel_pledge();
                    },
                },
                {
                    key: "openpanel_pledge_records",
                    fun: () => {
                        PanelUtil.openpanel_pledge_records();
                    },
                },
                {
                    key: "openpanel_pledge_unstaking",
                    fun: () => {
                        PanelUtil.openpanel_pledge_unstaking();
                    },
                },
                {
                    key: "openpanel_swap_record",
                    fun: () => {
                        PanelUtil.openpanel_swap_record();
                    },
                },
                {
                    key: "openpanel_bonus_ranking",
                    fun: () => {
                        PanelUtil.openpanel_bonus_ranking();
                    },
                },
                {
                    key: "openpanel_service",
                    fun: () => {
                        PanelUtil.openpanel_service();
                    },
                },
                {
                    key: "openpanel_contract",
                    fun: () => {
                        PanelUtil.openpanel_contract();
                    },
                },
                {
                    key: "openpanel_user_center",
                    fun: () => {
                        PanelUtil.openpanel_user_center();
                    },
                },
                {
                    key: "openpanel_plat_users_verification",
                    fun: () => {
                        PanelUtil.openpanel_plat_users_verification();
                    },
                },
                {
                    key: "openpanel_real_name",
                    fun: () => {
                        PanelUtil.openpanel_real_name();
                    },
                },
                {
                    key: "openpanel_nick_name",
                    fun: () => {
                        PanelUtil.openpanel_nick_name();
                    },
                },
                {
                    key: "openpanel_safety_center",
                    fun: () => {
                        PanelUtil.openpanel_safety_center();
                    },
                },
                {
                    key: "openpanel_google_settings",
                    fun: () => {
                        PanelUtil.openpanel_google_settings();
                    },
                },
                {
                    key: "openpanel_bind_google",
                    fun: () => {
                        PanelUtil.openpanel_bind_google();
                    },
                },
                {
                    key: "openpanel_trade_password",
                    fun: () => {
                        PanelUtil.openpanel_trade_password();
                    },
                },
                {
                    key: "openpanel_bind_invite",
                    fun: () => {
                        PanelUtil.openpanel_bind_invite();
                    },
                },
                {
                    key: "openpanel_game_rate",
                    fun: () => {
                        PanelUtil.openpanel_game_rate();
                    },
                },
                {
                    key: "openpanel_record_exchange",
                    fun: () => {
                        PanelUtil.openpanel_record_exchange();
                    },
                },
                {
                    key: "openpanel_record_recharge",
                    fun: () => {
                        PanelUtil.openpanel_record_recharge();
                    },
                },
                {
                    key: "openpanel_address_book",
                    fun: () => {
                        PanelUtil.openpanel_address_book();
                    },
                },
                {
                    key: "openpanel_address_book_remark",
                    fun: () => {
                        PanelUtil.openpanel_address_book_remark();
                    },
                },
                {
                    key: "openpanel_order",
                    fun: () => {
                        PanelUtil.openpanel_order();
                    },
                },
                {
                    key: "openpanel_agent_manager",
                    fun: () => {
                        PanelUtil.openpanel_agent_manager();
                    },
                },
                {
                    key: "openpanel_directly_adduser",
                    fun: () => {
                        PanelUtil.openpanel_directly_adduser();
                    },
                },
                {
                    key: "openpanel_statistics_credit",
                    fun: () => {
                        PanelUtil.openpanel_statistics_credit();
                    },
                },
                {
                    key: "openpanel_promotion_statistics",
                    fun: () => {
                        PanelUtil.openpanel_promotion_statistics();
                    },
                },
                {
                    key: "openpanel_performance_detail",
                    fun: () => {
                        PanelUtil.openpanel_performance_detail();
                    },
                },
                {
                    key: "openpanel_gold_waterl",
                    fun: () => {
                        PanelUtil.openpanel_gold_waterl();
                    },
                },
                {
                    key: "openpanel_timezone",
                    fun: () => {
                        PanelUtil.openpanel_timezone();
                    },
                },
                {
                    key: "opencasino_sports",
                    fun: () => {
                        PanelUtil.openpanel_gamelist(64);
                    },
                },
                {
                    key: "opencasino_live_casino",
                    fun: () => {
                        PanelUtil.openpanel_gamelist(32);
                    },
                },
                {
                    key: "opencasino_blockchain_games",
                    fun: () => {
                        PanelUtil.openpanel_gamelist(128);
                    },
                },
                {
                    key: "opencasino_fishing_games",
                    fun: () => {
                        PanelUtil.openpanel_gamelist(8);
                    },
                },
                {
                    key: "opencasino_slots_games",
                    fun: () => {
                        PanelUtil.openpanel_gamelist(16);
                    },
                },
                {
                    key: "opencasino_lottery_games",
                    fun: () => {
                        PanelUtil.openpanel_gamelist(4);
                    },
                },
                {
                    key: "opencasino_cards_games",
                    fun: () => {
                        PanelUtil.openpanel_gamelist(2);
                    },
                },
                {
                    key: "openpanel_dailysign",
                    fun: () => {
                        PanelUtil.openpanel_dailysign();
                    },
                },
                {
                    key: "showNovigation",
                    fun: () => {
                        PanelUtil.showNovigation(true);
                    },
                },
            ];
        }
        return this._mapList;
    }

    /**系统公告中的跳转功能 */
    public static jumpTo(item: any): boolean {
        return PanelUtil.isCanJump(item, true);
    }
    public static actionByName(actionName: string) {
        const fitterArr = PanelUtil.funcMap.filter((e: any, idx: any, array: any) => e.key == actionName);
        //查找是否可以跳转  或者执行
        if (fitterArr && fitterArr.length > 0) {
            fitterArr[0].fun();
        }
    }
    /**检测这个对象是否能跳转，到对应的 页面或者 功能 */
    public static isCanJump(item: any, isRun: boolean = false) {
        //1. 先判断 打开模块
        if (item.open_mode != 1) {
            if (isRun) {
                switch (item.open_mode) {
                    case 2:
                        PanelUtil.openpage_introduce();
                        return true;
                    case 3:
                        PanelUtil.openpage_bonus();
                        return true;
                    case 4:
                        PanelUtil.openpage_mine();
                        return true;
                    case 5:
                        if (item.open_mode_url && item.open_mode_url.trim()) {
                            PanelUtil.getProxy_get_pageActivityProxy.api_plat_activity_var_netback(item.open_mode_url);
                        } else PanelUtil.openpanel_activity();
                        return true;
                    case 6:
                        PanelUtil.openpage_extension();
                        return true;
                    case 7:
                        PanelUtil.message_alert(LangUtil("敬请期待"));
                        return true;
                    case 8:
                        PanelUtil.openpage_swap();
                        return true;
                }
            } else {
                const list = [2, 3, 4, 5, 6, 7, 8];
                if (list.indexOf(item.open_mode)) {
                    return true;
                }
            }
        } else if (item.open_mode_url && item.open_mode_url.trim()) {
            const fitterArr = PanelUtil.funcMap.filter((e: any, idx: any, array: any) => e.key == item.open_mode_url);
            //查找是否可以跳转  或者执行
            if (fitterArr && fitterArr.length > 0) {
                if (isRun) {
                    fitterArr[0].fun();
                    //console.log("执行方法");
                }
                return true;
            }

            //跳转链接
            if (isRun) {
                OpenLink(item.open_mode_url);
            }
            return true;
        }

        return false;
    }
}
