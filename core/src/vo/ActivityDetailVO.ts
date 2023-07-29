module core {
    export interface ActivityDetailVO {
        /**活动ID*/
        id: number;
        /**模型ID:0-自定义|非0-模型ID*/
        model_id: number;
        /**活动类型*/
        activity_category: string;
        /**平台ID*/
        plat_id: number;
        /**跳转模块，详细参考：http://18.166.154.73:8090/pages/viewpage.action?pageId=65696#id-活动配置说明-活动跳转模块*/
        model_open_mode: number;
        /**跳转网址*/
        open_mode_url: string;
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
        /**提现流水倍数*/
        bonus_multiple: number;
        /**活动描述*/
        activity_desc: string;
        /**当前活动-待领取任务数量，非0则红点提示 */
        unread_num: number;
        /**活动的类型 */
        award_type: number;
        /**活动规则描述*/
        rule_desc: string;
        /**规则*/
        rules: {
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
                    class: string;
                    /**百分比 */
                    coin_amount: number;
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
        /**每日奖励的比例 */
        daily_ratio: number[];
        /**活动分类标签 */
        active_model_tag: string;
    }
}
