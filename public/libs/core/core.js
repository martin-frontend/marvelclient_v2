var ui;
(function (ui) {
    function bind(view, mediatorClass) {
        view.mediatorClass = mediatorClass;
        var facade = puremvc.Facade.getInstance();
        view.addEventListener(egret.Event.ADDED_TO_STAGE, e => {
            const mediator = new e.target.mediatorClass();
            e.target.mediatorName = mediator.mediatorName = core.generateUUID();
            facade.registerMediator(mediator);
            mediator.setView(e.target);
        }, this);
        view.addEventListener(egret.Event.REMOVED_FROM_STAGE, e => {
            if (e.target.mediatorName)
                facade.removeMediator(e.target.mediatorName);
        }, this);
    }
    ui.bind = bind;
})(ui || (ui = {}));
var core;
(function (core) {
    /**初始化*/
    function init() {
        net.initCommand();
        // 获取唯一码（设备码）
        let uuid = core.getQueryVariable("uuid") || window.localStorage.getItem("uuid");
        if (!uuid) {
            uuid = core.generateUUID();
            window.localStorage.setItem("uuid", uuid);
        }
        core.device = uuid;
        // 获取推荐号
        core.invite_user_id = (core.getQueryVariable("invite") || "").replace("/", "");
        // 自动登录
        core.token = window.localStorage.getItem("token");
        core.token && (core.user_id = parseInt(window.localStorage.getItem("user_id")) || 0);
        core.plat_id = core.getQueryVariable("plat_id") || "10001";
        core.channel_id = core.getQueryVariable("channel_id") || "10001001";
        core.app_type = core.EnumAppType.APP;
        // device_type = parseInt(getQueryVariable("RunType")) || EnumDeviceType.OTHER;
        const runType = parseInt(core.getQueryVariable("RunType"));
        if (runType) {
            core.device_type = runType;
        }
        else {
            if (core.isAndroid()) {
                core.device_type = core.EnumDeviceType.ANDROID;
            }
            else if (core.isIOS()) {
                core.device_type = core.EnumDeviceType.IOS;
            }
            else {
                core.device_type = core.EnumDeviceType.OTHER;
            }
        }
    }
    core.init = init;
})(core || (core = {}));
/**
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=66514
 */
var net;
/**
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=66514
 */
(function (net) {
    /**协议*/
    net.HttpType = {
        /**--新加的--获取验证码图片*/
        api_public_auth_code: "api/public/auth_code",
        /**--新加的--发送邮件*/
        api_public_email_send: "api/public/email/send",
        /**--新加的--发送短信*/
        api_public_sms_send: "api/public/sms/send",
        /**--新加的--获取手机区号*/
        api_public_area_code: "api/public/area_code",
        /**--新加的--获取所有游戏的查询配置*/
        api_plat_var_game_all_config: "api/plat/{plat_id}/game/all/config",
        /**--新加的--所有游戏的查询*/
        api_plat_var_game_all_index: "api/plat/{plat_id}/game/all/index",
        /**--钱包--获取转入账号信息*/
        api_plat_var_block_transfer_in_order_account: "api/plat/{API_PLAT_ID}/block_transfer_in_order/account",
        /**--钱包--代币转入订单提交*/
        api_user_var_block_transfer_in_order_store: "api/user/{API_USER_ID}/block_transfer_in_order/store",
        /**--钱包--代币转入订单列表*/
        api_user_var_block_transfer_in_order_index: "api/user/{API_USER_ID}/block_transfer_in_order/index",
        /**--钱包--代币转出订单提交*/
        api_user_var_block_transfer_out_order_store: "api/user/{API_USER_ID}/block_transfer_out_order/store",
        /**--钱包--代币转出订单列表*/
        api_user_var_block_transfer_out_order_index: "api/user/{API_USER_ID}/block_transfer_out_order/index",
        /**--账号--注册*/
        api_user_register: "api/user/register",
        /**--账号--登入*/
        api_user_login: "api/user/login",
        /**--账号--登出*/
        api_user_logout: "api/user/logout",
        /**--账号--修改密码*/
        api_user_change_password_var: "api/user/change_password/{user_id}",
        /**--账号--重置密码*/
        api_user_reset_password: "api/user/reset_password",
        /**--账号--现金密码*/
        api_user_change_password_gold_var: "api/user/change_password_gold/{user_id}",
        /**--会员资料--获取用户基本信息*/
        api_user_show_var: "api/user/show/{user_id}",
        /**--会员资料--修改用户基本信息*/
        api_user_update_var: "api/user/update/{user_id}",
        /**--会员资料--用户绑定手机*/
        api_user_bind_mobile_var: "api/user/bind_mobile/{user_id}",
        /**--会员资料--用户绑定邮箱*/
        api_user_bind_email_var: "api/user/bind_email/{user_id}",
        /**--会员资料--提取用户所有厂商的余额*/
        api_user_var_vendor_withdraw: "api/user/{user_id}/vendor/withdraw",
        /**--会员资料--用户保险箱存取款*/
        api_user_update_var_safe_gold: "api/user/update/{user_id}/safe_gold",
        /**--会员资料--金币划转*/
        api_user_var_gold_transfer: "api/user/{user_id}/gold_transfer",
        /**--会员资料--投注记录*/
        api_user_show_var_bet: "api/user/show/{user_id}/bet",
        /**--会员资料--渠道统计*/
        api_user_show_var_channel_statistic: "api/user/show/{user_id}/channel_statistic",
        /**--会员资料--获取用户账户明细*/
        api_user_show_var_gold: "api/user/show/{user_id}/gold",
        /**--会员资料--钱包地址修改*/
        api_user_change_bsc_address_var: "api/user/change_bsc_address/{user_id}",
        /**--大厅--获取游戏类型,游戏菜单（大厅菜单）*/
        api_plat_var_lobby_index: "api/plat/{plat_id}/lobby/index",
        /**--大厅--获取厂商列表*/
        api_vendor_simple: "api/vendor/simple",
        /**--大厅--获取厂商配置游戏菜单（大厅厂商二级游戏菜单）*/
        api_vendor_var_lobby_simple: "api/vendor/{vendor_id}/lobby/simple",
        /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证*/
        api_vendor_var_ori_product_show_var: "api/vendor/{vendor_id}/ori_product/show/{ori_product_id}",
        /**--搜索--我的游戏*/
        api_user_var_game_index: "api/user/{user_id}/game/index",
        /**--搜索--收藏游戏*/
        api_user_var_game_update_var: "api/user/{user_id}/game/update/{vendor_product_id}",
        /**--搜索--搜索游戏*/
        api_user_var_game_search: "api/user/{user_id}/game/search",
        /**--返水--获取用户返水记录*/
        api_user_var_backwater: "api/user/{user_id}/backwater",
        /**--返水--获取用户返水详情*/
        api_user_var_backwater_var: "api/user/{user_id}/backwater/{id}",
        /**--返水--返水试算接口*/
        api_user_var_backwater_trial: "api/user/{user_id}/backwater/trial",
        /**--返水--返水试算领取接口*/
        api_user_var_backwater_trial_receive: "api/user/{user_id}/backwater/trial/receive",
        /**--邮件--获取用户邮件列表*/
        api_user_var_mail: "api/user/{user_id}/mail",
        /**--邮件--获取用户邮件详细信息*/
        api_user_var_mail_var: "api/user/{user_id}/mail/{id}",
        /**--邮件--领取邮件对应的奖励*/
        api_user_var_mail_var_receive: "api/user/{user_id}/mail/{id}/receive",
        /**--邮件--一键领取所有邮件对应的奖励*/
        api_user_var_receiveQuick: "api/user/{user_id}/receiveQuick",
        /**--邮件--批量删除邮件*/
        api_user_var_destroy_batch: "api/user/{user_id}/destroy/batch",
        /**--邮件--一键删除邮件*/
        api_user_var_destroy_quick: "api/user/{user_id}/destroy/quick",
        /**--活动--获取活动列表数据*/
        api_plat_activity: "api/plat/activity",
        /**--活动--plat_activity_detail*/
        api_plat_activity_var: "api/plat/activity/{id}",
        /**--活动--领取活动奖励*/
        api_plat_activity_var_receive: "api/plat/activity/{id}/receive",
        /**--活动--每日任务*/
        api_plat_activity_index_everyday: "api/plat/activity/index/everyday",
        /**--活动--获取用户签到信息*/
        api_plat_sign_index: "api/plat/sign/index",
        /**--活动--每日签到*/
        api_user_var_sign_store: "api/user/{user_id}/sign/store",
        /**--活动--领取用户签到奖励*/
        api_user_var_sign_receive: "api/user/{user_id}/sign/receive",
        /**--活动--绑定赠金*/
        api_plat_activity_show_binding: "api/plat/activity/show/binding",
        /**--公告--平台公告*/
        api_plat_var_notice_index: "api/plat/{plat_id}/notice/index",
        /**--公告--平台公告数据详细数据*/
        api_plat_var_notice_show_var: "api/plat/{plat_id}/notice/show/{id}",
        /**--代理推广--我的返佣比*/
        api_user_var_commission_commissionnum: "api/user/{user_id}/commission/commissionnum",
        /**--代理推广--直属成员*/
        api_user_var_agent_direct_list: "api/user/{user_id}/agent/direct/list",
        /**--代理推广--按日期获取佣金详情*/
        api_user_var_commission_commissiondetail: "api/user/{user_id}/commission/commissiondetail",
        /**--代理推广--业绩查询*/
        api_user_var_commission_commissionlist: "api/user/{user_id}/commission/commissionlist",
        /**--代理推广--按日期查询直属代理流水详情*/
        api_user_var_commission_directswater: "api/user/{user_id}/commission/directswater",
        /**--代理推广--领取佣金*/
        api_user_var_commission_receive: "api/user/{user_id}/commission/receive",
        /**--代理推广--直属保底范围查询*/
        api_user_var_agent_var_floor_range: "api/user/{user_id}/agent/{agent_user_id}/floor_range",
        /**--代理推广--设置直属保底*/
        api_user_var_agent_var_update: "api/user/{user_id}/agent/{agent_user_id}/update",
        /**--代理推广--获取用户推广统计信息*/
        api_user_var_agent_var_statistic_promotion: "api/user/{user_id}/agent/{agent_user_id}/statistic_promotion",
        /**--代理推广--获取代理用户列表*/
        api_user_var_agent_var_direct_list: "api/user/{user_id}/agent/{agent_user_id}/direct/list",
        /**--代理推广--获取推广链接*/
        api_user_var_short_chain: "api/user/{user_id}/short_chain",
        /**--代理推广--获取总代分红列表*/
        api_user_var_agent_bonus: "api/user/{user_id}/agent_bonus",
        /**--代理推广--领取分红*/
        api_user_var_receive_agent_bonus_var: "api/user/{user_id}/receive_agent_bonus/{id}",
        /**--代理推广--整盘分红等级表*/
        api_user_var_bonus_all_config: "api/user/{user_id}/bonus_all/config",
        /**--代理推广--整盘分红统计*/
        api_user_var_bonus_all_statistic: "api/user/{user_id}/bonus_all/statistic",
        /**--代理推广--领取整盘分红*/
        api_user_var_bonus_all_receive_var: "api/user/{user_id}/bonus_all/receive/{id}",
        /**--代理推广--获取下级整盘分红列表*/
        api_user_var_bonus_all_direct: "api/user/{user_id}/bonus_all/direct",
        /**--代理推广--获取整盘分红历史记录*/
        api_user_var_bonus_all_history: "api/user/{user_id}/bonus_all/history",
        /**--分红--用户质押*/
        api_user_var_deposit_stake: "api/user/{user_id}/deposit_stake",
        /**--分红--用户手动解质押*/
        api_user_var_withdraw_stake: "api/user/{user_id}/withdraw_stake",
        /**--分红--平台币分红信息*/
        api_plat_var_stake_info: "api/plat/{plat_id}/stake_info",
        /**--分红--用户币分红信息*/
        api_user_var_stake_info: "api/user/{user_id}/stake_info",
        /**--分红--平台近5日分红金额列表*/
        api_plat_var_bonus_recently: "api/plat/{plat_id}/bonus_recently",
        /**--分红--昨日分红排行榜*/
        api_plat_var_bonus_rank: "api/plat/{plat_id}/bonus_rank",
        /**--分红--领取分红*/
        api_user_var_stake_draw: "api/user/{user_id}/stake_draw",
        /**--分红--用户质押记录*/
        api_user_var_stake_log: "api/user/{user_id}/stake_log",
        /**--分红--分红记录-全站记录*/
        api_plat_var_bonus_log: "api/plat/{plat_id}/bonus_log",
        /**--分红--分红记录-个人纪录*/
        api_user_var_bonus_log: "api/user/{user_id}/bonus_log",
        /**--兑换--兑换方式列表*/
        api_user_var_exchange_method_list: "api/user/{plat_id}/exchange/method/list",
        /**--兑换--用户兑换订单*/
        api_user_var_exchange_order_list: "api/user/{user_id}/exchange/order_list",
        /**--兑换--创建兑换订单*/
        api_user_var_exchange_create_order: "api/user/{user_id}/exchange/create_order",
        /**--兑换--流水审核*/
        api_user_var_gold_water_index: "api/user/{user_id}/gold_water/index",
        /**--收款管理--收款方式列表*/
        api_user_var_payment_method_index: "api/user/{user_id}/payment_method/index",
        /**--收款管理--添加收款方式*/
        api_user_var_payment_method_store: "api/user/{user_id}/payment_method/store",
        /**--收款管理--银行列表*/
        api_user_var_payment_method_bank_list: "api/user/{user_id}/payment_method/bank_list",
        /**--收款管理--更新银行卡/支付宝*/
        api_user_var_payment_method_update_var: "api/user/{user_id}/payment_method/update/{id}",
        /**--短信--发送短信 [验证码和获取注册验证码调用同一方法即可]*/
        api_sms_send: "api/sms/send",
        /**--短信--重置密码发送短信*/
        api_sms_reset_password_sent: "api/sms/reset_password_sent",
        /**--短信--收款方式发送短信*/
        api_sms_exchange: "api/sms/exchange",
        /**--短信--金币划转发送短信*/
        api_sms_transfer: "api/sms/transfer",
        /**--商城--获取商城支付列表*/
        api_user_var_recharge_method_list: "api/user/{user_id}/recharge/method/list",
        /**--商城--创建订单*/
        api_user_var_recharge_create: "api/user/{user_id}/recharge/create",
        /**--商城--币商充值订单确认转账*/
        api_user_var_coin_recharge_confirm: "api/user/{user_id}/coin_recharge/confirm",
        /**--商城--充值记录*/
        api_user_var_recharge_list: "api/user/{user_id}/recharge/list",
        /**--商城--获取数字货币充值地址*/
        api_user_var_recharge_address: "api/user/{user_id}/recharge/address",
        /**--其它--配置数据 枚举*/
        api_plat_var_game_config: "api/plat/{plat_id}/game/config",
        /**--其它--常见问题*/
        api_plat_fag_index: "api/plat/fag/index",
        /**--其它--跑马灯*/
        api_plat_var_marquee_index: "api/plat/{plat_id}/marquee/index",
        /**--其它--获取未读取的消息列表*/
        api_user_var_messages_index: "api/user/{user_id}/messages/index",
        /**--其它--获取消息详情*/
        api_user_var_messages_show_var: "api/user/{user_id}/messages/show/{id}",
        /**--其它--用户心跳*/
        api_user_var_beat: "api/user/{user_id}/beat",
        /**--其它--获取红点提示信息*/
        api_user_var_red_dot_tips: "api/user/{user_id}/red_dot_tips",
    };
    /**事件*/
    net.EventType = {
        /**--请求开始*/
        REQUEST_START: "REQUEST_START",
        /**--请求结束 */
        REQUEST_END: "REQUEST_END",
        /**请求错误 */
        REQUEST_ERROR: "REQUEST_ERROR",
        /**IO错误 */
        IO_ERROR: "IO_ERROR",
        /**--新加的--获取验证码图片*/
        api_public_auth_code: "api_public_auth_code",
        /**--新加的--发送邮件*/
        api_public_email_send: "api_public_email_send",
        /**--新加的--发送短信*/
        api_public_sms_send: "api_public_sms_send",
        /**--新加的--获取手机区号*/
        api_public_area_code: "api_public_area_code",
        /**--新加的--获取所有游戏的查询配置*/
        api_plat_var_game_all_config: "api_plat_var_game_all_config",
        /**--新加的--所有游戏的查询*/
        api_plat_var_game_all_index: "api_plat_var_game_all_index",
        /**--钱包--获取转入账号信息*/
        api_plat_var_block_transfer_in_order_account: "api_plat_var_block_transfer_in_order_account",
        /**--钱包--代币转入订单提交*/
        api_user_var_block_transfer_in_order_store: "api_user_var_block_transfer_in_order_store",
        /**--钱包--代币转入订单列表*/
        api_user_var_block_transfer_in_order_index: "api_user_var_block_transfer_in_order_index",
        /**--钱包--代币转出订单提交*/
        api_user_var_block_transfer_out_order_store: "api_user_var_block_transfer_out_order_store",
        /**--钱包--代币转出订单列表*/
        api_user_var_block_transfer_out_order_index: "api_user_var_block_transfer_out_order_index",
        /**--账号--注册*/
        api_user_register: "api_user_register",
        /**--账号--登入*/
        api_user_login: "api_user_login",
        /**--账号--登出*/
        api_user_logout: "api_user_logout",
        /**--账号--修改密码*/
        api_user_change_password_var: "api_user_change_password_var",
        /**--账号--重置密码*/
        api_user_reset_password: "api_user_reset_password",
        /**--账号--现金密码*/
        api_user_change_password_gold_var: "api_user_change_password_gold_var",
        /**--会员资料--获取用户基本信息*/
        api_user_show_var: "api_user_show_var",
        /**--会员资料--修改用户基本信息*/
        api_user_update_var: "api_user_update_var",
        /**--会员资料--用户绑定手机*/
        api_user_bind_mobile_var: "api_user_bind_mobile_var",
        /**--会员资料--用户绑定邮箱*/
        api_user_bind_email_var: "api_user_bind_email_var",
        /**--会员资料--提取用户所有厂商的余额*/
        api_user_var_vendor_withdraw: "api_user_var_vendor_withdraw",
        /**--会员资料--用户保险箱存取款*/
        api_user_update_var_safe_gold: "api_user_update_var_safe_gold",
        /**--会员资料--金币划转*/
        api_user_var_gold_transfer: "api_user_var_gold_transfer",
        /**--会员资料--投注记录*/
        api_user_show_var_bet: "api_user_show_var_bet",
        /**--会员资料--渠道统计*/
        api_user_show_var_channel_statistic: "api_user_show_var_channel_statistic",
        /**--会员资料--获取用户账户明细*/
        api_user_show_var_gold: "api_user_show_var_gold",
        /**--会员资料--钱包地址修改*/
        api_user_change_bsc_address_var: "api_user_change_bsc_address_var",
        /**--大厅--获取游戏类型,游戏菜单（大厅菜单）*/
        api_plat_var_lobby_index: "api_plat_var_lobby_index",
        /**--大厅--获取厂商列表*/
        api_vendor_simple: "api_vendor_simple",
        /**--大厅--获取厂商配置游戏菜单（大厅厂商二级游戏菜单）*/
        api_vendor_var_lobby_simple: "api_vendor_var_lobby_simple",
        /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证*/
        api_vendor_var_ori_product_show_var: "api_vendor_var_ori_product_show_var",
        /**--搜索--我的游戏*/
        api_user_var_game_index: "api_user_var_game_index",
        /**--搜索--收藏游戏*/
        api_user_var_game_update_var: "api_user_var_game_update_var",
        /**--搜索--搜索游戏*/
        api_user_var_game_search: "api_user_var_game_search",
        /**--返水--获取用户返水记录*/
        api_user_var_backwater: "api_user_var_backwater",
        /**--返水--获取用户返水详情*/
        api_user_var_backwater_var: "api_user_var_backwater_var",
        /**--返水--返水试算接口*/
        api_user_var_backwater_trial: "api_user_var_backwater_trial",
        /**--返水--返水试算领取接口*/
        api_user_var_backwater_trial_receive: "api_user_var_backwater_trial_receive",
        /**--邮件--获取用户邮件列表*/
        api_user_var_mail: "api_user_var_mail",
        /**--邮件--获取用户邮件详细信息*/
        api_user_var_mail_var: "api_user_var_mail_var",
        /**--邮件--领取邮件对应的奖励*/
        api_user_var_mail_var_receive: "api_user_var_mail_var_receive",
        /**--邮件--一键领取所有邮件对应的奖励*/
        api_user_var_receiveQuick: "api_user_var_receiveQuick",
        /**--邮件--批量删除邮件*/
        api_user_var_destroy_batch: "api_user_var_destroy_batch",
        /**--邮件--一键删除邮件*/
        api_user_var_destroy_quick: "api_user_var_destroy_quick",
        /**--活动--获取活动列表数据*/
        api_plat_activity: "api_plat_activity",
        /**--活动--plat_activity_detail*/
        api_plat_activity_var: "api_plat_activity_var",
        /**--活动--领取活动奖励*/
        api_plat_activity_var_receive: "api_plat_activity_var_receive",
        /**--活动--每日任务*/
        api_plat_activity_index_everyday: "api_plat_activity_index_everyday",
        /**--活动--获取用户签到信息*/
        api_plat_sign_index: "api_plat_sign_index",
        /**--活动--每日签到*/
        api_user_var_sign_store: "api_user_var_sign_store",
        /**--活动--领取用户签到奖励*/
        api_user_var_sign_receive: "api_user_var_sign_receive",
        /**--活动--绑定赠金*/
        api_plat_activity_show_binding: "api_plat_activity_show_binding",
        /**--公告--平台公告*/
        api_plat_var_notice_index: "api_plat_var_notice_index",
        /**--公告--平台公告数据详细数据*/
        api_plat_var_notice_show_var: "api_plat_var_notice_show_var",
        /**--代理推广--我的返佣比*/
        api_user_var_commission_commissionnum: "api_user_var_commission_commissionnum",
        /**--代理推广--直属成员*/
        api_user_var_agent_direct_list: "api_user_var_agent_direct_list",
        /**--代理推广--按日期获取佣金详情*/
        api_user_var_commission_commissiondetail: "api_user_var_commission_commissiondetail",
        /**--代理推广--业绩查询*/
        api_user_var_commission_commissionlist: "api_user_var_commission_commissionlist",
        /**--代理推广--按日期查询直属代理流水详情*/
        api_user_var_commission_directswater: "api_user_var_commission_directswater",
        /**--代理推广--领取佣金*/
        api_user_var_commission_receive: "api_user_var_commission_receive",
        /**--代理推广--直属保底范围查询*/
        api_user_var_agent_var_floor_range: "api_user_var_agent_var_floor_range",
        /**--代理推广--设置直属保底*/
        api_user_var_agent_var_update: "api_user_var_agent_var_update",
        /**--代理推广--获取用户推广统计信息*/
        api_user_var_agent_var_statistic_promotion: "api_user_var_agent_var_statistic_promotion",
        /**--代理推广--获取代理用户列表*/
        api_user_var_agent_var_direct_list: "api_user_var_agent_var_direct_list",
        /**--代理推广--获取推广链接*/
        api_user_var_short_chain: "api_user_var_short_chain",
        /**--代理推广--获取总代分红列表*/
        api_user_var_agent_bonus: "api_user_var_agent_bonus",
        /**--代理推广--领取分红*/
        api_user_var_receive_agent_bonus_var: "api_user_var_receive_agent_bonus_var",
        /**--代理推广--整盘分红等级表*/
        api_user_var_bonus_all_config: "api_user_var_bonus_all_config",
        /**--代理推广--整盘分红统计*/
        api_user_var_bonus_all_statistic: "api_user_var_bonus_all_statistic",
        /**--代理推广--领取整盘分红*/
        api_user_var_bonus_all_receive_var: "api_user_var_bonus_all_receive_var",
        /**--代理推广--获取下级整盘分红列表*/
        api_user_var_bonus_all_direct: "api_user_var_bonus_all_direct",
        /**--代理推广--获取整盘分红历史记录*/
        api_user_var_bonus_all_history: "api_user_var_bonus_all_history",
        /**--分红--用户质押*/
        api_user_var_deposit_stake: "api_user_var_deposit_stake",
        /**--分红--用户手动解质押*/
        api_user_var_withdraw_stake: "api_user_var_withdraw_stake",
        /**--分红--平台币分红信息*/
        api_plat_var_stake_info: "api_plat_var_stake_info",
        /**--分红--用户币分红信息*/
        api_user_var_stake_info: "api_user_var_stake_info",
        /**--分红--平台近5日分红金额列表*/
        api_plat_var_bonus_recently: "api_plat_var_bonus_recently",
        /**--分红--昨日分红排行榜*/
        api_plat_var_bonus_rank: "api_plat_var_bonus_rank",
        /**--分红--领取分红*/
        api_user_var_stake_draw: "api_user_var_stake_draw",
        /**--分红--用户质押记录*/
        api_user_var_stake_log: "api_user_var_stake_log",
        /**--分红--分红记录-全站记录*/
        api_plat_var_bonus_log: "api_plat_var_bonus_log",
        /**--分红--分红记录-个人纪录*/
        api_user_var_bonus_log: "api_user_var_bonus_log",
        /**--兑换--兑换方式列表*/
        api_user_var_exchange_method_list: "api_user_var_exchange_method_list",
        /**--兑换--用户兑换订单*/
        api_user_var_exchange_order_list: "api_user_var_exchange_order_list",
        /**--兑换--创建兑换订单*/
        api_user_var_exchange_create_order: "api_user_var_exchange_create_order",
        /**--兑换--流水审核*/
        api_user_var_gold_water_index: "api_user_var_gold_water_index",
        /**--收款管理--收款方式列表*/
        api_user_var_payment_method_index: "api_user_var_payment_method_index",
        /**--收款管理--添加收款方式*/
        api_user_var_payment_method_store: "api_user_var_payment_method_store",
        /**--收款管理--银行列表*/
        api_user_var_payment_method_bank_list: "api_user_var_payment_method_bank_list",
        /**--收款管理--更新银行卡/支付宝*/
        api_user_var_payment_method_update_var: "api_user_var_payment_method_update_var",
        /**--短信--发送短信 [验证码和获取注册验证码调用同一方法即可]*/
        api_sms_send: "api_sms_send",
        /**--短信--重置密码发送短信*/
        api_sms_reset_password_sent: "api_sms_reset_password_sent",
        /**--短信--收款方式发送短信*/
        api_sms_exchange: "api_sms_exchange",
        /**--短信--金币划转发送短信*/
        api_sms_transfer: "api_sms_transfer",
        /**--商城--获取商城支付列表*/
        api_user_var_recharge_method_list: "api_user_var_recharge_method_list",
        /**--商城--创建订单*/
        api_user_var_recharge_create: "api_user_var_recharge_create",
        /**--商城--币商充值订单确认转账*/
        api_user_var_coin_recharge_confirm: "api_user_var_coin_recharge_confirm",
        /**--商城--充值记录*/
        api_user_var_recharge_list: "api_user_var_recharge_list",
        /**--商城--获取数字货币充值地址*/
        api_user_var_recharge_address: "api_user_var_recharge_address",
        /**--其它--配置数据 枚举*/
        api_plat_var_game_config: "api_plat_var_game_config",
        /**--其它--常见问题*/
        api_plat_fag_index: "api_plat_fag_index",
        /**--其它--跑马灯*/
        api_plat_var_marquee_index: "api_plat_var_marquee_index",
        /**--其它--获取未读取的消息列表*/
        api_user_var_messages_index: "api_user_var_messages_index",
        /**--其它--获取消息详情*/
        api_user_var_messages_show_var: "api_user_var_messages_show_var",
        /**--其它--用户心跳*/
        api_user_var_beat: "api_user_var_beat",
        /**--其它--获取红点提示信息*/
        api_user_var_red_dot_tips: "api_user_var_red_dot_tips",
    };
    /**注册协议*/
    function initCommand() {
        const facade = puremvc.Facade.getInstance();
        //--新加的
        facade.registerCommand(net.HttpType.api_public_auth_code, net.cmd_api_public_auth_code);
        facade.registerCommand(net.HttpType.api_public_email_send, net.cmd_api_public_email_send);
        facade.registerCommand(net.HttpType.api_public_sms_send, net.cmd_api_public_sms_send);
        facade.registerCommand(net.HttpType.api_public_area_code, net.cmd_api_public_area_code);
        facade.registerCommand(net.HttpType.api_plat_var_game_all_config, net.cmd_api_plat_var_game_all_config);
        facade.registerCommand(net.HttpType.api_plat_var_game_all_index, net.cmd_api_plat_var_game_all_index);
        //--钱包
        facade.registerCommand(net.HttpType.api_plat_var_block_transfer_in_order_account, net.cmd_api_plat_var_block_transfer_in_order_account);
        facade.registerCommand(net.HttpType.api_user_var_block_transfer_in_order_store, net.cmd_api_user_var_block_transfer_in_order_store);
        facade.registerCommand(net.HttpType.api_user_var_block_transfer_in_order_index, net.cmd_api_user_var_block_transfer_in_order_index);
        facade.registerCommand(net.HttpType.api_user_var_block_transfer_out_order_store, net.cmd_api_user_var_block_transfer_out_order_store);
        facade.registerCommand(net.HttpType.api_user_var_block_transfer_out_order_index, net.cmd_api_user_var_block_transfer_out_order_index);
        //--账号
        facade.registerCommand(net.HttpType.api_user_register, net.cmd_api_user_register);
        facade.registerCommand(net.HttpType.api_user_login, net.cmd_api_user_login);
        facade.registerCommand(net.HttpType.api_user_logout, net.cmd_api_user_logout);
        facade.registerCommand(net.HttpType.api_user_change_password_var, net.cmd_api_user_change_password_var);
        facade.registerCommand(net.HttpType.api_user_reset_password, net.cmd_api_user_reset_password);
        facade.registerCommand(net.HttpType.api_user_change_password_gold_var, net.cmd_api_user_change_password_gold_var);
        //--会员资料
        facade.registerCommand(net.HttpType.api_user_show_var, net.cmd_api_user_show_var);
        facade.registerCommand(net.HttpType.api_user_update_var, net.cmd_api_user_update_var);
        facade.registerCommand(net.HttpType.api_user_bind_mobile_var, net.cmd_api_user_bind_mobile_var);
        facade.registerCommand(net.HttpType.api_user_bind_email_var, net.cmd_api_user_bind_email_var);
        facade.registerCommand(net.HttpType.api_user_var_vendor_withdraw, net.cmd_api_user_var_vendor_withdraw);
        facade.registerCommand(net.HttpType.api_user_update_var_safe_gold, net.cmd_api_user_update_var_safe_gold);
        facade.registerCommand(net.HttpType.api_user_var_gold_transfer, net.cmd_api_user_var_gold_transfer);
        facade.registerCommand(net.HttpType.api_user_show_var_bet, net.cmd_api_user_show_var_bet);
        facade.registerCommand(net.HttpType.api_user_show_var_channel_statistic, net.cmd_api_user_show_var_channel_statistic);
        facade.registerCommand(net.HttpType.api_user_show_var_gold, net.cmd_api_user_show_var_gold);
        facade.registerCommand(net.HttpType.api_user_change_bsc_address_var, net.cmd_api_user_change_bsc_address_var);
        //--大厅
        facade.registerCommand(net.HttpType.api_plat_var_lobby_index, net.cmd_api_plat_var_lobby_index);
        facade.registerCommand(net.HttpType.api_vendor_simple, net.cmd_api_vendor_simple);
        facade.registerCommand(net.HttpType.api_vendor_var_lobby_simple, net.cmd_api_vendor_var_lobby_simple);
        facade.registerCommand(net.HttpType.api_vendor_var_ori_product_show_var, net.cmd_api_vendor_var_ori_product_show_var);
        //--搜索
        facade.registerCommand(net.HttpType.api_user_var_game_index, net.cmd_api_user_var_game_index);
        facade.registerCommand(net.HttpType.api_user_var_game_update_var, net.cmd_api_user_var_game_update_var);
        facade.registerCommand(net.HttpType.api_user_var_game_search, net.cmd_api_user_var_game_search);
        //--返水
        facade.registerCommand(net.HttpType.api_user_var_backwater, net.cmd_api_user_var_backwater);
        facade.registerCommand(net.HttpType.api_user_var_backwater_var, net.cmd_api_user_var_backwater_var);
        facade.registerCommand(net.HttpType.api_user_var_backwater_trial, net.cmd_api_user_var_backwater_trial);
        facade.registerCommand(net.HttpType.api_user_var_backwater_trial_receive, net.cmd_api_user_var_backwater_trial_receive);
        //--邮件
        facade.registerCommand(net.HttpType.api_user_var_mail, net.cmd_api_user_var_mail);
        facade.registerCommand(net.HttpType.api_user_var_mail_var, net.cmd_api_user_var_mail_var);
        facade.registerCommand(net.HttpType.api_user_var_mail_var_receive, net.cmd_api_user_var_mail_var_receive);
        facade.registerCommand(net.HttpType.api_user_var_receiveQuick, net.cmd_api_user_var_receiveQuick);
        facade.registerCommand(net.HttpType.api_user_var_destroy_batch, net.cmd_api_user_var_destroy_batch);
        facade.registerCommand(net.HttpType.api_user_var_destroy_quick, net.cmd_api_user_var_destroy_quick);
        //--活动
        facade.registerCommand(net.HttpType.api_plat_activity, net.cmd_api_plat_activity);
        facade.registerCommand(net.HttpType.api_plat_activity_var, net.cmd_api_plat_activity_var);
        facade.registerCommand(net.HttpType.api_plat_activity_var_receive, net.cmd_api_plat_activity_var_receive);
        facade.registerCommand(net.HttpType.api_plat_activity_index_everyday, net.cmd_api_plat_activity_index_everyday);
        facade.registerCommand(net.HttpType.api_plat_sign_index, net.cmd_api_plat_sign_index);
        facade.registerCommand(net.HttpType.api_user_var_sign_store, net.cmd_api_user_var_sign_store);
        facade.registerCommand(net.HttpType.api_user_var_sign_receive, net.cmd_api_user_var_sign_receive);
        facade.registerCommand(net.HttpType.api_plat_activity_show_binding, net.cmd_api_plat_activity_show_binding);
        //--公告
        facade.registerCommand(net.HttpType.api_plat_var_notice_index, net.cmd_api_plat_var_notice_index);
        facade.registerCommand(net.HttpType.api_plat_var_notice_show_var, net.cmd_api_plat_var_notice_show_var);
        //--代理推广
        facade.registerCommand(net.HttpType.api_user_var_commission_commissionnum, net.cmd_api_user_var_commission_commissionnum);
        facade.registerCommand(net.HttpType.api_user_var_agent_direct_list, net.cmd_api_user_var_agent_direct_list);
        facade.registerCommand(net.HttpType.api_user_var_commission_commissiondetail, net.cmd_api_user_var_commission_commissiondetail);
        facade.registerCommand(net.HttpType.api_user_var_commission_commissionlist, net.cmd_api_user_var_commission_commissionlist);
        facade.registerCommand(net.HttpType.api_user_var_commission_directswater, net.cmd_api_user_var_commission_directswater);
        facade.registerCommand(net.HttpType.api_user_var_commission_receive, net.cmd_api_user_var_commission_receive);
        facade.registerCommand(net.HttpType.api_user_var_agent_var_floor_range, net.cmd_api_user_var_agent_var_floor_range);
        facade.registerCommand(net.HttpType.api_user_var_agent_var_update, net.cmd_api_user_var_agent_var_update);
        facade.registerCommand(net.HttpType.api_user_var_agent_var_statistic_promotion, net.cmd_api_user_var_agent_var_statistic_promotion);
        facade.registerCommand(net.HttpType.api_user_var_agent_var_direct_list, net.cmd_api_user_var_agent_var_direct_list);
        facade.registerCommand(net.HttpType.api_user_var_short_chain, net.cmd_api_user_var_short_chain);
        facade.registerCommand(net.HttpType.api_user_var_agent_bonus, net.cmd_api_user_var_agent_bonus);
        facade.registerCommand(net.HttpType.api_user_var_receive_agent_bonus_var, net.cmd_api_user_var_receive_agent_bonus_var);
        facade.registerCommand(net.HttpType.api_user_var_bonus_all_config, net.cmd_api_user_var_bonus_all_config);
        facade.registerCommand(net.HttpType.api_user_var_bonus_all_statistic, net.cmd_api_user_var_bonus_all_statistic);
        facade.registerCommand(net.HttpType.api_user_var_bonus_all_receive_var, net.cmd_api_user_var_bonus_all_receive_var);
        facade.registerCommand(net.HttpType.api_user_var_bonus_all_direct, net.cmd_api_user_var_bonus_all_direct);
        facade.registerCommand(net.HttpType.api_user_var_bonus_all_history, net.cmd_api_user_var_bonus_all_history);
        //--分红
        facade.registerCommand(net.HttpType.api_user_var_deposit_stake, net.cmd_api_user_var_deposit_stake);
        facade.registerCommand(net.HttpType.api_user_var_withdraw_stake, net.cmd_api_user_var_withdraw_stake);
        facade.registerCommand(net.HttpType.api_plat_var_stake_info, net.cmd_api_plat_var_stake_info);
        facade.registerCommand(net.HttpType.api_user_var_stake_info, net.cmd_api_user_var_stake_info);
        facade.registerCommand(net.HttpType.api_plat_var_bonus_recently, net.cmd_api_plat_var_bonus_recently);
        facade.registerCommand(net.HttpType.api_plat_var_bonus_rank, net.cmd_api_plat_var_bonus_rank);
        facade.registerCommand(net.HttpType.api_user_var_stake_draw, net.cmd_api_user_var_stake_draw);
        facade.registerCommand(net.HttpType.api_user_var_stake_log, net.cmd_api_user_var_stake_log);
        facade.registerCommand(net.HttpType.api_plat_var_bonus_log, net.cmd_api_plat_var_bonus_log);
        facade.registerCommand(net.HttpType.api_user_var_bonus_log, net.cmd_api_user_var_bonus_log);
        //--兑换
        facade.registerCommand(net.HttpType.api_user_var_exchange_method_list, net.cmd_api_user_var_exchange_method_list);
        facade.registerCommand(net.HttpType.api_user_var_exchange_order_list, net.cmd_api_user_var_exchange_order_list);
        facade.registerCommand(net.HttpType.api_user_var_exchange_create_order, net.cmd_api_user_var_exchange_create_order);
        facade.registerCommand(net.HttpType.api_user_var_gold_water_index, net.cmd_api_user_var_gold_water_index);
        //--收款管理
        facade.registerCommand(net.HttpType.api_user_var_payment_method_index, net.cmd_api_user_var_payment_method_index);
        facade.registerCommand(net.HttpType.api_user_var_payment_method_store, net.cmd_api_user_var_payment_method_store);
        facade.registerCommand(net.HttpType.api_user_var_payment_method_bank_list, net.cmd_api_user_var_payment_method_bank_list);
        facade.registerCommand(net.HttpType.api_user_var_payment_method_update_var, net.cmd_api_user_var_payment_method_update_var);
        //--短信
        facade.registerCommand(net.HttpType.api_sms_send, net.cmd_api_sms_send);
        facade.registerCommand(net.HttpType.api_sms_reset_password_sent, net.cmd_api_sms_reset_password_sent);
        facade.registerCommand(net.HttpType.api_sms_exchange, net.cmd_api_sms_exchange);
        facade.registerCommand(net.HttpType.api_sms_transfer, net.cmd_api_sms_transfer);
        //--商城
        facade.registerCommand(net.HttpType.api_user_var_recharge_method_list, net.cmd_api_user_var_recharge_method_list);
        facade.registerCommand(net.HttpType.api_user_var_recharge_create, net.cmd_api_user_var_recharge_create);
        facade.registerCommand(net.HttpType.api_user_var_coin_recharge_confirm, net.cmd_api_user_var_coin_recharge_confirm);
        facade.registerCommand(net.HttpType.api_user_var_recharge_list, net.cmd_api_user_var_recharge_list);
        facade.registerCommand(net.HttpType.api_user_var_recharge_address, net.cmd_api_user_var_recharge_address);
        //--其它
        facade.registerCommand(net.HttpType.api_plat_var_game_config, net.cmd_api_plat_var_game_config);
        facade.registerCommand(net.HttpType.api_plat_fag_index, net.cmd_api_plat_fag_index);
        facade.registerCommand(net.HttpType.api_plat_var_marquee_index, net.cmd_api_plat_var_marquee_index);
        facade.registerCommand(net.HttpType.api_user_var_messages_index, net.cmd_api_user_var_messages_index);
        facade.registerCommand(net.HttpType.api_user_var_messages_show_var, net.cmd_api_user_var_messages_show_var);
        facade.registerCommand(net.HttpType.api_user_var_beat, net.cmd_api_user_var_beat);
        facade.registerCommand(net.HttpType.api_user_var_red_dot_tips, net.cmd_api_user_var_red_dot_tips);
    }
    net.initCommand = initCommand;
    ;
})(net || (net = {}));
/**
 * 获取活动列表数据
 */
var net;
/**
 * 获取活动列表数据
 */
(function (net) {
    class cmd_api_plat_activity extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_activity, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_activity, result.data);
            }
        }
    }
    net.cmd_api_plat_activity = cmd_api_plat_activity;
})(net || (net = {}));
/**
 * 每日任务
 */
var net;
/**
 * 每日任务
 */
(function (net) {
    class cmd_api_plat_activity_index_everyday extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_activity_index_everyday, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_activity_index_everyday, result.data);
            }
        }
    }
    net.cmd_api_plat_activity_index_everyday = cmd_api_plat_activity_index_everyday;
})(net || (net = {}));
/**
 * 绑定赠金
 */
var net;
/**
 * 绑定赠金
 */
(function (net) {
    class cmd_api_plat_activity_show_binding extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_activity_show_binding, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_activity_show_binding, result.data);
            }
        }
    }
    net.cmd_api_plat_activity_show_binding = cmd_api_plat_activity_show_binding;
})(net || (net = {}));
/**
 * plat_activity_detail
 */
var net;
/**
 * plat_activity_detail
 */
(function (net) {
    class cmd_api_plat_activity_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_activity_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_activity_var, result.data);
            }
        }
    }
    net.cmd_api_plat_activity_var = cmd_api_plat_activity_var;
})(net || (net = {}));
/**
 * 领取活动奖励
 */
var net;
/**
 * 领取活动奖励
 */
(function (net) {
    class cmd_api_plat_activity_var_receive extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_activity_var_receive, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_activity_var_receive, result.data);
            }
        }
    }
    net.cmd_api_plat_activity_var_receive = cmd_api_plat_activity_var_receive;
})(net || (net = {}));
/**
 * 常见问题
 */
var net;
/**
 * 常见问题
 */
(function (net) {
    class cmd_api_plat_fag_index extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_fag_index, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_fag_index, result.data);
            }
        }
    }
    net.cmd_api_plat_fag_index = cmd_api_plat_fag_index;
})(net || (net = {}));
/**
 * 获取用户签到信息
 */
var net;
/**
 * 获取用户签到信息
 */
(function (net) {
    class cmd_api_plat_sign_index extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_sign_index, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_sign_index, result.data);
            }
        }
    }
    net.cmd_api_plat_sign_index = cmd_api_plat_sign_index;
})(net || (net = {}));
/**
 * 获取转入账号信息
 */
var net;
/**
 * 获取转入账号信息
 */
(function (net) {
    class cmd_api_plat_var_block_transfer_in_order_account extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_var_block_transfer_in_order_account, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_var_block_transfer_in_order_account, result.data);
            }
        }
    }
    net.cmd_api_plat_var_block_transfer_in_order_account = cmd_api_plat_var_block_transfer_in_order_account;
})(net || (net = {}));
/**
 * 分红记录-全站记录
 */
var net;
/**
 * 分红记录-全站记录
 */
(function (net) {
    class cmd_api_plat_var_bonus_log extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_var_bonus_log, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_var_bonus_log, result.data);
            }
        }
    }
    net.cmd_api_plat_var_bonus_log = cmd_api_plat_var_bonus_log;
})(net || (net = {}));
/**
 * 昨日分红排行榜
 */
var net;
/**
 * 昨日分红排行榜
 */
(function (net) {
    class cmd_api_plat_var_bonus_rank extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_var_bonus_rank, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_var_bonus_rank, result.data);
            }
        }
    }
    net.cmd_api_plat_var_bonus_rank = cmd_api_plat_var_bonus_rank;
})(net || (net = {}));
/**
 * 平台近5日分红金额列表
 */
var net;
/**
 * 平台近5日分红金额列表
 */
(function (net) {
    class cmd_api_plat_var_bonus_recently extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_var_bonus_recently, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_var_bonus_recently, result.data);
            }
        }
    }
    net.cmd_api_plat_var_bonus_recently = cmd_api_plat_var_bonus_recently;
})(net || (net = {}));
/**
 * 获取所有游戏的查询配置
 */
var net;
/**
 * 获取所有游戏的查询配置
 */
(function (net) {
    class cmd_api_plat_var_game_all_config extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_var_game_all_config, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_var_game_all_config, result.data);
            }
        }
    }
    net.cmd_api_plat_var_game_all_config = cmd_api_plat_var_game_all_config;
})(net || (net = {}));
/**
 * 所有游戏的查询
 */
var net;
/**
 * 所有游戏的查询
 */
(function (net) {
    class cmd_api_plat_var_game_all_index extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_var_game_all_index, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_var_game_all_index, result.data);
            }
        }
    }
    net.cmd_api_plat_var_game_all_index = cmd_api_plat_var_game_all_index;
})(net || (net = {}));
/**
 * 配置数据 枚举
 */
var net;
/**
 * 配置数据 枚举
 */
(function (net) {
    class cmd_api_plat_var_game_config extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_var_game_config, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_var_game_config, result.data);
            }
        }
    }
    net.cmd_api_plat_var_game_config = cmd_api_plat_var_game_config;
})(net || (net = {}));
/**
 * 获取游戏类型,游戏菜单（大厅菜单）
 */
var net;
/**
 * 获取游戏类型,游戏菜单（大厅菜单）
 */
(function (net) {
    class cmd_api_plat_var_lobby_index extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_var_lobby_index, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_var_lobby_index, result.data);
            }
        }
    }
    net.cmd_api_plat_var_lobby_index = cmd_api_plat_var_lobby_index;
})(net || (net = {}));
/**
 * 跑马灯
 */
var net;
/**
 * 跑马灯
 */
(function (net) {
    class cmd_api_plat_var_marquee_index extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_var_marquee_index, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_var_marquee_index, result.data);
            }
        }
    }
    net.cmd_api_plat_var_marquee_index = cmd_api_plat_var_marquee_index;
})(net || (net = {}));
/**
 * 平台公告
 */
var net;
/**
 * 平台公告
 */
(function (net) {
    class cmd_api_plat_var_notice_index extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_var_notice_index, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_var_notice_index, result.data);
            }
        }
    }
    net.cmd_api_plat_var_notice_index = cmd_api_plat_var_notice_index;
})(net || (net = {}));
/**
 * 平台公告数据详细数据
 */
var net;
/**
 * 平台公告数据详细数据
 */
(function (net) {
    class cmd_api_plat_var_notice_show_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_var_notice_show_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_var_notice_show_var, result.data);
            }
        }
    }
    net.cmd_api_plat_var_notice_show_var = cmd_api_plat_var_notice_show_var;
})(net || (net = {}));
/**
 * 平台币分红信息
 */
var net;
/**
 * 平台币分红信息
 */
(function (net) {
    class cmd_api_plat_var_stake_info extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_plat_var_stake_info, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_plat_var_stake_info, result.data);
            }
        }
    }
    net.cmd_api_plat_var_stake_info = cmd_api_plat_var_stake_info;
})(net || (net = {}));
/**
 * 获取手机区号
 */
var net;
/**
 * 获取手机区号
 */
(function (net) {
    class cmd_api_public_area_code extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_public_area_code, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_public_area_code, result.data);
            }
        }
    }
    net.cmd_api_public_area_code = cmd_api_public_area_code;
})(net || (net = {}));
/**
 * 获取验证码图片
 */
var net;
/**
 * 获取验证码图片
 */
(function (net) {
    class cmd_api_public_auth_code extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_public_auth_code, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_public_auth_code, result.data);
            }
        }
    }
    net.cmd_api_public_auth_code = cmd_api_public_auth_code;
})(net || (net = {}));
/**
 * 发送邮件
 */
var net;
/**
 * 发送邮件
 */
(function (net) {
    class cmd_api_public_email_send extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_public_email_send, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_public_email_send, result.data);
            }
        }
    }
    net.cmd_api_public_email_send = cmd_api_public_email_send;
})(net || (net = {}));
/**
 * 发送短信
 */
var net;
/**
 * 发送短信
 */
(function (net) {
    class cmd_api_public_sms_send extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_public_sms_send, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_public_sms_send, result.data);
            }
        }
    }
    net.cmd_api_public_sms_send = cmd_api_public_sms_send;
})(net || (net = {}));
/**
 * 收款方式发送短信
 */
var net;
/**
 * 收款方式发送短信
 */
(function (net) {
    class cmd_api_sms_exchange extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_sms_exchange, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_sms_exchange, result.data);
            }
        }
    }
    net.cmd_api_sms_exchange = cmd_api_sms_exchange;
})(net || (net = {}));
/**
 * 重置密码发送短信
 */
var net;
/**
 * 重置密码发送短信
 */
(function (net) {
    class cmd_api_sms_reset_password_sent extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_sms_reset_password_sent, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_sms_reset_password_sent, result.data);
            }
        }
    }
    net.cmd_api_sms_reset_password_sent = cmd_api_sms_reset_password_sent;
})(net || (net = {}));
/**
 * 发送短信 [验证码和获取注册验证码调用同一方法即可]
 */
var net;
/**
 * 发送短信 [验证码和获取注册验证码调用同一方法即可]
 */
(function (net) {
    class cmd_api_sms_send extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_sms_send, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_sms_send, result.data);
            }
        }
    }
    net.cmd_api_sms_send = cmd_api_sms_send;
})(net || (net = {}));
/**
 * 金币划转发送短信
 */
var net;
/**
 * 金币划转发送短信
 */
(function (net) {
    class cmd_api_sms_transfer extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_sms_transfer, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_sms_transfer, result.data);
            }
        }
    }
    net.cmd_api_sms_transfer = cmd_api_sms_transfer;
})(net || (net = {}));
/**
 * 用户绑定邮箱
 */
var net;
/**
 * 用户绑定邮箱
 */
(function (net) {
    class cmd_api_user_bind_email_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_bind_email_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_bind_email_var, result.data);
            }
        }
    }
    net.cmd_api_user_bind_email_var = cmd_api_user_bind_email_var;
})(net || (net = {}));
/**
 * 用户绑定手机
 */
var net;
/**
 * 用户绑定手机
 */
(function (net) {
    class cmd_api_user_bind_mobile_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_bind_mobile_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_bind_mobile_var, result.data);
            }
        }
    }
    net.cmd_api_user_bind_mobile_var = cmd_api_user_bind_mobile_var;
})(net || (net = {}));
/**
 * 钱包地址修改
 */
var net;
/**
 * 钱包地址修改
 */
(function (net) {
    class cmd_api_user_change_bsc_address_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_change_bsc_address_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_change_bsc_address_var, result.data);
            }
        }
    }
    net.cmd_api_user_change_bsc_address_var = cmd_api_user_change_bsc_address_var;
})(net || (net = {}));
/**
 * 现金密码
 */
var net;
/**
 * 现金密码
 */
(function (net) {
    class cmd_api_user_change_password_gold_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_change_password_gold_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_change_password_gold_var, result.data);
            }
        }
    }
    net.cmd_api_user_change_password_gold_var = cmd_api_user_change_password_gold_var;
})(net || (net = {}));
/**
 * 修改密码
 */
var net;
/**
 * 修改密码
 */
(function (net) {
    class cmd_api_user_change_password_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_change_password_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_change_password_var, result.data);
            }
        }
    }
    net.cmd_api_user_change_password_var = cmd_api_user_change_password_var;
})(net || (net = {}));
/**
 * 登入
 */
var net;
/**
 * 登入
 */
(function (net) {
    class cmd_api_user_login extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_login, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_login, result.data);
            }
        }
    }
    net.cmd_api_user_login = cmd_api_user_login;
})(net || (net = {}));
/**
 * 登出
 */
var net;
/**
 * 登出
 */
(function (net) {
    class cmd_api_user_logout extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_logout, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_logout, result.data);
            }
        }
    }
    net.cmd_api_user_logout = cmd_api_user_logout;
})(net || (net = {}));
/**
 * 注册
 */
var net;
/**
 * 注册
 */
(function (net) {
    class cmd_api_user_register extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_register, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_register, result.data);
            }
        }
    }
    net.cmd_api_user_register = cmd_api_user_register;
})(net || (net = {}));
/**
 * 重置密码
 */
var net;
/**
 * 重置密码
 */
(function (net) {
    class cmd_api_user_reset_password extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_reset_password, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_reset_password, result.data);
            }
        }
    }
    net.cmd_api_user_reset_password = cmd_api_user_reset_password;
})(net || (net = {}));
/**
 * 获取用户基本信息
 */
var net;
/**
 * 获取用户基本信息
 */
(function (net) {
    class cmd_api_user_show_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_show_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_show_var, result.data);
            }
        }
    }
    net.cmd_api_user_show_var = cmd_api_user_show_var;
})(net || (net = {}));
/**
 * 投注记录
 */
var net;
/**
 * 投注记录
 */
(function (net) {
    class cmd_api_user_show_var_bet extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_show_var_bet, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_show_var_bet, result.data);
            }
        }
    }
    net.cmd_api_user_show_var_bet = cmd_api_user_show_var_bet;
})(net || (net = {}));
/**
 * 渠道统计
 */
var net;
/**
 * 渠道统计
 */
(function (net) {
    class cmd_api_user_show_var_channel_statistic extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_show_var_channel_statistic, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_show_var_channel_statistic, result.data);
            }
        }
    }
    net.cmd_api_user_show_var_channel_statistic = cmd_api_user_show_var_channel_statistic;
})(net || (net = {}));
/**
 * 获取用户账户明细
 */
var net;
/**
 * 获取用户账户明细
 */
(function (net) {
    class cmd_api_user_show_var_gold extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_show_var_gold, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_show_var_gold, result.data);
            }
        }
    }
    net.cmd_api_user_show_var_gold = cmd_api_user_show_var_gold;
})(net || (net = {}));
/**
 * 修改用户基本信息
 */
var net;
/**
 * 修改用户基本信息
 */
(function (net) {
    class cmd_api_user_update_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_update_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_update_var, result.data);
            }
        }
    }
    net.cmd_api_user_update_var = cmd_api_user_update_var;
})(net || (net = {}));
/**
 * 用户保险箱存取款
 */
var net;
/**
 * 用户保险箱存取款
 */
(function (net) {
    class cmd_api_user_update_var_safe_gold extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_update_var_safe_gold, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_update_var_safe_gold, result.data);
            }
        }
    }
    net.cmd_api_user_update_var_safe_gold = cmd_api_user_update_var_safe_gold;
})(net || (net = {}));
/**
 * 获取总代分红列表
 */
var net;
/**
 * 获取总代分红列表
 */
(function (net) {
    class cmd_api_user_var_agent_bonus extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_agent_bonus, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_agent_bonus, result.data);
            }
        }
    }
    net.cmd_api_user_var_agent_bonus = cmd_api_user_var_agent_bonus;
})(net || (net = {}));
/**
 * 直属成员
 */
var net;
/**
 * 直属成员
 */
(function (net) {
    class cmd_api_user_var_agent_direct_list extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_agent_direct_list, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_agent_direct_list, result.data);
            }
        }
    }
    net.cmd_api_user_var_agent_direct_list = cmd_api_user_var_agent_direct_list;
})(net || (net = {}));
/**
 * 获取代理用户列表
 */
var net;
/**
 * 获取代理用户列表
 */
(function (net) {
    class cmd_api_user_var_agent_var_direct_list extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_agent_var_direct_list, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_agent_var_direct_list, result.data);
            }
        }
    }
    net.cmd_api_user_var_agent_var_direct_list = cmd_api_user_var_agent_var_direct_list;
})(net || (net = {}));
/**
 * 直属保底范围查询
 */
var net;
/**
 * 直属保底范围查询
 */
(function (net) {
    class cmd_api_user_var_agent_var_floor_range extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_agent_var_floor_range, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_agent_var_floor_range, result.data);
            }
        }
    }
    net.cmd_api_user_var_agent_var_floor_range = cmd_api_user_var_agent_var_floor_range;
})(net || (net = {}));
/**
 * 获取用户推广统计信息
 */
var net;
/**
 * 获取用户推广统计信息
 */
(function (net) {
    class cmd_api_user_var_agent_var_statistic_promotion extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_agent_var_statistic_promotion, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_agent_var_statistic_promotion, result.data);
            }
        }
    }
    net.cmd_api_user_var_agent_var_statistic_promotion = cmd_api_user_var_agent_var_statistic_promotion;
})(net || (net = {}));
/**
 * 设置直属保底
 */
var net;
/**
 * 设置直属保底
 */
(function (net) {
    class cmd_api_user_var_agent_var_update extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_agent_var_update, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_agent_var_update, result.data);
            }
        }
    }
    net.cmd_api_user_var_agent_var_update = cmd_api_user_var_agent_var_update;
})(net || (net = {}));
/**
 * 获取用户返水记录
 */
var net;
/**
 * 获取用户返水记录
 */
(function (net) {
    class cmd_api_user_var_backwater extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_backwater, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_backwater, result.data);
            }
        }
    }
    net.cmd_api_user_var_backwater = cmd_api_user_var_backwater;
})(net || (net = {}));
/**
 * 返水试算接口
 */
var net;
/**
 * 返水试算接口
 */
(function (net) {
    class cmd_api_user_var_backwater_trial extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_backwater_trial, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_backwater_trial, result.data);
            }
        }
    }
    net.cmd_api_user_var_backwater_trial = cmd_api_user_var_backwater_trial;
})(net || (net = {}));
/**
 * 返水试算领取接口
 */
var net;
/**
 * 返水试算领取接口
 */
(function (net) {
    class cmd_api_user_var_backwater_trial_receive extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_backwater_trial_receive, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_backwater_trial_receive, result.data);
            }
        }
    }
    net.cmd_api_user_var_backwater_trial_receive = cmd_api_user_var_backwater_trial_receive;
})(net || (net = {}));
/**
 * 获取用户返水详情
 */
var net;
/**
 * 获取用户返水详情
 */
(function (net) {
    class cmd_api_user_var_backwater_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_backwater_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_backwater_var, result.data);
            }
        }
    }
    net.cmd_api_user_var_backwater_var = cmd_api_user_var_backwater_var;
})(net || (net = {}));
/**
 * 用户心跳
 */
var net;
/**
 * 用户心跳
 */
(function (net) {
    class cmd_api_user_var_beat extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_beat, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_beat, result.data);
            }
        }
    }
    net.cmd_api_user_var_beat = cmd_api_user_var_beat;
})(net || (net = {}));
/**
 * 代币转入订单列表
 */
var net;
/**
 * 代币转入订单列表
 */
(function (net) {
    class cmd_api_user_var_block_transfer_in_order_index extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_block_transfer_in_order_index, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_block_transfer_in_order_index, result.data);
            }
        }
    }
    net.cmd_api_user_var_block_transfer_in_order_index = cmd_api_user_var_block_transfer_in_order_index;
})(net || (net = {}));
/**
 * 代币转入订单提交
 */
var net;
/**
 * 代币转入订单提交
 */
(function (net) {
    class cmd_api_user_var_block_transfer_in_order_store extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_block_transfer_in_order_store, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_block_transfer_in_order_store, result.data);
            }
        }
    }
    net.cmd_api_user_var_block_transfer_in_order_store = cmd_api_user_var_block_transfer_in_order_store;
})(net || (net = {}));
/**
 * 代币转出订单列表
 */
var net;
/**
 * 代币转出订单列表
 */
(function (net) {
    class cmd_api_user_var_block_transfer_out_order_index extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_block_transfer_out_order_index, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_block_transfer_out_order_index, result.data);
            }
        }
    }
    net.cmd_api_user_var_block_transfer_out_order_index = cmd_api_user_var_block_transfer_out_order_index;
})(net || (net = {}));
/**
 * 代币转出订单提交
 */
var net;
/**
 * 代币转出订单提交
 */
(function (net) {
    class cmd_api_user_var_block_transfer_out_order_store extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_block_transfer_out_order_store, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_block_transfer_out_order_store, result.data);
            }
        }
    }
    net.cmd_api_user_var_block_transfer_out_order_store = cmd_api_user_var_block_transfer_out_order_store;
})(net || (net = {}));
/**
 * 整盘分红等级表
 */
var net;
/**
 * 整盘分红等级表
 */
(function (net) {
    class cmd_api_user_var_bonus_all_config extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_bonus_all_config, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_bonus_all_config, result.data);
            }
        }
    }
    net.cmd_api_user_var_bonus_all_config = cmd_api_user_var_bonus_all_config;
})(net || (net = {}));
/**
 * 获取下级整盘分红列表
 */
var net;
/**
 * 获取下级整盘分红列表
 */
(function (net) {
    class cmd_api_user_var_bonus_all_direct extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_bonus_all_direct, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_bonus_all_direct, result.data);
            }
        }
    }
    net.cmd_api_user_var_bonus_all_direct = cmd_api_user_var_bonus_all_direct;
})(net || (net = {}));
/**
 * 获取整盘分红历史记录
 */
var net;
/**
 * 获取整盘分红历史记录
 */
(function (net) {
    class cmd_api_user_var_bonus_all_history extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_bonus_all_history, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_bonus_all_history, result.data);
            }
        }
    }
    net.cmd_api_user_var_bonus_all_history = cmd_api_user_var_bonus_all_history;
})(net || (net = {}));
/**
 * 领取整盘分红
 */
var net;
/**
 * 领取整盘分红
 */
(function (net) {
    class cmd_api_user_var_bonus_all_receive_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_bonus_all_receive_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_bonus_all_receive_var, result.data);
            }
        }
    }
    net.cmd_api_user_var_bonus_all_receive_var = cmd_api_user_var_bonus_all_receive_var;
})(net || (net = {}));
/**
 * 整盘分红统计
 */
var net;
/**
 * 整盘分红统计
 */
(function (net) {
    class cmd_api_user_var_bonus_all_statistic extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_bonus_all_statistic, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_bonus_all_statistic, result.data);
            }
        }
    }
    net.cmd_api_user_var_bonus_all_statistic = cmd_api_user_var_bonus_all_statistic;
})(net || (net = {}));
/**
 * 分红记录-个人纪录
 */
var net;
/**
 * 分红记录-个人纪录
 */
(function (net) {
    class cmd_api_user_var_bonus_log extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_bonus_log, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_bonus_log, result.data);
            }
        }
    }
    net.cmd_api_user_var_bonus_log = cmd_api_user_var_bonus_log;
})(net || (net = {}));
/**
 * 币商充值订单确认转账
 */
var net;
/**
 * 币商充值订单确认转账
 */
(function (net) {
    class cmd_api_user_var_coin_recharge_confirm extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_coin_recharge_confirm, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_coin_recharge_confirm, result.data);
            }
        }
    }
    net.cmd_api_user_var_coin_recharge_confirm = cmd_api_user_var_coin_recharge_confirm;
})(net || (net = {}));
/**
 * 按日期获取佣金详情
 */
var net;
/**
 * 按日期获取佣金详情
 */
(function (net) {
    class cmd_api_user_var_commission_commissiondetail extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_commission_commissiondetail, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_commission_commissiondetail, result.data);
            }
        }
    }
    net.cmd_api_user_var_commission_commissiondetail = cmd_api_user_var_commission_commissiondetail;
})(net || (net = {}));
/**
 * 业绩查询
 */
var net;
/**
 * 业绩查询
 */
(function (net) {
    class cmd_api_user_var_commission_commissionlist extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_commission_commissionlist, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_commission_commissionlist, result.data);
            }
        }
    }
    net.cmd_api_user_var_commission_commissionlist = cmd_api_user_var_commission_commissionlist;
})(net || (net = {}));
/**
 * 我的返佣比
 */
var net;
/**
 * 我的返佣比
 */
(function (net) {
    class cmd_api_user_var_commission_commissionnum extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_commission_commissionnum, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_commission_commissionnum, result.data);
            }
        }
    }
    net.cmd_api_user_var_commission_commissionnum = cmd_api_user_var_commission_commissionnum;
})(net || (net = {}));
/**
 * 按日期查询直属代理流水详情
 */
var net;
/**
 * 按日期查询直属代理流水详情
 */
(function (net) {
    class cmd_api_user_var_commission_directswater extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_commission_directswater, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_commission_directswater, result.data);
            }
        }
    }
    net.cmd_api_user_var_commission_directswater = cmd_api_user_var_commission_directswater;
})(net || (net = {}));
/**
 * 领取佣金
 */
var net;
/**
 * 领取佣金
 */
(function (net) {
    class cmd_api_user_var_commission_receive extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_commission_receive, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_commission_receive, result.data);
            }
        }
    }
    net.cmd_api_user_var_commission_receive = cmd_api_user_var_commission_receive;
})(net || (net = {}));
/**
 * 用户质押
 */
var net;
/**
 * 用户质押
 */
(function (net) {
    class cmd_api_user_var_deposit_stake extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_deposit_stake, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_deposit_stake, result.data);
            }
        }
    }
    net.cmd_api_user_var_deposit_stake = cmd_api_user_var_deposit_stake;
})(net || (net = {}));
/**
 * 批量删除邮件
 */
var net;
/**
 * 批量删除邮件
 */
(function (net) {
    class cmd_api_user_var_destroy_batch extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_destroy_batch, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_destroy_batch, result.data);
            }
        }
    }
    net.cmd_api_user_var_destroy_batch = cmd_api_user_var_destroy_batch;
})(net || (net = {}));
/**
 * 一键删除邮件
 */
var net;
/**
 * 一键删除邮件
 */
(function (net) {
    class cmd_api_user_var_destroy_quick extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_destroy_quick, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_destroy_quick, result.data);
            }
        }
    }
    net.cmd_api_user_var_destroy_quick = cmd_api_user_var_destroy_quick;
})(net || (net = {}));
/**
 * 创建兑换订单
 */
var net;
/**
 * 创建兑换订单
 */
(function (net) {
    class cmd_api_user_var_exchange_create_order extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_exchange_create_order, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_exchange_create_order, result.data);
            }
        }
    }
    net.cmd_api_user_var_exchange_create_order = cmd_api_user_var_exchange_create_order;
})(net || (net = {}));
/**
 * 兑换方式列表
 */
var net;
/**
 * 兑换方式列表
 */
(function (net) {
    class cmd_api_user_var_exchange_method_list extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_exchange_method_list, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_exchange_method_list, result.data);
            }
        }
    }
    net.cmd_api_user_var_exchange_method_list = cmd_api_user_var_exchange_method_list;
})(net || (net = {}));
/**
 * 用户兑换订单
 */
var net;
/**
 * 用户兑换订单
 */
(function (net) {
    class cmd_api_user_var_exchange_order_list extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_exchange_order_list, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_exchange_order_list, result.data);
            }
        }
    }
    net.cmd_api_user_var_exchange_order_list = cmd_api_user_var_exchange_order_list;
})(net || (net = {}));
/**
 * 我的游戏
 */
var net;
/**
 * 我的游戏
 */
(function (net) {
    class cmd_api_user_var_game_index extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_game_index, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_game_index, result.data);
            }
        }
    }
    net.cmd_api_user_var_game_index = cmd_api_user_var_game_index;
})(net || (net = {}));
/**
 * 搜索游戏
 */
var net;
/**
 * 搜索游戏
 */
(function (net) {
    class cmd_api_user_var_game_search extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_game_search, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_game_search, result.data);
            }
        }
    }
    net.cmd_api_user_var_game_search = cmd_api_user_var_game_search;
})(net || (net = {}));
/**
 * 收藏游戏
 */
var net;
/**
 * 收藏游戏
 */
(function (net) {
    class cmd_api_user_var_game_update_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_game_update_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_game_update_var, result.data);
            }
        }
    }
    net.cmd_api_user_var_game_update_var = cmd_api_user_var_game_update_var;
})(net || (net = {}));
/**
 * 金币划转
 */
var net;
/**
 * 金币划转
 */
(function (net) {
    class cmd_api_user_var_gold_transfer extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_gold_transfer, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_gold_transfer, result.data);
            }
        }
    }
    net.cmd_api_user_var_gold_transfer = cmd_api_user_var_gold_transfer;
})(net || (net = {}));
/**
 * 流水审核
 */
var net;
/**
 * 流水审核
 */
(function (net) {
    class cmd_api_user_var_gold_water_index extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_gold_water_index, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_gold_water_index, result.data);
            }
        }
    }
    net.cmd_api_user_var_gold_water_index = cmd_api_user_var_gold_water_index;
})(net || (net = {}));
/**
 * 获取用户邮件列表
 */
var net;
/**
 * 获取用户邮件列表
 */
(function (net) {
    class cmd_api_user_var_mail extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_mail, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_mail, result.data);
            }
        }
    }
    net.cmd_api_user_var_mail = cmd_api_user_var_mail;
})(net || (net = {}));
/**
 * 获取用户邮件详细信息
 */
var net;
/**
 * 获取用户邮件详细信息
 */
(function (net) {
    class cmd_api_user_var_mail_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_mail_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_mail_var, result.data);
            }
        }
    }
    net.cmd_api_user_var_mail_var = cmd_api_user_var_mail_var;
})(net || (net = {}));
/**
 * 领取邮件对应的奖励
 */
var net;
/**
 * 领取邮件对应的奖励
 */
(function (net) {
    class cmd_api_user_var_mail_var_receive extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_mail_var_receive, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_mail_var_receive, result.data);
            }
        }
    }
    net.cmd_api_user_var_mail_var_receive = cmd_api_user_var_mail_var_receive;
})(net || (net = {}));
/**
 * 获取未读取的消息列表
 */
var net;
/**
 * 获取未读取的消息列表
 */
(function (net) {
    class cmd_api_user_var_messages_index extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_messages_index, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_messages_index, result.data);
            }
        }
    }
    net.cmd_api_user_var_messages_index = cmd_api_user_var_messages_index;
})(net || (net = {}));
/**
 * 获取消息详情
 */
var net;
/**
 * 获取消息详情
 */
(function (net) {
    class cmd_api_user_var_messages_show_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_messages_show_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_messages_show_var, result.data);
            }
        }
    }
    net.cmd_api_user_var_messages_show_var = cmd_api_user_var_messages_show_var;
})(net || (net = {}));
/**
 * 银行列表
 */
var net;
/**
 * 银行列表
 */
(function (net) {
    class cmd_api_user_var_payment_method_bank_list extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_payment_method_bank_list, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_payment_method_bank_list, result.data);
            }
        }
    }
    net.cmd_api_user_var_payment_method_bank_list = cmd_api_user_var_payment_method_bank_list;
})(net || (net = {}));
/**
 * 收款方式列表
 */
var net;
/**
 * 收款方式列表
 */
(function (net) {
    class cmd_api_user_var_payment_method_index extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_payment_method_index, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_payment_method_index, result.data);
            }
        }
    }
    net.cmd_api_user_var_payment_method_index = cmd_api_user_var_payment_method_index;
})(net || (net = {}));
/**
 * 添加收款方式
 */
var net;
/**
 * 添加收款方式
 */
(function (net) {
    class cmd_api_user_var_payment_method_store extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_payment_method_store, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_payment_method_store, result.data);
            }
        }
    }
    net.cmd_api_user_var_payment_method_store = cmd_api_user_var_payment_method_store;
})(net || (net = {}));
/**
 * 更新银行卡/支付宝
 */
var net;
/**
 * 更新银行卡/支付宝
 */
(function (net) {
    class cmd_api_user_var_payment_method_update_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_payment_method_update_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_payment_method_update_var, result.data);
            }
        }
    }
    net.cmd_api_user_var_payment_method_update_var = cmd_api_user_var_payment_method_update_var;
})(net || (net = {}));
/**
 * 一键领取所有邮件对应的奖励
 */
var net;
/**
 * 一键领取所有邮件对应的奖励
 */
(function (net) {
    class cmd_api_user_var_receiveQuick extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_receiveQuick, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_receiveQuick, result.data);
            }
        }
    }
    net.cmd_api_user_var_receiveQuick = cmd_api_user_var_receiveQuick;
})(net || (net = {}));
/**
 * 领取分红
 */
var net;
/**
 * 领取分红
 */
(function (net) {
    class cmd_api_user_var_receive_agent_bonus_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_receive_agent_bonus_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_receive_agent_bonus_var, result.data);
            }
        }
    }
    net.cmd_api_user_var_receive_agent_bonus_var = cmd_api_user_var_receive_agent_bonus_var;
})(net || (net = {}));
/**
 * 获取数字货币充值地址
 */
var net;
/**
 * 获取数字货币充值地址
 */
(function (net) {
    class cmd_api_user_var_recharge_address extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_recharge_address, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_recharge_address, result.data);
            }
        }
    }
    net.cmd_api_user_var_recharge_address = cmd_api_user_var_recharge_address;
})(net || (net = {}));
/**
 * 创建订单
 */
var net;
/**
 * 创建订单
 */
(function (net) {
    class cmd_api_user_var_recharge_create extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_recharge_create, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_recharge_create, result.data);
            }
        }
    }
    net.cmd_api_user_var_recharge_create = cmd_api_user_var_recharge_create;
})(net || (net = {}));
/**
 * 充值记录
 */
var net;
/**
 * 充值记录
 */
(function (net) {
    class cmd_api_user_var_recharge_list extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_recharge_list, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_recharge_list, result.data);
            }
        }
    }
    net.cmd_api_user_var_recharge_list = cmd_api_user_var_recharge_list;
})(net || (net = {}));
/**
 * 获取商城支付列表
 */
var net;
/**
 * 获取商城支付列表
 */
(function (net) {
    class cmd_api_user_var_recharge_method_list extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_recharge_method_list, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_recharge_method_list, result.data);
            }
        }
    }
    net.cmd_api_user_var_recharge_method_list = cmd_api_user_var_recharge_method_list;
})(net || (net = {}));
/**
 * 获取红点提示信息
 */
var net;
/**
 * 获取红点提示信息
 */
(function (net) {
    class cmd_api_user_var_red_dot_tips extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_red_dot_tips, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_red_dot_tips, result.data);
            }
        }
    }
    net.cmd_api_user_var_red_dot_tips = cmd_api_user_var_red_dot_tips;
})(net || (net = {}));
/**
 * 获取推广链接
 */
var net;
/**
 * 获取推广链接
 */
(function (net) {
    class cmd_api_user_var_short_chain extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_short_chain, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_short_chain, result.data);
            }
        }
    }
    net.cmd_api_user_var_short_chain = cmd_api_user_var_short_chain;
})(net || (net = {}));
/**
 * 领取用户签到奖励
 */
var net;
/**
 * 领取用户签到奖励
 */
(function (net) {
    class cmd_api_user_var_sign_receive extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_sign_receive, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_sign_receive, result.data);
            }
        }
    }
    net.cmd_api_user_var_sign_receive = cmd_api_user_var_sign_receive;
})(net || (net = {}));
/**
 * 每日签到
 */
var net;
/**
 * 每日签到
 */
(function (net) {
    class cmd_api_user_var_sign_store extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_sign_store, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_sign_store, result.data);
            }
        }
    }
    net.cmd_api_user_var_sign_store = cmd_api_user_var_sign_store;
})(net || (net = {}));
/**
 * 领取分红
 */
var net;
/**
 * 领取分红
 */
(function (net) {
    class cmd_api_user_var_stake_draw extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_stake_draw, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_stake_draw, result.data);
            }
        }
    }
    net.cmd_api_user_var_stake_draw = cmd_api_user_var_stake_draw;
})(net || (net = {}));
/**
 * 用户币分红信息
 */
var net;
/**
 * 用户币分红信息
 */
(function (net) {
    class cmd_api_user_var_stake_info extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_stake_info, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_stake_info, result.data);
            }
        }
    }
    net.cmd_api_user_var_stake_info = cmd_api_user_var_stake_info;
})(net || (net = {}));
/**
 * 用户质押记录
 */
var net;
/**
 * 用户质押记录
 */
(function (net) {
    class cmd_api_user_var_stake_log extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_stake_log, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_stake_log, result.data);
            }
        }
    }
    net.cmd_api_user_var_stake_log = cmd_api_user_var_stake_log;
})(net || (net = {}));
/**
 * 提取用户所有厂商的余额
 */
var net;
/**
 * 提取用户所有厂商的余额
 */
(function (net) {
    class cmd_api_user_var_vendor_withdraw extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_vendor_withdraw, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_vendor_withdraw, result.data);
            }
        }
    }
    net.cmd_api_user_var_vendor_withdraw = cmd_api_user_var_vendor_withdraw;
})(net || (net = {}));
/**
 * 用户手动解质押
 */
var net;
/**
 * 用户手动解质押
 */
(function (net) {
    class cmd_api_user_var_withdraw_stake extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_user_var_withdraw_stake, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_user_var_withdraw_stake, result.data);
            }
        }
    }
    net.cmd_api_user_var_withdraw_stake = cmd_api_user_var_withdraw_stake;
})(net || (net = {}));
/**
 * 获取厂商列表
 */
var net;
/**
 * 获取厂商列表
 */
(function (net) {
    class cmd_api_vendor_simple extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_vendor_simple, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_vendor_simple, result.data);
            }
        }
    }
    net.cmd_api_vendor_simple = cmd_api_vendor_simple;
})(net || (net = {}));
/**
 * 获取厂商配置游戏菜单（大厅厂商二级游戏菜单）
 */
var net;
/**
 * 获取厂商配置游戏菜单（大厅厂商二级游戏菜单）
 */
(function (net) {
    class cmd_api_vendor_var_lobby_simple extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_vendor_var_lobby_simple, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_vendor_var_lobby_simple, result.data);
            }
        }
    }
    net.cmd_api_vendor_var_lobby_simple = cmd_api_vendor_var_lobby_simple;
})(net || (net = {}));
/**
 * 获取进入厂商的游戏URL，获取厂商游戏凭证
 */
var net;
/**
 * 获取进入厂商的游戏URL，获取厂商游戏凭证
 */
(function (net) {
    class cmd_api_vendor_var_ori_product_show_var extends puremvc.SimpleCommand {
        execute(notification) {
            const body = notification.getBody() || {};
            const url = net.getUrl(net.HttpType.api_vendor_var_ori_product_show_var, body);
            net.Http.request(body || {}, url).then(this.response.bind(this));
        }
        response(result) {
            if (result.status === 0) {
                this.sendNotification(net.EventType.api_vendor_var_ori_product_show_var, result.data);
            }
        }
    }
    net.cmd_api_vendor_var_ori_product_show_var = cmd_api_vendor_var_ori_product_show_var;
})(net || (net = {}));
var core;
(function (core) {
    let EnumAppType;
    (function (EnumAppType) {
        EnumAppType[EnumAppType["WAP"] = 1] = "WAP";
        EnumAppType[EnumAppType["APP"] = 2] = "APP";
        EnumAppType[EnumAppType["WEB"] = 4] = "WEB";
    })(EnumAppType = core.EnumAppType || (core.EnumAppType = {}));
})(core || (core = {}));
var core;
(function (core) {
    let EnumDeviceType;
    (function (EnumDeviceType) {
        EnumDeviceType[EnumDeviceType["IOS"] = 1] = "IOS";
        EnumDeviceType[EnumDeviceType["ANDROID"] = 2] = "ANDROID";
        EnumDeviceType[EnumDeviceType["OTHER"] = 3] = "OTHER";
    })(EnumDeviceType = core.EnumDeviceType || (core.EnumDeviceType = {}));
})(core || (core = {}));
var core;
(function (core) {
    core.EventType = {
        /**网络请求开始*/
        REQUEST_START: "REQUEST_START",
        /**网络请求结束*/
        REQUEST_END: "REQUEST_END",
        /**服务器返回错误*/
        REQUEST_ERROR: "REQUEST_ERROR",
        /**网络错误*/
        IO_ERROR: "IO_ERROR",
    };
})(core || (core = {}));
/**
 * 全局属性和方法
 */
var core;
/**
 * 全局属性和方法
 */
(function (core) {
    /**
     * 格式化日期
     * @param d
     * @param fmt
     */
    function dateFormat(d, fmt) {
        var o = {
            "M+": d.getMonth() + 1,
            "d+": d.getDate(),
            "h+": d.getHours(),
            "m+": d.getMinutes(),
            "s+": d.getSeconds(),
            "q+": Math.floor((d.getMonth() + 3) / 3),
            S: d.getMilliseconds(),
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        return fmt;
    }
    core.dateFormat = dateFormat;
    /**
     * 转换成货币格式
     */
    function moneyFormat(s, symbol = "¥") {
        if (!s)
            s = 0;
        s = s.toString();
        if (/[^0-9\.]/.test(s))
            return "invalid value";
        s = s.replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s))
            s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        return symbol + s.replace(/^\./, "0.");
    }
    core.moneyFormat = moneyFormat;
    /**
     * 获取UUID
     */
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }
    core.generateUUID = generateUUID;
    /**
     * 获取字符串和真实长度。全角字符长度为2
     */
    function getStringLength(str) {
        var length = str.length;
        var realLength = 0;
        for (var i = 0; i < length; i++) {
            var charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            }
            else {
                realLength += 2;
            }
        }
        return realLength;
    }
    core.getStringLength = getStringLength;
    /**
     * 显示长字段时，在后面加上...
     */
    function getLimitString(str, len) {
        str = str.replace(/\n/g, "...");
        var length = str.length;
        var realLength = 0;
        for (var i = 0; i < length; i++) {
            var charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                realLength += 1;
            }
            else {
                realLength += 2;
            }
            if (realLength >= len) {
                return str.substring(0, i) + "...";
            }
        }
        return str;
    }
    core.getLimitString = getLimitString;
    /**
     * 获取URL参数
     * @param value
     */
    function getQueryVariable(value) {
        // const query = window.location.search.substring(1);
        let query = window.localStorage.getItem("query");
        if (!query)
            query = window.location.search.substring(1);
        const vars = query.split("&");
        for (const item of vars) {
            const idx = item.search("=");
            if (item.substring(0, idx) == value) {
                return item.substr(idx + 1);
            }
        }
        return null;
    }
    core.getQueryVariable = getQueryVariable;
    /**
     * 将对象转换为Http请求的form表单数据
     * @param obj
     */
    function getFormWithObject(obj) {
        const fData = new FormData();
        for (const key of Object.keys(obj)) {
            if (obj[key] && key != "hideWaiting")
                fData.append(key, obj[key]);
        }
        return fData;
    }
    core.getFormWithObject = getFormWithObject;
    /**
     * 验证用户名是否合法
     * @param value
     */
    function checkUserName(value) {
        const Regx = /^[A-Za-z0-9]*$/;
        return value.length >= 4 && value.length <= 20 && Regx.test(value);
    }
    core.checkUserName = checkUserName;
    /**
     * 验证密码是否合法
     * @param value
     */
    function checkUserPassword(value) {
        const Regx = /^[A-Za-z0-9]*$/;
        return value.length >= 6 && value.length <= 20 && Regx.test(value);
    }
    core.checkUserPassword = checkUserPassword;
    /**
     * 验证手机号是否合法
     * @param value
     */
    function checkPhone(value) {
        // const Regx = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
        const Regx = /^[1-9]+[0-9]*]*$/;
        return value.length >= 7 && value.length <= 11 && Regx.test(value);
    }
    core.checkPhone = checkPhone;
    /**
     * 验证邮箱是否合法
     * @param value
     */
    function checkMail(value) {
        const Regx = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
        return Regx.test(value);
    }
    core.checkMail = checkMail;
    /**
     * 检测QQ是否合法
     * @param value
     */
    function checkQQ(value) {
        return /^[1-9]\d{4,9}$/.test(value);
    }
    core.checkQQ = checkQQ;
    /**
     *
     * @param value 检测用户名是否合法
     * @returns
     */
    function checkNickName(value) {
        const len = getStringLength(value);
        return len >= 4 && len <= 12;
    }
    core.checkNickName = checkNickName;
    /**
     * 是否为移动设备
     */
    function isMobile() {
        const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
        return flag;
    }
    core.isMobile = isMobile;
    /**是否android */
    function isAndroid() {
        const flag = navigator.userAgent.match(/(Android)/i);
        return flag;
    }
    core.isAndroid = isAndroid;
    /**是否IOS */
    function isIOS() {
        const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad)/i);
        return flag;
    }
    core.isIOS = isIOS;
    /**
     * 有时候图片地址没有协议头，给它加上
     */
    function formatImageUrl(url) {
        if (url && url.indexOf("http") == 0) {
            return url;
        }
        return window.location.protocol + url;
    }
    core.formatImageUrl = formatImageUrl;
    /**
     * 获取今日零点时间
     * @offset 偏移天数
     * @offsetSecond 偏移秒
     */
    function getTodayOffset(offset = 0, offsetSecond = 0) {
        const d = new Date(new Date().toLocaleDateString());
        d.setTime(d.getTime() + 3600 * 1000 * 24 * offset - offsetSecond);
        return d;
    }
    core.getTodayOffset = getTodayOffset;
    /**
     * 去掉空属性/空符串，并返回一个新对象
     */
    function objectRemoveNull(obj, except = [undefined, null, ""]) {
        const result = {};
        for (const c of Object.keys(obj)) {
            if (except.indexOf(obj[c]) == -1) {
                result[c] = obj[c];
            }
        }
        return result;
    }
    core.objectRemoveNull = objectRemoveNull;
})(core || (core = {}));
var core;
(function (core) {
    var GlobalTimer;
    (function (GlobalTimer) {
        let timer;
        let vec = [];
        let running;
        let baseDelay = 1;
        /**
         * 初始化
         * @param baseDelay
         */
        function init(baseDelay) {
            if (!running) {
                running = true;
                timer = setInterval(onTimmer, baseDelay);
            }
        }
        GlobalTimer.init = init;
        /**
         * 注册一个计时器
         * @param listener
         * @param thisObj
         * @param repeated
         * @param delay
         * @param params
         */
        function registerInterval(listener, thisObj, repeated, delay, params) {
            if (delay >= baseDelay && delay % baseDelay === 0) {
                unregister(listener, thisObj);
                const twvo = {
                    thisObj,
                    listener,
                    repeated: repeated ? repeated : 1,
                    delay: delay ? Math.round(delay / baseDelay) : 1,
                    delayCount: 0,
                    params,
                };
                if (repeated === 0) {
                    twvo.repeated = -1;
                }
                vec.push(twvo);
            }
            else {
                throw "delay必须大于baseDelay，并且delay是baseDelay的整数倍";
            }
        }
        GlobalTimer.registerInterval = registerInterval;
        /**
         * 注册一个定时器
         * @param listener
         * @param thisObj
         * @param delay
         * @param params
         */
        function registerSetTimeOut(listener, thisObj, delay, params) {
            registerInterval(listener, thisObj, 1, delay, params);
        }
        GlobalTimer.registerSetTimeOut = registerSetTimeOut;
        /**
         * 移除定时器或者计时器
         * @param listener
         * @param thisObj
         */
        function unregister(listener, thisObj) {
            const len = vec.length;
            for (let i = 0; i < len; i++) {
                const twvo = vec[i];
                if (twvo.listener === listener && twvo.thisObj === thisObj) {
                    vec.splice(i, 1);
                    break;
                }
            }
        }
        GlobalTimer.unregister = unregister;
        /**
         * 等待
         * @param delay
         */
        function wait(delay) {
            return new Promise((resolve) => {
                GlobalTimer.registerSetTimeOut(() => {
                    resolve();
                }, this, delay);
            });
        }
        GlobalTimer.wait = wait;
        function onTimmer() {
            const vecRemove = [];
            const len = vec.length;
            for (let i = 0; i < len; i++) {
                const twvo = vec[i];
                if (twvo) {
                    twvo.delayCount += 1;
                    if (twvo.delayCount === twvo.delay) {
                        twvo.listener.apply(twvo.thisObj, twvo.params);
                        twvo.delayCount = 0;
                        twvo.repeated--;
                        if (twvo.repeated === 0) {
                            vecRemove.push(twvo);
                        }
                    }
                }
            }
            while (vecRemove.length > 0) {
                const c = vecRemove.pop();
                const idx = vec.indexOf(c);
                vec.splice(idx, 1);
            }
        }
    })(GlobalTimer = core.GlobalTimer || (core.GlobalTimer = {}));
})(core || (core = {}));
var core;
(function (core) {
    class MD5 {
        constructor() {
            this.hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
            this.b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */
        }
        static createInstance() {
            return new MD5();
        }
        /*
        * These are the privates you'll usually want to call
        * They take string arguments and return either hex or base-64 encoded strings
        */
        hex_md5(s) { return this.rstr2hex(this.rstr_md5(this.str2rstr_utf8(s))); } //这个函数就行了，
        b64_md5(s) { return this.rstr2b64(this.rstr_md5(this.str2rstr_utf8(s))); }
        any_md5(s, e) { return this.rstr2any(this.rstr_md5(this.str2rstr_utf8(s)), e); }
        hex_hmac_md5(k, d) { return this.rstr2hex(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); }
        b64_hmac_md5(k, d) { return this.rstr2b64(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d))); }
        any_hmac_md5(k, d, e) { return this.rstr2any(this.rstr_hmac_md5(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e); }
        /*
        * Perform a simple self-test to see if the VM is working
        */
        md5_vm_test() {
            return this.hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
        }
        /*
        * Calculate the MD5 of a raw string
        */
        rstr_md5(s) {
            return this.binl2rstr(this.binl_md5(this.rstr2binl(s), s.length * 8));
        }
        /*
        * Calculate the HMAC-MD5, of a key and some data (raw strings)
        */
        rstr_hmac_md5(key, data) {
            var bkey = this.rstr2binl(key);
            if (bkey.length > 16)
                bkey = this.binl_md5(bkey, key.length * 8);
            var ipad = Array(16), opad = Array(16);
            for (var i = 0; i < 16; i++) {
                ipad[i] = bkey[i] ^ 0x36363636;
                opad[i] = bkey[i] ^ 0x5C5C5C5C;
            }
            var hash = this.binl_md5(ipad.concat(this.rstr2binl(data)), 512 + data.length * 8);
            return this.binl2rstr(this.binl_md5(opad.concat(hash), 512 + 128));
        }
        /*
        * Convert a raw string to a hex string
        */
        rstr2hex(input) {
            try {
                this.hexcase;
            }
            catch (e) {
                this.hexcase = 0;
            }
            var hex_tab = this.hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var output = "";
            var x;
            for (var i = 0; i < input.length; i++) {
                x = input.charCodeAt(i);
                output += hex_tab.charAt((x >>> 4) & 0x0F)
                    + hex_tab.charAt(x & 0x0F);
            }
            return output;
        }
        /*
        * Convert a raw string to a base-64 string
        */
        rstr2b64(input) {
            try {
                this.b64pad;
            }
            catch (e) {
                this.b64pad = '';
            }
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var output = "";
            var len = input.length;
            for (var i = 0; i < len; i += 3) {
                var triplet = (input.charCodeAt(i) << 16)
                    | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0)
                    | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
                for (var j = 0; j < 4; j++) {
                    if (i * 8 + j * 6 > input.length * 8)
                        output += this.b64pad;
                    else
                        output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
                }
            }
            return output;
        }
        /*
        * Convert a raw string to an arbitrary string encoding
        */
        rstr2any(input, encoding) {
            var divisor = encoding.length;
            var i, j, q, x, quotient;
            /* Convert to an array of 16-bit big-endian values, forming the dividend */
            var dividend = Array(Math.ceil(input.length / 2));
            for (i = 0; i < dividend.length; i++) {
                dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
            }
            /*
            * Repeatedly perform a long division. The binary array forms the dividend,
            * the length of the encoding is the divisor. Once computed, the quotient
            * forms the dividend for the next step. All remainders are stored for later
            * use.
            */
            var full_length = Math.ceil(input.length * 8 /
                (Math.log(encoding.length) / Math.log(2)));
            var remainders = Array(full_length);
            for (j = 0; j < full_length; j++) {
                quotient = Array();
                x = 0;
                for (i = 0; i < dividend.length; i++) {
                    x = (x << 16) + dividend[i];
                    q = Math.floor(x / divisor);
                    x -= q * divisor;
                    if (quotient.length > 0 || q > 0)
                        quotient[quotient.length] = q;
                }
                remainders[j] = x;
                dividend = quotient;
            }
            /* Convert the remainders to the output string */
            var output = "";
            for (i = remainders.length - 1; i >= 0; i--)
                output += encoding.charAt(remainders[i]);
            return output;
        }
        /*
        * Encode a string as utf-8.
        * For efficiency, this assumes the input is valid utf-16.
        */
        str2rstr_utf8(input) {
            var output = "";
            var i = -1;
            var x, y;
            while (++i < input.length) {
                /* Decode utf-16 surrogate pairs */
                x = input.charCodeAt(i);
                y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
                    x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                    i++;
                }
                /* Encode output as utf-8 */
                if (x <= 0x7F)
                    output += String.fromCharCode(x);
                else if (x <= 0x7FF)
                    output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
                else if (x <= 0xFFFF)
                    output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
                else if (x <= 0x1FFFFF)
                    output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
            }
            return output;
        }
        /*
        * Encode a string as utf-16
        */
        str2rstr_utf16le(input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
            return output;
        }
        str2rstr_utf16be(input) {
            var output = "";
            for (var i = 0; i < input.length; i++)
                output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
            return output;
        }
        /*
        * Convert a raw string to an array of little-endian words
        * Characters >255 have their high-byte silently ignored.
        */
        rstr2binl(input) {
            var output = Array(input.length >> 2);
            for (var i = 0; i < output.length; i++)
                output[i] = 0;
            for (var i = 0; i < input.length * 8; i += 8)
                output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
            return output;
        }
        /*
        * Convert an array of little-endian words to a string
        */
        binl2rstr(input) {
            var output = "";
            for (var i = 0; i < input.length * 32; i += 8)
                output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
            return output;
        }
        /*
        * Calculate the MD5 of an array of little-endian words, and a bit length.
        */
        binl_md5(x, len) {
            /* append padding */
            x[len >> 5] |= 0x80 << ((len) % 32);
            x[(((len + 64) >>> 9) << 4) + 14] = len;
            var a = 1732584193;
            var b = -271733879;
            var c = -1732584194;
            var d = 271733878;
            for (var i = 0; i < x.length; i += 16) {
                var olda = a;
                var oldb = b;
                var oldc = c;
                var oldd = d;
                a = this.md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
                d = this.md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
                c = this.md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
                b = this.md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
                a = this.md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
                d = this.md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
                c = this.md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
                b = this.md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
                a = this.md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
                d = this.md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
                c = this.md5_ff(c, d, a, b, x[i + 10], 17, -42063);
                b = this.md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
                a = this.md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
                d = this.md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
                c = this.md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
                b = this.md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
                a = this.md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
                d = this.md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
                c = this.md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
                b = this.md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
                a = this.md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
                d = this.md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
                c = this.md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
                b = this.md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
                a = this.md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
                d = this.md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
                c = this.md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
                b = this.md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
                a = this.md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
                d = this.md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
                c = this.md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
                b = this.md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
                a = this.md5_hh(a, b, c, d, x[i + 5], 4, -378558);
                d = this.md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
                c = this.md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
                b = this.md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
                a = this.md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
                d = this.md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
                c = this.md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
                b = this.md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
                a = this.md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
                d = this.md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
                c = this.md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
                b = this.md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
                a = this.md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
                d = this.md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
                c = this.md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
                b = this.md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
                a = this.md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
                d = this.md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
                c = this.md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
                b = this.md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
                a = this.md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
                d = this.md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
                c = this.md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
                b = this.md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
                a = this.md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
                d = this.md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
                c = this.md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
                b = this.md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
                a = this.md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
                d = this.md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
                c = this.md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
                b = this.md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
                a = this.safe_add(a, olda);
                b = this.safe_add(b, oldb);
                c = this.safe_add(c, oldc);
                d = this.safe_add(d, oldd);
            }
            return [a, b, c, d];
        }
        /*
        * These privates implement the four basic operations the algorithm uses.
        */
        md5_cmn(q, a, b, x, s, t) {
            return this.safe_add(this.bit_rol(this.safe_add(this.safe_add(a, q), this.safe_add(x, t)), s), b);
        }
        md5_ff(a, b, c, d, x, s, t) {
            return this.md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
        }
        md5_gg(a, b, c, d, x, s, t) {
            return this.md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
        }
        md5_hh(a, b, c, d, x, s, t) {
            return this.md5_cmn(b ^ c ^ d, a, b, x, s, t);
        }
        md5_ii(a, b, c, d, x, s, t) {
            return this.md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
        }
        /*
        * Add integers, wrapping at 2^32. This uses 16-bit operations internally
        * to work around bugs in some JS interpreters.
        */
        safe_add(x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
        /*
        * Bitwise rotate a 32-bit number to the left.
        */
        bit_rol(num, cnt) {
            return (num << cnt) | (num >>> (32 - cnt));
        }
    }
    core.MD5 = MD5;
})(core || (core = {}));
/**
 * Object.assign兼容
 */
if (typeof Object.assign != 'function') {
    (function () {
        Object.assign = function (target) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        };
    })();
}
/**
 * window.atob/btoa 兼容
 */
if (typeof window.atob != 'function') {
    const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    window.atob = function (e) {
        for (var t, r, o = String(e), n = 0, a = c, i = ""; o.charAt(0 | n) || (a = "=", n % 1); i += a.charAt(63 & t >> 8 - n % 1 * 8)) {
            if (255 < (r = o.charCodeAt(n += .75)))
                throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            t = t << 8 | r;
        }
        return i;
    };
    window.btoa = function (e) {
        var t = String(e).replace(/[=]+$/, "");
        if (t.length % 4 == 1)
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        for (var r, o, n = 0, a = 0, i = ""; o = t.charAt(a++); ~o && (r = n % 4 ? 64 * r + o : o, n++ % 4) ? i += String.fromCharCode(255 & r >> (-2 * n & 6)) : 0)
            o = c.indexOf(o);
        return i;
    };
}
var core;
(function (core) {
    /**版本号*/
    core.version = 0;
    /**host*/
    core.host = "http://qa1.api.api_universe_swoole.nqsf9emow.com:27799";
    /**用户ID*/
    core.user_id = 0;
    /**应用平台:1-wap|2-app|4-web*/
    core.app_type = 1;
    /**设备类型 1:ios 2安卓 3其它 */
    core.device_type = 3;
    /**平台ID*/
    core.plat_id = "10001";
    /**渠道ID*/
    core.channel_id = "10001001";
    /**用来获取配置文件的cdn地址 */
    core.cdnUrl = "http://others.sftpuser.nqsf9emow.com:27799";
    /**语言 */
    core.lang = "zh";
})(core || (core = {}));
var net;
(function (net) {
    class Http {
        static request(data, url, callback) {
            puremvc.Facade.getInstance().sendNotification(net.EventType.REQUEST_START, { url, data });
            data.device_type = core.device_type;
            data.app_type = core.app_type;
            data.device = core.device;
            data.plat_id = core.plat_id;
            data.channel_id = core.channel_id;
            // switch(core.lang){
            //     case "vi":
            //         data.lang = "vi_VN";
            //         break;
            //     default:
            //         data.lang = "zh_CN";
            // }
            data.lang = core.lang;
            if (core.user_id) {
                data.user_id = core.user_id;
                data.token = core.token;
            }
            console.group("http send >>> " + url);
            console.log(data);
            console.groupEnd();
            return new Promise((resolve, reject) => {
                const formData = core.getFormWithObject(data);
                const ajax = new XMLHttpRequest();
                ajax.open("POST", core.host + "/" + url);
                ajax.send(formData);
                ajax.onreadystatechange = function (e) {
                    const facde = puremvc.Facade.getInstance();
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            try {
                                const result = JSON.parse(this.response);
                                if (callback)
                                    callback(result);
                                console.group("http response >>> " + url);
                                console.log(JSON.parse(this.response));
                                console.groupEnd();
                                if (result.status == 0) {
                                    resolve(result);
                                }
                                else {
                                    facde.sendNotification(core.EventType.REQUEST_ERROR, { url, data, result });
                                }
                            }
                            catch (e) {
                                facde.sendNotification(core.EventType.REQUEST_ERROR, { url, data, e });
                            }
                        }
                        else {
                            facde.sendNotification(core.EventType.IO_ERROR, { url, data, e });
                        }
                        facde.sendNotification(core.EventType.REQUEST_END, { url, result: this.response });
                    }
                };
            });
        }
        static get(url, data) {
            return new Promise((resolve, reject) => {
                const ajax = new XMLHttpRequest();
                ajax.open("GET", url);
                ajax.send(data);
                ajax.onreadystatechange = function (e) {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            resolve(this.response);
                        }
                        else {
                            reject();
                        }
                    }
                };
            });
        }
        static post(url, data) {
            return new Promise((resolve, reject) => {
                const ajax = new XMLHttpRequest();
                ajax.open("POST", url);
                ajax.send(data);
                ajax.onreadystatechange = function (e) {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            resolve(this.response);
                        }
                        else {
                            reject();
                        }
                    }
                };
            });
        }
    }
    net.Http = Http;
    /**为URL附加参数 */
    function getUrl(source, obj) {
        if (obj) {
            for (const key of Object.keys(obj)) {
                source = source.replace(`{${key}}`, obj[key]);
            }
        }
        return source;
    }
    net.getUrl = getUrl;
})(net || (net = {}));
/**
 *
 * 跑马灯数据结构
 * @export
 * @class AnnounceModel
 */
var core;
(function (core) {
    /**
     * 厂商
     */
    class VendorSimpleVO {
    }
    core.VendorSimpleVO = VendorSimpleVO;
})(core || (core = {}));
