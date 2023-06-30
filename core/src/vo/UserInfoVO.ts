module core {
    /**
     * 用户信息
     */
    export interface UserInfoVO {
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
        /** */
        real_name_decrypt?: string;
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
        is_gold_transfer?: number;
        /**转换手续费 */
        gold_transfer_fee?: number;
        /**流水倍数 */
        gold_transfer_water_multiple?: number;
        /**
         * 1-信用代理|98-信用玩家
         */
        show_credit_set?: number; //是否显示多层用户
        show_promote?: number; //1-展示推广赚钱|2-展示代理管理|3-都不展示
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
                vip_award: { gold: number; model_category: number }[];
            }[];
        };
        password_gold_exists?: number; //1:已设置 0:未设置
        /**个人名片*/
        business_card?: string;
        /**上級个人名片*/
        invite_user_business_card?: string;
        /**是否显示代理统计*/
        is_show_agent_statistic?: number;
        /**是否使用google验证码  */
        is_google_scan?: number;
        /**登录是否需要google验证码 */
        is_login_need_google?: number;
        /**是否显示信用统计 */
        show_credit_statistic?: number;
        /**是否信用用户 */
        is_credit_user?: number;
        /**是否信用现金用户 */
        is_cash_agent?: number;
        /**是否显示兑换 */
        is_exchange?: number;
        /**是否显示充值 */
        is_recharge?: number;
        /**货币互转开关 */
        is_gold_exchange?: number;
        water_config?: any;
        credit_rate_max?: number;
        credit_rate_min?: number;
        credit_rate_invited?: number;
        /**信用创建类型: 在创建下级信用用户时使用  1, 代理， 2 玩家 */
        create_credit_user_type?: any;
        cpf?: string;
    }

    /**
     * vip 奖励活动相关
     */
    export interface VipActivityInfo {
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
                complete: number; //
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
