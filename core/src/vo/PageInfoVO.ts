module core {
    /**
     * 分页信息
     */
    export interface PageInfoVO {
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
