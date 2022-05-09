module core {
    export interface ActivityEverydayTypeVO {
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
