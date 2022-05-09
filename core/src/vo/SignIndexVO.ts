module core {
    /**
     * 签到信息
     */
    export interface SignIndexVO {
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
