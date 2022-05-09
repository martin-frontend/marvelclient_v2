module core {
    export interface QestionVo {
        /**常见问题列表 */
        faqs: {
            /**问题ID */
            id: 3, 
            /**数据归属标记 */
            data_belong: string,
            /**平台ID */
            plat_id: number, 
            /**问题 */
            name: string, 
            /**答案 */
            content: string,
            /**排序序号 */
            index_no: number, 
            /**是否删除:0-否|1-是 */
            is_delete: number, 
            /**创建人 */
            created_by: string,
            /**创建时间 */
            created_at: string, 
            /**修改人 */
            updated_by: string,
            /**修改时间 */ 
            updated_at: string 
        }[],
        /**在线客服链接 */
        kf_url: string;
    }
}
