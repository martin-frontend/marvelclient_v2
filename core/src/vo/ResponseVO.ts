module core {
    /**
     * http请求返回的数据结构
     */
    export interface ResponseVO {
        /**状态 0正常*/
        status: number;
        msg: string;
        extend: { microtime: number; unique: string; version: string; request_unique: string };
        data: any;
        unique: any;
    }
}
