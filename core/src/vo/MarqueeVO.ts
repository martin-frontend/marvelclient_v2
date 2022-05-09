/**
 *
 * 跑马灯数据结构
 * @export
 * @class AnnounceModel
 */

module core {
    export interface MarqueeVO {
        id:number; // 跑马灯ID
        plat_id:number; // 平台ID
        app_types: number[];
        type: number; // 类型 1-及时生效|2-按时间
        start_time: string; // 开始时间
        content: string; //跑马灯内容
        status: number; // 状态 1-未启用|2-启用
        is_delete: number; // 是否删除:0-否|1-是
        created_by: string; // 创建人
        created_at: string; // 创建时间
        updated_by: string; // 修改人
        updated_at: string; // 修改时间
    }

    export interface LuckMsgVO {
        /** 赢的钱 */
        gold: string;
        /** 昵称 */
        nick_name: string;
        /** 厂商名称 */
        vendor_name: string;
    }



}
