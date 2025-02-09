/**
 * document: http://18.166.154.73:8090/pages/viewpage.action?pageId=66514
 */
module net {
    /**协议*/
    export var HttpType = {

        /**--新加的--获取语言列表*/
        api_plat_var_language_config: "api/plat/{plat_id}/language/config",
        /**--新加的--获取验证码图片*/
        api_public_auth_code: "api/public/auth_code",
        /**--新加的--获取滑动验证的位置*/
        api_public_auth_drag: "api/public/auth_drag",
        /**--新加的--发送邮件*/
        api_public_email_send: "api/public/email/send",
        /**--新加的--发送短信*/
        api_public_sms_send: "api/public/sms/send",
        /**--新加的--获取手机区号*/
        api_public_area_code: "api/public/area_code",
        /**--新加的--获取所有手机区号*/
        api_public_all_area_code: "api/public/all_area_code",
        /**--新加的--获取国家*/
        api_public_country: "api/public/country",
        /**--新加的--获取城市*/
        api_public_city: "api/public/city",
        /**--新加的--获取所有游戏的查询配置*/
        api_plat_var_game_all_config: "api/plat/{plat_id}/game/all/config",
        /**--新加的--所有游戏的查询*/
        api_plat_var_game_all_index: "api/plat/{plat_id}/game/all/index",
        /**--新加的--获取币种游戏比率*/
        api_user_var_block_coins_scale : "api/user/{user_id}/block_coins_scale ",
        /**--新加的--获取平台最大挖矿效率*/
        api_plat_var_backwater_setting_info: "api/plat/{plat_id}/backwater_setting_info",

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
        /**--钱包--货币互转取得即時匯率*/
        api_user_coin_exchange_scale_var: "api/user/coin_exchange_scale/{API_USER_ID}",
        /**--钱包--货币互转*/
        api_user_coin_exchange_var: "api/user/coin_exchange/{API_USER_ID}",

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
        /**--账号--用户登陆前置验证*/
        api_user_login_check: "api/user/login_check",

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
        /**--会员资料--获取google验证码*/
        api_user_var_google_key: "api/user/{user_id}/google_key",
        /**--会员资料--绑定google验证码*/
        api_user_bind_google_key_var: "api/user/bind_google_key/{user_id}",
        /**--会员资料--投注记录详情【只用于配置的体育】*/
        api_vendor_var_bet_log_detail: "api/vendor/{vendor_id}/bet_log_detail",
        /**--会员资料--取消投注*/
        api_vendor_var_bet_log_cancel: "api/vendor/{vendor_id}/bet_log_cancel",
        /**--会员资料--详情页接口*/
        api_user_show_url_var_var: "api/user/show_url/{plat_id}/{bet_id}",

        /**--大厅--获取游戏类型,游戏菜单（大厅菜单）*/
        api_plat_var_lobby_index: "api/plat/{plat_id}/lobby/index",
        /**--大厅--获取厂商列表*/
        api_vendor_simple: "api/vendor/simple",
        /**--大厅--获取厂商配置游戏菜单（大厅厂商二级游戏菜单）*/
        api_vendor_var_lobby_simple: "api/vendor/{vendor_id}/lobby/simple",
        /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证*/
        api_vendor_var_ori_product_show_var: "api/vendor/{vendor_id}/ori_product/show/{ori_product_id}",
        /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证--游客*/
        api_vendor_var_ori_product_visitor_show_var: "api/vendor/{vendor_id}/ori_product/visitor/show/{ori_product_id}",
        /**--大厅--获取平台首页菜单游戏列表*/
        api_plat_var_game_menu: "api/plat/{plat_id}/game/menu",
        /**--大厅--获取平台首页分类游戏列表*/
        api_plat_var_game_category: "api/plat/{plat_id}/game/category",

        /**--搜索--我的游戏*/
        api_user_var_game_index: "api/user/{user_id}/game/index",
        /**--搜索--收藏游戏*/
        api_user_var_game_update_var: "api/user/{user_id}/game/update/{vendor_product_id}",
        /**--搜索--搜索游戏*/
        api_user_var_game_search: "api/user/{user_id}/game/search",
        /**--搜索--搜索游戏---非登录状态*/
        api_plat_var_game_search: "api/plat/{plat_id}/game/search",

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
        /**--活动--活动规则匹配详情*/
        api_plat_activity_var_rule_id_var: "api/plat/activity/{id}/rule_id/{rule_id}",
        /**--活动--活动配置信息*/
        api_plat_activity_config: "api/plat/activity/config",
        /**--活动--每日派奖详情*/
        api_plat_activity_daily_rewards_var: "api/plat/activity/daily_rewards/{id}",
        /**--活动--领取每日派奖奖励*/
        api_plat_activity_daily_rewards_var_receive: "api/plat/activity/daily_rewards/{id}/receive",

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
        /**--代理推广--亏损分红-本期分红信息*/
        api_user_var_direct_commission_detail: "api/user/{user_id}/direct_commission/detail",
        /**--代理推广--亏损分红-业绩详情*/
        api_user_var_direct_commission_index: "api/user/{user_id}/direct_commission/index",
        /**--代理推广--亏损分红-直属详情*/
        api_user_var_direct_commission_direct_index: "api/user/{user_id}/direct_commission/direct_index",
        /**--代理推广--亏损分红-历史分红记录*/
        api_user_var_direct_commission_bonus_index: "api/user/{user_id}/direct_commission/bonus_index",

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
        /**--兑换--用户手动退款*/
        api_user_var_exchange_manual_refund: "api/user/{user_id}/exchange/manual_refund",
        /**--兑换--用户兑换扩展信息*/
        api_user_var_exchange_extend_info: "api/user/{user_id}/exchange/extend_info",

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

        /**--介绍页--奖励币介绍*/
        api_plat_var_reward_coin_info: "api/plat/{plat_id}/reward_coin_info",

        /**--其它--配置数据 枚举*/
        api_plat_var_game_config: "api/plat/{plat_id}/game/config",
        /**--其它--客户端配置*/
        api_plat_var_client_config: "api/plat/{plat_id}/client/config",
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
        /**--其它--近期投注*/
        api_plat_var_recently_bet_info: "api/plat/{plat_id}/recently_bet_info",
        /**--其它--近期爆奖*/
        api_plat_var_plat_big_award: "api/plat/{plat_id}/plat_big_award",

        /**--Swap--Swap基础信息*/
        api_plat_var_swap_setting_info: "api/plat/{plat_id}/swap_setting_info",
        /**--Swap--Swap价格图*/
        api_plat_var_swap_k: "api/plat/{plat_id}/swap_k",
        /**--Swap--Swap试算*/
        api_plat_var_swap_trial: "api/plat/{plat_id}/swap/trial",
        /**--Swap--Swap兑换订单*/
        api_user_var_swap_order_list: "api/user/{user_id}/swap/order_list",
        /**--Swap--Swap创建订单*/
        api_user_var_swap_create_order: "api/user/{user_id}/swap/create_order",

        /**--平台入口配置获取--平台入口配置获取*/
        api_plat_var_config: "api/plat/{plat_id}/config",
        /**--平台入口配置获取--检测接口速度*/
        api_test_speed: "api/test_speed",

        /**--直属投注记录列表--直属投注记录列表*/
        api_user_var_agent_var_bet: "api/user/{user_id}/agent/{agent_user_id}/bet",

        /**--热门列表数据--获取easybet赛事数据*/
        api_vendor_96_products: "api/vendor/96/products",
        /**--热门列表数据--获取热门彩票数据*/
        api_vendor_267_products: "api/vendor/267/products",
        /**--热门列表数据--获取热门数据,上面两个合成一个*/
        api_vendor_var_products: "api/vendor/{vendor_id}/products",

        /**--获取推荐人信息是否为信用用户--查询直属用户金币数量*/
        api_user_var_invite_user_info: "api/user/{user_id}/invite_user_info",

        /**--直属用户查询操作--查询直属用户金币数量*/
        api_user_var_fetch_direct_user_info: "api/user/{user_id}/fetch_direct_user_info",
        /**--直属用户查询操作--直属用户状态查询和修改*/
        api_user_var_agent_direct_user_update: "api/user/{user_id}/agent_direct_user_update",
        /**--直属用户查询操作--直属用户直接扣款*/
        api_user_var_agent_direct_deduction: "api/user/{user_id}/agent_direct_deduction",
        /**--直属用户查询操作--信用统计*/
        api_user_var_credit_statistic: "api/user/{user_id}/credit_statistic",
        /**--直属用户查询操作--信用分红期管理*/
        api_user_var_credit_dividend_period: "api/user/{user_id}/credit_dividend_period",
        /**--直属用户查询操作--直属用户加钱*/
        api_user_var_agent_credit_transfer: "api/user/{user_id}/agent_credit_transfer",
        /**--直属用户查询操作--注册直属*/
        api_user_var_direct_register: "api/user/{user_id}/direct_register",
        /**--直属用户查询操作--清空直属所有额度*/
        api_user_var_agent_direct_deduction_all: "api/user/{user_id}/agent_direct_deduction_all",
        /**--直属用户查询操作--更新全局体育投注限制*/
        api_user_var_vendor_config_default_update: "api/user/{user_id}/vendor_config_default_update",

        /**--充值弹窗--充值弹窗列表（需登入）*/
        api_user_var_notice: "api/user/{user_id}/notice",
        /**--充值弹窗--充值弹窗列表（无需登入）*/
        api_plat_var_notice_popup: "/api/plat/{plat_id}/notice/popup",

        /**--skin003--三方登录*/
        api_user_third_login: "/api/user/third_login",

        /**--推广--返佣等级配置*/
        api_plat_var_promotion_config: "api/plat/{plat_id}/promotion_config",
        /**--推广--VIP等级配置*/
        api_plat_var_vip_config: "api/plat/{plat_id}/vip_config",

        /**--打点相关--获取用户事件记录*/
        api_user_var_event_record: "api/user/{user_id}/event_record",
        /**--打点相关--更新用户事件记录状态*/
        api_user_var_event_record_update: "api/user/{user_id}/event_record/update",

        /**--用户认证--获取用户认证信息*/
        api_user_var_plat_users_verification_show: "api/user/{user_id}/plat_users_verification/show",
        /**--用户认证--储存用户认证信息*/
        api_user_var_plat_users_verification_save: "api/user/{user_id}/plat_users_verification/save",

        /**--IP限制--IP限制*/
        api_plat_var_is_allowed: "api/plat/{plat_id}/is_allowed",

        /**--奖励任务--奖励任务列表*/
        api_user_var_coin_task_index: "api/user/{user_id}/coin_task/index",
        /**--奖励任务--放弃奖励任务*/
        api_user_var_coin_task_cancel: "api/user/{user_id}/coin_task/cancel",
        /**--奖励任务--平台银行列表*/
        api_plat_var_bank_list: "api/plat/{plat_id}/bank_list",

        /**--币种兑换--查询平台币种兑换汇率*/
        api_user_currency_conversion_index: "api/user/currency_conversion/index",
        /**--币种兑换--生成币种兑换订单*/
        api_user_currency_conversion_create_order: "/api/user/currency_conversion/create_order",

        /**--彩球活动--用户抽奖*/
        api_plat_activity_ball_lottery_award_var: "api/plat/activity/ball_lottery_award/{id}",
        /**--彩球活动--重置抽奖*/
        api_plat_activity_ball_lottery_init_var: "api/plat/activity/ball_lottery_init/{id}",
        /**--彩球活动--彩球信息*/
        api_plat_activity_ball_info_var: "api/plat/activity/ball_info/{id}",
        /**--彩球活动--领取奖励*/
        api_plat_activity_ball_rewards_var_receive: "api/plat/activity/ball_rewards/{id}/receive",
        /**--彩球活动--跳转记录*/
        api_user_var_jump_store: "api/user/{user_id}/jump/store",

        /**--转盘抽奖--用户抽奖*/
        api_plat_activity_spin_lottery_award_var: "api/plat/activity/spin_lottery_award/{id}",

        /**--积分抽奖--排名信息*/
        api_plat_activity_every_point_lottery_rank_list: "api/plat/activity/every_point_lottery/rank_list",
        /**--积分抽奖--用户抽奖*/
        api_plat_activity_every_point_lottery_var: "api/plat/activity/every_point_lottery/{id}",

        /**--获取弹窗 登录时要打开的弹窗列表--获取弹窗*/
        api_plat_var_pop_index: "api/plat/{plat_id}/pop/index",

        /**--排行榜活动 --排行榜-活动列表*/
        api_plat_activity_index_rank_list: "api/plat/activity/index/rank_list",
        /**--排行榜活动 --排行榜-用户列表*/
        api_plat_activity_index_rank_user_list: "api/plat/activity/index/rank_user_list",
    };
    /**事件*/
    export var EventType = {
        /**--请求开始*/
        REQUEST_START: "REQUEST_START",
        /**--请求结束 */
        REQUEST_END: "REQUEST_END",
        /**请求错误 */
        REQUEST_ERROR: "REQUEST_ERROR",
        /**IO错误 */
        IO_ERROR: "IO_ERROR",
        
        /**--新加的--获取语言列表*/
        api_plat_var_language_config: "api_plat_var_language_config",
        /**--新加的--获取验证码图片*/
        api_public_auth_code: "api_public_auth_code",
        /**--新加的--获取滑动验证的位置*/
        api_public_auth_drag: "api_public_auth_drag",
        /**--新加的--发送邮件*/
        api_public_email_send: "api_public_email_send",
        /**--新加的--发送短信*/
        api_public_sms_send: "api_public_sms_send",
        /**--新加的--获取手机区号*/
        api_public_area_code: "api_public_area_code",
        /**--新加的--获取所有手机区号*/
        api_public_all_area_code: "api_public_all_area_code",
        /**--新加的--获取国家*/
        api_public_country: "api_public_country",
        /**--新加的--获取城市*/
        api_public_city: "api_public_city",
        /**--新加的--获取所有游戏的查询配置*/
        api_plat_var_game_all_config: "api_plat_var_game_all_config",
        /**--新加的--所有游戏的查询*/
        api_plat_var_game_all_index: "api_plat_var_game_all_index",
        /**--新加的--获取币种游戏比率*/
        api_user_var_block_coins_scale : "api_user_var_block_coins_scale ",
        /**--新加的--获取平台最大挖矿效率*/
        api_plat_var_backwater_setting_info: "api_plat_var_backwater_setting_info",

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
        /**--钱包--货币互转取得即時匯率*/
        api_user_coin_exchange_scale_var: "api_user_coin_exchange_scale_var",
        /**--钱包--货币互转*/
        api_user_coin_exchange_var: "api_user_coin_exchange_var",

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
        /**--账号--用户登陆前置验证*/
        api_user_login_check: "api_user_login_check",

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
        /**--会员资料--获取google验证码*/
        api_user_var_google_key: "api_user_var_google_key",
        /**--会员资料--绑定google验证码*/
        api_user_bind_google_key_var: "api_user_bind_google_key_var",
        /**--会员资料--投注记录详情【只用于配置的体育】*/
        api_vendor_var_bet_log_detail: "api_vendor_var_bet_log_detail",
        /**--会员资料--取消投注*/
        api_vendor_var_bet_log_cancel: "api_vendor_var_bet_log_cancel",
        /**--会员资料--详情页接口*/
        api_user_show_url_var_var: "api_user_show_url_var_var",

        /**--大厅--获取游戏类型,游戏菜单（大厅菜单）*/
        api_plat_var_lobby_index: "api_plat_var_lobby_index",
        /**--大厅--获取厂商列表*/
        api_vendor_simple: "api_vendor_simple",
        /**--大厅--获取厂商配置游戏菜单（大厅厂商二级游戏菜单）*/
        api_vendor_var_lobby_simple: "api_vendor_var_lobby_simple",
        /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证*/
        api_vendor_var_ori_product_show_var: "api_vendor_var_ori_product_show_var",
        /**--大厅--获取进入厂商的游戏URL，获取厂商游戏凭证--游客*/
        api_vendor_var_ori_product_visitor_show_var: "api_vendor_var_ori_product_visitor_show_var",
        /**--大厅--获取平台首页菜单游戏列表*/
        api_plat_var_game_menu: "api_plat_var_game_menu",
        /**--大厅--获取平台首页分类游戏列表*/
        api_plat_var_game_category: "api_plat_var_game_category",

        /**--搜索--我的游戏*/
        api_user_var_game_index: "api_user_var_game_index",
        /**--搜索--收藏游戏*/
        api_user_var_game_update_var: "api_user_var_game_update_var",
        /**--搜索--搜索游戏*/
        api_user_var_game_search: "api_user_var_game_search",
        /**--搜索--搜索游戏---非登录状态*/
        api_plat_var_game_search: "api_plat_var_game_search",

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
        /**--活动--活动规则匹配详情*/
        api_plat_activity_var_rule_id_var: "api_plat_activity_var_rule_id_var",
        /**--活动--活动配置信息*/
        api_plat_activity_config: "api_plat_activity_config",
        /**--活动--每日派奖详情*/
        api_plat_activity_daily_rewards_var: "api_plat_activity_daily_rewards_var",
        /**--活动--领取每日派奖奖励*/
        api_plat_activity_daily_rewards_var_receive: "api_plat_activity_daily_rewards_var_receive",

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
        /**--代理推广--亏损分红-本期分红信息*/
        api_user_var_direct_commission_detail: "api_user_var_direct_commission_detail",
        /**--代理推广--亏损分红-业绩详情*/
        api_user_var_direct_commission_index: "api_user_var_direct_commission_index",
        /**--代理推广--亏损分红-直属详情*/
        api_user_var_direct_commission_direct_index: "api_user_var_direct_commission_direct_index",
        /**--代理推广--亏损分红-历史分红记录*/
        api_user_var_direct_commission_bonus_index: "api_user_var_direct_commission_bonus_index",

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
        /**--兑换--用户手动退款*/
        api_user_var_exchange_manual_refund: "api_user_var_exchange_manual_refund",
        /**--兑换--用户兑换扩展信息*/
        api_user_var_exchange_extend_info: "api_user_var_exchange_extend_info",

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

        /**--介绍页--奖励币介绍*/
        api_plat_var_reward_coin_info: "api_plat_var_reward_coin_info",

        /**--其它--配置数据 枚举*/
        api_plat_var_game_config: "api_plat_var_game_config",
        /**--其它--客户端配置*/
        api_plat_var_client_config: "api_plat_var_client_config",
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
        /**--其它--近期投注*/
        api_plat_var_recently_bet_info: "api_plat_var_recently_bet_info",
        /**--其它--近期爆奖*/
        api_plat_var_plat_big_award: "api_plat_var_plat_big_award",

        /**--Swap--Swap基础信息*/
        api_plat_var_swap_setting_info: "api_plat_var_swap_setting_info",
        /**--Swap--Swap价格图*/
        api_plat_var_swap_k: "api_plat_var_swap_k",
        /**--Swap--Swap试算*/
        api_plat_var_swap_trial: "api_plat_var_swap_trial",
        /**--Swap--Swap兑换订单*/
        api_user_var_swap_order_list: "api_user_var_swap_order_list",
        /**--Swap--Swap创建订单*/
        api_user_var_swap_create_order: "api_user_var_swap_create_order",

        /**--平台入口配置获取--平台入口配置获取*/
        api_plat_var_config: "api_plat_var_config",
        /**--平台入口配置获取--检测接口速度*/
        api_test_speed: "api_test_speed",

        /**--直属投注记录列表--直属投注记录列表*/
        api_user_var_agent_var_bet: "api_user_var_agent_var_bet",

        /**--热门列表数据--获取easybet赛事数据*/
        api_vendor_96_products: "api_vendor_96_products",
        /**--热门列表数据--获取热门彩票数据*/
        api_vendor_267_products: "api_vendor_267_products",
        /**--热门列表数据--获取热门数据,上面两个合成一个*/
        api_vendor_var_products: "api_vendor_var_products",

        /**--获取推荐人信息是否为信用用户--查询直属用户金币数量*/
        api_user_var_invite_user_info: "api_user_var_invite_user_info",

        /**--直属用户查询操作--查询直属用户金币数量*/
        api_user_var_fetch_direct_user_info: "api_user_var_fetch_direct_user_info",
        /**--直属用户查询操作--直属用户状态查询和修改*/
        api_user_var_agent_direct_user_update: "api_user_var_agent_direct_user_update",
        /**--直属用户查询操作--直属用户直接扣款*/
        api_user_var_agent_direct_deduction: "api_user_var_agent_direct_deduction",
        /**--直属用户查询操作--信用统计*/
        api_user_var_credit_statistic: "api_user_var_credit_statistic",
        /**--直属用户查询操作--信用分红期管理*/
        api_user_var_credit_dividend_period: "api_user_var_credit_dividend_period",
        /**--直属用户查询操作--直属用户加钱*/
        api_user_var_agent_credit_transfer: "api_user_var_agent_credit_transfer",
        /**--直属用户查询操作--注册直属*/
        api_user_var_direct_register: "api_user_var_direct_register",
        /**--直属用户查询操作--清空直属所有额度*/
        api_user_var_agent_direct_deduction_all: "api_user_var_agent_direct_deduction_all",
        /**--直属用户查询操作--更新全局体育投注限制*/
        api_user_var_vendor_config_default_update: "api_user_var_vendor_config_default_update",

        /**--充值弹窗--充值弹窗列表（需登入）*/
        api_user_var_notice: "api_user_var_notice",
        /**--充值弹窗--充值弹窗列表（无需登入）*/
        api_plat_var_notice_popup: "api_plat_var_notice_popup",

        /**--skin003--三方登录*/
        api_user_third_login: "api_user_third_login",

        /**--推广--返佣等级配置*/
        api_plat_var_promotion_config: "api_plat_var_promotion_config",
        /**--推广--VIP等级配置*/
        api_plat_var_vip_config: "api_plat_var_vip_config",

        /**--打点相关--获取用户事件记录*/
        api_user_var_event_record: "api_user_var_event_record",
        /**--打点相关--更新用户事件记录状态*/
        api_user_var_event_record_update: "api_user_var_event_record_update",

        /**--用户认证--获取用户认证信息*/
        api_user_var_plat_users_verification_show: "api_user_var_plat_users_verification_show",
        /**--用户认证--储存用户认证信息*/
        api_user_var_plat_users_verification_save: "api_user_var_plat_users_verification_save",

        /**--IP限制--IP限制*/
        api_plat_var_is_allowed: "api_plat_var_is_allowed",

        /**--奖励任务--奖励任务列表*/
        api_user_var_coin_task_index: "api_user_var_coin_task_index",
        /**--奖励任务--放弃奖励任务*/
        api_user_var_coin_task_cancel: "api_user_var_coin_task_cancel",
        /**--奖励任务--平台银行列表*/
        api_plat_var_bank_list: "api_plat_var_bank_list",

        /**--币种兑换--查询平台币种兑换汇率*/
        api_user_currency_conversion_index: "api_user_currency_conversion_index",
        /**--币种兑换--生成币种兑换订单*/
        api_user_currency_conversion_create_order: "api_user_currency_conversion_create_order",

        /**--彩球活动--用户抽奖*/
        api_plat_activity_ball_lottery_award_var: "api_plat_activity_ball_lottery_award_var",
        /**--彩球活动--重置抽奖*/
        api_plat_activity_ball_lottery_init_var: "api_plat_activity_ball_lottery_init_var",
        /**--彩球活动--彩球信息*/
        api_plat_activity_ball_info_var: "api_plat_activity_ball_info_var",
        /**--彩球活动--领取奖励*/
        api_plat_activity_ball_rewards_var_receive: "api_plat_activity_ball_rewards_var_receive",
        /**--彩球活动--跳转记录*/
        api_user_var_jump_store: "api_user_var_jump_store",

        /**--转盘抽奖--用户抽奖*/
        api_plat_activity_spin_lottery_award_var: "api_plat_activity_spin_lottery_award_var",

        /**--积分抽奖--排名信息*/
        api_plat_activity_every_point_lottery_rank_list: "api_plat_activity_every_point_lottery_rank_list",
        /**--积分抽奖--用户抽奖*/
        api_plat_activity_every_point_lottery_var: "api_plat_activity_every_point_lottery_var",

        /**--获取弹窗 登录时要打开的弹窗列表--获取弹窗*/
        api_plat_var_pop_index: "api_plat_var_pop_index",

        /**--排行榜活动 --排行榜-活动列表*/
        api_plat_activity_index_rank_list: "api_plat_activity_index_rank_list",
        /**--排行榜活动 --排行榜-用户列表*/
        api_plat_activity_index_rank_user_list: "api_plat_activity_index_rank_user_list",
    };
    /**注册协议*/
    export function initCommand() {
        const facade = puremvc.Facade.getInstance();
        //--新加的
        facade.registerCommand(HttpType.api_plat_var_language_config, cmd_api_plat_var_language_config);
        facade.registerCommand(HttpType.api_public_auth_code, cmd_api_public_auth_code);
        facade.registerCommand(HttpType.api_public_auth_drag, cmd_api_public_auth_drag);
        facade.registerCommand(HttpType.api_public_email_send, cmd_api_public_email_send);
        facade.registerCommand(HttpType.api_public_sms_send, cmd_api_public_sms_send);
        facade.registerCommand(HttpType.api_public_area_code, cmd_api_public_area_code);
        facade.registerCommand(HttpType.api_public_all_area_code, cmd_api_public_all_area_code);
        facade.registerCommand(HttpType.api_public_country, cmd_api_public_country);
        facade.registerCommand(HttpType.api_public_city, cmd_api_public_city);
        facade.registerCommand(HttpType.api_plat_var_game_all_config, cmd_api_plat_var_game_all_config);
        facade.registerCommand(HttpType.api_plat_var_game_all_index, cmd_api_plat_var_game_all_index);
        facade.registerCommand(HttpType.api_user_var_block_coins_scale , cmd_api_user_var_block_coins_scale );
        facade.registerCommand(HttpType.api_plat_var_backwater_setting_info, cmd_api_plat_var_backwater_setting_info);
        //--钱包
        facade.registerCommand(HttpType.api_plat_var_block_transfer_in_order_account, cmd_api_plat_var_block_transfer_in_order_account);
        facade.registerCommand(HttpType.api_user_var_block_transfer_in_order_store, cmd_api_user_var_block_transfer_in_order_store);
        facade.registerCommand(HttpType.api_user_var_block_transfer_in_order_index, cmd_api_user_var_block_transfer_in_order_index);
        facade.registerCommand(HttpType.api_user_var_block_transfer_out_order_store, cmd_api_user_var_block_transfer_out_order_store);
        facade.registerCommand(HttpType.api_user_var_block_transfer_out_order_index, cmd_api_user_var_block_transfer_out_order_index);
        facade.registerCommand(HttpType.api_user_coin_exchange_scale_var, cmd_api_user_coin_exchange_scale_var);
        facade.registerCommand(HttpType.api_user_coin_exchange_var, cmd_api_user_coin_exchange_var);
        //--账号
        facade.registerCommand(HttpType.api_user_register, cmd_api_user_register);
        facade.registerCommand(HttpType.api_user_login, cmd_api_user_login);
        facade.registerCommand(HttpType.api_user_logout, cmd_api_user_logout);
        facade.registerCommand(HttpType.api_user_change_password_var, cmd_api_user_change_password_var);
        facade.registerCommand(HttpType.api_user_reset_password, cmd_api_user_reset_password);
        facade.registerCommand(HttpType.api_user_change_password_gold_var, cmd_api_user_change_password_gold_var);
        facade.registerCommand(HttpType.api_user_login_check, cmd_api_user_login_check);
        //--会员资料
        facade.registerCommand(HttpType.api_user_show_var, cmd_api_user_show_var);
        facade.registerCommand(HttpType.api_user_update_var, cmd_api_user_update_var);
        facade.registerCommand(HttpType.api_user_bind_mobile_var, cmd_api_user_bind_mobile_var);
        facade.registerCommand(HttpType.api_user_bind_email_var, cmd_api_user_bind_email_var);
        facade.registerCommand(HttpType.api_user_var_vendor_withdraw, cmd_api_user_var_vendor_withdraw);
        facade.registerCommand(HttpType.api_user_update_var_safe_gold, cmd_api_user_update_var_safe_gold);
        facade.registerCommand(HttpType.api_user_var_gold_transfer, cmd_api_user_var_gold_transfer);
        facade.registerCommand(HttpType.api_user_show_var_bet, cmd_api_user_show_var_bet);
        facade.registerCommand(HttpType.api_user_show_var_channel_statistic, cmd_api_user_show_var_channel_statistic);
        facade.registerCommand(HttpType.api_user_show_var_gold, cmd_api_user_show_var_gold);
        facade.registerCommand(HttpType.api_user_change_bsc_address_var, cmd_api_user_change_bsc_address_var);
        facade.registerCommand(HttpType.api_user_var_google_key, cmd_api_user_var_google_key);
        facade.registerCommand(HttpType.api_user_bind_google_key_var, cmd_api_user_bind_google_key_var);
        facade.registerCommand(HttpType.api_vendor_var_bet_log_detail, cmd_api_vendor_var_bet_log_detail);
        facade.registerCommand(HttpType.api_vendor_var_bet_log_cancel, cmd_api_vendor_var_bet_log_cancel);
        facade.registerCommand(HttpType.api_user_show_url_var_var, cmd_api_user_show_url_var_var);
        //--大厅
        facade.registerCommand(HttpType.api_plat_var_lobby_index, cmd_api_plat_var_lobby_index);
        facade.registerCommand(HttpType.api_vendor_simple, cmd_api_vendor_simple);
        facade.registerCommand(HttpType.api_vendor_var_lobby_simple, cmd_api_vendor_var_lobby_simple);
        facade.registerCommand(HttpType.api_vendor_var_ori_product_show_var, cmd_api_vendor_var_ori_product_show_var);
        facade.registerCommand(HttpType.api_vendor_var_ori_product_visitor_show_var, cmd_api_vendor_var_ori_product_visitor_show_var);
        facade.registerCommand(HttpType.api_plat_var_game_menu, cmd_api_plat_var_game_menu);
        facade.registerCommand(HttpType.api_plat_var_game_category, cmd_api_plat_var_game_category);
        //--搜索
        facade.registerCommand(HttpType.api_user_var_game_index, cmd_api_user_var_game_index);
        facade.registerCommand(HttpType.api_user_var_game_update_var, cmd_api_user_var_game_update_var);
        facade.registerCommand(HttpType.api_user_var_game_search, cmd_api_user_var_game_search);
        facade.registerCommand(HttpType.api_plat_var_game_search, cmd_api_plat_var_game_search);
        //--返水
        facade.registerCommand(HttpType.api_user_var_backwater, cmd_api_user_var_backwater);
        facade.registerCommand(HttpType.api_user_var_backwater_var, cmd_api_user_var_backwater_var);
        facade.registerCommand(HttpType.api_user_var_backwater_trial, cmd_api_user_var_backwater_trial);
        facade.registerCommand(HttpType.api_user_var_backwater_trial_receive, cmd_api_user_var_backwater_trial_receive);
        //--邮件
        facade.registerCommand(HttpType.api_user_var_mail, cmd_api_user_var_mail);
        facade.registerCommand(HttpType.api_user_var_mail_var, cmd_api_user_var_mail_var);
        facade.registerCommand(HttpType.api_user_var_mail_var_receive, cmd_api_user_var_mail_var_receive);
        facade.registerCommand(HttpType.api_user_var_receiveQuick, cmd_api_user_var_receiveQuick);
        facade.registerCommand(HttpType.api_user_var_destroy_batch, cmd_api_user_var_destroy_batch);
        facade.registerCommand(HttpType.api_user_var_destroy_quick, cmd_api_user_var_destroy_quick);
        //--活动
        facade.registerCommand(HttpType.api_plat_activity, cmd_api_plat_activity);
        facade.registerCommand(HttpType.api_plat_activity_var, cmd_api_plat_activity_var);
        facade.registerCommand(HttpType.api_plat_activity_var_receive, cmd_api_plat_activity_var_receive);
        facade.registerCommand(HttpType.api_plat_activity_index_everyday, cmd_api_plat_activity_index_everyday);
        facade.registerCommand(HttpType.api_plat_sign_index, cmd_api_plat_sign_index);
        facade.registerCommand(HttpType.api_user_var_sign_store, cmd_api_user_var_sign_store);
        facade.registerCommand(HttpType.api_user_var_sign_receive, cmd_api_user_var_sign_receive);
        facade.registerCommand(HttpType.api_plat_activity_show_binding, cmd_api_plat_activity_show_binding);
        facade.registerCommand(HttpType.api_plat_activity_var_rule_id_var, cmd_api_plat_activity_var_rule_id_var);
        facade.registerCommand(HttpType.api_plat_activity_config, cmd_api_plat_activity_config);
        facade.registerCommand(HttpType.api_plat_activity_daily_rewards_var, cmd_api_plat_activity_daily_rewards_var);
        facade.registerCommand(HttpType.api_plat_activity_daily_rewards_var_receive, cmd_api_plat_activity_daily_rewards_var_receive);
        //--公告
        facade.registerCommand(HttpType.api_plat_var_notice_index, cmd_api_plat_var_notice_index);
        facade.registerCommand(HttpType.api_plat_var_notice_show_var, cmd_api_plat_var_notice_show_var);
        //--代理推广
        facade.registerCommand(HttpType.api_user_var_commission_commissionnum, cmd_api_user_var_commission_commissionnum);
        facade.registerCommand(HttpType.api_user_var_agent_direct_list, cmd_api_user_var_agent_direct_list);
        facade.registerCommand(HttpType.api_user_var_commission_commissiondetail, cmd_api_user_var_commission_commissiondetail);
        facade.registerCommand(HttpType.api_user_var_commission_commissionlist, cmd_api_user_var_commission_commissionlist);
        facade.registerCommand(HttpType.api_user_var_commission_directswater, cmd_api_user_var_commission_directswater);
        facade.registerCommand(HttpType.api_user_var_commission_receive, cmd_api_user_var_commission_receive);
        facade.registerCommand(HttpType.api_user_var_agent_var_floor_range, cmd_api_user_var_agent_var_floor_range);
        facade.registerCommand(HttpType.api_user_var_agent_var_update, cmd_api_user_var_agent_var_update);
        facade.registerCommand(HttpType.api_user_var_agent_var_statistic_promotion, cmd_api_user_var_agent_var_statistic_promotion);
        facade.registerCommand(HttpType.api_user_var_agent_var_direct_list, cmd_api_user_var_agent_var_direct_list);
        facade.registerCommand(HttpType.api_user_var_short_chain, cmd_api_user_var_short_chain);
        facade.registerCommand(HttpType.api_user_var_agent_bonus, cmd_api_user_var_agent_bonus);
        facade.registerCommand(HttpType.api_user_var_receive_agent_bonus_var, cmd_api_user_var_receive_agent_bonus_var);
        facade.registerCommand(HttpType.api_user_var_bonus_all_config, cmd_api_user_var_bonus_all_config);
        facade.registerCommand(HttpType.api_user_var_bonus_all_statistic, cmd_api_user_var_bonus_all_statistic);
        facade.registerCommand(HttpType.api_user_var_bonus_all_receive_var, cmd_api_user_var_bonus_all_receive_var);
        facade.registerCommand(HttpType.api_user_var_bonus_all_direct, cmd_api_user_var_bonus_all_direct);
        facade.registerCommand(HttpType.api_user_var_bonus_all_history, cmd_api_user_var_bonus_all_history);
        facade.registerCommand(HttpType.api_user_var_direct_commission_detail, cmd_api_user_var_direct_commission_detail);
        facade.registerCommand(HttpType.api_user_var_direct_commission_index, cmd_api_user_var_direct_commission_index);
        facade.registerCommand(HttpType.api_user_var_direct_commission_direct_index, cmd_api_user_var_direct_commission_direct_index);
        facade.registerCommand(HttpType.api_user_var_direct_commission_bonus_index, cmd_api_user_var_direct_commission_bonus_index);
        //--分红
        facade.registerCommand(HttpType.api_user_var_deposit_stake, cmd_api_user_var_deposit_stake);
        facade.registerCommand(HttpType.api_user_var_withdraw_stake, cmd_api_user_var_withdraw_stake);
        facade.registerCommand(HttpType.api_plat_var_stake_info, cmd_api_plat_var_stake_info);
        facade.registerCommand(HttpType.api_user_var_stake_info, cmd_api_user_var_stake_info);
        facade.registerCommand(HttpType.api_plat_var_bonus_recently, cmd_api_plat_var_bonus_recently);
        facade.registerCommand(HttpType.api_plat_var_bonus_rank, cmd_api_plat_var_bonus_rank);
        facade.registerCommand(HttpType.api_user_var_stake_draw, cmd_api_user_var_stake_draw);
        facade.registerCommand(HttpType.api_user_var_stake_log, cmd_api_user_var_stake_log);
        facade.registerCommand(HttpType.api_plat_var_bonus_log, cmd_api_plat_var_bonus_log);
        facade.registerCommand(HttpType.api_user_var_bonus_log, cmd_api_user_var_bonus_log);
        //--兑换
        facade.registerCommand(HttpType.api_user_var_exchange_method_list, cmd_api_user_var_exchange_method_list);
        facade.registerCommand(HttpType.api_user_var_exchange_order_list, cmd_api_user_var_exchange_order_list);
        facade.registerCommand(HttpType.api_user_var_exchange_create_order, cmd_api_user_var_exchange_create_order);
        facade.registerCommand(HttpType.api_user_var_gold_water_index, cmd_api_user_var_gold_water_index);
        facade.registerCommand(HttpType.api_user_var_exchange_manual_refund, cmd_api_user_var_exchange_manual_refund);
        facade.registerCommand(HttpType.api_user_var_exchange_extend_info, cmd_api_user_var_exchange_extend_info);
        //--收款管理
        facade.registerCommand(HttpType.api_user_var_payment_method_index, cmd_api_user_var_payment_method_index);
        facade.registerCommand(HttpType.api_user_var_payment_method_store, cmd_api_user_var_payment_method_store);
        facade.registerCommand(HttpType.api_user_var_payment_method_bank_list, cmd_api_user_var_payment_method_bank_list);
        facade.registerCommand(HttpType.api_user_var_payment_method_update_var, cmd_api_user_var_payment_method_update_var);
        //--短信
        facade.registerCommand(HttpType.api_sms_send, cmd_api_sms_send);
        facade.registerCommand(HttpType.api_sms_reset_password_sent, cmd_api_sms_reset_password_sent);
        facade.registerCommand(HttpType.api_sms_exchange, cmd_api_sms_exchange);
        facade.registerCommand(HttpType.api_sms_transfer, cmd_api_sms_transfer);
        //--商城
        facade.registerCommand(HttpType.api_user_var_recharge_method_list, cmd_api_user_var_recharge_method_list);
        facade.registerCommand(HttpType.api_user_var_recharge_create, cmd_api_user_var_recharge_create);
        facade.registerCommand(HttpType.api_user_var_coin_recharge_confirm, cmd_api_user_var_coin_recharge_confirm);
        facade.registerCommand(HttpType.api_user_var_recharge_list, cmd_api_user_var_recharge_list);
        facade.registerCommand(HttpType.api_user_var_recharge_address, cmd_api_user_var_recharge_address);
        //--介绍页
        facade.registerCommand(HttpType.api_plat_var_reward_coin_info, cmd_api_plat_var_reward_coin_info);
        //--其它
        facade.registerCommand(HttpType.api_plat_var_game_config, cmd_api_plat_var_game_config);
        facade.registerCommand(HttpType.api_plat_var_client_config, cmd_api_plat_var_client_config);
        facade.registerCommand(HttpType.api_plat_fag_index, cmd_api_plat_fag_index);
        facade.registerCommand(HttpType.api_plat_var_marquee_index, cmd_api_plat_var_marquee_index);
        facade.registerCommand(HttpType.api_user_var_messages_index, cmd_api_user_var_messages_index);
        facade.registerCommand(HttpType.api_user_var_messages_show_var, cmd_api_user_var_messages_show_var);
        facade.registerCommand(HttpType.api_user_var_beat, cmd_api_user_var_beat);
        facade.registerCommand(HttpType.api_user_var_red_dot_tips, cmd_api_user_var_red_dot_tips);
        facade.registerCommand(HttpType.api_plat_var_recently_bet_info, cmd_api_plat_var_recently_bet_info);
        facade.registerCommand(HttpType.api_plat_var_plat_big_award, cmd_api_plat_var_plat_big_award);
        //--Swap
        facade.registerCommand(HttpType.api_plat_var_swap_setting_info, cmd_api_plat_var_swap_setting_info);
        facade.registerCommand(HttpType.api_plat_var_swap_k, cmd_api_plat_var_swap_k);
        facade.registerCommand(HttpType.api_plat_var_swap_trial, cmd_api_plat_var_swap_trial);
        facade.registerCommand(HttpType.api_user_var_swap_order_list, cmd_api_user_var_swap_order_list);
        facade.registerCommand(HttpType.api_user_var_swap_create_order, cmd_api_user_var_swap_create_order);
        //--平台入口配置获取
        facade.registerCommand(HttpType.api_plat_var_config, cmd_api_plat_var_config);
        facade.registerCommand(HttpType.api_test_speed, cmd_api_test_speed);
        //--直属投注记录列表
        facade.registerCommand(HttpType.api_user_var_agent_var_bet, cmd_api_user_var_agent_var_bet);
        //--热门列表数据
        facade.registerCommand(HttpType.api_vendor_96_products, cmd_api_vendor_96_products);
        facade.registerCommand(HttpType.api_vendor_267_products, cmd_api_vendor_267_products);
        facade.registerCommand(HttpType.api_vendor_var_products, cmd_api_vendor_var_products);
        //--获取推荐人信息是否为信用用户
        facade.registerCommand(HttpType.api_user_var_invite_user_info, cmd_api_user_var_invite_user_info);
        //--直属用户查询操作
        facade.registerCommand(HttpType.api_user_var_fetch_direct_user_info, cmd_api_user_var_fetch_direct_user_info);
        facade.registerCommand(HttpType.api_user_var_agent_direct_user_update, cmd_api_user_var_agent_direct_user_update);
        facade.registerCommand(HttpType.api_user_var_agent_direct_deduction, cmd_api_user_var_agent_direct_deduction);
        facade.registerCommand(HttpType.api_user_var_credit_statistic, cmd_api_user_var_credit_statistic);
        facade.registerCommand(HttpType.api_user_var_credit_dividend_period, cmd_api_user_var_credit_dividend_period);
        facade.registerCommand(HttpType.api_user_var_agent_credit_transfer, cmd_api_user_var_agent_credit_transfer);
        facade.registerCommand(HttpType.api_user_var_direct_register, cmd_api_user_var_direct_register);
        facade.registerCommand(HttpType.api_user_var_agent_direct_deduction_all, cmd_api_user_var_agent_direct_deduction_all);
        facade.registerCommand(HttpType.api_user_var_vendor_config_default_update, cmd_api_user_var_vendor_config_default_update);
        //--充值弹窗
        facade.registerCommand(HttpType.api_user_var_notice, cmd_api_user_var_notice);
        facade.registerCommand(HttpType.api_plat_var_notice_popup, cmd_api_plat_var_notice_popup);
        //--skin003
        facade.registerCommand(HttpType.api_user_third_login, cmd_api_user_third_login);
        //--推广
        facade.registerCommand(HttpType.api_plat_var_promotion_config, cmd_api_plat_var_promotion_config);
        facade.registerCommand(HttpType.api_plat_var_vip_config, cmd_api_plat_var_vip_config);
        //--打点相关
        facade.registerCommand(HttpType.api_user_var_event_record, cmd_api_user_var_event_record);
        facade.registerCommand(HttpType.api_user_var_event_record_update, cmd_api_user_var_event_record_update);
        //--用户认证
        facade.registerCommand(HttpType.api_user_var_plat_users_verification_show, cmd_api_user_var_plat_users_verification_show);
        facade.registerCommand(HttpType.api_user_var_plat_users_verification_save, cmd_api_user_var_plat_users_verification_save);
        //--IP限制
        facade.registerCommand(HttpType.api_plat_var_is_allowed, cmd_api_plat_var_is_allowed);
        //--奖励任务
        facade.registerCommand(HttpType.api_user_var_coin_task_index, cmd_api_user_var_coin_task_index);
        facade.registerCommand(HttpType.api_user_var_coin_task_cancel, cmd_api_user_var_coin_task_cancel);
        facade.registerCommand(HttpType.api_plat_var_bank_list, cmd_api_plat_var_bank_list);
        //--币种兑换
        facade.registerCommand(HttpType.api_user_currency_conversion_index, cmd_api_user_currency_conversion_index);
        facade.registerCommand(HttpType.api_user_currency_conversion_create_order, cmd_api_user_currency_conversion_create_order);
        //--彩球活动
        facade.registerCommand(HttpType.api_plat_activity_ball_lottery_award_var, cmd_api_plat_activity_ball_lottery_award_var);
        facade.registerCommand(HttpType.api_plat_activity_ball_lottery_init_var, cmd_api_plat_activity_ball_lottery_init_var);
        facade.registerCommand(HttpType.api_plat_activity_ball_info_var, cmd_api_plat_activity_ball_info_var);
        facade.registerCommand(HttpType.api_plat_activity_ball_rewards_var_receive, cmd_api_plat_activity_ball_rewards_var_receive);
        facade.registerCommand(HttpType.api_user_var_jump_store, cmd_api_user_var_jump_store);
        //--转盘抽奖
        facade.registerCommand(HttpType.api_plat_activity_spin_lottery_award_var, cmd_api_plat_activity_spin_lottery_award_var);
        //--积分抽奖
        facade.registerCommand(HttpType.api_plat_activity_every_point_lottery_rank_list, cmd_api_plat_activity_every_point_lottery_rank_list);
        facade.registerCommand(HttpType.api_plat_activity_every_point_lottery_var, cmd_api_plat_activity_every_point_lottery_var);
        //--获取弹窗 登录时要打开的弹窗列表
        facade.registerCommand(HttpType.api_plat_var_pop_index, cmd_api_plat_var_pop_index);
        //--排行榜活动 
        facade.registerCommand(HttpType.api_plat_activity_index_rank_list, cmd_api_plat_activity_index_rank_list);
        facade.registerCommand(HttpType.api_plat_activity_index_rank_user_list, cmd_api_plat_activity_index_rank_user_list);
    };

}