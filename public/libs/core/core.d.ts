declare module ui {
    function bind(view: any, mediatorClass: any): void;
}
declare module core {
    /**初始化*/
    function init(): void;
}
/**
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=66514
 */
declare module net {
    /**协议*/
    var HttpType: {
        /**--新加的--获取语言列表*/
        api_plat_var_language_config: string;
        /**--新加的--获取验证码图片*/
        api_public_auth_code: string;
        /**--新加的--发送邮件*/
        api_public_email_send: string;
        /**--新加的--发送短信*/
        api_public_sms_send: string;
        /**--新加的--获取手机区号*/
        api_public_area_code: string;
        /**--新加的--获取所有游戏的查询配置*/
        api_plat_var_game_all_config: string;
        /**--新加的--所有游戏的查询*/
        api_plat_var_game_all_index: string;
        /**--钱包--获取转入账号信息*/
        api_plat_var_block_transfer_in_order_account: string;
        /**--钱包--代币转入订单提交*/
        api_user_var_block_transfer_in_order_store: string;
        /**--钱包--代币转入订单列表*/
        api_user_var_block_transfer_in_order_index: string;
        /**--钱包--代币转出订单提交*/
        api_user_var_block_transfer_out_order_store: string;
        /**--钱包--代币转出订单列表*/
        api_user_var_block_transfer_out_order_index: string;
        /**--账号--注册*/
        api_user_register: string;
        /**--账号--登入*/
        api_user_login: string;
        /**--账号--登出*/
        api_user_logout: string;
        /**--账号--修改密码*/
        api_user_change_password_var: string;
        /**--账号--重置密码*/
        api_user_reset_password: string;
        /**--账号--现金密码*/
        api_user_change_password_gold_var: string;
        /**--会员资料--获取用户基本信息*/
        api_user_show_var: string;
        /**--会员资料--修改用户基本信息*/
        api_user_update_var: string;
        /**--会员资料--用户绑定手机*/
        api_user_bind_mobile_var: string;
        /**--会员资料--用户绑定邮箱*/
        api_user_bind_email_var: string;
        /**--会员资料--提取用户所有厂商的余额*/
        api_user_var_vendor_withdraw: string;
        /**--会员资料--用户保险箱存取款*/
        api_user_update_var_safe_gold: string;
        /**--会员资料--金币划转*/
        api_user_var_gold_transfer: string;
        /**--会员资料--投注记录*/
        api_user_show_var_bet: string;
        /**--会员资料--渠道统计*/
        api_user_show_var_channel_statistic: string;
        /**--会员资料--获取用户账户明细*/
        api_user_show_var_gold: string;
        /**--会员资料--钱包地址修改*/
        api_user_change_bsc_address_var: string;
        /**--大厅--获取游戏类型,游戏菜单（大厅菜单）*/
        api_plat_var_lobby_index: string;
        /**--大厅--获取厂商列表*/
        api_vendor_simple: string;
        /**--大厅--获取厂商配置游戏菜单（大厅厂商二级游戏菜单）*/
        api_vendor_var_lobby_simple: string;
        /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证*/
        api_vendor_var_ori_product_show_var: string;
        /**--搜索--我的游戏*/
        api_user_var_game_index: string;
        /**--搜索--收藏游戏*/
        api_user_var_game_update_var: string;
        /**--搜索--搜索游戏*/
        api_user_var_game_search: string;
        /**--返水--获取用户返水记录*/
        api_user_var_backwater: string;
        /**--返水--获取用户返水详情*/
        api_user_var_backwater_var: string;
        /**--返水--返水试算接口*/
        api_user_var_backwater_trial: string;
        /**--返水--返水试算领取接口*/
        api_user_var_backwater_trial_receive: string;
        /**--邮件--获取用户邮件列表*/
        api_user_var_mail: string;
        /**--邮件--获取用户邮件详细信息*/
        api_user_var_mail_var: string;
        /**--邮件--领取邮件对应的奖励*/
        api_user_var_mail_var_receive: string;
        /**--邮件--一键领取所有邮件对应的奖励*/
        api_user_var_receiveQuick: string;
        /**--邮件--批量删除邮件*/
        api_user_var_destroy_batch: string;
        /**--邮件--一键删除邮件*/
        api_user_var_destroy_quick: string;
        /**--活动--获取活动列表数据*/
        api_plat_activity: string;
        /**--活动--plat_activity_detail*/
        api_plat_activity_var: string;
        /**--活动--领取活动奖励*/
        api_plat_activity_var_receive: string;
        /**--活动--每日任务*/
        api_plat_activity_index_everyday: string;
        /**--活动--获取用户签到信息*/
        api_plat_sign_index: string;
        /**--活动--每日签到*/
        api_user_var_sign_store: string;
        /**--活动--领取用户签到奖励*/
        api_user_var_sign_receive: string;
        /**--活动--绑定赠金*/
        api_plat_activity_show_binding: string;
        /**--公告--平台公告*/
        api_plat_var_notice_index: string;
        /**--公告--平台公告数据详细数据*/
        api_plat_var_notice_show_var: string;
        /**--代理推广--我的返佣比*/
        api_user_var_commission_commissionnum: string;
        /**--代理推广--直属成员*/
        api_user_var_agent_direct_list: string;
        /**--代理推广--按日期获取佣金详情*/
        api_user_var_commission_commissiondetail: string;
        /**--代理推广--业绩查询*/
        api_user_var_commission_commissionlist: string;
        /**--代理推广--按日期查询直属代理流水详情*/
        api_user_var_commission_directswater: string;
        /**--代理推广--领取佣金*/
        api_user_var_commission_receive: string;
        /**--代理推广--直属保底范围查询*/
        api_user_var_agent_var_floor_range: string;
        /**--代理推广--设置直属保底*/
        api_user_var_agent_var_update: string;
        /**--代理推广--获取用户推广统计信息*/
        api_user_var_agent_var_statistic_promotion: string;
        /**--代理推广--获取代理用户列表*/
        api_user_var_agent_var_direct_list: string;
        /**--代理推广--获取推广链接*/
        api_user_var_short_chain: string;
        /**--代理推广--获取总代分红列表*/
        api_user_var_agent_bonus: string;
        /**--代理推广--领取分红*/
        api_user_var_receive_agent_bonus_var: string;
        /**--代理推广--整盘分红等级表*/
        api_user_var_bonus_all_config: string;
        /**--代理推广--整盘分红统计*/
        api_user_var_bonus_all_statistic: string;
        /**--代理推广--领取整盘分红*/
        api_user_var_bonus_all_receive_var: string;
        /**--代理推广--获取下级整盘分红列表*/
        api_user_var_bonus_all_direct: string;
        /**--代理推广--获取整盘分红历史记录*/
        api_user_var_bonus_all_history: string;
        /**--分红--用户质押*/
        api_user_var_deposit_stake: string;
        /**--分红--用户手动解质押*/
        api_user_var_withdraw_stake: string;
        /**--分红--平台币分红信息*/
        api_plat_var_stake_info: string;
        /**--分红--用户币分红信息*/
        api_user_var_stake_info: string;
        /**--分红--平台近5日分红金额列表*/
        api_plat_var_bonus_recently: string;
        /**--分红--昨日分红排行榜*/
        api_plat_var_bonus_rank: string;
        /**--分红--领取分红*/
        api_user_var_stake_draw: string;
        /**--分红--用户质押记录*/
        api_user_var_stake_log: string;
        /**--分红--分红记录-全站记录*/
        api_plat_var_bonus_log: string;
        /**--分红--分红记录-个人纪录*/
        api_user_var_bonus_log: string;
        /**--兑换--兑换方式列表*/
        api_user_var_exchange_method_list: string;
        /**--兑换--用户兑换订单*/
        api_user_var_exchange_order_list: string;
        /**--兑换--创建兑换订单*/
        api_user_var_exchange_create_order: string;
        /**--兑换--流水审核*/
        api_user_var_gold_water_index: string;
        /**--收款管理--收款方式列表*/
        api_user_var_payment_method_index: string;
        /**--收款管理--添加收款方式*/
        api_user_var_payment_method_store: string;
        /**--收款管理--银行列表*/
        api_user_var_payment_method_bank_list: string;
        /**--收款管理--更新银行卡/支付宝*/
        api_user_var_payment_method_update_var: string;
        /**--短信--发送短信 [验证码和获取注册验证码调用同一方法即可]*/
        api_sms_send: string;
        /**--短信--重置密码发送短信*/
        api_sms_reset_password_sent: string;
        /**--短信--收款方式发送短信*/
        api_sms_exchange: string;
        /**--短信--金币划转发送短信*/
        api_sms_transfer: string;
        /**--商城--获取商城支付列表*/
        api_user_var_recharge_method_list: string;
        /**--商城--创建订单*/
        api_user_var_recharge_create: string;
        /**--商城--币商充值订单确认转账*/
        api_user_var_coin_recharge_confirm: string;
        /**--商城--充值记录*/
        api_user_var_recharge_list: string;
        /**--商城--获取数字货币充值地址*/
        api_user_var_recharge_address: string;
        /**--介绍页--奖励币介绍*/
        api_plat_var_reward_coin_info: string;
        /**--其它--配置数据 枚举*/
        api_plat_var_game_config: string;
        /**--其它--常见问题*/
        api_plat_fag_index: string;
        /**--其它--跑马灯*/
        api_plat_var_marquee_index: string;
        /**--其它--获取未读取的消息列表*/
        api_user_var_messages_index: string;
        /**--其它--获取消息详情*/
        api_user_var_messages_show_var: string;
        /**--其它--用户心跳*/
        api_user_var_beat: string;
        /**--其它--获取红点提示信息*/
        api_user_var_red_dot_tips: string;
        /**--其它--近期投注*/
        api_plat_var_recently_bet_info: string;
        /**--Swap--Swap基础信息*/
        api_plat_var_swap_setting_info: string;
        /**--Swap--Swap价格图*/
        api_plat_var_swap_k: string;
        /**--Swap--Swap试算*/
        api_plat_var_swap_trial: string;
        /**--Swap--Swap兑换订单*/
        api_user_var_swap_order_list: string;
        /**--Swap--Swap创建订单*/
        api_user_var_swap_create_order: string;
    };
    /**事件*/
    var EventType: {
        /**--请求开始*/
        REQUEST_START: string;
        /**--请求结束 */
        REQUEST_END: string;
        /**请求错误 */
        REQUEST_ERROR: string;
        /**IO错误 */
        IO_ERROR: string;
        /**--新加的--获取语言列表*/
        api_plat_var_language_config: string;
        /**--新加的--获取验证码图片*/
        api_public_auth_code: string;
        /**--新加的--发送邮件*/
        api_public_email_send: string;
        /**--新加的--发送短信*/
        api_public_sms_send: string;
        /**--新加的--获取手机区号*/
        api_public_area_code: string;
        /**--新加的--获取所有游戏的查询配置*/
        api_plat_var_game_all_config: string;
        /**--新加的--所有游戏的查询*/
        api_plat_var_game_all_index: string;
        /**--钱包--获取转入账号信息*/
        api_plat_var_block_transfer_in_order_account: string;
        /**--钱包--代币转入订单提交*/
        api_user_var_block_transfer_in_order_store: string;
        /**--钱包--代币转入订单列表*/
        api_user_var_block_transfer_in_order_index: string;
        /**--钱包--代币转出订单提交*/
        api_user_var_block_transfer_out_order_store: string;
        /**--钱包--代币转出订单列表*/
        api_user_var_block_transfer_out_order_index: string;
        /**--账号--注册*/
        api_user_register: string;
        /**--账号--登入*/
        api_user_login: string;
        /**--账号--登出*/
        api_user_logout: string;
        /**--账号--修改密码*/
        api_user_change_password_var: string;
        /**--账号--重置密码*/
        api_user_reset_password: string;
        /**--账号--现金密码*/
        api_user_change_password_gold_var: string;
        /**--会员资料--获取用户基本信息*/
        api_user_show_var: string;
        /**--会员资料--修改用户基本信息*/
        api_user_update_var: string;
        /**--会员资料--用户绑定手机*/
        api_user_bind_mobile_var: string;
        /**--会员资料--用户绑定邮箱*/
        api_user_bind_email_var: string;
        /**--会员资料--提取用户所有厂商的余额*/
        api_user_var_vendor_withdraw: string;
        /**--会员资料--用户保险箱存取款*/
        api_user_update_var_safe_gold: string;
        /**--会员资料--金币划转*/
        api_user_var_gold_transfer: string;
        /**--会员资料--投注记录*/
        api_user_show_var_bet: string;
        /**--会员资料--渠道统计*/
        api_user_show_var_channel_statistic: string;
        /**--会员资料--获取用户账户明细*/
        api_user_show_var_gold: string;
        /**--会员资料--钱包地址修改*/
        api_user_change_bsc_address_var: string;
        /**--大厅--获取游戏类型,游戏菜单（大厅菜单）*/
        api_plat_var_lobby_index: string;
        /**--大厅--获取厂商列表*/
        api_vendor_simple: string;
        /**--大厅--获取厂商配置游戏菜单（大厅厂商二级游戏菜单）*/
        api_vendor_var_lobby_simple: string;
        /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证*/
        api_vendor_var_ori_product_show_var: string;
        /**--搜索--我的游戏*/
        api_user_var_game_index: string;
        /**--搜索--收藏游戏*/
        api_user_var_game_update_var: string;
        /**--搜索--搜索游戏*/
        api_user_var_game_search: string;
        /**--返水--获取用户返水记录*/
        api_user_var_backwater: string;
        /**--返水--获取用户返水详情*/
        api_user_var_backwater_var: string;
        /**--返水--返水试算接口*/
        api_user_var_backwater_trial: string;
        /**--返水--返水试算领取接口*/
        api_user_var_backwater_trial_receive: string;
        /**--邮件--获取用户邮件列表*/
        api_user_var_mail: string;
        /**--邮件--获取用户邮件详细信息*/
        api_user_var_mail_var: string;
        /**--邮件--领取邮件对应的奖励*/
        api_user_var_mail_var_receive: string;
        /**--邮件--一键领取所有邮件对应的奖励*/
        api_user_var_receiveQuick: string;
        /**--邮件--批量删除邮件*/
        api_user_var_destroy_batch: string;
        /**--邮件--一键删除邮件*/
        api_user_var_destroy_quick: string;
        /**--活动--获取活动列表数据*/
        api_plat_activity: string;
        /**--活动--plat_activity_detail*/
        api_plat_activity_var: string;
        /**--活动--领取活动奖励*/
        api_plat_activity_var_receive: string;
        /**--活动--每日任务*/
        api_plat_activity_index_everyday: string;
        /**--活动--获取用户签到信息*/
        api_plat_sign_index: string;
        /**--活动--每日签到*/
        api_user_var_sign_store: string;
        /**--活动--领取用户签到奖励*/
        api_user_var_sign_receive: string;
        /**--活动--绑定赠金*/
        api_plat_activity_show_binding: string;
        /**--公告--平台公告*/
        api_plat_var_notice_index: string;
        /**--公告--平台公告数据详细数据*/
        api_plat_var_notice_show_var: string;
        /**--代理推广--我的返佣比*/
        api_user_var_commission_commissionnum: string;
        /**--代理推广--直属成员*/
        api_user_var_agent_direct_list: string;
        /**--代理推广--按日期获取佣金详情*/
        api_user_var_commission_commissiondetail: string;
        /**--代理推广--业绩查询*/
        api_user_var_commission_commissionlist: string;
        /**--代理推广--按日期查询直属代理流水详情*/
        api_user_var_commission_directswater: string;
        /**--代理推广--领取佣金*/
        api_user_var_commission_receive: string;
        /**--代理推广--直属保底范围查询*/
        api_user_var_agent_var_floor_range: string;
        /**--代理推广--设置直属保底*/
        api_user_var_agent_var_update: string;
        /**--代理推广--获取用户推广统计信息*/
        api_user_var_agent_var_statistic_promotion: string;
        /**--代理推广--获取代理用户列表*/
        api_user_var_agent_var_direct_list: string;
        /**--代理推广--获取推广链接*/
        api_user_var_short_chain: string;
        /**--代理推广--获取总代分红列表*/
        api_user_var_agent_bonus: string;
        /**--代理推广--领取分红*/
        api_user_var_receive_agent_bonus_var: string;
        /**--代理推广--整盘分红等级表*/
        api_user_var_bonus_all_config: string;
        /**--代理推广--整盘分红统计*/
        api_user_var_bonus_all_statistic: string;
        /**--代理推广--领取整盘分红*/
        api_user_var_bonus_all_receive_var: string;
        /**--代理推广--获取下级整盘分红列表*/
        api_user_var_bonus_all_direct: string;
        /**--代理推广--获取整盘分红历史记录*/
        api_user_var_bonus_all_history: string;
        /**--分红--用户质押*/
        api_user_var_deposit_stake: string;
        /**--分红--用户手动解质押*/
        api_user_var_withdraw_stake: string;
        /**--分红--平台币分红信息*/
        api_plat_var_stake_info: string;
        /**--分红--用户币分红信息*/
        api_user_var_stake_info: string;
        /**--分红--平台近5日分红金额列表*/
        api_plat_var_bonus_recently: string;
        /**--分红--昨日分红排行榜*/
        api_plat_var_bonus_rank: string;
        /**--分红--领取分红*/
        api_user_var_stake_draw: string;
        /**--分红--用户质押记录*/
        api_user_var_stake_log: string;
        /**--分红--分红记录-全站记录*/
        api_plat_var_bonus_log: string;
        /**--分红--分红记录-个人纪录*/
        api_user_var_bonus_log: string;
        /**--兑换--兑换方式列表*/
        api_user_var_exchange_method_list: string;
        /**--兑换--用户兑换订单*/
        api_user_var_exchange_order_list: string;
        /**--兑换--创建兑换订单*/
        api_user_var_exchange_create_order: string;
        /**--兑换--流水审核*/
        api_user_var_gold_water_index: string;
        /**--收款管理--收款方式列表*/
        api_user_var_payment_method_index: string;
        /**--收款管理--添加收款方式*/
        api_user_var_payment_method_store: string;
        /**--收款管理--银行列表*/
        api_user_var_payment_method_bank_list: string;
        /**--收款管理--更新银行卡/支付宝*/
        api_user_var_payment_method_update_var: string;
        /**--短信--发送短信 [验证码和获取注册验证码调用同一方法即可]*/
        api_sms_send: string;
        /**--短信--重置密码发送短信*/
        api_sms_reset_password_sent: string;
        /**--短信--收款方式发送短信*/
        api_sms_exchange: string;
        /**--短信--金币划转发送短信*/
        api_sms_transfer: string;
        /**--商城--获取商城支付列表*/
        api_user_var_recharge_method_list: string;
        /**--商城--创建订单*/
        api_user_var_recharge_create: string;
        /**--商城--币商充值订单确认转账*/
        api_user_var_coin_recharge_confirm: string;
        /**--商城--充值记录*/
        api_user_var_recharge_list: string;
        /**--商城--获取数字货币充值地址*/
        api_user_var_recharge_address: string;
        /**--介绍页--奖励币介绍*/
        api_plat_var_reward_coin_info: string;
        /**--其它--配置数据 枚举*/
        api_plat_var_game_config: string;
        /**--其它--常见问题*/
        api_plat_fag_index: string;
        /**--其它--跑马灯*/
        api_plat_var_marquee_index: string;
        /**--其它--获取未读取的消息列表*/
        api_user_var_messages_index: string;
        /**--其它--获取消息详情*/
        api_user_var_messages_show_var: string;
        /**--其它--用户心跳*/
        api_user_var_beat: string;
        /**--其它--获取红点提示信息*/
        api_user_var_red_dot_tips: string;
        /**--其它--近期投注*/
        api_plat_var_recently_bet_info: string;
        /**--Swap--Swap基础信息*/
        api_plat_var_swap_setting_info: string;
        /**--Swap--Swap价格图*/
        api_plat_var_swap_k: string;
        /**--Swap--Swap试算*/
        api_plat_var_swap_trial: string;
        /**--Swap--Swap兑换订单*/
        api_user_var_swap_order_list: string;
        /**--Swap--Swap创建订单*/
        api_user_var_swap_create_order: string;
    };
    /**注册协议*/
    function initCommand(): void;
}
/**
 * 获取活动列表数据
 */
declare module net {
    class cmd_api_plat_activity extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 每日任务
 */
declare module net {
    class cmd_api_plat_activity_index_everyday extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 绑定赠金
 */
declare module net {
    class cmd_api_plat_activity_show_binding extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * plat_activity_detail
 */
declare module net {
    class cmd_api_plat_activity_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 领取活动奖励
 */
declare module net {
    class cmd_api_plat_activity_var_receive extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 常见问题
 */
declare module net {
    class cmd_api_plat_fag_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取用户签到信息
 */
declare module net {
    class cmd_api_plat_sign_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取转入账号信息
 */
declare module net {
    class cmd_api_plat_var_block_transfer_in_order_account extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 分红记录-全站记录
 */
declare module net {
    class cmd_api_plat_var_bonus_log extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 昨日分红排行榜
 */
declare module net {
    class cmd_api_plat_var_bonus_rank extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 平台近5日分红金额列表
 */
declare module net {
    class cmd_api_plat_var_bonus_recently extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取所有游戏的查询配置
 */
declare module net {
    class cmd_api_plat_var_game_all_config extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 所有游戏的查询
 */
declare module net {
    class cmd_api_plat_var_game_all_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 配置数据 枚举
 */
declare module net {
    class cmd_api_plat_var_game_config extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取语言列表
 */
declare module net {
    class cmd_api_plat_var_language_config extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取游戏类型,游戏菜单（大厅菜单）
 */
declare module net {
    class cmd_api_plat_var_lobby_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 跑马灯
 */
declare module net {
    class cmd_api_plat_var_marquee_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 平台公告
 */
declare module net {
    class cmd_api_plat_var_notice_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 平台公告数据详细数据
 */
declare module net {
    class cmd_api_plat_var_notice_show_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 近期投注
 */
declare module net {
    class cmd_api_plat_var_recently_bet_info extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 奖励币介绍
 */
declare module net {
    class cmd_api_plat_var_reward_coin_info extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 平台币分红信息
 */
declare module net {
    class cmd_api_plat_var_stake_info extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * Swap价格图
 */
declare module net {
    class cmd_api_plat_var_swap_k extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * Swap基础信息
 */
declare module net {
    class cmd_api_plat_var_swap_setting_info extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * Swap试算
 */
declare module net {
    class cmd_api_plat_var_swap_trial extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取手机区号
 */
declare module net {
    class cmd_api_public_area_code extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取验证码图片
 */
declare module net {
    class cmd_api_public_auth_code extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 发送邮件
 */
declare module net {
    class cmd_api_public_email_send extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 发送短信
 */
declare module net {
    class cmd_api_public_sms_send extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 收款方式发送短信
 */
declare module net {
    class cmd_api_sms_exchange extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 重置密码发送短信
 */
declare module net {
    class cmd_api_sms_reset_password_sent extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 发送短信 [验证码和获取注册验证码调用同一方法即可]
 */
declare module net {
    class cmd_api_sms_send extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 金币划转发送短信
 */
declare module net {
    class cmd_api_sms_transfer extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 用户绑定邮箱
 */
declare module net {
    class cmd_api_user_bind_email_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 用户绑定手机
 */
declare module net {
    class cmd_api_user_bind_mobile_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 钱包地址修改
 */
declare module net {
    class cmd_api_user_change_bsc_address_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 现金密码
 */
declare module net {
    class cmd_api_user_change_password_gold_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 修改密码
 */
declare module net {
    class cmd_api_user_change_password_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 登入
 */
declare module net {
    class cmd_api_user_login extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 登出
 */
declare module net {
    class cmd_api_user_logout extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 注册
 */
declare module net {
    class cmd_api_user_register extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 重置密码
 */
declare module net {
    class cmd_api_user_reset_password extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取用户基本信息
 */
declare module net {
    class cmd_api_user_show_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 投注记录
 */
declare module net {
    class cmd_api_user_show_var_bet extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 渠道统计
 */
declare module net {
    class cmd_api_user_show_var_channel_statistic extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取用户账户明细
 */
declare module net {
    class cmd_api_user_show_var_gold extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 修改用户基本信息
 */
declare module net {
    class cmd_api_user_update_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 用户保险箱存取款
 */
declare module net {
    class cmd_api_user_update_var_safe_gold extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取总代分红列表
 */
declare module net {
    class cmd_api_user_var_agent_bonus extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 直属成员
 */
declare module net {
    class cmd_api_user_var_agent_direct_list extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取代理用户列表
 */
declare module net {
    class cmd_api_user_var_agent_var_direct_list extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 直属保底范围查询
 */
declare module net {
    class cmd_api_user_var_agent_var_floor_range extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取用户推广统计信息
 */
declare module net {
    class cmd_api_user_var_agent_var_statistic_promotion extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 设置直属保底
 */
declare module net {
    class cmd_api_user_var_agent_var_update extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取用户返水记录
 */
declare module net {
    class cmd_api_user_var_backwater extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 返水试算接口
 */
declare module net {
    class cmd_api_user_var_backwater_trial extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 返水试算领取接口
 */
declare module net {
    class cmd_api_user_var_backwater_trial_receive extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取用户返水详情
 */
declare module net {
    class cmd_api_user_var_backwater_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 用户心跳
 */
declare module net {
    class cmd_api_user_var_beat extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 代币转入订单列表
 */
declare module net {
    class cmd_api_user_var_block_transfer_in_order_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 代币转入订单提交
 */
declare module net {
    class cmd_api_user_var_block_transfer_in_order_store extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 代币转出订单列表
 */
declare module net {
    class cmd_api_user_var_block_transfer_out_order_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 代币转出订单提交
 */
declare module net {
    class cmd_api_user_var_block_transfer_out_order_store extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 整盘分红等级表
 */
declare module net {
    class cmd_api_user_var_bonus_all_config extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取下级整盘分红列表
 */
declare module net {
    class cmd_api_user_var_bonus_all_direct extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取整盘分红历史记录
 */
declare module net {
    class cmd_api_user_var_bonus_all_history extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 领取整盘分红
 */
declare module net {
    class cmd_api_user_var_bonus_all_receive_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 整盘分红统计
 */
declare module net {
    class cmd_api_user_var_bonus_all_statistic extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 分红记录-个人纪录
 */
declare module net {
    class cmd_api_user_var_bonus_log extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 币商充值订单确认转账
 */
declare module net {
    class cmd_api_user_var_coin_recharge_confirm extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 按日期获取佣金详情
 */
declare module net {
    class cmd_api_user_var_commission_commissiondetail extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 业绩查询
 */
declare module net {
    class cmd_api_user_var_commission_commissionlist extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 我的返佣比
 */
declare module net {
    class cmd_api_user_var_commission_commissionnum extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 按日期查询直属代理流水详情
 */
declare module net {
    class cmd_api_user_var_commission_directswater extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 领取佣金
 */
declare module net {
    class cmd_api_user_var_commission_receive extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 用户质押
 */
declare module net {
    class cmd_api_user_var_deposit_stake extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 批量删除邮件
 */
declare module net {
    class cmd_api_user_var_destroy_batch extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 一键删除邮件
 */
declare module net {
    class cmd_api_user_var_destroy_quick extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 创建兑换订单
 */
declare module net {
    class cmd_api_user_var_exchange_create_order extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 兑换方式列表
 */
declare module net {
    class cmd_api_user_var_exchange_method_list extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 用户兑换订单
 */
declare module net {
    class cmd_api_user_var_exchange_order_list extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 我的游戏
 */
declare module net {
    class cmd_api_user_var_game_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 搜索游戏
 */
declare module net {
    class cmd_api_user_var_game_search extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 收藏游戏
 */
declare module net {
    class cmd_api_user_var_game_update_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 金币划转
 */
declare module net {
    class cmd_api_user_var_gold_transfer extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 流水审核
 */
declare module net {
    class cmd_api_user_var_gold_water_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取用户邮件列表
 */
declare module net {
    class cmd_api_user_var_mail extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取用户邮件详细信息
 */
declare module net {
    class cmd_api_user_var_mail_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 领取邮件对应的奖励
 */
declare module net {
    class cmd_api_user_var_mail_var_receive extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取未读取的消息列表
 */
declare module net {
    class cmd_api_user_var_messages_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取消息详情
 */
declare module net {
    class cmd_api_user_var_messages_show_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 银行列表
 */
declare module net {
    class cmd_api_user_var_payment_method_bank_list extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 收款方式列表
 */
declare module net {
    class cmd_api_user_var_payment_method_index extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 添加收款方式
 */
declare module net {
    class cmd_api_user_var_payment_method_store extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 更新银行卡/支付宝
 */
declare module net {
    class cmd_api_user_var_payment_method_update_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 一键领取所有邮件对应的奖励
 */
declare module net {
    class cmd_api_user_var_receiveQuick extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 领取分红
 */
declare module net {
    class cmd_api_user_var_receive_agent_bonus_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取数字货币充值地址
 */
declare module net {
    class cmd_api_user_var_recharge_address extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 创建订单
 */
declare module net {
    class cmd_api_user_var_recharge_create extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 充值记录
 */
declare module net {
    class cmd_api_user_var_recharge_list extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取商城支付列表
 */
declare module net {
    class cmd_api_user_var_recharge_method_list extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取红点提示信息
 */
declare module net {
    class cmd_api_user_var_red_dot_tips extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取推广链接
 */
declare module net {
    class cmd_api_user_var_short_chain extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 领取用户签到奖励
 */
declare module net {
    class cmd_api_user_var_sign_receive extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 每日签到
 */
declare module net {
    class cmd_api_user_var_sign_store extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 领取分红
 */
declare module net {
    class cmd_api_user_var_stake_draw extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 用户币分红信息
 */
declare module net {
    class cmd_api_user_var_stake_info extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 用户质押记录
 */
declare module net {
    class cmd_api_user_var_stake_log extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * Swap创建订单
 */
declare module net {
    class cmd_api_user_var_swap_create_order extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * Swap兑换订单
 */
declare module net {
    class cmd_api_user_var_swap_order_list extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 提取用户所有厂商的余额
 */
declare module net {
    class cmd_api_user_var_vendor_withdraw extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 用户手动解质押
 */
declare module net {
    class cmd_api_user_var_withdraw_stake extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取厂商列表
 */
declare module net {
    class cmd_api_vendor_simple extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取厂商配置游戏菜单（大厅厂商二级游戏菜单）
 */
declare module net {
    class cmd_api_vendor_var_lobby_simple extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
/**
 * 获取进入厂商的游戏URL，获取厂商游戏凭证
 */
declare module net {
    class cmd_api_vendor_var_ori_product_show_var extends puremvc.SimpleCommand {
        execute(notification: puremvc.INotification): void;
        private response;
    }
}
declare module core {
    enum EnumAppType {
        WAP = 1,
        APP = 2,
        WEB = 4
    }
}
declare module core {
    enum EnumDeviceType {
        IOS = 1,
        ANDROID = 2,
        OTHER = 3
    }
}
declare module core {
    var EventType: {
        /**网络请求开始*/
        REQUEST_START: string;
        /**网络请求结束*/
        REQUEST_END: string;
        /**服务器返回错误*/
        REQUEST_ERROR: string;
        /**网络错误*/
        IO_ERROR: string;
    };
}
/**
 * 全局属性和方法
 */
declare module core {
    /**
     * 格式化日期
     * @param d
     * @param fmt
     */
    function dateFormat(d: any, fmt: any): string;
    /**
     * 转换成货币格式
     */
    function moneyFormat(s: any, symbol?: string): string;
    /**
     * 获取UUID
     */
    function generateUUID(): string;
    /**
     * 获取字符串和真实长度。全角字符长度为2
     */
    function getStringLength(str: string): number;
    /**
     * 显示长字段时，在后面加上...
     */
    function getLimitString(str: string, len: number): string;
    /**
     * 获取URL参数
     * @param value
     */
    function getQueryVariable(value: string): string | null;
    /**
     * 将对象转换为Http请求的form表单数据
     * @param obj
     */
    function getFormWithObject(obj: any): FormData;
    /**
     * 验证用户名是否合法
     * @param value
     */
    function checkUserName(value: string): boolean;
    /**
     * 验证密码是否合法
     * @param value
     */
    function checkUserPassword(value: string): boolean;
    /**
     * 验证手机号是否合法
     * @param value
     */
    function checkPhone(value: string): boolean;
    /**
     * 验证邮箱是否合法
     * @param value
     */
    function checkMail(value: string): boolean;
    /**
     * 检测QQ是否合法
     * @param value
     */
    function checkQQ(value: string): boolean;
    /**
     *
     * @param value 检测用户名是否合法
     * @returns
     */
    function checkNickName(value: string): boolean;
    /**
     * 是否为移动设备
     */
    function isMobile(): RegExpMatchArray;
    /**是否android */
    function isAndroid(): RegExpMatchArray;
    /**是否IOS */
    function isIOS(): RegExpMatchArray;
    /**
     * 有时候图片地址没有协议头，给它加上
     */
    function formatImageUrl(url: string): string;
    /**
     * 获取今日零点时间
     * @offset 偏移天数
     * @offsetSecond 偏移秒
     */
    function getTodayOffset(offset?: number, offsetSecond?: number): Date;
    /**
     * 去掉空属性/空符串，并返回一个新对象
     */
    function objectRemoveNull(obj: any, except?: string[]): any;
}
declare module core.GlobalTimer {
    /**
     * 初始化
     * @param baseDelay
     */
    function init(baseDelay: any): void;
    /**
     * 注册一个计时器
     * @param listener
     * @param thisObj
     * @param repeated
     * @param delay
     * @param params
     */
    function registerInterval(listener: any, thisObj: any, repeated?: number, delay?: number, params?: any[]): void;
    /**
     * 注册一个定时器
     * @param listener
     * @param thisObj
     * @param delay
     * @param params
     */
    function registerSetTimeOut(listener: any, thisObj: any, delay?: number, params?: any[]): void;
    /**
     * 移除定时器或者计时器
     * @param listener
     * @param thisObj
     */
    function unregister(listener: any, thisObj: any): void;
    /**
     * 等待
     * @param delay
     */
    function wait(delay: number): Promise<any>;
}
interface TimerWorkVO {
    thisObj: any;
    listener: any;
    repeated: number;
    delay: number;
    delayCount: number;
    params?: Array<any>;
}
declare module core {
    class MD5 {
        static createInstance(): MD5;
        constructor();
        private hexcase;
        private b64pad;
        hex_md5(s: string): string;
        b64_md5(s: string): string;
        any_md5(s: string, e: string): string;
        hex_hmac_md5(k: string, d: string): string;
        private b64_hmac_md5;
        private any_hmac_md5;
        md5_vm_test(): boolean;
        rstr_md5(s: string): string;
        rstr_hmac_md5(key: string, data: string): string;
        rstr2hex(input: string): string;
        rstr2b64(input: string): string;
        rstr2any(input: string, encoding: string): string;
        str2rstr_utf8(input: string): string;
        str2rstr_utf16le(input: string): string;
        str2rstr_utf16be(input: string): string;
        rstr2binl(input: string): any[];
        binl2rstr(input: number[]): string;
        binl_md5(x: number[], len: number): number[];
        md5_cmn(q: any, a: any, b: any, x: any, s: any, t: any): number;
        md5_ff(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
        md5_gg(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
        md5_hh(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
        md5_ii(a: any, b: any, c: any, d: any, x: any, s: any, t: any): number;
        safe_add(x: any, y: any): number;
        bit_rol(num: any, cnt: any): number;
    }
}
declare module core {
    /**版本号*/
    var version: number;
    /**host*/
    var host: string;
    /**用户ID*/
    var user_id: number;
    /**用户认证token*/
    var token: string;
    /**应用平台:1-wap|2-app|4-web*/
    var app_type: number;
    /**设备类型 1:ios 2安卓 3其它 */
    var device_type: number;
    /**设备号*/
    var device: string;
    /**平台ID*/
    var plat_id: string;
    /**渠道ID*/
    var channel_id: string;
    /**推荐号*/
    var invite_user_id: any;
    /**用来获取配置文件的cdn地址 */
    var cdnUrl: string;
    /**配置文件 */
    var configVo: ConfigVO;
    /**语言 */
    var lang: string;
}
declare module net {
    class Http {
        static request(data: any, url: string, callback?: any): Promise<{}>;
        static get(url: string, data?: any): Promise<any>;
        static post(url: string, data?: any): Promise<any>;
    }
    /**为URL附加参数 */
    function getUrl(source: string, obj?: any): string;
}
declare module core {
    /**
     * 账户记录
     */
    interface AcountLogVO {
        /** id*/
        id: number;
        /**用户id*/
        user_id: number;
        /**平台id*/
        plat_id: number;
        /**类型*/
        type: number;
        /**金币变化前的值*/
        gold_before: string;
        /**金币变化的值*/
        gold: string;
        /**创建人*/
        created_by: string;
        /**创建时间*/
        created_at: string;
        /**金币变化后的值*/
        balance: string;
        /**備註 */
        remark: string;
    }
}
declare module core {
    interface ActivityDetailVO {
        /**活动ID*/
        id: number;
        /**模型ID:0-自定义|非0-模型ID*/
        "model_id": number;
        /**活动类型*/
        "activity_category": string;
        /**平台ID*/
        "plat_id": number;
        /**跳转模块，详细参考：http://18.166.154.73:8090/pages/viewpage.action?pageId=65696#id-活动配置说明-活动跳转模块*/
        "model_open_mode": number;
        /**跳转网址*/
        "open_mode_url": string;
        /**活动名称*/
        "activity_name": string;
        /**开始时间*/
        "start_time": string;
        /**结束时间*/
        "end_time": string;
        /**结算周期:1-每天|2-每周|3-每月|4-每个活动|5-每半月*/
        "settlement_period": number;
        /**展示方式:0-客户端处理|1-平台H5展示|2-外部链接|4-图片上传*/
        "show_type": number;
        /**展示方式对应的链接地址*/
        "link_url": string;
        /**是否预热:0-否|1-是*/
        "is_preheat": number;
        /**发布状态:1-待发布|2-已发布|3-已撤销*/
        "publish_status": number;
        /**流程状态:1-待开始|11-进行中|21-关闭|91-结束*/
        "process_status": number;
        /**提现流水倍数*/
        "bonus_multiple": number;
        /**活动描述*/
        "activity_desc": string;
        /**当前活动-待领取任务数量，非0则红点提示 */
        "unread_num": number;
        /**规则*/
        "rules": {
            /**大规则名称*/
            name: string;
            /**大规则ID*/
            rule_num: number;
            /**结算次数:1-多次结算|2-单次结算*/
            run_type: number;
            list: {
                /**子规则名称*/
                name: string;
                list: {
                    /**大规则名称*/
                    rule_id: string;
                    /**大规则名称*/
                    type: string;
                    /**大规则名称*/
                    params_type: string;
                    /**大规则名称*/
                    params: string;
                    /**大规则名称*/
                    params_name: string;
                    /**大规则名称*/
                    match: boolean;
                    /**大规则名称*/
                    match_num: number;
                }[];
                /**子规则ID*/
                child_rule_num: number;
            }[];
            /**是否已完成:0-否|1-是*/
            complete: number;
            /**匹配信息*/
            match_info: {
                /**是否已达到领奖条件:false-否|true-是*/
                match: boolean;
                /**中间子规则ID*/
                child_rule_num: number;
                /**【前端不用】规则属性:1-多倍规则[即每开头的条件规则]|2-单倍规则[即是否类条件规则]*/
                multi: number;
                /**前端不用】真实的数值的余数【取模】*/
                match_num_mod: number;
                /**【前端不用】中间子规则ID的数组索引*/
                child_match_rule_index: number;
            };
        }[];
    }
}
declare module core {
    interface ActivityEverydayTypeItemVO {
        /**大规则名称*/
        name: string;
        /**图标icon*/
        icon: string;
        /**打开模块*/
        open_mode: number;
        /**大规则ID*/
        rule_num: number;
        /**是否已完成:0-否|1-是*/
        complete: number;
        /**是否可领奖:0-否|1-是*/
        receive: number;
        /**任务进度:1-待完成|2-待分享|3-待签到|81-待领取|91-已完成*/
        process: number;
        condition: {
            /**独立规则-类型:1-条件|21-消耗*/
            type: string;
            /**独立规则-参数值*/
            params: number;
            /**独立规则-游戏房间ID*/
            params_probability: string;
            /**独立规则-游戏房间名称*/
            room_name: string;
            /**当前用户此规则是否匹配:false-否|true-是【！！！注意奖励规则[即:type=61 or type=71]中不存在此项】*/
            match: boolean;
            /**当前用户匹配此规则时的真实数值【！！！注意奖励规则[即:type=61 or type=71]中不存在此项】*/
            match_num: number;
            /**子规则名称*/
            name: string;
        };
        award: {
            /**独立规则-类型:61-奖励|71-概率奖池*/
            type: string;
            /**独立规则-参数值*/
            params: string;
            /**独立规则-参数名称*/
            params_name: string;
            /**独立规则-派奖类型:1-金币|2-积分|3-京东卡*/
            award_type: number;
        };
    }
}
declare module core {
    interface ActivityEverydayTypeVO {
        /**活动ID*/
        id: number;
        /**模型ID*/
        model_id: number;
        /**活动类型*/
        activity_category: string;
        /**模型类型::1-普通模型|2-VIP等级|3-VIP俸禄|4-每日任务|5-闯关红包*/
        model_type: number;
        /**模型分类:401-活跃任务|402-满局任务|403-胜局任务|404-流水任务*/
        model_category: number;
        /**规则数量:0-所有大规则|非0-随机大规则数量*/
        model_rules_num: number;
        /**平台ID*/
        plat_id: number;
        /**活动名称*/
        activity_name: string;
        /**开始时间*/
        start_time: string;
        /**结束时间*/
        end_time: string;
        /**发布状态:1-待发布|2-已发布|3-已撤销*/
        publish_status: number;
        /**流程状态:1-待开始|11-进行中|21-关闭|91-结束*/
        process_status: number;
        /**当前任务中可领取奖励的数量*/
        unread_num: number;
        model_category_name: string;
        rules: ActivityEverydayTypeItemVO[];
    }
}
declare module core {
    interface ActivityEverydayVO {
        /**每日任务中可领取奖励的数量*/
        unread_num: number;
        list: ActivityEverydayTypeVO[];
    }
}
declare module core {
    interface ActivityVO {
        /**活动ID*/
        id: number;
        /**平台ID*/
        plat_id: number;
        /**活动名称*/
        activity_name: string;
        /**开始时间*/
        start_time: string;
        /**结束时间*/
        end_time: string;
        /**结算周期:1-每天|2-每周|3-每月|4-每个活动|5-每半月*/
        settlement_period: number;
        /**展示方式:0-客户端处理|1-平台H5展示|2-外部链接|4-图片上传*/
        show_type: number;
        /**展示方式对应的链接地址*/
        link_url: string;
        /**是否预热:0-否|1-是*/
        is_preheat: number;
        /**发布状态:1-待发布|2-已发布|3-已撤销*/
        publish_status: number;
        /**流程状态:1-待开始|11-进行中|21-关闭|91-结束*/
        process_status: number;
        /**活动描述*/
        activity_desc: string;
    }
}
declare module core {
    /**
     * 返水详情
     */
    interface BackWaterDetailVO {
        backwater_id: number;
        /**結算總額*/
        total_water: string;
        /**派獎總額*/
        total_backwater: string;
        /**結算日期*/
        created_date: string;
        /**创建时间*/
        created_at: string;
        /**反水详情记录log */
        detail: BackWaterDetailLog[];
    }
    /**
     * 每条反水详情记录log
     */
    interface BackWaterDetailLog {
        /**產品類型*/
        vendor_type: number;
        /**流水*/
        water: string;
        /**返水比例*/
        backwater_rate: number;
        /**返水金额 就是派獎金額*/
        backwater: string;
        /**類型名*/
        vendor_type_text: string;
    }
}
declare module core {
    interface BackWaterTrialVO {
        /**流水 就是結算總額*/
        total_water: string;
        /**返水金额 就是派獎總額*/
        total_backwater: string;
        /**详情*/
        detail: {
            /**產品類型*/
            vendor_type: number;
            /**流水*/
            water: string;
            /**返水比例*/
            backwater_rate: number;
            /**返水金额 就是派獎金額*/
            backwater: string;
            /**產品類型名称*/
            vendor_type_text: string;
        }[];
    }
}
declare module core {
    /**
     * 返水记录
     */
    interface BackWaterVO {
        /**今日已派發獎勵金額 單位: 元*/
        today_total_backwater: number;
        /**昨日已派發獎勵金額 單位: 元*/
        yesterday_total_backwater: number;
        /**一週內已派發獎勵金額 單位: 元*/
        last7days_total_backwater: number;
        list: BackWaterLog[];
        pageInfo: PageInfoVO;
    }
    /**
     * 每条反水记录日志log
     */
    interface BackWaterLog {
        /**查詳情用的主鍵id*/
        backwater_id: number;
        /**結算流水*/
        total_water: string;
        /**派獎金額*/
        total_backwater: string;
        /**結算日期*/
        created_date: string;
        /**前端顯示用*/
        created_at: string;
    }
}
declare module core {
    /**
     * 投注记录
     */
    interface ChannelStatisticVO {
        /**日期*/
        created_date: string;
        /**新增注册*/
        new_register: number;
        /**活跃用户*/
        active_user: number;
        /**充值金额*/
        recharge: string;
        /**充值人数*/
        recharge_user: number;
        /**新增充值人数*/
        new_recharge_user: number;
        /**兑换金额*/
        exchange: string;
        /**总兑换人数*/
        exchange_user: number;
        /**新增兑换人数*/
        new_exchange_user: number;
        /**游戏输赢*/
        win_loss: string;
        /**游戏流水*/
        water: string;
        /**平台赠送*/
        gift_gold: string;
        /**实时返水*/
        backwater_gold: string;
        /**推广返佣*/
        commission_gold: string;
        /**渠道输赢*/
        channel_win_loss: string;
    }
}
declare module core {
    /**
     * 配置文件，需要在配置文件中配置的全局使用的参数
     */
    interface ConfigVO {
        /**与PHP交互API地址 */
        ApiUrl: string;
        /**客服地址 */
        cServer: string;
        /**skinId，皮肤版本号 */
        skinId: string;
        /**skinSudId，扩展皮肤版本号，用于区分不同的厂商平台不同的loading页，背景音乐等 */
        skinSudId: string;
        /**配置文件的cdn地址 */
        CdnUrl: string;
        /**官网地址地址 */
        DownLoadPageUrl: string;
        /**首页菜单排序 */
        category_order: number[];
    }
}
declare module core {
    interface ExchangeItemVO {
        id?: number;
        /**平台ID */
        plat_id?: number;
        /**平台兑换配置ID */
        exchange_channel_id?: number;
        /**兑换收款类型 */
        payment_method_type?: number;
        /**汇率 */
        coin_rate?: number;
        /**描述信息 */
        subtitle?: string;
        /**兑换收款类型说明 */
        explain?: string;
        /**最低保留余额 */
        balance?: string;
    }
}
declare module core {
    interface ExchangeOrderVO {
        /**用户ID */
        user_id: number;
        /**结算订单号 */
        order_no: string;
        /**扣除金币数 */
        gold: string;
        /**实际到帐数 */
        money: string;
        /**手续费 */
        fee: string;
        /**收款类型 */
        receive_payment_type: string;
        /**状态 */
        status: string;
        /**创建时间 */
        created_at: string;
        /**备注 */
        remark: string;
    }
}
declare module core {
    interface ExchangePaymentVO {
        id: number;
        /**用户ID */
        user_id: number;
        /**收款类型 1-银行卡|2-支付宝 */
        type: number;
        /**使用状态 */
        status: number;
        payment_method: {
            /**银行卡号 */
            account: string;
            /**持卡人姓名 */
            account_name: string;
            /**所属银行 */
            bank: string;
            /**开户支行 */
            account_bank: string;
        };
        /** */
        created_at: string;
        /** */
        updated_at: string;
    }
}
declare module core {
    interface ExchangeWaterVO {
        id: number;
        data_belong: string;
        /**用户id */
        user_id: number;
        /**平台ID */
        plat_id: number;
        /**入款金额 */
        gold: string;
        /**实际打码 */
        water: string;
        /**审核流水 */
        water_limit: string;
        /**获得金币类型 */
        type: string;
        /**状态 */
        status: string;
        /**创建时间 */
        created_at: string;
        /**更新时间 */
        updated_at: string;
    }
}
declare module core {
    interface GameLogRespVO {
        list: GameLogVO[];
        pageInfo: PageInfoVO;
        /**总投注*/
        total_bet_gold: string;
        /**总输赢*/
        total_win_gold: string;
        /**总流水*/
        total_water: string;
    }
}
declare module core {
    /**
     * 投注记录
     */
    interface GameLogVO {
        /**用户投注明细ID*/
        bet_id: number;
        /**用户id*/
        user_id: number;
        /**平台id*/
        plat_id: number;
        /**厂商id*/
        vendor_id: number;
        /**厂商类型*/
        vendor_type: number;
        /**厂商名称*/
        vendor_product_name: string;
        /**输赢*/
        win_gold: string;
        /**订单号*/
        order_no: string;
        /**下注金额*/
        bet_gold: string;
        /**下注时间*/
        bet_at: string;
        /**结算状态:1-未结算|11-已结算*/
        settlement_status: number;
        /**厂商名称*/
        vendor_name: string;
        /**厂商logo*/
        vendor_icon: string;
        /**流水*/
        water: string;
        /**是否已结算反水:0-未结算|1-已结算*/
        is_settlement_backwater: number;
        /**返水金额*/
        backwater: string;
    }
}
/**配置信息 */
declare module core {
    interface GamePlatConfigVO {
        /**是否显示整盘分红 */
        all_bonus_info: {
            is_open: number;
        };
        /**是否展示实时返水 */
        backwater_info: {
            is_open: number;
        };
        /**是否显示注册赠金 */
        binding_info: {
            is_open: number;
        };
        /**金币划转是否需要手续费 */
        gold_transfer_fee: string;
        /**投注记录是否隐藏流水 */
        is_bet_water_display: {
            is_open: number;
        };
        /**领取奖励，是否需要先绑定手机 */
        is_bind_phone_award: {
            is_open: number;
        };
        /**绑定收款地址是否需要手机验证 */
        is_bind_phone_exchange: {
            is_open: number;
        };
        /**金币划转是否需要手机验证 */
        is_bind_phone_transfer: {
            is_open: number;
        };
        /**是否展示金币划转 */
        is_gold_transfer: {
            is_open: number;
        };
        /**是否展示全民推广 */
        promotion_info: {
            is_open: number;
        };
        /**是否显示签到 */
        sign_info: {
            is_open: number;
        };
        /**是否展示会员福利 */
        vip_info: {
            is_open: number;
        };
        /**是否展示现金密码 */
        is_password_gold_transfer: {
            is_open: number;
        };
        /**返佣设置：1-分类型|2-全部 */
        calc_type: number;
        /**是否需要绑定上级 1 需要 98不需要 */
        is_game_with_parent: {
            is_open: number;
        };
        /**支持的币种 */
        plat_coins: any;
        /**语言 */
        language: any;
        /**主语言 */
        main_language: string;
        /**可以注册的类型: 1-用户名注册|2-邮箱注册|4-手机注册 */
        register_types: number[];
        /**安全设置:1-邮箱验证|2-短信验证 */
        validate_type: number[];
    }
}
declare module core {
    /**
     * 邮件
     */
    interface MailVO {
        /**邮件ID*/
        id: number;
        /**数据归属标记*/
        data_belong: string;
        /**邮件内容ID*/
        content_id: number;
        /**平台用户ID*/
        user_id: number;
        /**平台用户ID*/
        plat_id: number;
        /**渠道ID*/
        channel_id: number;
        /**是否已读:0-否|1-是*/
        is_read: number;
        /**阅读时间*/
        read_at: string;
        /**奖励金币*/
        attachment_gold: number;
        /**奖励积分*/
        attachment_score: number;
        /**附件状态:1-无附件|11-待打开[待领取]|21-已打开[已领取]*/
        attachment_status: number;
        /**附件打开时间*/
        attachment_open_at: string;
        /**是否删除:0-否|1-是*/
        is_delete: number;
        /**删除类型:1-用户删除|11-后台删除*/
        delete_type: number;
        /**创建人【默认用户system】*/
        created_by: string;
        /**创建时间*/
        created_at: string;
        /**修改人【默认用户system】*/
        updated_by: string;
        /**修改时间*/
        updated_at: string;
        /**标题*/
        title: string;
        /**类型:1-平台|11-活动*/
        cate: number;
        /**内容*/
        content: string;
    }
}
/**
 *
 * 跑马灯数据结构
 * @export
 * @class AnnounceModel
 */
declare module core {
    interface MarqueeVO {
        id: number;
        plat_id: number;
        app_types: number[];
        type: number;
        start_time: string;
        content: string;
        status: number;
        is_delete: number;
        created_by: string;
        created_at: string;
        updated_by: string;
        updated_at: string;
    }
    interface LuckMsgVO {
        /** 赢的钱 */
        gold: string;
        /** 昵称 */
        nick_name: string;
        /** 厂商名称 */
        vendor_name: string;
    }
}
declare module core {
    interface ModuleVO {
        /**模块名*/
        name: string;
        /**资源组名*/
        resGroup: string;
        /**路由名*/
        routeName: string;
        /**模块加载成功后，需要执行的命令*/
        okEventType: string;
    }
}
declare module core {
    /**
     * 分页信息
     */
    interface PageInfoVO {
        /** 当前页码 */
        pageCurrent: number;
        /** 总条数 */
        pageCount: number;
        /** 每页数量 */
        pageSize: number;
        /** 总页数 */
        pageTotal: number;
    }
}
declare module core {
    /**
     * 大厅游戏菜单
     */
    interface PlatLobbyIndexVO {
        /**大厅分类:1-热门游戏|2-棋牌|4-彩票|8-捕鱼|16-电子|32-真人|64-体育|128-街机|256-老虎机*/
        category: number;
        /** 分类名字 */
        category_name: string;
        list: VendorVO[];
        /** 第几个 */
        index: number;
    }
    /**
     * 厂商产品
     */
    interface VendorVO {
        /**产品ID*/
        vendor_prodcut_id: number;
        /**标签:1-最新|2-火热*/
        tags: number[];
        /**排序序号*/
        index_no: number;
        /**产品图片*/
        icon: string;
        /**大厅分类:1-热门游戏|2-棋牌|4-彩票|8-捕鱼|16-电子|32-真人|64-体育|128-街机|256-老虎机*/
        category: number;
        /**产品类型:2-棋牌|4-彩票|8-捕鱼|16-电子|32-真人|64-体育|128-街机|256-老虎机*/
        vendor_type: number;
        /**所选产品列表:0-API产品|1-厂商产品列表|2-平台产品列表*/
        list_type: number;
        /**原始产品ID[厂商产品ID]*/
        ori_product_id: string;
        /**厂商ID*/
        vendor_id: number;
        /**产品扩展字段*/
        ori_vendor_extend: string;
        /**产品名称*/
        vendor_product_name: string;
        /**近期是否玩过*/
        recent: boolean;
        app_type: number;
        lobby_model_product_id: number;
        lobby_product_id: number;
        plat_id: number;
        status: number;
        /**厂商名称*/
        vendor_name: string;
        vendor_product_id: number;
    }
}
declare module core {
    interface PlatNoticeVO {
        id: number;
        data_belong: string;
        plat_id: number;
        name: string;
        type: number;
        type_position: number;
        app_types: number[];
        start_time: string;
        end_time: string;
        status: number;
        img_url: string;
        content: string;
        created_by: string;
        created_at: string;
        updated_by: string;
        updated_at: string;
        open_mode: number;
        open_mode_url: string;
    }
}
declare module core {
    interface QestionVo {
        /**常见问题列表 */
        faqs: {
            /**问题ID */
            id: 3;
            /**数据归属标记 */
            data_belong: string;
            /**平台ID */
            plat_id: number;
            /**问题 */
            name: string;
            /**答案 */
            content: string;
            /**排序序号 */
            index_no: number;
            /**是否删除:0-否|1-是 */
            is_delete: number;
            /**创建人 */
            created_by: string;
            /**创建时间 */
            created_at: string;
            /**修改人 */
            updated_by: string;
            /**修改时间 */
            updated_at: string;
        }[];
        /**在线客服链接 */
        kf_url: string;
    }
}
declare module core {
    interface RequestBaseVO {
        app_type?: number;
        device?: string;
        plat_id?: string;
        channel_id?: string;
    }
}
declare module core {
    /**
     * 请求登录
     */
    interface RequestLoginVO extends RequestBaseVO {
        username?: string;
        password?: string;
    }
}
declare module core {
    interface RequestRegisterVO extends RequestLoginVO {
        uuid?: string;
        auth_code?: string;
        password_confirm?: string;
        invite_user_id?: number;
    }
}
declare module core {
    /**
     * http请求返回的数据结构
     */
    interface ResponseVO {
        /**状态 0正常*/
        status: number;
        msg: string;
        extend: {
            microtime: number;
            unique: string;
        };
        data: any;
    }
}
declare module core {
    /**
     * 签到信息
     */
    interface SignIndexVO {
        /**今日是否已签到:0-否|1-是*/
        today_sign: number;
        /**活动ID*/
        id: number;
        /**模型ID:0-自定义|非0-模型ID*/
        model_id: number;
        /**模型类型:1-普通模型|2-VIP活动|4-每日任务|5-闯关红包|10-每日签到|11-绑定赠金*/
        model_type: number;
        /**模型分类:201-晋级彩金|202-周礼金|203-月礼金|204-年收益|401-活跃任务|402-满局任务|403-胜局任务|404-流水任务*/
        model_category: number;
        /**规则数量：0-不限制|非0-限制指定数量*/
        model_rules_num: number;
        /**平台ID*/
        plat_id: number;
        /**活动名称*/
        activity_name: string;
        /**开始时间*/
        start_time: string;
        /**结束时间*/
        end_time: string;
        /**发布状态:1-待发布|2-已发布|3-已撤销*/
        publish_status: number;
        /**流程状态:1-待开始|11-进行中|21-关闭|91-结束*/
        process_status: number;
        rules: {
            /**大规则名称*/
            name: string;
            /**大规则ID*/
            rule_num: number;
            /**是否已完成:0-否|1-是*/
            complete: number;
            /**是否可领奖:0-否|1-是*/
            receive: number;
            /**流程状态:1-待开始|11-进行中|21-关闭|91-结束*/
            process: number;
            /**独立规则*/
            condition: {
                /**独立规则-类型:1-条件|21-消耗*/
                type: string;
                /**独立规则-参数值*/
                params: string;
                /**独立规则-游戏房间ID*/
                params_probability: string;
                /**当前用户此规则是否匹配:false-否|true-是【！！！注意奖励规则[即:type=61 or type=71]中不存在此项】*/
                match: boolean;
                /**当前用户匹配此规则时的真实数值【！！！注意奖励规则[即:type=61 or type=71]中不存在此项】*/
                match_num: number;
                /**子规则名称*/
                name: string;
            };
            award: {
                /**独立规则-类型:61-奖励|71-概率奖池*/
                type: string;
                /**独立规则-参数值*/
                params: string;
                /**独立规则-参数名称*/
                params_name: string;
                /**独立规则-派奖类型:1-金币|2-积分*/
                award_type: number;
            };
        }[];
        /**暂不使用*/
        model_category_name: string;
    }
}
declare module core {
    /**
     * 每日签到
     */
    interface SignStoreVO {
        /**是否已完成:0-否|1-是*/
        complete: number;
        /**是否已完成:0-否|1-是*/
        receive: number;
        list: {
            /**独立规则-参数值*/
            params: string;
            /**独立规则-参数名称*/
            params_name: string;
            /**独立规则-派奖类型:1-金币|2-积分*/
            award_type: number;
            /**奖励就IDS*/
            award_ids: number[];
        }[];
    }
}
declare module core {
    /**
     * 用户信息
     */
    interface UserInfoVO {
        /**数字钱包地址 */
        bsc_address?: string;
        /**平台用户ID*/
        user_id?: number;
        /**平台ID*/
        plat_id?: number;
        /**渠道ID*/
        channel_id?: number;
        /**用户名*/
        username?: string;
        /**用户昵称*/
        nick_name?: string;
        /**真实姓名*/
        real_name?: string;
        /**邮箱*/
        email?: string;
        /**手机号*/
        phone?: string;
        /**微信号*/
        wechat?: string;
        /**qq*/
        qq?: string;
        /**头像*/
        avatar?: string;
        /**性别 1 男 2女*/
        gender?: number;
        /**邀请人*/
        invite_user_id?: number;
        /**是否显示渠道统计 1是 0否*/
        is_channel_statistic_display?: number;
        /**转换开关：0-否|1-是 */
        is_gold_transfer?: {
            is_open: number;
        };
        /**转换手续费 */
        gold_transfer_fee?: number;
        /**流水倍数 */
        gold_transfer_water_multiple?: number;
        /**1、用户扩展信息*/
        extend?: {
            /**平台用户ID*/
            user_id: number;
            /**平台用户金币*/
            gold: number;
            /**用户历史总充值*/
            total_recharge: number;
            /**用户历史总流水*/
            total_water: number;
        };
        /**2、用户金币信息*/
        gold_info?: {
            /**总金额*/
            sum_money?: string;
            /**平台金币*/
            plat_money?: string;
            /**用户渠道金币数*/
            vendors_money?: string;
            /**保险箱金币*/
            safe_gold?: string;
            /**厂商金币*/
            vendor_money?: any;
            /**奖励币 */
            reward_money?: any;
            /**用户渠道金币详细信息*/
            vendors_detail?: {
                vendor_id: number;
                vendor_name?: string;
                vendor_icon?: string;
                gold?: string;
            }[];
            /**
             * 非空表示金币获取失败
             * 【XXX1、XXX2】厂商 金币获得失败
             * 【XXX1、XXX2】厂商 金币获得失败
             * 【XXX1、XXX2】厂商 下分获得失败 （这个无视）
             * 【XXX1、XXX2】厂商 上分获得失败
             * 【XXX1、XXX2】厂商 进入游戏获得失败
             */
            error_msg?: string;
        };
        /**3、用户VIP信息*/
        vip_info?: {
            /**vip开关*/
            is_open: number;
            /**用户当前VIP等级*/
            vip_level: number;
            /**用户最大VIP等级*/
            max_vip_level: number;
            /**用户VIP进度条信息*/
            vip_progress: {
                /**类型:1-有效流水|2-总充值*/
                type: number;
                /**当前VIP等级需要经验值*/
                cur_vip_level_need_exp: string;
                /**下一VIP等级需要经验值*/
                next_vip_level_need_exp: string;
                /**用户当前经验值*/
                user_exp: string;
            }[];
            /**平台未开VIP返回信息*/
            msg: string;
        };
        /**4、用户VIP活动信息*/
        vip_activity?: VipActivityInfo;
        /**5、用户当前返水比率信息*/
        backwater_info?: {
            /**是否开启返水:0-否|1-是*/
            is_open: number;
            /**当前用户VIP等级*/
            vip_level: number;
            /**返水比率配置  产品类型:2-棋牌|4-彩票|8-捕鱼|16-电子|32-真人|64-体育|128-街机|256-老虎机*/
            backwater_config: any;
        };
        /**6、平台VIP福利列表信息*/
        vip_config_info?: {
            /**是否开启0，关闭，1开启 */
            is_open: number;
            /**类型:1-有效流水|2-总充值*/
            types: number[];
            vip_config: {
                /**有效流水值【单位：元】*/
                total_water: number;
                /**充值总数【单位：元】*/
                total_recharge: number;
                /**返水比率配置 产品类型:2-棋牌|4-彩票|8-捕鱼|16-电子|32-真人|64-体育|128-街机|256-老虎机*/
                backwater_config: any;
                /**vip等级对应的活动gold奖励金额， model_category类型201晋级礼金，202周礼金，203月礼金*/
                vip_award: {
                    gold: number;
                    model_category: number;
                }[];
            }[];
        };
        password_gold_exists?: number;
    }
    /**
     * vip 奖励活动相关
     */
    interface VipActivityInfo {
        /**VIP活动中可领取奖励的数量 */
        unread_num: number;
        list: {
            /**活动ID */
            id: number;
            /**模型ID */
            model_id: number;
            /**模型类型:1-普通模型|2-VIP活动|4-每日任务|5-闯关红包|10-每日签到|11-绑定赠金 */
            model_type: number;
            /**模型分类:201-晋级彩金|202-周礼金|203-月礼金|204-年收益 */
            model_category: number;
            /** 规则数量:0-所有大规则|非0-随机大规则数量*/
            model_rules_num: number;
            /**平台ID */
            plat_id: number;
            /**活动名称 */
            activity_name: string;
            /**开始时间 */
            start_time: string;
            /**结束时间 */
            end_time: string;
            /**发布状态:1-待发布|2-已发布|3-已撤销 */
            publish_status: number;
            /**流程状态:1-待开始|11-进行中|21-关闭|91-结束 */
            process_status: number;
            rules: {
                /** 大规则名称 */
                name: string;
                /**大规则ID */
                rule_num: number;
                /**是否已完成:0-否|1-是 */
                complete: number;
                /**是否可领奖:0-否|1-是 */
                receive: number;
                /**任务进度:1-待完成|81-待领取|91-已完成 */
                process: number;
                condition: {
                    /**独立规则-类型:1-条件|21-消耗 */
                    type: number;
                    /**独立规则-参数值 */
                    params: number;
                    /** 独立规则-第二参数值 */
                    params_probability: number;
                    /**当前用户此规则是否匹配:false-否|true-是【！！！注意奖励规则[即:type=61 or type=71]中不存在此项】 */
                    match: false;
                    /**当前用户匹配此规则时的真实数值【！！！注意奖励规则[即:type=61 or type=71]中不存在此项】 */
                    match_num: number;
                    /**子规则名称 */
                    name: string;
                };
                award: {
                    /**独立规则-类型:61-奖励|71-概率奖池 */
                    type: number;
                    /**独立规则-参数值 */
                    params: number;
                    /**独立规则-参数名称 */
                    params_name: string;
                    /**独立规则-派奖类型:1-金币|2-积分 */
                    award_type: number;
                };
            }[];
            /**当前活动中可领取奖励的数量 */
            unread_num: number;
            /**模型分类对应的value */
            model_category_name: string;
        }[];
    }
}
declare module core {
    interface UserShowGoldVO {
        /**金币流水LOG_ID*/
        id: 4;
        /**平台用户ID */
        user_id: 100000000;
        /**平台ID */
        plat_id: 10001;
        /**
         * 1-游戏输赢|5-平台充值|6-平台兑换|7-银行存取|8-平台赠送|9-平台兑换失败退款|10-平台扣款
         * 11-游戏厂商上分|12-游戏厂商下分|13-游戏厂商上分失败返还|14-实时返水|15-推广返佣|40-活动赠送
         */
        type: 11;
        /**金币变化前的值 */
        gold_before: "10000.00";
        /**金币变化的值 */
        gold: "10000.00";
        /**创建人 */
        created_by: "system";
        /**创建时间 */
        created_at: "2020-10-13 17:09:29";
        /**金币变化后的值 */
        balance: "20000.00";
    }
}
declare module core {
    /**
     * 厂商产品
     */
    interface VendorProductVO {
        /**游戏名称*/
        vendor_product_name: string;
        /**厂商ID*/
        vendor_id: number;
        /**游戏图片地址*/
        icon: string;
        /**游戏扩展字段*/
        ori_vendor_extend: string;
        /**厂商产品id*/
        ori_product_id: string;
        /**是否喜欢*/
        love: boolean;
        /**近期是否玩过*/
        recent: boolean;
        /**游戏横竖屏，1横屏，2竖屏 */
        orientation: number;
    }
}
declare module core {
    /**
     * 厂商
     */
    class VendorSimpleVO {
        /**厂商Id*/
        vendor_id: number;
        /**厂商名称*/
        vendor_name: string;
    }
}
